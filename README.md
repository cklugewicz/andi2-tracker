# Andromeda2 — Astronomy Discord Bot

A Discord bot with slash commands for astronomy enthusiasts — 38 commands covering sky conditions, planets, deep-sky objects, satellites, rocket launches, meteor showers, eclipses, astrophotography exposure planning, and a couple of handy utilities.

**Requires Python 3.10 or newer.** This codebase uses `X | None` union type syntax throughout, which only works at runtime on 3.10+ — on an older Python, cogs fail to import with `TypeError: unsupported operand type(s) for |: 'type' and 'NoneType'`. Both `bot.py` and `generate_docs.py` check this on startup and exit with a clear message rather than that cryptic error, but it's worth having the right Python installed from the start. Check with `python3 --version` before creating your virtual environment.

## Commands

Commands are grouped the same way `/help` groups them in Discord — a handful of broad categories rather than one heading per command, which stopped being readable once the bot passed about a dozen commands. (The single source of truth for this grouping is `CATEGORY_FOR_COG` in `cogs/help.py`; if you add a cog, update that mapping so `/help` and this table don't drift apart from each other.)

**☁️ Sky & Conditions**

| Command | Description |
|---|---|
| `/apod [date_str] [random_date]` | NASA's Astronomy Picture of the Day — today by default, a specific past date, or a random pick from the full archive — Components V2, image via MediaGallery |
| `/sky [location] [remember]` | Current cloud cover, visibility, and a plain-language viewing verdict, plus a 12-hour cloud cover forecast chart |
| `/skyquality [location] [remember]` | Light pollution map link + a Bortle scale comparison illustration for a location |
| `/moonphase` | Current moon phase and % illumination — Components V2 |

**🪐 Solar System**

| Command | Description |
|---|---|
| `/planets [location] [remember]` | Which planets are currently above the horizon, with altitude/azimuth |
| `/conjunction [location] [remember] [days_ahead]` | Which planets (or the Moon) are closest together right now, or each pair's closest approach over the next N days |
| `/meteorshower [location] [remember]` | The next upcoming major meteor shower, with peak date, rate, and (if a location's given) whether the radiant is above your horizon at peak |
| `/meteorshowers` | Full list of annual meteor showers, sorted by how soon each peaks |
| `/comet <name> [location] [remember]` | Live position and (with a location) visibility for a specific comet, computed from the Minor Planet Center's current orbital elements |
| `/comets` | Notable periodic comets and their next perihelion dates, sorted by soonest |
| `/eclipse` | Countdown to the next solar and lunar eclipses, with visibility regions |

**🔭 Deep Sky Objects**

| Command | Description |
|---|---|
| `/object <name> [location] [remember] [visibility]` | Look up a deep-sky object — Messier catalog (rich, hand-curated) or the broader NGC/IC catalogs (requires one-time setup, see notes below) — by number or common name, with type, size, brightness, distance, whether it's currently above your horizon, and optionally tonight's visibility chart in the same response |
| `/visibility <name> [location] [remember] [date_str]` | Altitude-over-time chart for a deep-sky object across one night (or another date), with dark-sky periods shaded and a "good imaging altitude" threshold marked |

**📸 Astrophotography**

| Command | Description |
|---|---|
| `/maxexposure [focal_length] [aperture] [scope] [camera] [pixel_pitch] [object_name] [declination]` | Max exposure before star trailing on an untracked/tripod shot, via the real Full NPF Rule formula — can pull optics from a saved scope, a camera's pixel pitch from a saved profile, and auto-fill declination from a named deep-sky object |
| `/subexposure <bortle> [guiding]` | Recommended sub-exposure range for tracked astrophotography, from common practice — a rough starting point, not a calculation |
| `/subexposureprecise <sky_background_rate> [camera] [read_noise] [noise_tolerance]` | Precise sub-exposure calculation using Robin Glover's (SharpCap) confirmed formula |
| `/savecamera <name> [sensor_preset] [pixel_pitch] [read_noise]` | Save a named camera profile (pixel pitch, and optionally read noise for `/subexposure`'s precise mode) for reuse — supports more than one camera per person |
| `/editcamera` | Guided update: pick a saved camera from a dropdown, then edit its name, pixel pitch, and read noise in a pre-filled form |
| `/mycameras` | List your saved camera profiles |
| `/deletecamera <name>` | Delete one of your saved camera profiles |
| `/savescope <name> [focal_length] [aperture] [aperture_diameter_mm]` | Save a named telescope profile (focal length + aperture) for reuse in `/maxexposure` — supports more than one scope per person |
| `/editscope` | Guided update: pick a saved scope from a dropdown, then edit its name, focal length, and aperture in a pre-filled form |
| `/myscopes` | List your saved telescope profiles |
| `/deletescope <name>` | Delete one of your saved telescope profiles |

**🛰️ Satellites & ISS**

| Command | Description |
|---|---|
| `/issnow` | Current latitude/longitude of the ISS |
| `/isspasses [location] [remember]` | Next 5 visible ISS passes, with times and duration |
| `/satellite [name] [location] [norad_id] [remember]` | Track any named satellite (not just ISS) — position + upcoming passes, with N2YO freshness fallback |

**🚀 Launches**

| Command | Description |
|---|---|
| `/nextlaunch` | The next upcoming rocket launch — mission, provider, rocket, launch site, countdown |
| `/launches [count]` | List several upcoming rocket launches (default 5, max 10) |

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

**🐛 Feedback**

| Command | Description |
|---|---|
| `/bugreport` | Opens a popup form (short summary + paragraph-style details field) to submit a bug report for admin review — nothing reaches GitHub until approved |
| `/featurerequest` | Opens the same popup-form flow to suggest a feature — review first, then GitHub if approved |
| `/setreviewchannel` | (Bot owner only) Sets the current channel as the ONE shared review queue for every server's bug reports/feature requests |

**🛠️ Utility**

| Command | Description |
|---|---|
| `/status` | Bot uptime, guild/user counts, dependency versions, and host CPU/RAM usage |
| `/permissions` | Checks whether the bot has the permissions it needs in the current channel, with a green check/red X per permission |
| `/help [command]` | List every command grouped by category, or get detailed usage/examples for one specific command (autocomplete included) |

### Locations: city names, coordinates, or a saved default

Every command with a `location` argument (`/sky`, `/skyquality`, `/isspasses`, `/planets`, `/satellite`, `/conjunction`, and optionally `/meteorshower`) accepts:

- **A city name** — `Flagstaff, AZ`
- **Raw decimal coordinates** — `36.1628, -85.5016`
- **Degrees/minutes/seconds** — `36°9'46"N, 85°30'6"W` (or letter-based: `36d9m46sN, 85d30m6sW`) — direction letters work in either order, so you don't have to remember whether latitude or longitude comes first
- **Nothing at all** — falls back to your saved default (set via `/setlocation`, or see below)

Coordinate input (decimal or DMS) is useful if you don't live near a place the geocoder recognizes — rural properties, campsites, a specific field, etc. When you use coordinates, the bot also makes a best-effort attempt to show a nearby place name for readability — `36.1628, -85.5016 (near Cookeville, TN)` instead of bare numbers — via a free reverse-geocoding lookup. If nothing's nearby (the middle of the ocean, deep wilderness), it just shows the bare coordinates, which is expected, not a bug.

**Typing a location is a one-off lookup by default and does *not* change your saved default.** Add `remember: True` on any of those commands to also save that location as your new default in the same step — the response footer confirms when this happened. This is deliberate: a quick "what about Tokyo?" query shouldn't silently overwrite your actual home default.

`/meteorshower` is the one exception to the usual "location required or saved default required" rule — the shower info itself is useful with no location at all, so leaving it out just skips the radiant-visibility part rather than erroring.

### A note on the "(near X)" location enrichment — now a privacy measure, not just polish

When someone enters raw coordinates (decimal or DMS) instead of a city name, `geocoding.py` reverse-geocodes a nearby place name using OpenStreetMap's free Nominatim endpoint — but the display behavior is now built around **privacy, not just cosmetics**. Most of this bot's commands aren't ephemeral, so whatever's shown in an embed is visible to everyone in the channel — and a 4-decimal-place coordinate is precise to roughly **11 meters**, easily specific enough to identify someone's actual house if they saved their home coordinates as their location. So:

- **When a nearby place is found, the display shows *only* that** — `near Cookeville, TN` — never the raw numbers alongside it. The exact position genuinely never gets typed into the response.
- **When no nearby place is found** (open ocean, deep wilderness), the fallback is coordinates rounded to **1 decimal place** (~11km resolution — city/neighborhood-level, not house-level) with an "(approximate)" label, rather than the precise value.
- **This only affects displayed text.** The actual `(lat, lon)` values returned by `resolve_coordinates()` — and used for every real calculation (weather, ephemeris, satellite passes, everything) — are always full precision, completely unaffected. Nothing about the bot's actual accuracy changes; only what gets echoed back in a message.
