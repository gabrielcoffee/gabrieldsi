import { useCallback, useEffect, useRef, useState } from 'react'

function makeAudio(src: string, volume = 0.6): HTMLAudioElement {
  const a = new Audio(src)
  a.preload = 'auto'
  a.volume = volume
  return a
}

export function useSounds() {
  const [muted, setMuted] = useState(false)

  const menuRef     = useRef<HTMLAudioElement | null>(null)
  const enterAppRef = useRef<HTMLAudioElement | null>(null)
  const cameraRef   = useRef<HTMLAudioElement | null>(null)
  const moveRef     = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const menu = makeAudio('/audio/menu.mp3', 0.5)
    menu.loop  = true

    menuRef.current     = menu
    enterAppRef.current = makeAudio('/audio/enter_app.mp3')
    cameraRef.current   = makeAudio('/audio/camera.mp3')
    moveRef.current     = makeAudio('/audio/navigation.wav')

    const startMusic = () => menu.play().catch(() => {})

    // Try immediately — works if browser allows autoplay for this origin
    startMusic()

    // Retry on first user gesture (covers autoplay-blocked browsers)
    const onGesture = () => {
      startMusic()
      ;['pointerdown', 'keydown', 'touchstart'].forEach(e =>
        window.removeEventListener(e, onGesture)
      )
    }
    ;['pointerdown', 'keydown', 'touchstart'].forEach(e =>
      window.addEventListener(e, onGesture)
    )

    return () => {
      menu.pause()
      ;['pointerdown', 'keydown', 'touchstart'].forEach(e =>
        window.removeEventListener(e, onGesture)
      )
    }
  }, [])

  useEffect(() => {
    ;[menuRef, enterAppRef, cameraRef, moveRef].forEach(r => {
      if (r.current) r.current.muted = muted
    })
  }, [muted])

  const playEnterApp = useCallback(() => {
    const a = enterAppRef.current
    if (!a) return
    a.currentTime = 0
    a.play().catch(() => {})
  }, [])

  const playCamera = useCallback(() => {
    const a = cameraRef.current
    if (!a) return
    a.currentTime = 0
    a.play().catch(() => {})
  }, [])

  const playMove = useCallback(() => {
    const a = moveRef.current
    if (!a) return
    a.currentTime = 0
    a.play().catch(() => {})
  }, [])

  const toggleMute = useCallback(() => setMuted(m => !m), [])

  return { muted, toggleMute, playEnterApp, playCamera, playMove }
}
