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
