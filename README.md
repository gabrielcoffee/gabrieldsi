# Gabriel's DSi

A personal portfolio site styled like a **Nintendo DSi home screen**. Use the arrow keys to scroll through the app tiles and Enter to open one. It's my portfolio, dressed up as the handheld I grew up with.

<!-- screenshot: add later -->

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/`.

## Controls

| Key | Action |
|---|---|
| ← / → | Move the app cursor |
| Enter / Space | Open the selected app |

Empty slots are selectable but do nothing on Enter — they're placeholders for apps I haven't built yet.

## Stack

- **Vite** + **React** + **TypeScript**
- **Framer Motion** for the sliding-row animation
- **Vitest** + **Testing Library** for the tests
- **Silkscreen** pixel font; pixel-art sprites rendered nearest-neighbor

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run lint` | ESLint |

## Project layout

```
src/
  components/   Screen, Device, TopScreen, BottomScreen, AppRow, AppIcon,
                AppNameCard, Scrollbar, InfoBar
  hooks/        useClock, useKeyboardInput
  logic/        selection.ts (pure left/right clamp helpers)
  data/         apps.ts (the list of real apps + empty-slot count)
  styles/       global.css
public/         Pixel sprites: about_me, empty, selected, info_bubble,
                scrollbar, background
```

See [`CHANGELOG.md`](./CHANGELOG.md) for a versioned history of what's changed.
