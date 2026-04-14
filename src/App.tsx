import { useCallback, useState } from 'react'
import { apps, EMPTY_SLOT_COUNT } from './data/apps'
import { moveLeft, moveRight } from './logic/selection'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { useCamera } from './hooks/useCamera'
import { useSounds } from './hooks/useSounds'
import { Device } from './components/Device'
import { TopScreen } from './components/TopScreen'
import { BottomScreen } from './components/BottomScreen'

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const totalSlots = apps.length + EMPTY_SLOT_COUNT
  const { stream: cameraStream, toggle: toggleCamera } = useCamera()
  const { muted, toggleMute, playEnterApp, playCamera, playMove } = useSounds()

  const onLeft = useCallback(() => {
    setSelectedIndex((i) => moveLeft(i, totalSlots))
    playMove()
  }, [totalSlots, playMove])

  const onRight = useCallback(() => {
    setSelectedIndex((i) => moveRight(i, totalSlots))
    playMove()
  }, [totalSlots, playMove])

  const onConfirm = useCallback(() => {
    if (selectedIndex < apps.length) playEnterApp()
  }, [selectedIndex, playEnterApp])

  const onCameraShutter = cameraStream ? () => playCamera() : undefined

  useKeyboardInput({ onLeft, onRight, onConfirm, onCamera: toggleCamera, onCameraShutter })

  return (
    <>
      {/* Mute toggle — fixed to top-right of the page */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 100,
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 6,
          color: '#fff',
          fontSize: 18,
          width: 36,
          height: 36,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span className="material-icons" style={{ fontSize: 20, lineHeight: 1 }}>
          {muted ? 'volume_off' : 'volume_up'}
        </span>
      </button>

      <Device
        top={<TopScreen cameraStream={cameraStream} />}
        bottom={<BottomScreen apps={apps} selectedIndex={selectedIndex} />}
      />
    </>
  )
}
