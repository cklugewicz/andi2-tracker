# Andromeda2 — Astronomy Discord Bot

A Discord bot with slash commands for astronomy enthusiasts — 22 commands covering sky conditions, planets, satellites, meteor showers, eclipses, and a couple of handy utilities.

## Commands

Commands are grouped the same way `/help` groups them in Discord — a handful of broad categories rather than one heading per command, which stopped being readable once the bot passed about a dozen commands. (The single source of truth for this grouping is `CATEGORY_FOR_COG` in `cogs/help.py`; if you add a cog, update that mapping so `/help` and this table don't drift apart from each other.)

**☁️ Sky & Conditions**

| Command | Description |
|---|---|
| `/apod [date]` | NASA's Astronomy Picture of the Day (optionally for a past date, `YYYY-MM-DD`) |
| `/sky [location] [remember]` | Current cloud cover, visibility, and a plain-language viewing verdict |
| `/skyquality [location] [remember]` | Light pollution map link + Bortle scale reference for a location |
| `/moonphase` | Current moon phase and % illumination |

**🪐 Solar System**

| Command | Description |
|---|---|
| `/planets [location] [remember]` | Which planets are currently above the horizon, with altitude/azimuth |
| `/conjunction [location] [remember] [days_ahead]` | Which planets (or the Moon) are closest together right now, or each pair's closest approach over the next N days |
| `/meteorshower [location] [remember]` | The next upcoming major meteor shower, with peak date, rate, and (if a location's given) whether the radiant is above your horizon at peak |
| `/meteorshowers` | Full list of annual meteor showers, sorted by how soon each peaks |
| `/eclipse` | Countdown to the next solar and lunar eclipses, with visibility regions |

**🛰️ Satellites & ISS**

| Command | Description |
|---|---|
| `/issnow` | Current latitude/longitude of the ISS |
| `/isspasses [location] [remember]` | Next 5 visible ISS passes, with times and duration |
| `/satellite [name] [location] [norad_id] [remember]` | Track any named satellite (not just ISS) — position + upcoming passes, with N2YO freshness fallback |

**📍 Location Tools**

| Command | Description |
|---|---|
| `/setlocation <location>` | Save your default location for every other command that takes one |
| `/mylocation` | Show your currently saved default location |
| `/clearlocation` | Forget your saved default location |
| `/dms <degrees> <minutes> [seconds] [direction]` | Convert degrees/minutes/seconds coordinates to decimal degrees |
| `/decimaldms <value>` | Convert decimal degrees back to degrees/minutes/seconds |

**🔔 Reminders (Admin)**

| Command | Description |
|---|---|
| `/setreminderchannel [lead_days]` | Auto-post a reminder in this channel N days before each meteor shower peaks **and before each solar/lunar eclipse** (default 3), plus a same-day reminder for each |
| `/disablereminders` | Turn off automatic meteor shower + eclipse reminders |
| `/reminderstatus` | Show this server's reminder config, background-task health, and per-event send status |

**🛠️ Utility**

| Command | Description |
|---|---|
| `/status` | Bot uptime, guild/user counts, dependency versions, and host CPU/RAM usage |
| `/help` | List every command and what it does, grouped the same way as this table, built live from the command tree |

No paid APIs required anywhere. NASA's APOD API has a free instant-signup key; N2YO is optional (only used as a `/satellite` and `/isspasses` fallback); everything else (Open-Meteo, Open Notify, Celestrak, JPL ephemeris via Skyfield, lightpollutionmap.app) needs no key at all.

### Locations: city names, coordinates, or a saved default

Every command with a `location` argument (`/sky`, `/skyquality`, `/isspasses`, `/planets`, `/satellite`, `/conjunction`, and optionally `/meteorshower`) accepts:

- **A city name** — `Flagstaff, AZ`
- **Raw decimal coordinates** — `36.1628, -85.5016`
- **Degrees/minutes/seconds** — `36°9'46"N, 85°30'6"W` (or letter-based: `36d9m46sN, 85d30m6sW`) — direction letters work in either order, so you don't have to remember whether latitude or longitude comes first
- **Nothing at all** — falls back to your saved default (set via `/setlocation`, or see below)

Coordinate input (decimal or DMS) is useful if you don't live near a place the geocoder recognizes — rural properties, campsites, a specific field, etc. When you use coordinates, the bot also makes a best-effort attempt to show a nearby place name for readability — `36.1628, -85.5016 (near Cookeville, TN)` instead of bare numbers — via a free reverse-geocoding lookup. If nothing's nearby (the middle of the ocean, deep wilderness), it just shows the bare coordinates, which is expected, not a bug.

**Typing a location is a one-off lookup by default and does *not* change your saved default.** Add `remember: True` on any of those commands to also save that location as your new default in the same step — the response footer confirms when this happened. This is deliberate: a quick "what about Tokyo?" query shouldn't silently overwrite your actual home default.

`/meteorshower` is the one exception to the usual "location required or saved default required" rule — the shower info itself is useful with no location at all, so leaving it out just skips the radiant-visibility part rather than erroring.

## Setup

**1. Create the Discord bot application**

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**
2. Go to the **Bot** tab → **Add Bot**
3. Under **Privileged Gateway Intents**, you don't need to enable anything extra — this bot only uses slash commands
4. Click **Reset Token** and copy it (you'll only see it once)
5. Go to **OAuth2 → URL Generator**:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Use Slash Commands`
   - Copy the generated URL and open it to invite the bot to your server

**2. Get a NASA API key (optional but recommended)**

Go to [api.nasa.gov](https://api.nasa.gov/), fill in the short form, and you'll get a key instantly by email — no approval wait. This raises your APOD rate limit from ~30/hour (shared `DEMO_KEY`) to 1,000/hour.

**3. Install dependencies**

```bash
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**4. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `DISCORD_TOKEN` — from step 1
- `NASA_API_KEY` — from step 2 (or leave as `DEMO_KEY` to test)
- `GUILD_ID` — (optional) your test server's ID, so commands also sync there instantly during development. Safe to leave set in production too. Right-click your server icon in Discord with Developer Mode on → Copy Server ID.
- `N2YO_API_KEY` — (optional) only used as a `/satellite` freshness fallback; see the note below.
- `DATA_DIR` — **required on Railway** (or any host with an ephemeral filesystem) if you want reminders and saved locations to survive a redeploy. See "Persisting data on Railway" below. Leave blank for local development.

**5. Run it**

```bash
python3 bot.py
```

Commands sync **globally** on startup, so the bot works correctly in every server it's invited to (this is the fix for an earlier version that only synced to one hardcoded guild — see the note on multi-server support below). If `GUILD_ID` is also set, that one guild additionally gets an instant copy so you're not stuck waiting during development.

## Persisting data on Railway

**The problem:** Railway (like most container-based hosts) rebuilds a fresh filesystem on every deploy. `data.json` — which holds reminder channel settings, which reminders have already been sent, and everyone's saved default locations — lives inside that filesystem by default, so a redeploy silently wipes all of it back to empty.

**The fix:** attach a Railway **Volume** (persistent disk storage that survives redeploys) and point the bot at it via the `DATA_DIR` environment variable.

1. In your Railway project canvas, right-click your bot's service tile (or click its **"⋯"** menu).
2. Select **Attach Volume**.
3. Set the **mount path** to `/data` (any path works, just be consistent with step 5).
4. In the **Variables** tab, add `DATA_DIR` = `/data` (matching the mount path from step 3).
5. Railway redeploys automatically after you save the variable. The bot now writes `data.json` to `/data/data.json`, on the persistent volume — future redeploys won't touch it. Note: attaching or resizing a volume causes a brief moment of downtime even with a healthcheck configured, since Railway only allows one deployment to be attached to a volume at a time — expected, and harmless for a Discord bot.

(Railway's UI has moved this option around before — if "Attach Volume" isn't where you expect, check their current docs at [docs.railway.com/guides/volumes](https://docs.railway.com/guides/volumes).)

**If you already had reminders/locations configured before adding the volume:** that data was on the old ephemeral filesystem and is gone — you'll need to re-run `/setreminderchannel` and have people re-run `/setlocation` (with `remember: True`) once. After that, it'll stick around across every future redeploy.

You can confirm it's working by checking `/reminderstatus` (shows your reminder config) or `/mylocation` (shows your saved location) right after a redeploy — if they're still populated, the volume is wired up correctly.

## Project structure

```
astro-bot/
├── bot.py                  # Entry point, loads cogs, syncs slash commands (global + optional dev guild)
├── data.json                # Auto-created: reminders, sent-tracking, saved user locations (or on a Railway Volume if DATA_DIR is set — see above)
├── cogs/
│   ├── __init__.py          # Makes cogs an explicit package
│   ├── apod.py               # /apod
│   ├── sky.py                 # /sky
│   ├── moon.py                 # /moonphase (pure math, no API)
│   ├── iss.py                   # /issnow
│   ├── passes.py                 # /isspasses (self-computed via Celestrak + Skyfield, no external pass-prediction API)
│   ├── meteorshower.py             # /meteorshower (+ radiant altitude via Skyfield), /meteorshowers
│   ├── planets.py                   # /planets (real ephemeris via Skyfield)
│   ├── conjunction.py                # /conjunction (angular separation now or over a lookahead window, via Skyfield)
│   ├── ephemeris.py                   # shared Skyfield timescale/ephemeris (not a cog)
│   ├── reminders.py                    # /setreminderchannel, /disablereminders, /reminderstatus
│   ├── eclipse.py                       # /eclipse (static NASA-sourced dates)
│   ├── lightpollution.py                 # /skyquality (deep link + static Bortle reference)
│   ├── satellite.py                       # /satellite (Celestrak + N2YO fallback + Skyfield)
│   ├── userlocation.py                     # /setlocation, /mylocation, /clearlocation + shared resolver
│   ├── geocoding.py                         # shared city/coordinate/DMS resolver + reverse-geocode "near X" enrichment (not a cog)
│   ├── dms_math.py                           # pure DMS↔decimal conversion math, shared by dms.py and geocoding.py (not a cog)
│   ├── dms.py                                 # /dms, /decimaldms
│   ├── status.py                               # /status
│   ├── help.py                                  # /help (built dynamically from the live command tree)
│   └── storage.py                                # shared JSON persistence helper (not a cog)
├── requirements.txt
├── .env.example
└── README.md
```

### A note on multi-server support

Earlier in this project's life, `bot.py` only synced slash commands to one specific guild via `GUILD_ID`, which meant the bot showed **zero commands** in any other server it was invited to (a classic `discord.py` gotcha — `tree.sync(guild=...)` doesn't automatically include globally-registered commands unless you `copy_global_to()` first). This is fixed: the bot now always does a normal **global** sync on startup, so every server gets all commands. `GUILD_ID` is now purely a development convenience for instant sync to one test server, not a requirement for the bot to work elsewhere.

### A note on locations and `remember`

Locations are resolved by `geocoding.py` — city name via Open-Meteo geocoding, a `lat,lon` pair, or DMS coordinates, all handled in one shared `resolve_coordinates()` function — and persisted per-**user** (not per-server) by `userlocation.py`, so a saved default follows someone across every server the bot is in. The `remember` parameter controls whether a command's `location` argument also updates that saved default; see `resolve_location()` and `remember_note()` in `userlocation.py` for the shared logic every location-taking cog calls into.

### A note on `/setreminderchannel`

Needs the **Manage Server** permission to configure. The background task checks once every 24 hours for both meteor showers (which repeat annually) and eclipses (one-off dated events) and posts once per event, tracked in `data.json` so restarts don't cause duplicate or missed reminders. **On Railway specifically, see "Persisting data on Railway" above** — without a mounted Volume, this data (and everyone's saved locations) gets wiped on every redeploy.

### A note on `/skyquality`

This one has a history worth knowing if you plan to touch `lightpollution.py`: earlier versions tried to fetch live radiance data from a NOAA VIIRS ArcGIS service to compute an actual Bortle number. That government endpoint broke in three different, escalating ways during testing (moved URL, then a real 404, then further guessed replacement URLs also 404'd) and its current location couldn't be confirmed. Rather than depend on an undocumented, apparently frequently-reorganized endpoint, `/skyquality` now geocodes the location and returns a **verified, documented deep link** into [lightpollutionmap.app](https://lightpollutionmap.app) (`?lat=&lng=&zoom=` — confirmed from their own public FAQ) plus a static Bortle-scale reference table. No live API call, nothing to break. See the comments in `lightpollution.py` for the full story, including why scraping that site's internal click-handler data wasn't a good alternative either (undocumented endpoint, same fragility risk, questionable given it's a solo developer's free tool).

### A note on Skyfield usage (`/planets`, `/conjunction`, `/meteorshower`)

All three need actual ephemeris data (precise positions of solar system bodies over time) rather than a simple formula, so they use [Skyfield](https://rhodesmill.org/skyfield/), the modern standard for this in Python, sharing a single loaded copy via `ephemeris.py`. On first run this downloads `de421.bsp` (~17MB, from NASA JPL) into the bot's working directory and caches it there — needs internet once, then works offline. If you deploy to a read-only filesystem (some serverless platforms), pre-download this file and bundle it, or mount a writable cache directory.

- `/meteorshower`'s radiant-visibility check uses Skyfield's `Star` class (fixed celestial coordinates, not a solar system body) with RA/Dec sourced from the RASC Observer's Handbook, evaluated at an approximated local midnight (longitude ÷ 15 as an hours offset — not a real timezone/DST lookup, which is fine for "is this above or below the horizon" but not exact-minute precision).
- `/conjunction`'s `days_ahead` lookahead uses Skyfield's *vectorized* time support (`Timescale.from_datetimes()`) to sample the whole window in a handful of numpy-level calls rather than looping day-by-day — much faster, and the idiomatic way to do this kind of scan in Skyfield. It reports the closest **sampled** moment (every 3 hours by default), not a true continuous minimum, so exact timing can be off by up to that interval — stated plainly in the command's own footer, not just here.

### A note on the "(near X)" location enrichment

When someone enters raw coordinates (decimal or DMS) instead of a city name, `geocoding.py` makes a best-effort attempt to reverse-geocode a nearby place name for display — `36.1628, -85.5016 (near Cookeville, TN)` — using OpenStreetMap's free Nominatim reverse endpoint. No API key needed, but Nominatim's usage policy requires a real identifying `User-Agent` (set in `geocoding.py`) and caps requests at 1/second; this only ever fires once per coordinate-based lookup, never batched, so it stays comfortably within that. It's pure cosmetic polish — any failure (remote coordinates with nothing nearby, network hiccup, unexpected response) silently falls back to bare coordinates rather than breaking the command. Worth knowing if you want to be extra careful about OSM's data-attribution norms: this doesn't currently add an "OpenStreetMap contributors" credit line to every embed footer, since that would mean touching every location-taking cog just for this — a small attribution note somewhere visible (or in this README, as here) is a reasonable middle ground if you want to be stricter about it.

### A note on `/status`

CPU load and RAM usage are read from `/proc` (Linux-only — `/proc/uptime`, `/proc/self/status`, and `os.getloadavg()`), so they show "N/A" gracefully if you run the bot locally on Windows. This isn't a problem for Railway or virtually any other container host, which run Linux. The bot's own version number is a manually-bumped constant (`BOT_VERSION` in `bot.py`) — there's no automatic versioning scheme, so update it yourself on meaningful releases if you want `/status` to reflect it accurately.

### A note on `/satellite` and N2YO

N2YO's free-tier API only looks satellites up **by NORAD catalog number**, not by name — there's no public name-search endpoint, so it can't be a true drop-in replacement when Celestrak has zero matches for a name. What it's actually used for here:

- Pass `norad_id` directly (e.g. `25544` for the ISS) to query N2YO first if you have a key, skipping name search entirely.
- When a name search on Celestrak succeeds but that TLE's epoch is more than 3 days old, the bot automatically checks N2YO (using the NORAD ID parsed out of Celestrak's own data) for something fresher, and uses whichever is newer.

Without an `N2YO_API_KEY` set, `/satellite` still works fine on Celestrak alone — you just don't get that freshness fallback. Get a free key at [n2yo.com](https://www.n2yo.com/) (account → profile page).

### A note on `/isspasses`

This one has history: it originally used Open Notify's pass-prediction endpoint, which its maintainer has since removed entirely (Open Notify still serves current ISS position for `/issnow`, just not pass predictions anymore). A suggested replacement, iss.guru, turned out on inspection to have no documented public API — it's a small, human-facing website for ham radio operators, not a developer API service, and even its own branding was inconsistent between its GitHub repo and live site. Rather than build on another undocumented endpoint, `/isspasses` now computes passes itself: it fetches the ISS's own TLE from Celestrak (with the same N2YO freshness fallback `/satellite` uses, via `resolve_best_tle()`) and predicts passes locally with Skyfield's `find_events()` — the exact same technique `/satellite` already used successfully. Nothing external to depend on for the actual pass math, and one less API that can quietly disappear on us.

### A note on `/issnow`

Open Notify (`open-notify.org`) is a small hobby-maintained service and occasionally has downtime — it still serves current ISS position for this command specifically. The cog handles unavailability gracefully with a clear error message rather than crashing.

### A note on `/help`

Rather than a hand-maintained list (which drifts out of sync the moment a command changes), `/help` reads every cog's live registered commands — names, arguments, required/optional status, descriptions — straight from the command tree at call time. Only the *grouping* is manual: each cog is mapped to one of six broad categories (Sky & Conditions, Solar System, Satellites & ISS, Location Tools, Reminders, Utility) via `CATEGORY_FOR_COG` in `help.py`, rather than getting its own section — with 16 cogs, one-section-per-cog had become an unreadable wall of headers, so this groups by theme instead, similar to how a well-organized bot help command typically reads. Adding a new cog without updating `CATEGORY_FOR_COG` still shows that cog's commands, just under its own raw class name as a fallback category, so nothing silently goes missing — it just won't be grouped neatly until you add it to the mapping (and update the matching section of the README's Commands table, since that's hand-maintained to mirror `/help`'s grouping rather than generated from it).

Two optional env vars, `ANDI_DOCS_URL` and `ANDI_SUPPORT_URL`, add a "Documentation / Support" section at the bottom of `/help` if set — unset by default rather than shipping placeholder links.

## Extending it further

A couple more ideas if you want to keep going:

- **Per-user reminder DMs** — extend the per-user storage pattern from `userlocation.py` so people can opt into a DM reminder for events instead of (or alongside) the per-server channel post
- **Autocomplete for `/satellite name`** — a Discord `autocomplete` callback that suggests common satellite names as the user types
- **OSM attribution footer** — see the note above on the "(near X)" enrichment if you want to add a visible data-source credit for the reverse-geocoded place names

## Notes on hosting

For 24/7 uptime you'll want to run this somewhere other than your own machine — a small VPS (e.g. a $5/mo droplet), [Railway](https://railway.app/), [Fly.io](https://fly.io/), or a Raspberry Pi at home all work well for a bot this lightweight.
