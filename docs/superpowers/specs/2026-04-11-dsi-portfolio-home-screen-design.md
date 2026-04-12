# Gabriel's DSi — Home Screen Scaffold (V1)

**Date:** 2026-04-11
**Status:** Design approved, ready for implementation plan
**Scope:** Home screen only. Boot sequence, apps, audio, camera, and page chrome are explicitly deferred.

---

## Vision (long-term, for context)

A portfolio website styled as a faithful, interactive Nintendo DSi. The visitor boots the device, lands on a home screen with a horizontal row of apps, and navigates into each "app" (About, Projects, Music, Camera, Contact) to see content. The goal is an authentic DSi experience — pixel-perfect rendering, authentic system sounds, snappy-but-not-instant animations, and the hardware's full input model (keyboard mapped to d-pad/A/B, mouse treated as the touchscreen on the bottom screen). The DSi device itself is not drawn as an outlined shell — it is *implied* by the arrangement of two vertically-stacked screens, speaker grilles, d-pad, and A/B buttons floating on a lightly-textured page.

**Design philosophy (user-stated):** "Software is cheap and accessible in 2026 — focus on the experience, not just the data." The experience is the point. Every visitor goes through the full boot → home → navigate flow; no deep links, no skipping.

---

## V1 scope: Home screen scaffold only

This document specifies **only** the home screen scaffold — enough structure to see, navigate, and feel right. Everything else is deferred to subsequent iterations.

### In scope for V1

- React + Vite + TypeScript project scaffold
- Framer Motion installed for animations
- Two screens rendered at native 256×192 px, scaled up with `transform: scale(n)` and `image-rendering: pixelated`
- Screens stacked vertically with a gap between them (implied hinge)
- Warm light-gray page background (no texture yet — CSS solid color is fine)
- Top screen layout: top info bar (volume, name, date/time, battery) + main area with a placeholder backdrop image
- Bottom screen layout: app name card + horizontal app row with selection state + scrollbar with clickable arrows
- 5 placeholder apps in the row: About, Projects, Music, Camera, Contact (using colored squares or simple Unicode glyphs as icons — no pixel art yet)
- Selection state with a gentle bounce animation on the selected tile (Framer Motion)
- Top screen reflects the currently-selected app's name and a short description in the welcome panel
- Input handling (all three must work):
  - Keyboard: ← → to move selection, Enter/Space to "open" (stub: `console.log('open app', name)`)
  - Click on an app icon to select; click again on the selected one to open
  - Click on on-screen scrollbar arrows to nudge selection
- Placeholder pixel font from Google Fonts (e.g. "Silkscreen" or "Press Start 2P")
- No font smoothing on the screens (`-webkit-font-smoothing: none`, `font-smooth: never`)
- Live clock in the top-right of the top screen, updating each second

### Explicitly out of scope for V1

- Boot sequence (blank device → logo → click to continue)
- Audio / background music / sound effects
- Real DSi system font
- Camera app (webcam, pixelation pipeline, photo capture)
- All other apps' content (About/Projects/Music/Contact are icons only)
- Rendered d-pad and A/B buttons on the page (V1 uses keyboard + click)
- Page-level chrome (mute toggle, white/black DSi color variant)
- Plastic texture on the page background
- Pixel-art icons for apps
- Markdown-driven content pipeline
- Obsidian vault integration for content (the spec itself lives in the vault, but no content pipeline yet)
- Mobile-specific layout (desktop-first for V1; mobile deferred)
- "Open app" behavior (stubbed as console.log)

---

## Tech stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Animation:** Framer Motion
- **Styling:** Plain CSS modules or a single CSS file — no Tailwind yet (pixel-perfect layout is easier to reason about with explicit values)
- **State:** React `useState` / `useReducer` — no global store needed for V1
- **Routing:** None. Single page. Future navigation will be state-machine-based, not URL-based, by explicit design choice.

---

## Architecture

### Component structure (proposed)

```
src/
├── main.tsx
├── App.tsx                  # page layout, holds the Device
├── components/
│   ├── Device.tsx           # the "implied device": two screens stacked, no chrome
│   ├── Screen.tsx           # a 256×192 pixel-perfect screen container (scaled)
│   ├── TopScreen.tsx        # top screen content: info bar + main area
│   ├── BottomScreen.tsx     # bottom screen content: app name card + row + scrollbar
│   ├── AppRow.tsx           # horizontal row of app icons with selection state
│   ├── AppIcon.tsx          # single app tile
│   ├── AppNameCard.tsx      # framed text box above the app row
│   ├── InfoBar.tsx          # top bar of top screen (volume, name, date/time, battery)
│   └── Scrollbar.tsx        # bottom of bottom screen with arrows
├── hooks/
│   ├── useKeyboardInput.ts  # arrow keys + enter/space → selection events
│   └── useClock.ts          # live clock (per-second tick)
├── data/
│   └── apps.ts              # the 5 apps (id, name, description, icon placeholder)
├── styles/
│   └── global.css           # reset, page background, font imports, pixel rendering rules
└── types.ts                 # shared types (App, etc.)
```

### State (V1)

A single piece of state in `App.tsx`:

```ts
const [selectedAppIndex, setSelectedAppIndex] = useState(0);
```

Input sources (keyboard, click, scroll arrows) all call `setSelectedAppIndex`. The `TopScreen` reads `apps[selectedAppIndex]` to display the name and description. The `AppRow` animates the selected tile.

### Pixel-perfect rendering approach

- Each `Screen` component is a `div` with `width: 256px; height: 192px` and `position: relative; overflow: hidden`.
- The parent wrapping both screens applies `transform: scale(3)` (or 4, determined at runtime based on viewport) and `transform-origin: center`.
- Global CSS sets `image-rendering: pixelated` on the scaled container and its descendants.
- Fonts are loaded via `@font-face` with `font-smooth: never` and `-webkit-font-smoothing: none` on `body` and/or the screen containers.
- All positions and sizes inside screens are integers.
- Framer Motion animation values are constrained to integer pixels (we'll use `Math.round` or `snap` utilities if needed).

### Input handling

- `useKeyboardInput` attaches a `keydown` listener to `window`:
  - `ArrowLeft` → `setSelectedAppIndex(i => Math.max(0, i - 1))`
  - `ArrowRight` → `setSelectedAppIndex(i => Math.min(apps.length - 1, i + 1))`
  - `Enter` or `Space` → `console.log('open app', apps[selectedAppIndex].id)`
- Clicking an `AppIcon`:
  - If it's not currently selected → select it
  - If it's already selected → "open" it (stubbed)
- Clicking a scrollbar arrow acts like pressing the corresponding arrow key.

---

## Home screen layout details

### Top screen (256×192)

- **Row 0–11 (12px tall):** `InfoBar`
  - Left (~0–40px): volume icon (simple filled speaker glyph) — decorative only, no real volume state
  - Center (~80–176px): "Gabriel" in the placeholder pixel font
  - Right (~180–240px): date and time, e.g. "04/11 22:03", updating per second
  - Far right (~244–254px): battery icon (full, decorative)

- **Row 12–192 (180px tall):** main area
  - Background: a placeholder image (we'll use a solid color with a centered glyph or a simple SVG placeholder)
  - **Bottom row (last ~16px):** welcome panel text overlay — selected app name on the left, short description on the right. Semi-transparent panel behind the text for readability.

### Bottom screen (256×192)

- **Row 0–48 (48px tall):** `AppNameCard`
  - Framed rectangle (1px border, slight inset)
  - Two lines of text centered: app name (larger, e.g. 12px) and subtitle (smaller, 8px)
  - Subtitle for V1 can be static: "by Gabriel"

- **Row 48–160 (112px tall):** `AppRow`
  - Horizontal row of 5 app tiles, centered horizontally
  - Selected tile is ~48×48px, non-selected tiles are ~32×32px
  - Selected tile has a gentle bounce loop (y oscillation ±2px, 800ms)
  - Transition when selection changes: tiles slide horizontally so the selected one stays centered

- **Row 160–192 (32px tall):** `Scrollbar`
  - Left arrow button (~0–20px)
  - Scroll track (~24–232px) with a "thumb" indicating the selected app's position
  - Right arrow button (~236–256px)
  - Arrow buttons are clickable and move selection

---

## Open questions / decisions deferred

- Exact shade of page gray (will pick a value during implementation; can tweak later)
- Scale factor (3× vs 4×) — determine at runtime based on viewport height
- Placeholder backdrop image for top screen main area — start with a solid color + centered glyph
- Exact font choice — "Silkscreen" or "Press Start 2P"; will pick during implementation

---

## Success criteria for V1

When this iteration is "done":

1. Running `npm run dev` starts a Vite dev server
2. The page shows two vertically-stacked pixelated screens centered on a warm-gray background
3. The top screen shows an info bar (with a live clock) and a main area with a welcome panel
4. The bottom screen shows an app name card, a row of 5 app tiles, and a scrollbar
5. Arrow keys move selection through the apps; Enter/Space logs "open app X" to the console
6. Clicking an app tile selects it; clicking again logs "open app X"
7. Clicking the scrollbar arrows also moves selection
8. The selected tile has a gentle bounce animation
9. Everything renders pixel-perfectly with no font smoothing or image blur
10. Code is structured per the proposed component tree so future iterations can add apps, audio, and boot sequence cleanly

---

## Next iterations (for context, not part of V1)

- V2: Boot sequence + page chrome (mute, color toggle) + real DSi font
- V3: Audio system + DSi system sounds
- V4: First real app (probably About) + markdown content pipeline
- V5: Remaining apps (Projects, Music, Contact)
- V6: Camera app with webcam pixelation + R/L key capture
- V7: Polish pass (textures, pixel-art icons, tuning animations and delays)

Each iteration will get its own spec and plan.
