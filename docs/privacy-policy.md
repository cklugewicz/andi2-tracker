**Privacy Policy — Andi (Andromeda2)**

**Last updated: 16 September 2026**

This Privacy Policy explains what information the Discord bot "Andromeda2" ("Andi," "the Bot") collects, how it's used, and your choices regarding that information. It's operated by Andromeda2 Dev Team ("we," "us," "the Operator").

**1. Information We Collect**

Andi is designed to collect as little as possible. Specifically:

We do NOT collect or store:

• The content of your Discord messages (Andi does not request or use Discord's "Message Content" permission)
• Your Discord username, display name, avatar, or email address
• Any data from Discord's member/presence lists beyond what Discord's API provides transiently to render a response (e.g., a server's member count for `/status`), which we do not store
• Any information tying a specific person to a specific action — see Section 1b below for how this applies to usage statistics specifically

We DO store the following, only when you or a server admin actively use certain commands:

• **A saved default location** (a city name, or coordinates, that you choose to enter) — saved when you run `/setlocation`, or use `remember: True` on a location-based command. Linked to your Discord user ID, not your username.
• **A reminder channel and lead-time setting** — saved when a server admin runs `/setreminderchannel`. Linked to the server (guild) ID and the channel ID.
• **A record of which meteor shower/eclipse reminders have already been posted** — created automatically by the Bot's background reminder task. Linked to the server ID and event name/date, with no personal data attached.

This data is stored in a simple data file on the Operator's hosting infrastructure. It is not sold, rented, or used for advertising.

**1b. Usage Statistics (Aggregate and Anonymous)**

Separately from the above, and unlike everything else in Section 1, Andi automatically records aggregate usage statistics every time any command or button is used, anywhere — this isn't something you opt into, and it isn't triggered by a specific command the way a saved location is.

What's recorded is limited to: which command or button was used, which server it was used in, and whether it completed successfully or hit a genuine error. This is **never** linked to your Discord user ID, username, or any other personal identifier. We have no way of knowing, and do not record, which specific person triggered any given use — only that a use happened, where, and with what outcome. We also record when a server adds or removes the Bot, linked to the server ID only, to track overall growth over time.

This data is stored in a database on the Operator's hosting infrastructure, separate from the data file used for Section 1. It is not sold, rented, or used for advertising.

**2. How We Use This Information**

• Saved locations are used solely to answer location-based commands (e.g., `/sky`, `/planets`, `/skyquality`) without requiring you to re-type your location every time.
• Reminder settings are used solely to post scheduled meteor shower and eclipse reminders to the channel your server administrator selected.
• Aggregate usage statistics are used to understand which features are actually useful, identify commands or buttons that are failing more often than expected, and track overall server growth — particularly important now that Andi may be added to servers we can't personally observe or test in ourselves.

**3. Third-Party Services**

To answer certain commands, Andi sends the relevant request data (such as a location you typed, or a date) to the following free third-party services. We do not send your Discord username, user ID, or message history to these services — only the specific information needed to answer that command (for example, a city name or coordinates, to get back weather or place-name data):

• **NASA APOD API** (api.nasa.gov) — for the `/apod` command
• **Open-Meteo** (open-meteo.com, geocoding-api.open-meteo.com) — for weather and location lookups
• **OpenStreetMap Nominatim** (nominatim.openstreetmap.org) — to look up a nearby place name for coordinates you enter
• **Celestrak** (celestrak.org) — for satellite tracking data
• **N2YO** (n2yo.com) — optionally, as a fallback source for satellite tracking data, if the Operator has configured an API key
• **lightpollutionmap.app** — Andi generates a clickable link to this site for the `/skyquality` command; no data is sent to it by the Bot itself, only by your own browser if you choose to click the link

Each of these services has its own privacy practices, which we encourage you to review if you have concerns. We chose these particular services because they don't require creating an account or providing personal information to use.

Astronomical calculations (planet positions, meteor shower radiants, etc.) are performed locally by the Bot using downloaded ephemeris data (via the Skyfield library) and are not sent to any third party. Usage statistics (Section 1b) are recorded entirely on the Operator's own infrastructure and are never sent to a third party either.

**4. Data Retention and Deletion**

• Your saved location: you can delete it at any time by running `/clearlocation`. This removes it immediately.
• Server reminder settings: a server administrator can remove them at any time by running `/disablereminders`.
• If the Bot is removed from a server (kicked, banned, or the server deletes it), that server's reminder channel settings and related reminder-tracking data are automatically deleted at that time. This does not affect any individual user's saved location, since those follow a person across every server the Bot is in and are only ever deleted by that person via `/clearlocation`.
• **Usage statistics** (Section 1b): detailed, timestamped records are kept for 90 days, after which they're folded into permanent, aggregate totals (e.g., "this command has been used 500 times") that no longer carry a specific date. Because this data was never linked to any individual person, there's no per-person deletion mechanism for it — there's nothing personal in it to delete. Unlike reminder settings, a server's usage totals and join/leave history are **retained** even after the Bot is removed from that server, since they remain useful in aggregate for understanding overall usage across every server Andi has ever been in.

**5. Children's Privacy**

Andi does not knowingly collect information from anyone who does not meet Discord's own minimum age requirement. If you believe a minor's data has been collected inappropriately, contact us and we'll remove it.

**6. Data Security**

We take reasonable measures to protect stored data, but no method of electronic storage is 100% secure. As this is a small-scale/hobby project, please don't use Andi to store or transmit sensitive personal information (for example, don't save your home address as your "location" if that's a concern for you — a nearby town or coordinates work just as well for all of Andi's features).

**7. Your Choices**

• You can avoid saving any location data at all by simply typing a location fresh each time you use a command, without `remember: True`.
• You can delete your saved location at any time with `/clearlocation`.
• You can remove the Bot from your server at any time via Discord's server settings.
• Because usage statistics (Section 1b) are never linked to you individually, there's no individual opt-out for them — using the Bot at all necessarily creates an anonymous, aggregate record that the Bot was used. A server administrator can always remove the Bot entirely if they'd rather it not run there at all.

**8. Changes to This Policy**

We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date above. Continued use of the Bot after changes take effect constitutes acceptance of the revised policy.

**9. Contact**

Questions, concerns, or data deletion requests can be directed to: Andromeda 2 Dev Team via [Andi's Discord support server](https://discord.gg/5MMqmWCMHJ).
