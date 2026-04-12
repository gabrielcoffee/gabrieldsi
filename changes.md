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
