import { useCallback, useState } from 'react'
import { apps, EMPTY_SLOT_COUNT } from './data/apps'
import { moveLeft, moveRight } from './logic/selection'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { Device } from './components/Device'
import { TopScreen } from './components/TopScreen'
import { BottomScreen } from './components/BottomScreen'

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const totalSlots = apps.length + EMPTY_SLOT_COUNT

  const onLeft = useCallback(() => {
    setSelectedIndex((i) => moveLeft(i, totalSlots))
  }, [totalSlots])

  const onRight = useCallback(() => {
    setSelectedIndex((i) => moveRight(i, totalSlots))
  }, [totalSlots])

  const onConfirm = useCallback(() => {
    if (selectedIndex < apps.length) {
      console.log('open app', apps[selectedIndex].id)
    }
  }, [selectedIndex])

  useKeyboardInput({ onLeft, onRight, onConfirm })

  return (
    <Device
      top={<TopScreen selectedApp={apps[selectedIndex]} />}
      bottom={<BottomScreen apps={apps} selectedIndex={selectedIndex} />}
    />
  )
}
