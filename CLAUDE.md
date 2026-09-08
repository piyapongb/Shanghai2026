# Shanghai Trip 2026 — Project Guide

A static, no-build-step travel itinerary web app (plain HTML/CSS/JS, no
framework, no bundler, no `npm install`). Built so the owner (non-developer,
uses Terminal only when told exactly what to type) can keep editing trip
details indefinitely, and so this exact codebase can be copied to plan a
different trip later. Read this file fully before making changes — it
answers nearly every "how do I..." question that would otherwise require
re-deriving from scratch.

This repo started as a copy of the Guangzhou 2026 itinerary app. The UI is
unchanged; all four data files hold Shanghai content instead. **The 4 days
and both flights are real** — CNX→PVG 9C8512 on Thu 5 Nov 2026 (09:30 →
14:30) and PVG→CNX 9C8511 on Sun 8 Nov (16:10 → 20:10), Spring Airlines.
**Everything between them is still placeholder**: the hotel, every stop,
meal time and entrance fee is a plausible guess, not a booking. Day 2 is a
full day at Shanghai Disneyland. Ride and show details were checked against
the web in Sep 2026 (10th-anniversary line-up: ILLUMINATE! at night, The
Heart of Magic at the castle, parade ~12:15/15:15) and wait times are
ranges pulled from queue-tracking sites — both drift, so re-check the
official app before the trip rather than trusting the numbers here. Every photo
was Guangzhou's, so they were deleted —
`heroImage`, every restaurant/hotel `image` and every itinerary `thumbnail`
is empty, which the UI handles by falling back to icons. Treat any specific
number outside the two flights as unconfirmed until the owner says otherwise.

Flight cards render only airline, flight number, airports, times, optional
terminal/date notes and price — `renderTimelineItem` returns early for
`type: "flight"`, so aircraft type, cabin class, a thumbnail or a details
accordion on a flight item would be silently ignored. Showing those needs a
UI change in `components.js`, not a data edit.

## Working assumptions for whoever (human or Claude) picks this up

- The owner is not a developer. Give literal copy-pasteable terminal
  commands, not "just run the linter." Assume no prior git/Node experience
  unless the conversation shows otherwise.
- Prefer editing `data/*.js` over touching `js/`, `css/`, or `index.html`.
  Nearly every real request (new restaurant, changed itinerary time, new
  photo, different trip) is a data change, not a UI change.
- Always verify a change renders correctly in a real browser before telling
  the owner it's done — see "Testing before you ship" below. This project
  has no automated test suite; a browser check is the only test.
- This file, once out of date, is worse than no file — update it in the
  same commit whenever you change a workflow, add a tool, or learn a new
  gotcha the hard way.

## Repository / branch structure

- **All real content lives on a non-`main` branch.** Check
  `git branch --show-current` — as of this writing it's
  `claude/web-itinerary-app-zmvyru`. `main` may be empty or stale. Always
  confirm which branch actually has the site before assuming `main` is it.
- Always `git fetch` + check `git log origin/<branch> -5` before pushing —
  the owner edits data files by hand from time to time (see "Owner-driven
  edits" below), so the remote can be ahead of what you last saw. A
  rejected push ("fetch first") is normal and just needs a merge, not force.
- **GitHub Pages** (if the owner wants a public link) must be pointed at
  this same non-`main` branch in Settings → Pages → Source → Branch. It
  redeploys automatically on every push to that branch — no separate build
  step, no re-clicking anything after the first setup.
- Turning this repo into a **Template repository** (Settings → General →
  "Template repository" checkbox) lets the owner spin up an independent
  copy for a new trip via the green "Use this template" button, with zero
  git commands. Set the *default branch* to the content branch first (not
  `main`), or the template copy will look empty.

## Running it locally

No build step. From the repo root:
```bash
python3 -m http.server 8123
```
then open `http://localhost:8123/index.html`. That's the entire dev loop.

## Data model — where to make almost every change

All six files are plain `window.SOMETHING_DATA = [...]` assignments, loaded
as `<script>` tags in `index.html` (order matters — see that file's script
list if you ever add a new data file). Every file has a header comment
restating its own schema; the summary below is for quick orientation, the
file itself is the source of truth.

### `data/trip.js`
Single object, not an array. Title, destination, date range, hero image
(`heroImage` / `heroImageAlt`). **This is the file to edit first when
copying the template for a new trip** — new title, dates, hero image,
destination.

`title` is the single source for every place the trip is named: the
browser tab, the header brand mark, the footer, and the `<meta name=
"description">` that link previews use when the GitHub Pages URL is
shared. `applyTripChrome()` in `app.js` writes all four at load; the text
sitting in `index.html` is only a trip-neutral pre-JS fallback, so don't
hand-edit it per trip. There is deliberately **no `days` array here** —
the day list lives in `itinerary.js` alone; duplicating it here just
invited drift (it was inert config that nothing read).

### `data/locations.js`
A keyed map (`{ cityKey: { name, lat, lon } }`), not an array. Every day in
`itinerary.js` points at one entry via `locationId`. Coordinates go straight
to Open-Meteo (see "Weather system" below) — no geocoding step, so get
lat/lon right (Google Maps right-click → the numbers at the top of the
context menu). For a new trip, replace or add entries here and repoint each
day's `locationId`.

**Multi-city trips within a single itinerary are already fully supported —
this is per-day, not per-trip.** Add one entry per city, then give each day
whichever `locationId` matches where that day actually happens:
```js
// data/locations.js
window.LOCATIONS_DATA = {
  guangzhou: { name: "Guangzhou", lat: 23.1291, lon: 113.2644 },
  shanghai:  { name: "Shanghai",  lat: 31.2304, lon: 121.4737 }
};
```
```js
// data/itinerary.js
{ id: "day-1", date: "2026-10-22", locationId: "guangzhou", ... }
{ id: "day-2", date: "2026-10-23", locationId: "shanghai",  ... }
```
Each day fetches weather for its own city independently; two days sharing
a city+date-range share one request (see "Weather system"). No other file
needs to change — `hydrateWeather` in `app.js` reads `locationId` per day
already, nothing there assumes one city per trip.

### `data/itinerary.js`
Array of day objects (`id`, `dayNumber`, `date`, `locationId`, `weather`
fallback block, `items[]`). Item `type` is one of `activity | restaurant |
flight | park | other`:
- **`flight`** — has its own renderer (`renderFlightCard`); needs
  `departureAirport/Time`, `arrivalAirport/Time`, optional
  `*DateNote`/`*Terminal`. Never shows a thumbnail even if `thumbnail` is
  set — that field is silently inert on flight items.
- **`restaurant`** — never embeds a restaurant record. It references
  `restaurants.js` by id: `restaurantId` (the one shown) and
  `nearbyRestaurantIds` (alternates shown as a mini-grid — a good place to
  surface restaurants that don't have their own itinerary slot).
- **`park`** — one land inside a theme park (Day 2 is Shanghai Disneyland).
  Collapsed it shows only the land's name (plus its `thumbnail`, same field
  as any other stop); Details opens `park.story`, `park.characters[]`,
  `park.tip`, then one card per entry in `park.rides[]` (`id`, `name`,
  `nameZh`, `image`, `kind`, `when`, `description`, `howItWorks`,
  `duration`, `wait`, `intensity`). Every ride field except `name` is optional and
  just doesn't render when missing, so half-filled entries are safe to
  commit — which is the point: the owner fills these in over time.
  - **`kind` is the English industry term** ("Dark ride", "Walk-through").
    An earlier version put a Thai phrase in the chip and overflowed it on
    narrow screens; the Thai now lives once, in the day briefing's glossary
    popup, instead of in every card. When adding a ride type not in that
    glossary, add it there too.
  - **`wet`** puts a droplet chip on the card ("เปียกทั้งตัว", "ละอองน้ำ") and
    **`warning`** an alert line under How it works. Keep `warning` to what
    you'd regret not knowing in the queue — no photo on the ride, ponchos
    sold at the entrance, spins hard, outdoor queue with no shade — not a
    transcription of the sign at the gate. Most rides need neither.
  - **`when`** (a show's time slot) and `kind` render as chips at the top of
    the card; **`duration`, `wait`, `intensity`** render as labelled boxes at
    the bottom (`statRow`). `wait` carries the value only ("90–150 นาที",
    "เดินเข้าได้เลย") because the box already says "Wait". Waits are ranges on
    purpose: real queues swing with the season and no single number is
    honest.
  - **`park.characters[]` holds keys into `characters.js`, not names.** A
    key with a record renders as a tappable chip that opens the popup; an
    unknown key still renders (raw key as label) and logs a console warning.
  - A ride's `id` exists so `tools/add-image.js` can target its photo — see
    "Adding photos". Lands are ordered most-popular-first in `items[]`; the
    parade/night-show block stays last because it's fixed by time of day.
- **`activity` / `other`** — `details.description/location/metroStation/
  metroExit/entranceFee`, all optional; the "Details" accordion only
  appears if at least one is non-empty. `thumbnail` is optional; omitting
  it just skips the image and shows an icon instead — nothing breaks.
- **Keep items within a day in ascending `time` order.** Nothing enforces
  this programmatically; it's a house convention so the timeline reads
  top-to-bottom correctly.
- **`briefing` on a day** renders a card between the weather and the
  timeline: `title`, `intro`, `points[]` (`label` + `text`), and `dialogs[]`.
  Each dialog is a button that opens `#info-dialog` with either
  `groups[]` (labelled bullet lists — the prohibited-items list) or
  `glossary[]` (`term`/`meaning` rows — the ride-type words), plus optional
  `intro` and `note`. Popups exist so the briefing stays a screen tall: put
  anything list-shaped in one rather than inline.
- **`hideTimes: true` on a day** drops the time column for that day only
  (`.timeline--no-time`), and items on it don't need a `time` at all — the
  order in `items[]` *is* the running order. Used for the park day, where a
  clock would be fiction: everything runs on queue length. The override
  lives in both `styles.css` and the 768px block of `responsive.css`,
  because the wider breakpoint re-declares the grid columns.
- Items are validated at runtime only for dangling `restaurantId`s (a
  `console.warn`, not a crash) — nothing checks description length, item
  order, or field spelling. A typo in a field name just silently does
  nothing; there's no schema validation layer.

### `data/restaurants.js`
Flat array, `id: "restaurant-NNN"` (not necessarily contiguous — deleting
one leaves a gap on purpose, don't renumber the rest). `links[]` holds
review/website links (`{ label, url, type: "review"|"website", rating? }`).
`gallery[]` only renders once it has **2 or more** entries (below that, the
gallery section doesn't show at all — a single-photo gallery array is
effectively invisible, which surprised the owner once already).

### `data/hotels.js`
Flat array, `checkIn`/`checkOut` are the hotel's **stated policy times**
(e.g. "14:00"/"12:00"), not necessarily what the itinerary shows for an
actual arrival — those can legitimately differ (an itinerary item can show
a 2am check-in after a red-eye landing while the hotel's official policy
field still says 14:00). Don't "fix" one to match the other without asking;
they answer different questions.

### `data/characters.js`
A keyed map (`{ characterKey: { id, image, name, nameZh, bio } }`), referenced from
`park.characters[]` in `itinerary.js`. It exists because the same character
shows up in several lands (Mickey in three, Buzz in two) and a bio copied
three times drifts. Tapping a chip opens `#character-dialog` in
`index.html`, which shows the photo beside the name, or a coloured monogram
(initials on a hue derived from the key) when `image` is empty. **Do not go
looking for character artwork to fill these in**: Mickey, Buzz, Judy Hopps
and the rest are copyrighted, Wikimedia Commons rejects them, and
`fetch-images.js` is built to refuse non-free files — so the only images
that belong here are ones the owner shot at the park themselves. `id` duplicates the key so
`tools/add-image.js` can target a character the same way it targets a
restaurant — photos land in `assets/images/characters/`. Unreferenced
entries cost nothing. Loaded *after* `itinerary.js` in `index.html`'s
script list.

## UI code (`js/`, `css/`, `index.html`) — rarely needs touching

- `js/utils.js` — DOM helpers, the icon set (`ICON_PATHS`), date formatting.
- `js/components.js` — every `render*` function; this is where markup
  structure lives. `renderTimelineItem(item, restaurantIndex, opts)` takes
  `opts.hideTimes`; `renderParkDetails` / `renderRideCard` build the theme
  park day.
- `js/app.js` — state, event wiring, tab/day switching, the weather
  hydration pass (`hydrateWeather`), theme handling, and three `<dialog>`
  popups: `bindLightboxEvents` (photos), `bindCharacterDialogEvents`
  (character bios), `bindInfoDialogEvents` (briefing popups). Each is one
  delegated document click listener keyed off a data attribute — copy that
  pattern for a fourth. All three open through `openDialog`/`closeDialog`,
  which add a `.dialog--fallback` class when `showModal()` is missing
  (older Safari/Firefox): without it the `open` attribute alone leaves the
  dialog sitting inline in the page, which reads as "the button does
  nothing". Never call `showModal()` directly.
- `js/weather.js` — see next section.
- `css/styles.css` + `css/responsive.css` — design tokens live as CSS
  custom properties near the top of `styles.css`; breakpoints are mobile
  (base), 768px, 1024px, 1280px in `responsive.css`.
- Accordions (`.details-toggle` / `.details-panel`) use a
  `grid-template-rows: 0fr → 1fr` transition, not `max-height` — this was a
  deliberate fix (see "Known gotchas"). Don't reintroduce a fixed
  `max-height` cap on `.details-panel`; it will re-clip nested accordions
  (a restaurant card's own "Details" opened inside a timeline item's
  nearby-restaurants list).

## Weather system

`js/weather.js` (`window.Weather.getWeatherForDay(location, dateStr)`) hits
Open-Meteo directly from the browser — no API key, so nothing to leak
client-side. It auto-selects:
- **Within ~14 days of "today":** live forecast endpoint. Chip row includes
  UV index; icon reflects the real WMO condition code.
- **Further out (or in the past):** a climatological average built from
  the same calendar window (±3 days) across the last 5 years of the
  archive endpoint. No UV in this branch (the archive API doesn't publish
  it) — that's expected, not a bug, and resolves itself automatically once
  the date enters the forecast window.
- **Any fetch failure:** resolves to `null`, and the caller keeps whatever
  static `weather` block that day already had in `itinerary.js`. Every day
  should keep a reasonable static fallback for exactly this reason.

Results are cached in `localStorage`; requests are deduplicated per
city+date-range so a multi-day trip in one city costs one forecast request,
not one per day. The weather icon is picked from `WEATHER_ICON_BY_CODE`
(live data) or keyword-matched from the text label (static fallback data,
which has no WMO code) in `components.js`.

## Adding photos

Two purpose-built scripts in `tools/`, both plain Node with no dependencies
— never hand-edit an `image`/`thumbnail` path and copy a file into place
manually, use these instead:

- **`node tools/add-image.js --list`** — every valid id across restaurants,
  hotels, characters, itinerary stops and theme park attractions (those are
  listed indented under their land with a `↳`), plus the special id `hero` (the
  header/cover photo, which lives in `data/trip.js` as `heroImage` rather
  than in an array — the script special-cases it).
- **`node tools/add-image.js <local-file> <id> [--gallery] [--force]`** —
  copies the file to `assets/images/<category>/<id>.<ext>` and rewrites
  that one record's field — a ride id lands in `assets/images/rides/` and
  sets that ride's `image`, everything else works as before. `--gallery` appends to a restaurant's gallery
  array instead of replacing the main photo (numbered `-2`, `-3`, ... so
  repeat runs don't collide). `--force` replaces an existing photo,
  cleaning up the old file even across a different extension (no orphaned
  files left behind).
- **`node tools/fetch-images.js`** — alternative source when the owner
  *doesn't* already have a file locally: searches Wikimedia Commons by
  subject at runtime (not hardcoded URLs), rejects non-free-licensed
  results even when they're the best match, and writes attribution to
  `assets/images/CREDITS.md` (keep that file — most Commons licenses
  require it). Has `--list` / `--dry-run` / `--search "override term"`.
  **Its `SLOTS` map ships empty and has to be hand-filled per trip** — it's
  a plain object of `{ placeholder-path: "search term" }` at the top of the
  file, not auto-discovered from the data files the way `add-image.js`'s id
  list is. Add one entry per new item that still needs a photo (path must
  match exactly what that item's `image`/`thumbnail` field currently
  points at), run the tool, then clear `SLOTS` back to `{}` once everything
  it covers has a real photo — a stale entry just wastes a Commons search
  and updates nothing (see gotchas).

**Watch image file sizes.** Neither script resizes what you feed it. A
phone photo can be tens of megabytes; these thumbnails render at ~60-400px
on screen. Check `ls -la` on anything freshly added and downscale (Pillow:
`img.thumbnail((1600,1600))`, re-save as JPEG ~80 quality) if it's more
than ~1-2 MB — a 20 MB image was found and fixed once already (see gotchas).

## Testing before you ship

There's no test suite — a real browser check is the test. The pattern used
throughout this project's history:
```bash
python3 -m http.server 8123 --directory /path/to/repo &
```
then drive it with Playwright (`/opt/pw-browsers/chromium` if working in
this sandboxed environment) to open tabs, expand every accordion, and
check for: content that got clipped (`scrollHeight` vs `clientHeight` on
`.is-open` panels), broken images (`naturalWidth === 0`), console errors,
and dangling data references. Screenshot anything visual before calling it
done — several real bugs in this project's history were caught only by
actually looking at a rendered screenshot, not by reading the code.

Before editing a data file by hand (or reviewing an edit the owner made),
run `node --check data/whatever.js` — a single stray character (a misplaced
backtick has already taken down the entire itinerary once; see gotchas)
breaks parsing for the *whole file*, not just the edited entry, and the
failure mode is a silently empty section with no error shown to the owner.

## Git / GitHub workflow specifics

- **The owner authenticates to github.com via "Sign in with Google."**
  That is a website login only — git and `gh` need separate credentials.
  `gh auth login` → GitHub.com → HTTPS → "Login with a web browser" opens
  an actual browser where "Sign in with Google" works fine (it's hitting
  the normal github.com login), then authorizes the CLI. This was a real
  point of confusion once; don't assume "I already log in with Google" is
  a blocker, it isn't.
- The owner may not have Homebrew or Node preinstalled. If a command isn't
  found, check for that before assuming something else is wrong; the
  bootstrapping order that's worked before: Homebrew (official curl
  installer from brew.sh, then the "next steps" PATH command it prints —
  do not skip that part) → `brew install node` and `brew install gh`.
- Commit messages should explain *why*, not restate the diff. Never include
  a model name/identifier in anything committed to the repo (commit
  messages, code comments, PR text) — attribution footers are handled by
  the harness, not written into file content.
- When both you and the owner have touched the repo, `git push` will
  reject with "fetch first" — this is normal, not an error to route
  around. `git fetch`, look at what changed (`git show --stat`), merge, and
  only then push. Don't force-push over the owner's own commits.

## Reusing this template for a new trip

Checklist, in order:
1. `data/trip.js` — title, destination, date range, hero image/alt.
2. `data/locations.js` — replace/add city entries with real lat/lon; keep
   old ones around if harmless (unreferenced cities cost nothing — no
   fetch happens unless a day's `locationId` points at them).
3. `data/itinerary.js` — full rewrite of days/items for the new schedule.
   Keep `locationId` on every day pointing at a real key in
   `locations.js`, and keep items within each day in time order.
4. `data/restaurants.js` / `data/hotels.js` — clear out or replace entries;
   check `grep restaurant-NNN data/itinerary.js` before deleting a
   restaurant record to make sure nothing still references it.
5. Photos — either tool in `tools/`, per-id, once the new data exists.
6. If the owner wants a shareable link: GitHub Pages → Settings → Pages →
   point at whichever branch actually has this content (see "Repository /
   branch structure" — it is very unlikely to be `main`).

Gutting all four data files at once is a supported starting state, not a
broken one: with empty arrays the app still boots clean (no console
errors, tabs still switch, hero/title/footer all read from `trip.js`) and
each panel shows a "add them to data/…" note rather than a blank void.
Verified by actually emptying every data file and loading the page, so
step 1 above can safely be "delete everything, then build it back up."

## Known gotchas (learned the hard way — don't reintroduce these)

- **A single stray character can silently empty the entire itinerary.** A
  misplaced backtick after a day's closing brace once opened an
  unterminated template literal that swallowed the rest of `itinerary.js`;
  the script failed to parse, `window.ITINERARY_DATA` never got defined,
  and the whole timeline rendered as if every day were empty — with zero
  console output visible to the owner. `node --check <file>.js` catches
  this in one second; run it after any manual edit to a data file.
- **`.details-panel` must never go back to a fixed `max-height`.** It
  needs to fit a restaurant card's own nested "Details" accordion opened
  inside a timeline item's nearby-restaurants list, and no fixed number is
  safe for all combinations. Current implementation uses
  `grid-template-rows: 0fr ↔ 1fr`, which sizes to real content — keep it.
- **A restaurant's `gallery` array needs ≥2 entries to render at all.**
  One entry is indistinguishable from zero in the UI. If a photo should be
  visible, either put it in `image` (main photo) or add a second one to
  `gallery`.
- **Check image file size after adding one.** Neither `add-image.js` nor
  `fetch-images.js` resizes anything; a full-resolution phone photo used
  as a 68px timeline thumbnail is pure waste and slows the page down for
  every visitor.
- **A `fetch-images.js` `SLOTS` entry left in place after its photo is
  already real does nothing useful.** The rewrite step matches by exact
  path string — once `add-image.js` (or a prior `fetch-images.js` run)
  repoints a field at a new filename, the old placeholder path in `SLOTS`
  no longer matches anything in the data files. Running it anyway still
  downloads a real photo and reports success, but "0 data file(s) updated"
  — the photo lands on disk with nothing pointing at it, and the search
  hit the network for nothing. Happened to every entry in this file's
  `SLOTS` map at once after a batch of `add-image.js` runs; fixed by
  clearing `SLOTS` back to empty. Delete a `SLOTS` entry as soon as the
  item it covers has a real photo, don't leave it "just in case."
- **Never delete a restaurant without checking `itinerary.js` first** —
  `restaurantId` / `nearbyRestaurantIds` references to a missing id log a
  console warning (not a crash), but the referencing item then quietly
  shows nothing where that restaurant should be.
