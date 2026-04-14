import { useEffect, useRef } from 'react'

export interface KeyboardHandlers {
  onLeft: () => void
  onRight: () => void
  onConfirm: () => void
  onCamera?: () => void
  onCameraShutter?: () => void
}

export function useKeyboardInput(handlers: KeyboardHandlers): void {
  const ref = useRef(handlers)
  useEffect(() => { ref.current = handlers })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':  ref.current.onLeft(); break
        case 'ArrowRight': ref.current.onRight(); break
        case 'Enter':
        case ' ':
          if (ref.current.onCameraShutter) ref.current.onCameraShutter()
          else ref.current.onConfirm()
          break
        case 'l':
        case 'L':
        case 'r':
        case 'R': ref.current.onCamera?.(); break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}
