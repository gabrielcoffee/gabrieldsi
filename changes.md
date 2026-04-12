# Changes

## Task 1: Scaffold Vite + React + TypeScript project (2026-04-11)

Bootstrapped the project with Vite's `react-ts` template, installed runtime and dev dependencies, removed Vite boilerplate, and verified the dev server and test runner both work.

### Created
- `package.json`, `package-lock.json` — project manifest with `dev`, `build`, `lint`, `preview`, `test`, `test:watch` scripts.
- `index.html` — Vite entry HTML.
- `vite.config.ts` — minimal Vite config with React plugin.
- `vitest.config.ts` — separate Vitest config (jsdom env, globals, `src/test-setup.ts` setup file). Split from `vite.config.ts` to avoid a TS type clash between rolldown-vite 8 and the Vite 7 bundled inside Vitest 3.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — Vite's standard project-references TS setup. `tsconfig.node.json` includes both config files.
- `eslint.config.js` — Vite default ESLint flat config.
- `src/main.tsx` — minimal root, imports `./styles/global.css`.
- `src/App.tsx` — placeholder `<div>Gabriel's DSi — scaffold OK</div>`.
- `src/styles/global.css` — empty (placeholder for Task 7).
- `src/test-setup.ts` — imports `@testing-library/jest-dom`.
- `public/favicon.svg`, `public/icons.svg` — Vite defaults (kept; not in deletion list).
- `README.md` — Vite default (kept; not in deletion list).

### Deleted
- `src/App.css`, `src/index.css`, `public/vite.svg`, `src/assets/`.

### Modified
- `.gitignore` — merged Vite's defaults into the existing user-authored file, preserving Obsidian workspace-state ignores.

### Dependencies
- Runtime: `react`, `react-dom`, `framer-motion`.
- Dev: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `@types/node`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, ESLint stack.

### Verified
- `npx tsc -b` — exits 0, no type errors.
- `npm run dev` — Vite 8.0.8 starts on `http://localhost:5173/`, HTTP 200.
- `npm test` — exits 0 with "No test files found" (uses `--passWithNoTests`).

### Notes / decisions
- Vite's `react-ts` template now uses `tsconfig.app.json` + `tsconfig.node.json` with project references; `tsconfig.json` is just a router. Kept the template's structure rather than collapsing it.
- Used `--passWithNoTests` on the `test` script so a clean tree exits 0 (plan said "exits cleanly"). The `test:watch` script still uses default behaviour.
- Did not commit `.obsidian/` — it was untracked before this task and not in scope for "scaffold Vite".

## Task 2: Define types and app data (2026-04-11)

Added `src/types.ts` (`AppId`, `PortfolioApp`) and `src/data/apps.ts` (five-app list with placeholder colors). `npx tsc -b` exits 0.

## Task 3: Pure selection logic with TDD (2026-04-11)

Added `src/logic/selection.ts` (`moveLeft`, `moveRight` clamped index helpers) and `src/logic/selection.test.ts` (4 passing tests). Followed red-green TDD cycle.

## Task 4: useClock hook with TDD (2026-04-11)

Added `src/hooks/useClock.ts` (React hook returning live `Date` updated every second via `setInterval`) and `src/hooks/useClock.test.ts` (2 passing tests using Vitest fake timers). Followed red-green TDD cycle. Full suite: 6/6 passing.

## Task 5: useKeyboardInput hook with TDD (2026-04-11)

Added `src/hooks/useKeyboardInput.ts` (React hook binding window `keydown` to `onLeft`/`onRight`/`onConfirm` for ArrowLeft, ArrowRight, Enter/Space with cleanup on unmount) and `src/hooks/useKeyboardInput.test.ts` (4 passing tests). Followed red-green TDD cycle. Full suite: 10/10 passing.

## Task 6: Global CSS and pixel rendering setup (2026-04-11)

Filled in `src/styles/global.css` with CSS reset, warm gray page background `#e9e6df`, Silkscreen pixel font import from Google Fonts, flex-centered body, and a `.device-scale` descendant selector that enables `image-rendering: pixelated` and disables font smoothing. Updated `index.html` `<title>` from `portfolio-ds` to `Gabriel's DSi`. `npx tsc -b` exits 0; 10/10 tests still passing.

## Task 7: Screen component (2026-04-11)

Added `src/components/Screen.tsx` — pure 256x192 pixel-perfect container with `position: relative`, `overflow: hidden`, DSi-blue background `#1a2742`, light text, accepts `children` and optional `style` override. `npx tsc -b` exits 0.

## Task 8: Device component (2026-04-11)

Added `src/components/Device.tsx` — scaled container that applies `.device-scale` class, stacks `top`/`bottom` ReactNode props vertically with an 8px hinge gap, and applies an integer `scale` transform (default 3x) for nearest-neighbor pixel scaling. `npx tsc -b` exits 0.

## Task 9: InfoBar component (2026-04-11)

Added `src/components/InfoBar.tsx` — 12px-tall absolute-positioned top strip with volume emoji (left), "Gabriel" (center-left), live MM/DD HH:MM via `useClock` (center-right), and battery emoji (right). `npx tsc -b` exits 0; 10/10 tests still passing.

## Task 10: TopScreen component (2026-04-11)

Added `src/components/TopScreen.tsx` — composes `Screen` + `InfoBar` with a blue gradient main area (photo placeholder) and a bottom welcome panel overlay showing the selected app's name and description. `npx tsc -b` exits 0.

## Task 11: AppIcon component (2026-04-11)

Added `src/components/AppIcon.tsx` — single app tile button (48px selected / 32px unselected) with Framer Motion bounce animation on selection, first-letter placeholder, and accessible aria attributes. `npx tsc -b` exits 0.

## Task 12: AppRow component (2026-04-11)

Added `src/components/AppRow.tsx` — horizontal row mapping over apps to render `AppIcon` tiles, with click-to-select and click-again-to-open logic. `npx tsc -b` exits 0.

## Task 13: AppNameCard component (2026-04-11)

Added `src/components/AppNameCard.tsx` — absolute-positioned framed header showing the selected app's name and "by Gabriel" subtitle, sits above the app row on the bottom screen. `npx tsc -b` exits 0.

## Task 14: Scrollbar component (2026-04-11)

Added `src/components/Scrollbar.tsx` — bottom-screen scrollbar with left/right arrow buttons and a track whose thumb position tracks the selected app index. `npx tsc -b` exits 0.

## Task 15: BottomScreen component (2026-04-11)

Added `src/components/BottomScreen.tsx` — composition component assembling AppNameCard, AppRow, and Scrollbar inside a Screen with darker blue background (#12224a), passing all props through. `npx tsc -b` exits 0.

## Task 16: Wire everything in App.tsx (2026-04-11)

Replaced placeholder `App.tsx` with the full home screen integration — holds `selectedIndex` state, wires `useKeyboardInput` with `moveLeft`/`moveRight` callbacks, and renders `Device` with `TopScreen` + `BottomScreen`. `npx tsc -b` exits 0; 10/10 tests passing.

## Task 17: Sprite-based app row with fixed center selection (2026-04-12)

Replaced the CSS-drawn app tiles with pixel sprites (`about_me.png`, `empty.png`, `selected.png` in `/public`). The selection cursor is now a fixed frame at the horizontal center of the bottom screen; the app row slides horizontally underneath it when the user presses left/right. Added 10 empty-slot placeholders to the right of the 5 real apps (15 total), all selectable; Enter on an empty slot is a no-op. Removed mouse-based selection/open and the bouncing animation on the selected icon. `npx tsc -b` exits 0; 10/10 tests passing.

### Modified
- `src/data/apps.ts` — exported `EMPTY_SLOT_COUNT = 10`.
- `src/components/AppIcon.tsx` — rewritten to a plain `<img>` rendering `about_me.png` or `empty.png` at 50×56; removed framer-motion bounce, size-changes-on-select, CSS tile, button semantics.
- `src/components/AppRow.tsx` — rewritten as a fixed-center `selected.png` frame (64×80 at x=96) plus a sliding `<motion.div>` of 15 slots at 64px pitch; `animate={{ x: 96 - selectedIndex * 64 }}` with a spring transition (stiffness 400, damping 35). No mouse handlers.
- `src/components/AppNameCard.tsx` — `app` prop is now `PortfolioApp | undefined`; renders blank strings on empty slots. Card height bumped from 36 to 60 to fill the 74px top band.
- `src/components/TopScreen.tsx` — `selectedApp` is now `PortfolioApp | undefined`; welcome panel falls back to empty strings.
- `src/components/BottomScreen.tsx` — dropped `onSelect`/`onOpen` passthrough to `AppRow`; computes `totalSlots = apps.length + EMPTY_SLOT_COUNT` for `Scrollbar`.
- `src/components/Scrollbar.tsx` — repositioned to `top: 154, height: 38` to occupy the new bottom band (previously `bottom: 4, height: 16`).
- `src/App.tsx` — uses `totalSlots` for `moveLeft`/`moveRight`; `onConfirm` guards `selectedIndex < apps.length`; removed `onSelect` wiring.

### Notes / decisions
- Vertical bands in bottom screen: NameCard `y=0..74`, AppRow `y=74..154` (exact fit for the 80px selected frame), Scrollbar `y=154..192`. Slightly tightened from the user's ~40/40/20 estimate so the frame doesn't overflow into the scrollbar band.
- Slot pitch = 64 px = width of `selected.png`. The 50×56 sprite sits flex-centered inside each 64-wide slot (7 px padding each side).
- Sliding row translates via Framer Motion spring, not CSS transition — smoother on index changes.
- Scrollbar is still CSS (arrows + track + thumb) pending a future `scrollbar.png` sprite.
- `image-rendering: pixelated` is already applied globally via `.device-scale` in `global.css`; sprites render crisp at the 3× device scale.
- Design spec committed separately at `docs/superpowers/specs/2026-04-12-sprite-app-row-and-sliding-selection-design.md`.

## Task 18: Background, info bubble, and half-scale device (2026-04-12)

Dropped the device render scale from 3× to 2× so the top screen is no longer clipped on shorter viewports. Added `background.png` as the default background on both screens (via `Screen.tsx`). Replaced the CSS-drawn AppNameCard frame with the `info_bubble.png` sprite (250×85) centered at the top of the bottom screen. Shifted the app row and scrollbar bands down so the info bubble sits strictly above the apps. `npx tsc -b` exits 0; 10/10 tests passing.

### Modified
- `src/components/Device.tsx` — default `scale` 3 → 2.
- `src/components/Screen.tsx` — added `backgroundImage: url(/background.png)` + `backgroundSize: 256px 192px` + `backgroundRepeat: no-repeat` (with `backgroundColor` fallback). Applies to every screen by default.
- `src/components/TopScreen.tsx` — removed the full-cover blue gradient placeholder div so the new background.png is visible. Kept the InfoBar and the bottom welcome panel.
- `src/components/BottomScreen.tsx` — removed the `background: '#12224a'` override so the Screen default (background.png) shows through.
- `src/components/AppNameCard.tsx` — swapped the CSS-drawn framed div for a `<img src="/info_bubble.png" />` (250×85) with a text overlay (name + "by Gabriel") positioned at `top:0, left:3` of the bottom screen.
- `src/components/AppRow.tsx` — shifted wrapper `top: 74 → 85` so the selected frame doesn't overlap the info bubble.
- `src/components/Scrollbar.tsx` — shifted to `top: 165, height: 27` to accommodate the new app-row position.

### Notes / decisions
- New bottom-screen vertical bands: info_bubble `y=0..85`, app row `y=85..165`, scrollbar `y=165..192`.
- `scrollbar.png` also exists in `/public` but was not applied this pass — the CSS scrollbar remains pending explicit user direction on the sprite swap.

## Task 19: Fix top-screen clipping, shift bubble/apps, swap scrollbar sprite (2026-04-12)

Diagnosed and fixed the top-screen clipping: `transform: scale()` does not change an element's layout box, so the body was flex-centering a half-size box and the rendered top half spilled above the viewport. Wrapped the scaled element in an outer `<div>` with explicit scaled width/height and `transformOrigin: 'top left'`. Both screens now render and fit cleanly. Also applied small position tweaks and swapped the CSS scrollbar for `scrollbar.png`. `npx tsc -b` exits 0; 10/10 tests passing.

### Modified
- `src/components/Device.tsx` — wrapper `<div>` with `width/height = scaled size`; inner scaled element uses `transformOrigin: 'top left'`. Flexbox layout now reserves the correct space; no more clipping.
- `src/components/AppNameCard.tsx` — introduced `BUBBLE_TOP_Y = 6` constant (marked `⬇ Tweak me`). Bubble now sits 6 px below the top edge instead of glued to it.
- `src/components/AppRow.tsx` — introduced `ROW_TOP_Y = 80` constant (marked `⬇ Tweak me`). App row lifted 5 px from previous `85`.
- `src/components/Scrollbar.tsx` — replaced CSS track/arrows/thumb with a single `<img src="/scrollbar.png" />` (256×21) glued to the bottom. Removed all props; the component is now purely decorative.
- `src/components/BottomScreen.tsx` — dropped `onLeft`/`onRight` props (no longer needed); removed `totalSlots` calculation and Scrollbar props.
- `src/App.tsx` — simplified the `BottomScreen` call; `onLeft`/`onRight` are still wired to `useKeyboardInput` but no longer forwarded.

### Tweak-me constants
- Info bubble Y: `BUBBLE_TOP_Y` at the top of `src/components/AppNameCard.tsx`.
- App row Y: `ROW_TOP_Y` at the top of `src/components/AppRow.tsx`.
