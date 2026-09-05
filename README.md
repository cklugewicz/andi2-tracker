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

### Locations: city names, coordinates, or a saved default

Every command with a `location` argument (`/sky`, `/skyquality`, `/isspasses`, `/planets`, `/satellite`, `/conjunction`, and optionally `/meteorshower`) accepts:

- **A city name** — `Flagstaff, AZ`
- **Raw decimal coordinates** — `36.1628, -85.5016`
- **Degrees/minutes/seconds** — `36°9'46"N, 85°30'6"W` (or letter-based: `36d9m46sN, 85d30m6sW`) — direction letters work in either order, so you don't have to remember whether latitude or longitude comes first
- **Nothing at all** — falls back to your saved default (set via `/setlocation`, or see below)

Coordinate input (decimal or DMS) is useful if you don't live near a place the geocoder recognizes — rural properties, campsites, a specific field, etc. When you use coordinates, the bot also makes a best-effort attempt to show a nearby place name for readability — `36.1628, -85.5016 (near Cookeville, TN)` instead of bare numbers — via a free reverse-geocoding lookup. If nothing's nearby (the middle of the ocean, deep wilderness), it just shows the bare coordinates, which is expected, not a bug.

**Typing a location is a one-off lookup by default and does *not* change your saved default.** Add `remember: True` on any of those commands to also save that location as your new default in the same step — the response footer confirms when this happened. This is deliberate: a quick "what about Tokyo?" query shouldn't silently overwrite your actual home default.

`/meteorshower` is the one exception to the usual "location required or saved default required" rule — the shower info itself is useful with no location at all, so leaving it out just skips the radiant-visibility part rather than erroring.
