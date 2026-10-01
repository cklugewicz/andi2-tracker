// Syncs GitHub Issues (not PRs) into a Notion database. One-way: GitHub -> Notion.
//
// Modes (chosen automatically):
//   - Triggered by an `issues` event: upserts (or archives) just that issue.
//   - Anything else (workflow_dispatch / schedule): backfills every issue in the repo.
//
// Requires Node 18+ (built-in fetch). No dependencies.

import { readFileSync } from "node:fs";

const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  GITHUB_EVENT_NAME,
  GITHUB_EVENT_PATH,
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
} = process.env;

for (const [name, value] of Object.entries({
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
})) {
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
}

// 2025-09-03 is the API version that introduced data sources.
const NOTION_VERSION = "2025-09-03";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Notion helpers ----------

async function notion(method, path, body) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 429 || res.status >= 500) {
      const retryAfter = Number(res.headers.get("retry-after")) || attempt * 2;
      console.warn(`Notion ${res.status} on ${method} ${path}; retrying in ${retryAfter}s`);
      await sleep(retryAfter * 1000);
      continue;
    }
    if (!res.ok) {
      throw new Error(`Notion ${method} ${path} failed: ${res.status} ${await res.text()}`);
    }
    return res.json();
  }
  throw new Error(`Notion ${method} ${path} failed after retries`);
}

let dataSourceId;
async function getDataSourceId() {
  if (dataSourceId) return dataSourceId;
  const db = await notion("GET", `/databases/${NOTION_DATABASE_ID}`);
  dataSourceId = db.data_sources?.[0]?.id;
  if (!dataSourceId) throw new Error("Could not find a data source on that Notion database.");
  return dataSourceId;
}

async function findPage(issueNumber) {
  const id = await getDataSourceId();
  const res = await notion("POST", `/data_sources/${id}/query`, {
    filter: { property: "Issue Number", number: { equals: issueNumber } },
    page_size: 1,
  });
  return res.results[0] ?? null;
}

// ---------- Mapping ----------

const MAX_TEXT = 2000; // Notion's limit per rich_text object

function richText(str) {
  if (!str) return [];
  const clipped = str.length > MAX_TEXT ? str.slice(0, MAX_TEXT - 1) + "…" : str;
  return [{ type: "text", text: { content: clipped } }];
}

function toProperties(issue) {
  return {
    Title: { title: richText(issue.title || `Issue #${issue.number}`) },
    "Issue Number": { number: issue.number },
    State: { select: { name: issue.state === "closed" ? "Closed" : "Open" } },
    URL: { url: issue.html_url },
    Creator: { rich_text: richText(issue.user?.login) },
    Assignees: {
      multi_select: (issue.assignees ?? []).map((a) => ({ name: a.login })),
    },
    Labels: {
      multi_select: (issue.labels ?? [])
        .map((l) => (typeof l === "string" ? l : l.name))
        .filter(Boolean)
        // Notion multi-select names can't contain commas and max out at 100 chars.
        .map((name) => ({ name: name.replace(/,/g, " ").slice(0, 100) })),
    },
    Description: { rich_text: richText(issue.body) },
    "Created At": { date: { start: issue.created_at } },
    "Updated At": { date: { start: issue.updated_at } },
    "Closed At": { date: issue.closed_at ? { start: issue.closed_at } : null },
  };
}

// ---------- Operations ----------

async function upsertIssue(issue) {
  const existing = await findPage(issue.number);
  const properties = toProperties(issue);

  if (existing) {
    const stored = existing.properties?.["Updated At"]?.date?.start;
    if (stored && new Date(stored).getTime() === new Date(issue.updated_at).getTime()) {
      console.log(`#${issue.number}: unchanged, skipping`);
      return "skipped";
    }
    await notion("PATCH", `/pages/${existing.id}`, { properties });
    console.log(`#${issue.number}: updated`);
    return "updated";
  }

  const id = await getDataSourceId();
  await notion("POST", "/pages", {
    parent: { type: "data_source_id", data_source_id: id },
    properties,
  });
  console.log(`#${issue.number}: created`);
  return "created";
}

async function archiveIssue(issueNumber) {
  const existing = await findPage(issueNumber);
  if (!existing) {
    console.log(`#${issueNumber}: not in Notion, nothing to archive`);
    return;
  }
  await notion("PATCH", `/pages/${existing.id}`, { archived: true });
  console.log(`#${issueNumber}: archived`);
}

async function* allIssues() {
  for (let page = 1; ; page++) {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues?state=all&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (!res.ok) throw new Error(`GitHub API failed: ${res.status} ${await res.text()}`);
    const batch = await res.json();
    if (batch.length === 0) return;
    // This endpoint returns PRs too; they carry a `pull_request` key.
    for (const item of batch) if (!item.pull_request) yield item;
  }
}

// ---------- Main ----------

async function main() {
  if (GITHUB_EVENT_NAME === "issues") {
    const payload = JSON.parse(readFileSync(GITHUB_EVENT_PATH, "utf8"));
    const { action, issue } = payload;

    if (action === "deleted" || action === "transferred") {
      await archiveIssue(issue.number);
    } else {
      await upsertIssue(issue);
    }
    return;
  }

  console.log(`Backfilling all issues for ${GITHUB_REPOSITORY}...`);
  const counts = { created: 0, updated: 0, skipped: 0 };
  for await (const issue of allIssues()) {
    counts[await upsertIssue(issue)]++;
    await sleep(350); // stay under Notion's ~3 requests/second average
  }
  console.log("Done:", counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
