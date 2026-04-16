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

  const onSelectIndex = useCallback((index: number) => {
    setSelectedIndex((prev) => {
      if (prev !== index) playMove()
      return index
    })
  }, [playMove])

  const onCameraShutter = cameraStream ? () => playCamera() : undefined

  useKeyboardInput({ onLeft, onRight, onConfirm, onCamera: toggleCamera, onCameraShutter })

  return (
    <>
      <Device
        top={<TopScreen cameraStream={cameraStream} muted={muted} toggleMute={toggleMute} />}
        bottom={<BottomScreen apps={apps} selectedIndex={selectedIndex} onSelectIndex={onSelectIndex} onConfirm={onConfirm} />}
      />
    </>
  )
}
