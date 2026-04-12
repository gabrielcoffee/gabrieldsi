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
