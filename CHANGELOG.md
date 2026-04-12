# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-04-12

### Added
- Pixel-art sprites for the DSi home screen: `about_me.png`, `empty.png`, `selected.png`, `info_bubble.png`, `background.png`, `scrollbar.png`.
- Ten empty placeholder slots to the right of the five real apps (fifteen selectable slots total).
- Fixed-center `selected.png` frame with a sliding app row beneath it (spring animation via Framer Motion).
- `background.png` as the default background for both screens.
- Tweak-me constants `BUBBLE_TOP_Y` (`AppNameCard.tsx`) and `ROW_TOP_Y` (`AppRow.tsx`) for quick layout adjustments.
- Human-readable `README.md` describing the project, controls, stack, and layout.

### Changed
- Device default render scale dropped from 3× to 2×.
- Info bubble now uses `info_bubble.png`; app row uses the sprite-based `AppIcon`; scrollbar uses `scrollbar.png` glued to the bottom.
- `AppNameCard` and `TopScreen` accept an undefined selected app and render blank on empty slots.
- Top screen's placeholder blue gradient removed so the new background shows through.

### Removed
- CSS-drawn app tiles, name card frame, and scrollbar (replaced by sprites).
- Bouncing animation on the selected app.
- Mouse-based app selection and open (keyboard-only for now).

### Fixed
- Top-screen clipping on shorter viewports. `transform: scale()` does not change an element's layout box, so the body was flex-centering a half-size box and the rendered top half spilled above the viewport. The scaled element is now wrapped in a div whose layout size equals the rendered size, with `transformOrigin: top left`.

## [0.1.0] - 2026-04-11

### Added
- Initial Vite + React + TypeScript scaffold with Vitest.
- App data model (`types.ts`, `data/apps.ts`) and pure selection logic (`moveLeft`, `moveRight`) with tests.
- `useClock` hook (live clock, second-resolution) and `useKeyboardInput` hook (ArrowLeft / ArrowRight / Enter / Space) with tests.
- Global CSS with Silkscreen pixel font and nearest-neighbor image rendering under `.device-scale`.
- Core components: `Screen` (256×192), `Device` (two-screen scaled wrapper), `InfoBar`, `TopScreen`, `BottomScreen`, `AppRow`, `AppIcon`, `AppNameCard`, `Scrollbar`.
- First end-to-end wiring in `App.tsx` (selected-app state + keyboard driven).
