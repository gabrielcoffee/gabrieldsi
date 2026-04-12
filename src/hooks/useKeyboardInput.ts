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
