# Andromeda2 (Andi) — Command Reference

Every command below works as a Discord slash command. `<required>` arguments must be given; `[optional]` ones can be left blank.

## ☁️ Sky & Conditions

### `/apod [date_str]`

NASA's Astronomy Picture of the Day

Shows NASA's Astronomy Picture of the Day (APOD) — a different
space image or photo every day, with an expert-written explanation.

**Usage:** `/apod` for today's picture, or `/apod date_str: 2024-07-20`
for a specific past date (format: `YYYY-MM-DD`, e.g. the Moon
landing anniversary).

Occasionally NASA's picture of the day is a video instead of an
image — Discord embeds can't play video directly, so you'll get
a clickable link and a thumbnail (if NASA provided one) instead.

**Parameters:**

- `date_str` (optional) — Optional date (YYYY-MM-DD). Defaults to today.

### `/moonphase`

Current moon phase and illumination

Shows the current moon phase (New, Waxing Crescent, Full, etc.),
percent illumination, and how many days into the ~29.5-day lunar
cycle we currently are.

**Usage:** just `/moonphase` — no arguments needed, it's the same
answer for everyone regardless of location (moon phase doesn't
depend on where you are on Earth).

Also tells you whether tonight favors deep-sky observing (darker
skies near New Moon) or is better suited to lunar/planetary viewing
(brighter skies near Full Moon wash out faint objects).

### `/sky [location] [remember]`

Current sky/viewing conditions for a location

Checks current cloud cover, visibility, humidity, and wind for a
location, with a plain-language verdict on how good tonight looks
for stargazing (🟢 Excellent to 🔴 Poor).

**Usage:** `/sky location: Flagstaff, AZ` — or just `/sky` if you've
saved a default with `/setlocation`. Add `remember: True` to also
save whatever location you type as your new default.

Cloud cover is broken down by altitude (low/mid/high clouds), since
thin high cirrus matters less for observing than a low overcast layer.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)

### `/skyquality [location] [remember]`

Light pollution map link + Bortle scale reference for a location

Gives you a link to a live light-pollution map for a location,
plus a quick-reference table of what each Bortle scale number
(1–9) actually means for what you can see with the naked eye.

**Usage:** `/skyquality location: Flagstaff, AZ` — or just
`/skyquality` with a saved default location. Add `remember: True`
to also save the typed location as your new default.

This doesn't fetch a live number directly into Discord — it links
to lightpollutionmap.app, centered on your coordinates, where you
can see real current data (Bortle class, sky quality, even a
clear-sky forecast). That's a deliberate choice: an earlier version
tried pulling a number from a government satellite data source
directly, and that data source turned out to be unreliable enough
that a verified link to a real live map is the more trustworthy option.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)


## 🪐 Solar System

### `/conjunction [location] [remember] [days_ahead]`

Which planets (or the Moon) are closest together in the sky, now or over the coming days

Finds which pairs of planets (or a planet and the Moon) currently
appear closest together in the sky — a striking naked-eye sight
when two bodies get within a few degrees of each other.

**Usage:**
• `/conjunction location: Flagstaff, AZ` — closest pairings *right now*
• `/conjunction location: Flagstaff, AZ days_ahead: 30` — instead
finds each pair's *closest approach* sometime in the next 30 days
(max 90), useful for planning ahead rather than just checking tonight

The lookahead mode samples every 3 hours, not continuously, so the
exact time it reports can be off by up to that much — good for
"this pairing peaks around March 3rd," not exact-minute precision.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)
- `days_ahead` (optional) — Scan this many days ahead for each pair's closest approach, instead of just right now (max 90)

### `/eclipse`

Countdown to the next solar and lunar eclipses

Shows a countdown to the next solar eclipse and the next lunar
eclipse, with the eclipse type (total/partial/annular/penumbral)
and which parts of the world will be able to see it.

**Usage:** just `/eclipse` — no arguments. Dates come from NASA's
published eclipse predictions, which are known years in advance
since eclipses follow fixed orbital mechanics (unlike, say, weather).

Always use certified eclipse glasses for direct solar eclipse
viewing — regular sunglasses are not safe for this.

### `/meteorshower [location] [remember]`

Info on the next upcoming meteor shower

Shows the next upcoming major meteor shower — peak date, typical
rate (meteors/hour), and what causes it (a comet or asteroid's
debris trail).

**Usage:** `/meteorshower` alone works fine and shows the shower
info with no location needed. Add a `location` (or have a saved
default) to *also* see whether the shower's radiant point will be
above your horizon around local midnight on peak night — a shower
can be "happening" globally while its radiant sits below the
horizon for your specific spot on Earth. Add `remember: True` to
save a typed location as your new default.

The "local midnight" used for the radiant check is an approximation
(based on longitude, not your actual timezone/DST), accurate enough
to tell if the radiant is well above or well below the horizon, not
exact-minute precision.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates to check radiant visibility. Leave blank to use your saved…
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)

### `/meteorshowers`

List all major annual meteor showers

Lists all 11 major annual meteor showers this bot tracks, sorted
by how soon each one peaks from today, with typical peak rate
(ZHR — zenith hourly rate, the count under ideal dark-sky conditions).

**Usage:** just `/meteorshowers` — no arguments. For details on
just the next one (including whether it's visible from your
location), use `/meteorshower` (singular) instead.

### `/planets [location] [remember]`

Which planets are visible right now from a location

Shows which of the five naked-eye planets (Mercury, Venus, Mars,
Jupiter, Saturn) are currently above the horizon from a location,
with their altitude and compass direction (azimuth).

**Usage:** `/planets location: Flagstaff, AZ` — or just `/planets`
with a saved default. Add `remember: True` to also save the typed
location as your new default.

Positions come from real orbital mechanics (JPL ephemeris data via
the Skyfield library), not an approximation. Also notes whether
it's currently dark enough there to actually see anything — a
planet can be technically "above the horizon" during daytime and
still be invisible.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)


## 🛰️ Satellites & ISS

### `/issnow`

Current location of the International Space Station

Shows exactly where the International Space Station is right now
(latitude/longitude), with a link to see it on a map.

**Usage:** just `/issnow` — no arguments. The ISS orbits Earth
roughly every 90 minutes, so this position is only accurate for
a moment — for *when it'll pass over your specific location* and
be visible, use `/isspasses` instead.

### `/isspasses [location] [remember]`

Upcoming visible ISS passes for a location

Lists the next visible passes of the International Space Station
over a location — when it rises, sets, and how long it stays
visible (typically 2-8 minutes).

**Usage:** `/isspasses location: Flagstaff, AZ` — or just
`/isspasses` with a saved default. Add `remember: True` to also
save the typed location as your new default.

Passes are only worth watching around dawn or dusk, when the ISS
(400 km up) is still sunlit while your own sky has gone dark — in
the middle of the night, the ISS is in Earth's shadow and invisible
even when it's technically overhead. Positions are computed
locally using real orbital data (Celestrak), not a third-party
pass-prediction service.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)

### `/satellite [location] [name] [norad_id] [remember]`

Track any named satellite: position + upcoming passes

Tracks any satellite — not just the ISS — showing its current
position and upcoming visible passes over a location.

**Usage:** provide either `name` (its exact Celestrak catalog name,
e.g. `HUBBLE SPACE TELESCOPE`) or `norad_id` (its numeric catalog
ID, e.g. `25544` for the ISS) — not both. Add `location` (or use a
saved default) for pass predictions; `remember: True` saves a typed
location as your new default.

**Examples:**
• `/satellite name: HUBBLE SPACE TELESCOPE location: Flagstaff, AZ`
• `/satellite norad_id: 25544` (ISS, using your saved location)

Orbital data comes from Celestrak; if you know a satellite's exact
NORAD ID and its Celestrak data looks stale, this can also
cross-check N2YO for a fresher reading (only if the bot operator
configured an N2YO API key — otherwise Celestrak alone is used).

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates for pass predictions. Leave blank for saved default.
- `name` (optional) — Satellite name as catalogued on Celestrak, e.g. 'HUBBLE SPACE TELESCOPE' (omit if using norad_id)
- `norad_id` (optional) — Optional: exact NORAD catalog number, e.g. 25544 for the ISS. Skips name search.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)


## 📍 Location Tools

### `/clearlocation`

Forget your saved default location

Deletes your saved default location. After this, commands that
take a `location` will ask for one again instead of assuming a
default, until you `/setlocation` again.

**Usage:** just `/clearlocation` — no arguments.

### `/decimaldms <value>`

Convert decimal degrees to degrees/minutes/seconds

Converts decimal degrees back into degrees/minutes/seconds — the
reverse of `/dms`.

**Usage:** `/decimaldms value: 36.1628` → `36° 9' 46.08"`. A
negative value corresponds to South (for a latitude) or West (for
a longitude).

**Parameters:**

- `value` (required) — Decimal degrees, e.g. 36.1628 or -85.5016

### `/dms <degrees> <minutes> [seconds] [direction]`

Convert degrees/minutes/seconds coordinates to decimal degrees

Converts a degrees/minutes/seconds coordinate (like you'd read off
a GPS device) into decimal degrees, which is what every location
field in this bot actually expects under the hood.

**Usage:** `/dms degrees: 36 minutes: 9 seconds: 46 direction: North`
for one axis (e.g. latitude); run it again for the other axis
(longitude), then combine both decimal results like
`36.1628, -85.5016` to paste into `/setlocation` or any other
`location` field.

You don't actually need this command anymore to *use* DMS
coordinates — every location field now accepts DMS directly (e.g.
`location: 36°9'N,85°30'W`). This is still handy for a quick
one-off conversion or to double-check the math by hand.

If you skip `direction`, give `degrees` as negative for South/West
(e.g. `degrees: -85` instead of `degrees: 85 direction: West`).

**Parameters:**

- `degrees` (required) — Degrees (whole number, unsigned if you're also giving a direction)
- `minutes` (required) — Minutes (0-59)
- `seconds` (optional) — Seconds (0-59.999). Optional, defaults to 0.
- `direction` (optional) — N/S/E/W. Optional if you instead give degrees as negative for S/W.

### `/mylocation`

Show your currently saved default location

Shows whatever location you currently have saved as your default
(set via `/setlocation`, or automatically the first time you use
`remember: True` on another command).

**Usage:** just `/mylocation` — no arguments.

### `/setlocation <location>`

Save your default location for other commands

Saves a default location so you don't have to type it into every
command that needs one — `/sky`, `/planets`, `/skyquality`,
`/isspasses`, `/satellite`, `/conjunction`, and `/meteorshower`
will all use it automatically when you leave their `location`
argument blank.

**Usage:** `/setlocation location: Flagstaff, AZ` — a city name,
decimal coordinates (`36.1628, -85.5016`), or degrees/minutes/
seconds (`36°9'N,85°30'W`) all work; see `/dms` if you only have
raw DMS numbers and want to double-check the conversion first.

Saved per-**person**, not per-server — your location follows you
into any other server this bot is in. Use `/mylocation` to check
what's currently saved, or `/clearlocation` to remove it.

**Parameters:**

- `location` (required) — City name, decimal, or DMS coordinates (e.g. '36.1628,-85.5016' or '36°9'N,85°30'W')


## 🔔 Reminders (Admin)

### `/disablereminders`

Turn off automatic meteor shower + eclipse reminders for this server

**(Admin — requires Manage Server)** Turns off automatic meteor
shower and eclipse reminders for this server entirely.

**Usage:** just `/disablereminders` — no arguments. Use
`/setreminderchannel` again later to turn them back on.

### `/reminderstatus`

Show this server's current meteor shower + eclipse reminder configuration

**(Admin — requires Manage Server)** Shows this server's current
reminder setup: which channel is configured, the lead-time
setting, when the background reminder check last actually ran,
and the status of the next meteor shower / solar eclipse / lunar
eclipse (already sent, counting down, or posting today).

**Usage:** just `/reminderstatus` — no arguments. Useful for
confirming reminders are actually working, especially the
"background check last ran" line — if that looks stale (over
~30 hours old), something's wrong with the bot's background task.

### `/setreminderchannel [lead_days]`

Set this channel for meteor shower + eclipse reminders (heads-up + day-of)

**(Admin — requires Manage Server)** Turns on automatic reminders
in the channel you run this from, for every meteor shower peak and
every solar/lunar eclipse.

**Usage:** `/setreminderchannel` (uses the default 3-day heads-up),
or `/setreminderchannel lead_days: 7` for a week's notice instead.
Two reminders post per event: a heads-up `lead_days` before, and a
same-day nudge — unless you set `lead_days: 0`, in which case only
the same-day reminder fires.

Run this again in a different channel to move reminders there.
Use `/reminderstatus` to check current settings, or
`/disablereminders` to turn them off entirely.

**Parameters:**

- `lead_days` (optional) — Days before the event for the heads-up reminder (default 3). A day-of reminder always fires too.


## 🐛 Feedback

### `/bugreport <title> <description>`

Report a bug for admin review before it's filed on GitHub

Submits a bug report for admin review. It's posted as an embed
in this server's review channel (set up via `/setreviewchannel`)
with Approve/Reject buttons — nothing reaches GitHub until an
admin approves it.

**Usage:** `/bugreport title: [short summary] description: [what
happened, what you expected, and steps to reproduce]`. The more
detail in `description`, the faster it can get fixed — include
the exact command you ran and any error message you saw.

Limited to 3 submissions per 10 minutes per person.

**Parameters:**

- `title` (required) — Short summary of the bug (e.g. '/sky fails for Tokyo')
- `description` (required) — What happened, what you expected, and steps to reproduce if you can

### `/featurerequest <title> <description>`

Suggest a feature for admin review before it's filed on GitHub

Submits a feature request for admin review. It's posted as an
embed in this server's review channel (set up via
`/setreviewchannel`) with Approve/Reject buttons — nothing
reaches GitHub until an admin approves it.

**Usage:** `/featurerequest title: [short summary] description:
[what you'd like to see and why it'd help]`.

Limited to 3 submissions per 10 minutes per person.

**Parameters:**

- `title` (required) — Short summary of the idea (e.g. 'Add autocomplete to /satellite name')
- `description` (required) — What you'd like to see and why it'd be useful

### `/setreviewchannel`

Set this channel to receive bug reports/feature requests for review

**(Admin — requires Manage Server)** Sets the current channel as
this server's review queue: submissions from `/bugreport` and
`/featurerequest` will post here with Approve/Reject buttons.

**Usage:** run this in whichever channel you want reports to
land in — typically a private, staff-only channel, since it'll
contain unreviewed, unfiltered user submissions. Run it again in
a different channel to move the review queue there instead.


## 🛠️ Utility

### `/help [command]`

List every command, or get detailed help for one specific command

Lists every command this bot supports, grouped by category — or,
given a specific command name, shows that command's full detailed
help text instead of just the one-line summary.

**Usage:** `/help` for the full grouped list, or
`/help command: apod` (autocomplete will suggest names as you
type) to see everything about one specific command: its exact
usage, required vs. optional arguments, and any caveats worth
knowing that don't fit in a one-line description.

**Parameters:**

- `command` (optional) — Get detailed help for this one command (optional — omit to see the full list)

### `/status`

Show the bot's uptime, stats, and host resource usage

Shows a health/diagnostic snapshot of the bot itself: how long
it's been running, how many servers/channels/users it's in,
which software versions it's using, and host CPU/RAM usage.

**Usage:** just `/status` — no arguments. Useful for confirming
the bot is actually healthy (not just online) — for example,
checking it hasn't silently reconnected recently, or that memory
usage looks normal.

CPU load and RAM usage are only available when the bot is running
on Linux (which covers virtually every hosting platform, including
Railway) — they show "N/A" if run locally on Windows instead.

