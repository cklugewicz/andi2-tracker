# Andromeda2 (Andi) — Command Reference

Every command below works as a Discord slash command. `<required>` arguments must be given; `[optional]` ones can be left blank.

## ☁️ Sky & Conditions

### `/apod [date_str] [random_date]`

NASA's Astronomy Picture of the Day

Shows NASA's Astronomy Picture of the Day (APOD) — a different
space image or photo every day, with an expert-written explanation.

**Usage:** `/apod` for today's picture, `/apod date_str: 2024-07-20`
for a specific past date (format: `YYYY-MM-DD`, e.g. the Moon
landing anniversary), or `/apod random_date: True` to get a
surprise pick from anywhere in APOD's full archive back to its
very first entry on June 16, 1995. If you give both a specific
`date_str` and `random_date: True`, the specific date wins —
`random_date` only kicks in when you haven't asked for a
particular day.

Occasionally NASA's picture of the day is a video instead of an
image — this can't be played directly in Discord, so you'll get
a clickable link and a thumbnail (if NASA provided one) instead.

**Parameters:**

- `date_str` (optional) — Optional date (YYYY-MM-DD). Defaults to today. Takes precedence over random if both are given.
- `random_date` (optional) — Pick a random date from APOD's full archive (since June 16, 1995) instead of today

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

Current sky/viewing conditions + cloud forecast for a location

Checks current cloud cover, visibility, humidity, and wind for a
location, with a plain-language verdict on how good tonight looks
for stargazing (🟢 Excellent to 🔴 Poor) — plus a chart of how
cloud cover is forecast to change over the next 12 hours, so you
can see whether it's expected to clear up or get worse.

**Usage:** `/sky location: Flagstaff, AZ` — or just `/sky` if you've
saved a default with `/setlocation`. Add `remember: True` to also
save whatever location you type as your new default.

Cloud cover is broken down by altitude (low/mid/high clouds) in
the text, since thin high cirrus matters less for observing than
a low overcast layer — but the chart itself shows only total
cloud cover, the single most actionable number, kept to one line
so it's readable at a glance.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)

### `/skyquality [location] [remember]`

Light pollution map link + Bortle scale illustration for a location

Gives you a link to a live light-pollution map for a location,
plus a visual comparison of what each Bortle scale class (1–9)
actually looks like — how much of the night sky's detail
disappears as light pollution increases, from an excellent
dark-sky site through to an inner-city sky.

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

The comparison image is ESO's own "How light pollution affects
the dark night skies" illustration (credit: ESO/P. Horálek,
M. Wallner), licensed CC BY 4.0 — credited directly in this
response's own footer, with a link back to the source.

**Parameters:**

- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)


## 🪐 Solar System

### `/comet <name> [location] [remember]`

Live position and visibility for a specific comet

Shows a comet's current distance from Earth and the Sun, and
(with a location) whether it's currently above your horizon —
computed live from the Minor Planet Center's own orbital
elements, the same technique this bot already uses for
/planets, so this works for any comet MPC currently tracks
(800+), not just famous ones.

**Usage:** `/comet name: Halley` — `name` autocompletes as you
type, matching against MPC's own designations (which include
common names in parentheses, so "neowise" or "halley" both
work without needing the exact formal designation). Add a
`location` (or have a saved default) to also see whether it's
above your horizon right now. Add `remember: True` to save a
typed location as your new default.

This deliberately does NOT predict brightness — comet
brightness is notoriously unreliable to forecast, unlike
planets. Check the linked TheSkyLive page in the response for
real observed brightness instead of a theoretical guess.

**Parameters:**

- `name` (required) — Comet name or designation, e.g. 'Halley', '1P', or 'NEOWISE'
- `location` (optional) — Optional: city, decimal, or DMS coordinates to check visibility (or use saved default).
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)

### `/comets`

Notable periodic comets and their next perihelion dates

Lists well-known PERIODIC comets — ones with predictable,
verified return dates — sorted by how soon each next reaches
perihelion (closest approach to the Sun).

**Usage:** just `/comets` — no arguments. This is deliberately
NOT a list of what's currently bright in the sky — the most
exciting comets are usually new discoveries with no predictable
schedule, which a static list like this can never anticipate.
For that, check the linked TheSkyLive page in the response. For
live position/visibility on any comet the Minor Planet Center
currently tracks (not just these six), use `/comet <name>`.

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

- `location` (optional) — Optional: city, decimal, or DMS coordinates to check radiant visibility (or use saved default).
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


## 🔭 Deep Sky Objects

### `/object <name> [location] [remember] [visibility]`

Look up a deep-sky object (Messier, NGC, or IC catalog)

Looks up a deep-sky object — a galaxy, nebula, or star cluster
— from the Messier catalog (110 objects, Charles Messier's
18th-century "greatest hits" list, still the standard
amateur-astronomy starting point) or the much larger NGC/IC
catalogs (New General Catalogue / Index Catalogue, tens of
thousands of objects).

**Usage:** `/object name: M31`, `/object name: NGC 6960`,
`/object name: Andromeda Galaxy`, and `/object name: Veil
Nebula` all work. Messier objects are checked first (and
include a hand-picked "notable" fact); NGC/IC results show the
core data (type, size, brightness, coordinates) without that
extra commentary, since that's not practical to write for tens
of thousands of objects.

Add a `location` (or have a saved default) to also see whether
it's currently above your horizon; `remember: True` saves a
typed location as your new default. Shows a thumbnail image
from Wikipedia when one's available for that specific object.

Add `visibility: True` (needs a location) to also get tonight's
full altitude-over-time chart, sent as a separate follow-up
message — or just click the "Show Visibility Chart" button
that appears on this response whenever a location was
available, without needing to retype anything. For repeat
checks on the same object without re-reading its full info
every time, `/visibility` is its own standalone command.

**Note:** the NGC/IC catalog requires a one-time setup step by
the bot's operator (`fetch_ngc_catalog.py`) — without it, only
the Messier catalog is searchable.

**Parameters:**

- `name` (required) — Catalog number (M31, NGC 6960, IC 434) or common name (Andromeda Galaxy, Veil Nebula)
- `location` (optional) — Optional: see if it's currently above your horizon. City name, decimal, or DMS coordinates.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)
- `visibility` (optional) — Also show tonight's visibility chart in the same response (requires a location)

### `/visibility <name> [location] [remember] [date_str]`

Altitude-over-time chart for a deep-sky object tonight (or another date)

Shows a full altitude-over-time chart for a deep-sky object —
when it rises, peaks, and sets across one night, with dark-sky
(astronomical twilight/night) periods shaded and a dashed line
at 30° marking a common "good imaging altitude" threshold.

**Usage:** `/visibility name: M31 location: Flagstaff, AZ` for
tonight, or add `date_str: 2026-09-15` to check a different
night instead (useful for planning ahead). Unlike `/object`,
a location is required here — there's no saved-default fallback
skip, since a chart genuinely can't be produced without one.

This is a separate command from `/object` specifically so
checking an object's visibility repeatedly doesn't require
re-reading its full catalog info every single time — though
`/object`'s own `visibility: True` parameter (or the button on
its embed) gives you both in one step when you want that instead.

The chart samples every 15 minutes across the night — not a
true continuous curve — and its "local time" x-axis is a
longitude-based approximation, not your exact timezone/DST.
Neither affects which hours are dark or the overall shape of
the curve, just exact-minute precision.

**Parameters:**

- `name` (required) — Catalog number (M31, NGC 6960) or common name (Andromeda Galaxy, Veil Nebula)
- `location` (optional) — City name, decimal, or DMS coordinates. Leave blank to use your saved default.
- `remember` (optional) — Also save this as your new default location (otherwise this is a one-off lookup)
- `date_str` (optional) — Optional date to check instead of tonight, format YYYY-MM-DD (e.g. 2026-09-15)


## 📸 Astrophotography

### `/deletecamera <name>`

Delete one of your saved camera profiles

Deletes one of your saved camera profiles.

**Usage:** `/deletecamera name: [pick from autocomplete]`.

**Parameters:**

- `name` (required) — Which saved camera profile to delete

### `/deletescope <name>`

Delete one of your saved telescope profiles

Deletes one of your saved telescope profiles.

**Usage:** `/deletescope name: [pick from autocomplete]`.

**Parameters:**

- `name` (required) — Which saved telescope profile to delete

### `/editcamera`

Edit a saved camera profile with a guided dropdown and pre-filled form

Shows a dropdown of your saved camera profiles — pick one to
open a form pre-filled with its current name, pixel pitch, and
read noise, so you can see exactly what's already saved and
only change what you actually want to, without needing to
check `/mycameras` first or retype values from memory.

**Usage:** just `/editcamera` — no arguments. The form lets you
rename the profile too, not just its numbers — renaming to a
name you already have another camera saved under is rejected
with a clear message rather than silently overwriting it.
Clearing the read noise field (if one was previously saved)
removes it; leaving pixel pitch or the name as shown keeps
them unchanged.

If you don't have any saved cameras yet, use `/savecamera` to
add one first — this only edits existing profiles.

### `/editscope`

Edit a saved telescope profile with a guided dropdown and pre-filled form

Shows a dropdown of your saved telescope profiles — pick one to
open a form pre-filled with its current name, focal length, and
aperture, so you can see exactly what's already saved and only
change what you actually want to, without needing to check
`/myscopes` first or retype values from memory.

**Usage:** just `/editscope` — no arguments. The form lets you
rename the profile too, not just its numbers — renaming to a
name you already have another scope saved under is rejected
with a clear message rather than silently overwriting it.

If you don't have any saved scopes yet, use `/savescope` to add
one first — this only edits existing profiles.

### `/maxexposure [focal_length] [aperture] [scope] [camera] [pixel_pitch] [object_name] [declination]`

Max exposure before star trailing on an untracked/tripod shot (NPF Rule)

Calculates the maximum exposure time before star trailing
becomes visible on an UNTRACKED shot (a fixed tripod, no
mount tracking Earth's rotation) — using the Full NPF Rule, a
real physics-based formula, not a rough rule of thumb like the
"500 Rule." Accounts for your optics (focal length, aperture),
camera sensor (pixel pitch), and the declination of whatever
you're shooting — stars near the celestial poles trail much
slower than stars near the celestial equator, so the same gear
can tolerate meaningfully longer exposures depending on where
you're pointed.

**Usage:** `/maxexposure scope: [a saved profile] camera: [a
saved profile]` once you've set both up with `/savescope` and
`/savecamera` — or provide `focal_length`/`aperture` and/or
`pixel_pitch` directly instead of either. A directly-given
`focal_length` or `aperture` always overrides a saved scope's
value for that one field, which is handy for a quick one-off
change (a focal reducer added tonight, say) without re-saving
the whole profile. Add `object_name: M31` to auto-fill
declination from this bot's own catalog, or `declination: 45`
to set it manually. Leaving both out defaults to 0° (the
celestial equator), the worst-case assumption — safe, but
possibly more conservative than necessary if you're actually
shooting somewhere else in the sky.

This is a real formula (Frédéric Michaud's Full NPF Rule), not
a guess — but it's still a guideline: your own tolerance for
trailing, focus precision, and atmospheric seeing all affect
how a given exposure actually looks.

**Parameters:**

- `focal_length` (optional) — Lens/scope focal length in mm, if not using a saved scope (overrides scope's value if both given)
- `aperture` (optional) — f-number, e.g. 2.8, if not using a saved scope (overrides scope's value if both given)
- `scope` (optional) — One of your saved telescope profiles (see /savescope) -- supplies focal_length and aperture
- `camera` (optional) — One of your saved camera profiles (see /savecamera)
- `pixel_pitch` (optional) — Exact pixel pitch in microns, if not using a saved camera
- `object_name` (optional) — A deep-sky object (M31, NGC 6960, etc.) to auto-fill declination
- `declination` (optional) — Manual declination in degrees, if not using object_name (defaults to 0°, the worst case)

### `/mycameras`

List your saved camera profiles

Lists every camera profile you've saved with `/savecamera`.

**Usage:** just `/mycameras` — no arguments.

### `/myscopes`

List your saved telescope profiles

Lists every telescope profile you've saved with `/savescope`.

**Usage:** just `/myscopes` — no arguments.

### `/savecamera <name> [sensor_preset] [pixel_pitch] [read_noise]`

Save a named camera profile for use with /maxexposure and /subexposure

Saves a named camera profile (pixel pitch and, optionally, read
noise) for reuse with `/maxexposure` and `/subexposure`, so you
don't have to look up or retype it every time — especially
handy if you own more than one camera body.

**Usage:** `/savecamera name: "Canon R6" sensor_preset: [pick
one]` for a quick approximate pixel pitch, or `/savecamera
name: "Canon R6" pixel_pitch: 5.94` if you know the exact value
(this always takes precedence over a preset if both are
given). Add `read_noise: 1.5` (in electrons, from your
camera's spec sheet or SharpCap's sensor analysis) to also
enable `/subexposure`'s precise calculation mode for this
camera. `name` autocompletes your existing saved cameras as you
type — picking one **updates that profile in place** rather
than creating a duplicate, no need to delete and re-add it —
and only touches the fields you actually provide: leaving out
`read_noise` (or `pixel_pitch`/`sensor_preset`) on a later save
keeps whatever was already saved for that field, so you can
add or change read noise on an existing camera without needing
to re-state its pixel pitch too, and vice versa.

Also see `/editcamera` for a guided, dropdown-and-form way to
update an existing profile, showing its current values instead
of requiring you to know or retype them.

Focal length and aperture stay as fresh inputs on
`/maxexposure` each time, since those change with whatever
lens you're using far more often than the camera body itself
does.

**Parameters:**

- `name` (required) — A label for this camera, e.g. 'Canon R6' or 'Wide-field rig'
- `sensor_preset` (optional) — Pick a common sensor type (approximate pixel pitch shown in the label)
- `pixel_pitch` (optional) — Exact pixel pitch in microns, if you know it (overrides the preset)
- `read_noise` (optional) — Camera's read noise in electrons at your usual gain, for /subexposure's precise mode

### `/savescope <name> [focal_length] [aperture] [aperture_diameter_mm]`

Save a named telescope profile for use with /maxexposure

Saves a named telescope profile (focal length + aperture) for
reuse with `/maxexposure`, so you don't have to retype your
optics every time — especially handy with more than one scope.

**Usage:** `/savescope name: "RedCat 51" focal_length: 250
aperture: 4.9` if you know the f-number directly, or
`/savescope name: "RedCat 51" focal_length: 250
aperture_diameter_mm: 51` if you only know the raw aperture
diameter (f-number gets derived as focal_length ÷ diameter).
`name` autocompletes your existing saved scopes as you type —
picking one **updates that profile in place** rather than
creating a duplicate, no need to delete and re-add it — and
only touches the fields you actually provide: leaving out
`focal_length` (or both `aperture`/`aperture_diameter_mm`) on a
later save keeps whatever was already saved for that field, so
you can update just the aperture (a new reducer, say) without
re-stating the focal length too, and vice versa.

Also see `/editscope` for a guided, dropdown-and-form way to
update an existing profile, showing its current values instead
of requiring you to know or retype them.

For a smart telescope (Seestar, Dwarf, Vespera, etc.), save a
scope profile for its fixed optics here, and also save a
camera profile (`/savecamera`) for its built-in sensor's pixel
pitch — two separate profiles describing one device, since
those are independent specs everywhere else in this bot.

**Parameters:**

- `name` (required) — A label for this scope, e.g. 'RedCat 51' or 'Seestar S50'
- `focal_length` (optional) — Focal length in mm
- `aperture` (optional) — f-number (e.g. 4.9) -- takes precedence over aperture_diameter_mm if both are given
- `aperture_diameter_mm` (optional) — Physical aperture diameter in mm, if you don't know the f-number directly

### `/subexposure <bortle> [guiding]`

Recommended sub-exposure range for tracked astrophotography

Suggests a practical sub-exposure length RANGE for TRACKED
astrophotography (a properly polar-aligned mount actively
tracking, e.g. a GEM) — a range from common astrophotography
practice, not a precise calculation, for when you don't have
camera-specific numbers handy. For an actual formula-based
calculation instead, see `/subexposureprecise`.

**Usage:** `/subexposure bortle: 4` (check your Bortle class
with `/skyquality` first if you don't already know it) —
optionally add `guiding` to narrow the range: unguided setups
are capped by periodic error regardless of how dark your sky
is, while excellent guiding with tight polar alignment lets
you push toward the sky-limited ceiling instead.

Treat the result as a sensible starting point to refine from,
not a target to hit exactly — your specific camera's read
noise and gain setting shift the real optimum in ways this
can't account for without that data.

**Parameters:**

- `bortle` (required) — Your sky's Bortle class, 1 (darkest) to 9 (inner-city) -- check with /skyquality if unsure
- `guiding` (optional) — Your tracking/guiding setup (defaults to Guided if not specified)

### `/subexposureprecise <sky_background_rate> [camera] [read_noise] [noise_tolerance]`

Precise sub-exposure calculation using Robin Glover's SharpCap formula

Calculates a precise sub-exposure length for TRACKED
astrophotography using Robin Glover's (SharpCap) real formula,
confirmed directly from Glover's own posts on SharpCap's
official forum: sub-exposure = C × read noise² ÷ sky
background rate. For a rough starting-point range instead,
needing no camera-specific numbers, see `/subexposure`.

**Usage:** `/subexposureprecise camera: [saved profile]
sky_background_rate: 0.6` — or `read_noise: 1.5` instead of
`camera` if you haven't saved one. Get `sky_background_rate`
(the Sky Background Electron Rate, in e⁻/pixel/s — a different
thing from "sky brightness" in the Bortle/SQM sense, since this
one also depends on your optics and camera, not just the sky)
from [SharpCap's free Sky Background Calculator]
(https://tools.sharpcap.co.uk) — deliberately not derived from
Bortle class alone here, since that would need combining
Bortle/SQM with your focal ratio, pixel size, and quantum
efficiency together, a relationship SharpCap's own tool
computes but doesn't publish as an open formula. Add
`noise_tolerance` if you want tighter (2%, more subs needed)
or looser (10%, fewer/longer subs) than the 5% default.

**Narrowband filters** (e.g. a 3nm Ha filter) don't need a
different formula or a separate multiplier — get a fresh
`sky_background_rate` from SharpCap's calculator FOR that
filter (entering its bandwidth in nm) rather than reusing a
broadband value, and this same formula naturally produces the
much longer sub-exposure narrowband needs, since a narrowband
filter's effect is entirely captured by how much it lowers the
measured sky background rate. Glover himself walked through
exactly this case on the SharpCap forum: a 3nm filter measured
around 0.14 e⁻/pixel/s versus a typical broadband value an
order of magnitude higher, which is why the required
sub-exposure jumps so much. Select Monochrome in SharpCap's
calculator for a narrowband filter even on a mono camera in a
filter wheel — his own reasoning is that essentially all the
light passing a narrowband filter falls in one channel anyway.
(A "×25 for narrowband" rule of thumb circulates online, but it
traces to one forum poster's own guess, self-flagged as "maybe
incorrect" — not confirmed by Glover the way the core formula
was, so it's not used here.)

Treat the result as a genuine minimum, not a target to hit
exactly — many imagers go 2-3× longer on a well-guided mount
and get excellent results.

**Parameters:**

- `sky_background_rate` (required) — Sky Background Electron Rate in e-/pixel/s, from SharpCap's free Sky Background Calculator
- `camera` (optional) — A saved camera profile with read noise (see /savecamera) -- alternative to read_noise
- `read_noise` (optional) — Camera's read noise in electrons -- alternative to camera, overrides a saved camera's value
- `noise_tolerance` (optional) — How much read noise to accept (defaults to Standard/5%)


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


## 🚀 Launches

### `/launches [count]`

List several upcoming rocket launches

Lists several upcoming rocket launches, sorted by launch date —
for browsing what's coming up rather than just the very next one.

**Usage:** `/launches` for the next 5, or `/launches count: 10`
for more (max 10).

Same cached-data source and freshness caveats as `/nextlaunch`
— see that command's help for the details on why this isn't a
live lookup and how the cache refresh schedule works.

**Parameters:**

- `count` (optional) — How many upcoming launches to show (default 5, max 10)

### `/nextlaunch`

The next upcoming rocket launch

Shows the next scheduled rocket launch — mission, provider,
rocket, launch site, and a countdown to the scheduled time (NET
— "No Earlier Than," the standard industry term, since launch
times are targets, not guarantees).

**Usage:** just `/nextlaunch` — no arguments.

Data comes from a cache refreshed in the background every 6 to
60 minutes (more often as a launch gets closer), not a live
lookup — the underlying free API caps anonymous access at 15
calls/hour, far too few to call directly per command use. The
footer shows exactly when the cached data was last refreshed.
Rocket launches slip constantly (scrubs, holds, weather), more
than almost anything else this bot tracks — treat the countdown
and status as informational, not a confirmed guarantee, and
expect it to occasionally lag a genuinely last-minute change.


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

### `/bugreport`

Report a bug for admin review before it's filed on GitHub

Opens a form to submit a bug report for admin review — a short
summary field, and a paragraph-style details field for what
happened, what you expected, and steps to reproduce. Nothing
reaches GitHub until an admin reviews and approves it in the
bot's shared review channel.

**Usage:** just `/bugreport` — a popup form appears with two
fields to fill in. The more detail in the details field, the
faster it can get fixed — include the exact command you ran
and any error message you saw.

Limited to 3 submissions per 10 minutes per person.

### `/featurerequest`

Suggest a feature for admin review before it's filed on GitHub

Opens a form to submit a feature request for admin review — a
short summary field, and a paragraph-style details field for
what you'd like to see and why it'd help. Nothing reaches
GitHub until an admin reviews and approves it in the bot's
shared review channel.

**Usage:** just `/featurerequest` — a popup form appears with
two fields to fill in.

Limited to 3 submissions per 10 minutes per person.

### `/setreviewchannel`

(Bot owner only) Set the one shared channel for reviewing bug reports and feature requests

**(Bot owner only)** Sets the current channel as the ONE shared
review queue for the entire bot: submissions from `/bugreport`
and `/featurerequest`, from every server the bot is in, will
post here with Approve/Reject buttons.

**Usage:** run this in whichever channel you want reports to
land in — typically a private, staff-only channel, since it'll
contain unreviewed, unfiltered user submissions from anyone,
anywhere the bot is installed. Run it again in a different
channel to move the review queue there instead.

This is restricted to the bot's actual owner, not just anyone
with Manage Server — since this setting is now global rather
than per-server, any admin being able to change it would mean
any single server could silently redirect every OTHER server's
reports too.


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

### `/permissions`

Check whether the bot has the permissions it needs in this channel

Checks the bot's ACTUAL, effective permissions in the channel
you run this from — not just its role-level permissions, but
the real computed result after accounting for any
channel-specific overwrites (e.g. a private channel that
doesn't inherit @everyone's permissions). Shows a green check
or red X next to each permission Andi actually needs anywhere
in the bot.

**Usage:** run this in whichever channel is having trouble.
Most "the bot doesn't respond here" or "a feature doesn't work
in this channel" reports turn out to be exactly one missing
permission below, not an actual bug — this makes that
instantly obvious instead of guessing.

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

