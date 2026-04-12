# Sprite-Based App Row with Fixed Center Selection — Design

**Date:** 2026-04-12
**Status:** Approved, ready for implementation plan

## Summary

Replace the current CSS-drawn app tiles on the bottom screen with pixel-art sprites. The selection cursor (`selected.png`) becomes a fixed frame at the horizontal center of the screen; the row of app icons slides horizontally under it when the user presses left/right. The row is padded with 10 empty-slot sprites to the right of the 5 real apps.

## Goals

- Swap colored CSS tiles for provided sprites (`about_me.png`, `empty.png`, `selected.png`).
- Make the selection cursor a fixed centered frame; apps slide instead of the cursor moving.
- Remove the bouncing animation on the selected icon (the frame sprite replaces that visual affordance).
- Add 10 empty slots to the right of the 5 real apps; treat empty slots as full selection targets that do nothing on `Enter`.
- Keep the mouse out of selection for now (keypad only). No click-to-select, no scroll handling.

## Non-goals

- No scrollbar sprite yet (user will supply later). The existing CSS scrollbar stays, resized to the new band.
- No new app sprites beyond `about_me.png` — it is reused for all 5 real apps for now.
- No changes to the top screen's overall composition beyond handling an undefined selected app.
- No changes to keyboard handling (`useKeyboardInput`) or pure selection math (`moveLeft`/`moveRight`).

## Assets

All in `/public`, loaded as plain `<img>` tags.

| File | Dimensions | Role |
|---|---|---|
| `about_me.png` | 50 × 56 | App icon sprite (used for all 5 real apps) |
| `empty.png` | 50 × 56 | Empty-slot placeholder sprite |
| `selected.png` | 64 × 80 | Selection-cursor frame, fixed at horizontal center |

Pixel-perfect rendering already handled globally via `.device-scale { image-rendering: pixelated }` in `src/styles/global.css`.

## Visual layout (bottom screen, 256 × 192)

```
y=0
┌──────────────────────────────────────────────────┐
│                                                  │
│         AppNameCard   (band: y=0..76, 40%)       │
│                                                  │
├──────────────────────────────────────────────────┤  y=74
│   ◼   ◼   ◼  ┏━━━━━┓  ◼   ◼   ◼                  │
│              ┃ ICON┃         App row band        │
│              ┗━━━━━┛       (y=74..154, 80px)     │
├──────────────────────────────────────────────────┤  y=154
│          < ═════════▮═════════ >                 │  Scrollbar band
└──────────────────────────────────────────────────┘  (y=154..192, 20%)
                                                      y=192
```

### Vertical bands

Tightened slightly from the user's ~40/40/20 estimate so that `selected.png` (80 tall) fits the app row band exactly:

- **NameCard**: `top: 0, height: 74` (≈39%)
- **App row**: `top: 74, height: 80` (≈42%, exact fit for selected frame)
- **Scrollbar**: `top: 154, height: 38` (≈20%, glued to bottom)

### App row geometry

- **Slot pitch**: 64 px (matches `selected.png` width). Slots laid out edge-to-edge; no extra gap.
- **Slot contents**: the 50 × 56 app sprite centered horizontally inside the 64 px slot (so 7 px padding on each side). Vertically, sprite sits at the top of the band (the selected frame overhangs the sprite above and below by ~12 px on top and bottom).
- **Center slot position**: the horizontally centered slot spans `x = 96..160`. The selected frame occupies exactly those 64 px.
- **Total slots**: 15 = 5 real apps + 10 empty.
- **Overflow**: only ~4 slots are visible on screen at rest; the rest are clipped by `Screen`'s existing `overflow: hidden`.

### Sliding math

The app row is a single `<motion.div>` containing all 15 slot elements laid out in a flex row at 64 px pitch. Its translation along X is:

```
translateX = screenCenterX - (selectedIndex × slotPitch) - (slotPitch / 2)
           = 128 - (selectedIndex × 64) - 32
           = 96 - (selectedIndex × 64)
```

For `selectedIndex = 0`, `translateX = 96` (first slot centered).
For `selectedIndex = 14`, `translateX = 96 - 896 = -800` (last slot centered).

### Selection frame

`<img src="/selected.png" />` is rendered as a sibling of the sliding row, positioned `absolute` at `left: 96, top: 74` inside the `Screen` (i.e. `top: 0` within the app-row wrapper). It does **not** move. Its `z-index` is above the sliding row so the frame visually wraps the centered sprite.

## Selection model

- All 15 slots are selectable. `selection.ts` is called with `total = 15`; `selectedIndex ∈ [0, 14]`.
- Real apps: `selectedIndex < apps.length` (0..4).
- Empty slots: `selectedIndex >= apps.length` (5..14).
- `Enter`/`Space` on a real slot calls `onOpen(selectedIndex)`.
- `Enter`/`Space` on an empty slot is a no-op.
- Mouse clicks do not change selection (removed from this iteration per user request).

## Data model

Keep `src/data/apps.ts` as the existing 5 real apps — no placeholder entries mixed in. Introduce an explicit constant for the empty-slot padding.

```ts
// src/data/apps.ts
export const EMPTY_SLOT_COUNT = 10
```

Derived helpers used in `App.tsx` / `AppRow.tsx`:

```ts
const totalSlots = apps.length + EMPTY_SLOT_COUNT          // 15
const isEmpty = (i: number) => i >= apps.length            // true for i=5..14
const selectedApp = apps[selectedIndex]                    // undefined for empty
```

Rationale: keeping `apps.ts` free of empty placeholders preserves it as the single source of truth for real content, and makes the padding count trivially adjustable when real apps get added later.

## Component changes

### `src/components/AppIcon.tsx` — rewrite

Replace the animated, color-filled CSS tile with a plain sprite image.

- Remove `framer-motion` import and `motion.button`.
- Remove the size-changes-on-select behavior (fixed 50 × 56).
- Remove the border, background color, first-letter placeholder, and bounce animation.
- Accept props: `{ app?: PortfolioApp, empty?: boolean }` (no `onClick`, no `selected`).
- Render a single `<img>`:
  - `src="/about_me.png"` when `app` is provided
  - `src="/empty.png"` when `empty` is true or `app` is undefined
- `alt` = app name, or `""` for empty.
- Inline styles: `width: 50, height: 56, display: 'block'`. No cursor pointer, no button semantics — the icons are purely decorative now since mouse input is disabled.

### `src/components/AppRow.tsx` — rewrite

New structure: a fixed centered `selected.png` frame plus a sliding row of 15 slots.

- Remove `onSelect` and `onOpen` props (no mouse interaction).
- Accept only `{ apps: PortfolioApp[], selectedIndex: number }`.
- Compute `translateX = 96 - selectedIndex * 64`.
- Render two siblings inside a relatively-positioned wrapper that fills the 80 px band:
  1. A `<motion.div>` containing 15 slot `<div>`s (each 64 × 56, flex row, no gap). Each slot centers its `AppIcon` horizontally. The motion div is animated via `animate={{ x: translateX }}`.
  2. A fixed-center `<img src="/selected.png" />` at `left: 96, top: 0, width: 64, height: 80, pointerEvents: 'none'`.
- Slot index `i < apps.length` renders `<AppIcon app={apps[i]} />`; `i >= apps.length` renders `<AppIcon empty />`.
- Transition: `{ type: 'spring', stiffness: 400, damping: 35 }`. Feels snappy but smooth, avoids overshoot.

### `src/components/AppNameCard.tsx` — small change

- Change prop type from `app: PortfolioApp` to `app: PortfolioApp | undefined`.
- When `app` is `undefined`, render the card frame with no name/subtitle (or whatever neutral text fits the existing frame — e.g., blank strings). Keep the card's framed container so the layout doesn't jump.

### `src/components/BottomScreen.tsx` — small change

- Stop passing `onSelect` and `onOpen` down to `AppRow` (those props are removed).
- Continue passing `onLeft`, `onRight` to `Scrollbar`.
- Pass `apps[selectedIndex]` (possibly undefined) to `AppNameCard`.
- Pass `total = apps.length + EMPTY_SLOT_COUNT` to `Scrollbar`.

### `src/components/TopScreen.tsx` — small change

- Change `selectedApp` prop type to `PortfolioApp | undefined`.
- When undefined, render the existing chrome but with empty name/description text. Keep the blue gradient and bottom panel structure.

### `src/components/Scrollbar.tsx` — resize only

- No structural change (still CSS arrows + track + thumb).
- Reposition to occupy the 38 px bottom band (`top: 154, height: 38`), vertically centering the arrows and track within it.
- `total` now reflects 15, so the thumb spans a smaller fraction of the track — this is fine.

### `src/App.tsx` — small change

- Import `EMPTY_SLOT_COUNT` from `data/apps.ts`.
- Compute `const totalSlots = apps.length + EMPTY_SLOT_COUNT` (15).
- Pass `totalSlots` to `moveLeft` / `moveRight`.
- In `onOpen`, guard: `if (index < apps.length) { ... }` — empty slots do nothing.
- Remove the `onSelect` callback passed to `BottomScreen` (mouse select removed).

### `src/logic/selection.ts` — unchanged

Still returns clamped `[0, total - 1]`. No test changes needed.

## Testing

- Existing 10 tests must continue passing (`useClock`, `useKeyboardInput`, `selection`).
- No new unit tests required for this iteration: the changes are primarily visual/layout. The selection math is unchanged; the sliding translation is a pure function of `selectedIndex` and is trivial enough to validate by eye.
- Manual verification: run `npm run dev`, use arrow keys, confirm:
  - Selected frame stays at horizontal center of bottom screen.
  - App row slides left/right smoothly.
  - Selection can traverse into all 10 empty slots.
  - `Enter` on real app logs to console; `Enter` on empty slot does nothing.
  - NameCard and TopScreen render blank cleanly on empty slots.
  - No bounce on selected app anymore.
  - Scrollbar thumb reflects position across 15 slots.

## Out of scope / deferred

- `scrollbar.png` sprite (user will provide later → separate iteration).
- Unique sprites per app (only `about_me.png` available now).
- Mouse-based selection or scrolling.
- Opening an app's detail view (`onOpen` still just console-logs).
- Animations beyond the slide (e.g., entry animation, idle motion).

## Changes to commit after implementation

Per the project convention, `changes.md` gets a new task entry summarizing the modified/deleted/created files.
