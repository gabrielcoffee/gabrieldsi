# DSi Home Screen Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a React + Vite + TypeScript project that renders an interactive, pixel-perfect DSi home screen with a horizontal row of 5 navigable placeholder apps, driven by keyboard and click input.

**Architecture:** Two 256×192 `Screen` components stacked vertically inside a `Device` container that applies `transform: scale(n)` with `image-rendering: pixelated` for authentic DSi-resolution rendering. A single `selectedAppIndex` state in `App.tsx` flows down to a `TopScreen` (info bar + welcome panel) and `BottomScreen` (app name card + app row + scrollbar). Pure selection logic, the live clock, and the keyboard input handler are extracted into testable modules.

**Tech Stack:** React 18, TypeScript, Vite, Framer Motion, Vitest + React Testing Library, plain CSS.

**Spec:** `docs/superpowers/specs/2026-04-11-dsi-portfolio-home-screen-design.md`

---

## File Structure

```
portfolio-ds/
├── index.html                        # Vite entry
├── package.json
├── tsconfig.json
├── vite.config.ts                    # Vite + Vitest config
├── src/
│   ├── main.tsx                      # ReactDOM root
│   ├── App.tsx                       # State + composition
│   ├── types.ts                      # Shared types (App)
│   ├── data/
│   │   └── apps.ts                   # The 5 apps
│   ├── logic/
│   │   ├── selection.ts              # Pure selection functions (tested)
│   │   └── selection.test.ts
│   ├── hooks/
│   │   ├── useClock.ts               # Live clock (tested)
│   │   ├── useClock.test.ts
│   │   ├── useKeyboardInput.ts       # Window keydown → callbacks (tested)
│   │   └── useKeyboardInput.test.ts
│   ├── components/
│   │   ├── Device.tsx                # Scaled container, stacks two screens
│   │   ├── Screen.tsx                # 256×192 pixel-perfect container
│   │   ├── TopScreen.tsx             # InfoBar + welcome panel
│   │   ├── BottomScreen.tsx          # NameCard + AppRow + Scrollbar
│   │   ├── InfoBar.tsx               # Top strip on top screen
│   │   ├── AppNameCard.tsx           # Framed card above app row
│   │   ├── AppRow.tsx                # Horizontal row with selection animation
│   │   ├── AppIcon.tsx               # Single tile
│   │   └── Scrollbar.tsx             # Bottom strip with clickable arrows
│   └── styles/
│       └── global.css                # Reset, page bg, pixel rendering rules
```

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Delete: default Vite boilerplate (`src/App.css`, `src/index.css`, `public/vite.svg`, `src/assets/`)

- [ ] **Step 1: Create Vite project in current directory**

Run:
```bash
cd /Users/gabrielpereira/Desktop/portfolio-ds
npm create vite@latest . -- --template react-ts
```

When prompted about existing files, choose "Ignore files and continue" (we only have `.gitignore`, `docs/`, `.obsidian/`).

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
npm install framer-motion
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @types/node
```

- [ ] **Step 3: Delete boilerplate files**

Run:
```bash
rm -f src/App.css src/index.css public/vite.svg
rm -rf src/assets
```

- [ ] **Step 4: Replace `src/main.tsx` with minimal root**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Replace `src/App.tsx` with placeholder**

```tsx
export default function App() {
  return <div>Gabriel's DSi — scaffold OK</div>
}
```

- [ ] **Step 6: Create `src/styles/global.css` as empty file**

```css
/* filled in Task 7 */
```

- [ ] **Step 7: Replace `vite.config.ts` to include Vitest config**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 8: Create `src/test-setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Add `test` scripts to `package.json`**

Open `package.json` and merge these into the existing `"scripts"` object (keep existing `dev`, `build`, etc.):

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 10: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Vite server starts on `http://localhost:5173`. Stop it with Ctrl+C.

- [ ] **Step 11: Verify test runner works**

Run:
```bash
npm test
```

Expected: "No test files found" or similar — exits cleanly. (No tests yet.)

- [ ] **Step 12: Commit**

```bash
git add .
git commit -m "chore: scaffold Vite + React + TS + Vitest"
```

---

## Task 2: Define types and app data

**Files:**
- Create: `src/types.ts`, `src/data/apps.ts`

- [ ] **Step 1: Create `src/types.ts`**

```ts
export type AppId = 'about' | 'projects' | 'music' | 'camera' | 'contact'

export interface PortfolioApp {
  id: AppId
  name: string
  description: string
  /** Placeholder color for the icon in V1 (pixel art comes later). */
  color: string
}
```

- [ ] **Step 2: Create `src/data/apps.ts`**

```ts
import type { PortfolioApp } from '../types'

export const apps: PortfolioApp[] = [
  { id: 'about',    name: 'About',    description: 'Who is Gabriel?',        color: '#7ec8e3' },
  { id: 'projects', name: 'Projects', description: 'Things I have built.',   color: '#f6c84c' },
  { id: 'music',    name: 'Music',    description: 'Songs I have written.',  color: '#e76f6f' },
  { id: 'camera',   name: 'Camera',   description: 'Say hi with your webcam.', color: '#8fd18f' },
  { id: 'contact',  name: 'Contact',  description: 'Get in touch.',          color: '#c28fe7' },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/types.ts src/data/apps.ts
git commit -m "feat: define app types and home screen app list"
```

---

## Task 3: Pure selection logic (TDD)

**Files:**
- Create: `src/logic/selection.ts`, `src/logic/selection.test.ts`

- [ ] **Step 1: Write failing test in `src/logic/selection.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { moveLeft, moveRight } from './selection'

describe('selection', () => {
  describe('moveLeft', () => {
    it('decrements the index', () => {
      expect(moveLeft(2, 5)).toBe(1)
    })
    it('clamps at 0', () => {
      expect(moveLeft(0, 5)).toBe(0)
    })
  })

  describe('moveRight', () => {
    it('increments the index', () => {
      expect(moveRight(2, 5)).toBe(3)
    })
    it('clamps at total - 1', () => {
      expect(moveRight(4, 5)).toBe(4)
    })
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run:
```bash
npm test
```

Expected: FAIL — `./selection` does not exist.

- [ ] **Step 3: Implement `src/logic/selection.ts`**

```ts
export function moveLeft(index: number, _total: number): number {
  return Math.max(0, index - 1)
}

export function moveRight(index: number, total: number): number {
  return Math.min(total - 1, index + 1)
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:
```bash
npm test
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/logic/selection.ts src/logic/selection.test.ts
git commit -m "feat: add pure selection logic with tests"
```

---

## Task 4: useClock hook (TDD)

**Files:**
- Create: `src/hooks/useClock.ts`, `src/hooks/useClock.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useClock } from './useClock'

describe('useClock', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns the current Date on mount', () => {
    const fixed = new Date('2026-04-11T22:03:00Z')
    vi.setSystemTime(fixed)
    const { result } = renderHook(() => useClock())
    expect(result.current.getTime()).toBe(fixed.getTime())
  })

  it('updates every second', () => {
    const start = new Date('2026-04-11T22:03:00Z')
    vi.setSystemTime(start)
    const { result } = renderHook(() => useClock())
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current.getTime()).toBe(start.getTime() + 1000)
  })
})
```

- [ ] **Step 2: Run test, verify fail**

Run: `npm test -- useClock`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/hooks/useClock.ts`**

```ts
import { useEffect, useState } from 'react'

export function useClock(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}
```

- [ ] **Step 4: Run test, verify pass**

Run: `npm test -- useClock`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useClock.ts src/hooks/useClock.test.ts
git commit -m "feat: add useClock hook with tests"
```

---

## Task 5: useKeyboardInput hook (TDD)

**Files:**
- Create: `src/hooks/useKeyboardInput.ts`, `src/hooks/useKeyboardInput.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardInput } from './useKeyboardInput'

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key }))
}

describe('useKeyboardInput', () => {
  it('calls onLeft when ArrowLeft is pressed', () => {
    const onLeft = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft, onRight: () => {}, onConfirm: () => {} }))
    fireKey('ArrowLeft')
    expect(onLeft).toHaveBeenCalledTimes(1)
  })

  it('calls onRight when ArrowRight is pressed', () => {
    const onRight = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft: () => {}, onRight, onConfirm: () => {} }))
    fireKey('ArrowRight')
    expect(onRight).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm on Enter and Space', () => {
    const onConfirm = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft: () => {}, onRight: () => {}, onConfirm }))
    fireKey('Enter')
    fireKey(' ')
    expect(onConfirm).toHaveBeenCalledTimes(2)
  })

  it('cleans up listener on unmount', () => {
    const onLeft = vi.fn()
    const { unmount } = renderHook(() => useKeyboardInput({ onLeft, onRight: () => {}, onConfirm: () => {} }))
    unmount()
    fireKey('ArrowLeft')
    expect(onLeft).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test, verify fail**

Run: `npm test -- useKeyboardInput`
Expected: FAIL.

- [ ] **Step 3: Implement `src/hooks/useKeyboardInput.ts`**

```ts
import { useEffect } from 'react'

export interface KeyboardHandlers {
  onLeft: () => void
  onRight: () => void
  onConfirm: () => void
}

export function useKeyboardInput(handlers: KeyboardHandlers): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':  handlers.onLeft(); break
        case 'ArrowRight': handlers.onRight(); break
        case 'Enter':
        case ' ':          handlers.onConfirm(); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handlers])
}
```

- [ ] **Step 4: Run test, verify pass**

Run: `npm test -- useKeyboardInput`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useKeyboardInput.ts src/hooks/useKeyboardInput.test.ts
git commit -m "feat: add useKeyboardInput hook with tests"
```

---

## Task 6: Global CSS and pixel rendering setup

**Files:**
- Modify: `src/styles/global.css`
- Modify: `index.html` (add Google Font link)

- [ ] **Step 1: Replace `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
}

body {
  background: #e9e6df; /* warm light gray */
  color: #111;
  font-family: 'Silkscreen', monospace;
  -webkit-font-smoothing: none;
  font-smooth: never;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Everything inside the scaled device is pixel-perfect */
.device-scale, .device-scale * {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: none;
  font-smooth: never;
}
```

- [ ] **Step 2: Update `index.html` title**

Change `<title>Vite + React + TS</title>` to `<title>Gabriel's DSi</title>`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css index.html
git commit -m "feat: global CSS, Silkscreen font, pixel rendering rules"
```

---

## Task 7: Screen component (pure 256×192 container)

**Files:**
- Create: `src/components/Screen.tsx`

- [ ] **Step 1: Create `src/components/Screen.tsx`**

```tsx
import type { ReactNode, CSSProperties } from 'react'

interface ScreenProps {
  children?: ReactNode
  style?: CSSProperties
}

export function Screen({ children, style }: ScreenProps) {
  return (
    <div
      style={{
        width: 256,
        height: 192,
        position: 'relative',
        overflow: 'hidden',
        background: '#1a2742',
        color: '#f0f0f0',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Screen.tsx
git commit -m "feat: add Screen component (256x192 pixel-perfect container)"
```

---

## Task 8: Device component (scaled container, stacks two screens)

**Files:**
- Create: `src/components/Device.tsx`

- [ ] **Step 1: Create `src/components/Device.tsx`**

```tsx
import type { ReactNode } from 'react'

interface DeviceProps {
  top: ReactNode
  bottom: ReactNode
  /** Integer scale multiplier for the whole device. */
  scale?: number
}

export function Device({ top, bottom, scale = 3 }: DeviceProps) {
  return (
    <div
      className="device-scale"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8, // implied hinge gap in native pixels
      }}
    >
      {top}
      {bottom}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Device.tsx
git commit -m "feat: add Device component (scaled container for two screens)"
```

---

## Task 9: InfoBar component

**Files:**
- Create: `src/components/InfoBar.tsx`

- [ ] **Step 1: Create `src/components/InfoBar.tsx`**

```tsx
import { useClock } from '../hooks/useClock'

function format2(n: number) { return n.toString().padStart(2, '0') }

export function InfoBar() {
  const now = useClock()
  const date = `${format2(now.getMonth() + 1)}/${format2(now.getDate())}`
  const time = `${format2(now.getHours())}:${format2(now.getMinutes())}`

  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4px',
        fontSize: 8,
        background: 'rgba(0,0,0,0.25)',
      }}
    >
      <span aria-label="volume">{'\u{1F50A}'}</span>
      <span>Gabriel</span>
      <span>{date} {time}</span>
      <span aria-label="battery">{'\u{1F50B}'}</span>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InfoBar.tsx
git commit -m "feat: add InfoBar with live clock"
```

---

## Task 10: TopScreen component

**Files:**
- Create: `src/components/TopScreen.tsx`

- [ ] **Step 1: Create `src/components/TopScreen.tsx`**

```tsx
import type { PortfolioApp } from '../types'
import { Screen } from './Screen'
import { InfoBar } from './InfoBar'

interface TopScreenProps {
  selectedApp: PortfolioApp
}

export function TopScreen({ selectedApp }: TopScreenProps) {
  return (
    <Screen>
      <InfoBar />
      {/* Main area */}
      <div
        style={{
          position: 'absolute',
          top: 12, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #2a4070 0%, #1a2742 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, opacity: 0.6 }}>[photo placeholder]</span>
      </div>
      {/* Welcome panel at bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: 24,
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <span style={{ fontSize: 8, fontWeight: 700 }}>{selectedApp.name}</span>
        <span style={{ fontSize: 7, opacity: 0.8 }}>{selectedApp.description}</span>
      </div>
    </Screen>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TopScreen.tsx
git commit -m "feat: add TopScreen with welcome panel"
```

---

## Task 11: AppIcon component

**Files:**
- Create: `src/components/AppIcon.tsx`

- [ ] **Step 1: Create `src/components/AppIcon.tsx`**

```tsx
import { motion } from 'framer-motion'
import type { PortfolioApp } from '../types'

interface AppIconProps {
  app: PortfolioApp
  selected: boolean
  onClick: () => void
}

export function AppIcon({ app, selected, onClick }: AppIconProps) {
  const size = selected ? 48 : 32
  return (
    <motion.button
      onClick={onClick}
      animate={selected ? { y: [0, -2, 0] } : { y: 0 }}
      transition={selected
        ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.15 }}
      style={{
        width: size,
        height: size,
        background: app.color,
        border: selected ? '2px solid #fff' : '1px solid #000',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: selected ? 10 : 8,
        color: '#000',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
        flexShrink: 0,
      }}
      aria-label={app.name}
      aria-pressed={selected}
    >
      {app.name[0]}
    </motion.button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppIcon.tsx
git commit -m "feat: add AppIcon tile with selection bounce"
```

---

## Task 12: AppRow component

**Files:**
- Create: `src/components/AppRow.tsx`

- [ ] **Step 1: Create `src/components/AppRow.tsx`**

```tsx
import type { PortfolioApp } from '../types'
import { AppIcon } from './AppIcon'

interface AppRowProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelect: (index: number) => void
  onOpen: (index: number) => void
}

export function AppRow({ apps, selectedIndex, onSelect, onOpen }: AppRowProps) {
  const handleClick = (index: number) => {
    if (index === selectedIndex) onOpen(index)
    else onSelect(index)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, top: 48,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      {apps.map((app, index) => (
        <AppIcon
          key={app.id}
          app={app}
          selected={index === selectedIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppRow.tsx
git commit -m "feat: add AppRow with click-to-select and click-to-open"
```

---

## Task 13: AppNameCard component

**Files:**
- Create: `src/components/AppNameCard.tsx`

- [ ] **Step 1: Create `src/components/AppNameCard.tsx`**

```tsx
import type { PortfolioApp } from '../types'

interface AppNameCardProps {
  app: PortfolioApp
}

export function AppNameCard({ app }: AppNameCardProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 6, left: 16, right: 16,
        height: 36,
        border: '1px solid #f0f0f0',
        background: 'rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 700 }}>{app.name}</span>
      <span style={{ fontSize: 7, opacity: 0.8, marginTop: 1 }}>by Gabriel</span>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AppNameCard.tsx
git commit -m "feat: add AppNameCard framed header"
```

---

## Task 14: Scrollbar component

**Files:**
- Create: `src/components/Scrollbar.tsx`

- [ ] **Step 1: Create `src/components/Scrollbar.tsx`**

```tsx
import type { CSSProperties } from 'react'

interface ScrollbarProps {
  total: number
  selectedIndex: number
  onLeft: () => void
  onRight: () => void
}

export function Scrollbar({ total, selectedIndex, onLeft, onRight }: ScrollbarProps) {
  const trackWidth = 208
  const thumbWidth = Math.max(16, Math.floor(trackWidth / total))
  const thumbX = Math.floor((trackWidth - thumbWidth) * (selectedIndex / Math.max(1, total - 1)))

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 4,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <button onClick={onLeft} aria-label="scroll left" style={arrowStyle}>{'<'}</button>
      <div
        style={{
          position: 'relative',
          width: trackWidth,
          height: 8,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: thumbX,
            top: 0,
            width: thumbWidth,
            height: '100%',
            background: '#f0f0f0',
          }}
        />
      </div>
      <button onClick={onRight} aria-label="scroll right" style={arrowStyle}>{'>'}</button>
    </div>
  )
}

const arrowStyle: CSSProperties = {
  width: 14,
  height: 14,
  background: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.4)',
  color: '#f0f0f0',
  fontSize: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'inherit',
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Scrollbar.tsx
git commit -m "feat: add Scrollbar with clickable arrows"
```

---

## Task 15: BottomScreen component

**Files:**
- Create: `src/components/BottomScreen.tsx`

- [ ] **Step 1: Create `src/components/BottomScreen.tsx`**

```tsx
import type { PortfolioApp } from '../types'
import { Screen } from './Screen'
import { AppNameCard } from './AppNameCard'
import { AppRow } from './AppRow'
import { Scrollbar } from './Scrollbar'

interface BottomScreenProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelect: (index: number) => void
  onOpen: (index: number) => void
  onLeft: () => void
  onRight: () => void
}

export function BottomScreen({
  apps,
  selectedIndex,
  onSelect,
  onOpen,
  onLeft,
  onRight,
}: BottomScreenProps) {
  return (
    <Screen style={{ background: '#12224a' }}>
      <AppNameCard app={apps[selectedIndex]} />
      <AppRow
        apps={apps}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onOpen={onOpen}
      />
      <Scrollbar
        total={apps.length}
        selectedIndex={selectedIndex}
        onLeft={onLeft}
        onRight={onRight}
      />
    </Screen>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BottomScreen.tsx
git commit -m "feat: compose BottomScreen from NameCard + AppRow + Scrollbar"
```

---

## Task 16: Wire everything in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { useCallback, useState } from 'react'
import { apps } from './data/apps'
import { moveLeft, moveRight } from './logic/selection'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { Device } from './components/Device'
import { TopScreen } from './components/TopScreen'
import { BottomScreen } from './components/BottomScreen'

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onLeft = useCallback(() => {
    setSelectedIndex((i) => moveLeft(i, apps.length))
  }, [])

  const onRight = useCallback(() => {
    setSelectedIndex((i) => moveRight(i, apps.length))
  }, [])

  const onOpen = useCallback((index: number) => {
    console.log('open app', apps[index].id)
  }, [])

  const onConfirm = useCallback(() => {
    onOpen(selectedIndex)
  }, [onOpen, selectedIndex])

  useKeyboardInput({ onLeft, onRight, onConfirm })

  return (
    <Device
      top={<TopScreen selectedApp={apps[selectedIndex]} />}
      bottom={
        <BottomScreen
          apps={apps}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          onOpen={onOpen}
          onLeft={onLeft}
          onRight={onRight}
        />
      }
    />
  )
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: All tests pass (selection: 4, useClock: 2, useKeyboardInput: 4 = 10 total).

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire home screen state, inputs, and layout in App"
```

---

## Task 17: Manual verification

**Files:** none

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Open http://localhost:5173 in a browser and verify the success criteria**

Verify each one:
1. Two vertically-stacked pixelated screens centered on a warm-gray background
2. Top screen shows an info bar (with live clock updating every second) and a main area
3. Bottom screen shows app name card, app row with 5 tiles, and a scrollbar
4. `ArrowLeft` / `ArrowRight` moves selection; selection is clamped at both ends
5. `Enter` and `Space` log `open app <id>` to the console
6. Clicking an app tile selects it; clicking the selected tile again logs `open app <id>`
7. Clicking the scrollbar `<` and `>` arrows moves selection
8. The selected tile has a gentle bounce animation (~800ms loop)
9. The welcome panel on the top screen updates to show the selected app's name and description
10. Font rendering looks pixel-crisp (no antialiasing blur)

- [ ] **Step 3: If any criterion fails, note the issue and fix it**

Fix issues in the relevant component and re-verify. Commit fixes as separate commits with `fix:` prefix.

- [ ] **Step 4: Stop the dev server** (Ctrl+C)

- [ ] **Step 5: Run the full test suite one more time**

Run: `npm test`
Expected: All tests still pass.

- [ ] **Step 6: Final commit if needed**

If fixes were made:
```bash
git add -u
git commit -m "fix: address manual verification issues"
```

Otherwise skip.

---

## Success

When all tasks are checked off and manual verification passes, V1 is done. The home screen scaffold is in place, with a clean component tree ready to grow into future iterations (boot sequence, audio, apps, camera).
