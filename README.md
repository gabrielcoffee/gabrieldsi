# Gabriel's DSi

I've decided to make my porfolio in the style of the menu in my favorite console of all time **Nintendo DSi**.
It's really nostalgic and special for me, with a camera for a quick snap, background music, animations and etc.
I didn't really want to make another portfolio like everyone else. Yeah the clean style is cool but I didn't feel like it represented me that well. I like a cozy space and the DSi had software that feels like home.

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