import { useCallback, useEffect, useState } from 'react'
import { apps, EMPTY_SLOT_COUNT } from './data/apps'
import { projects } from './data/projects'
import { moveLeft, moveRight } from './logic/selection'
import { useKeyboardInput } from './hooks/useKeyboardInput'
import { useCamera } from './hooks/useCamera'
import { useSounds } from './hooks/useSounds'
import { Device } from './components/Device'
import { TopScreen } from './components/TopScreen'
import { BottomScreen } from './components/BottomScreen'
import { ProjectsTopScreen } from './components/projects/ProjectsTopScreen'
import { ProjectsBottomScreen } from './components/projects/ProjectsBottomScreen'
import type { AppId } from './types'

const INTRO_DELAY_MS = 1500
const OPEN_ANIMATION_MS = 1100

const APP_URLS: Partial<Record<AppId, string>> = {
  music: 'https://www.youtube.com/@coffeehead01',
}

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [introComplete, setIntroComplete] = useState(false)
  const [openingApp, setOpeningApp] = useState<AppId | null>(null)
  const [activeApp, setActiveApp] = useState<AppId | null>(null)
  const [projectIndex, setProjectIndex] = useState(0)
  const totalSlots = apps.length + EMPTY_SLOT_COUNT
  const { stream: cameraStream, toggle: toggleCamera } = useCamera()
  const { muted, toggleMute, playEnterApp, playCamera, playMove, fadeOutMusic, restartMusic } = useSounds()

  const isOpeningApp = openingApp !== null
  const inputEnabled = introComplete && !isOpeningApp && !activeApp

  useEffect(() => {
    const id = setTimeout(() => setIntroComplete(true), INTRO_DELAY_MS)
    return () => clearTimeout(id)
  }, [])

  // After opening animation, navigate or activate app
  useEffect(() => {
    if (!openingApp) return
    const id = setTimeout(() => {
      const url = APP_URLS[openingApp]
      if (url) {
        window.open(url, '_blank')
      } else {
        setActiveApp(openingApp)
      }
    }, OPEN_ANIMATION_MS)
    return () => clearTimeout(id)
  }, [openingApp])

  const onLeft = useCallback(() => {
    setSelectedIndex((i) => {
      const next = moveLeft(i, totalSlots)
      if (next !== i) playMove()
      return next
    })
  }, [totalSlots, playMove])

  const onRight = useCallback(() => {
    setSelectedIndex((i) => {
      const next = moveRight(i, totalSlots)
      if (next !== i) playMove()
      return next
    })
  }, [totalSlots, playMove])

  const onConfirm = useCallback(() => {
    if (selectedIndex < apps.length && !isOpeningApp) {
      playEnterApp()
      fadeOutMusic()
      setOpeningApp(apps[selectedIndex].id)
    }
  }, [selectedIndex, isOpeningApp, playEnterApp, fadeOutMusic])

  const onSelectIndex = useCallback((index: number) => {
    if (!introComplete || isOpeningApp) return
    setSelectedIndex((prev) => {
      if (prev !== index) playMove()
      return index
    })
  }, [playMove, introComplete, isOpeningApp])

  // Project navigation
  const onUp = useCallback(() => {
    if (activeApp !== 'projects') return
    setProjectIndex((i) => {
      const next = Math.max(0, i - 1)
      if (next !== i) playMove()
      return next
    })
  }, [activeApp, playMove])

  const onDown = useCallback(() => {
    if (activeApp !== 'projects') return
    setProjectIndex((i) => {
      const next = Math.min(projects.length - 1, i + 1)
      if (next !== i) playMove()
      return next
    })
  }, [activeApp, playMove])

  // Return to home menu
  const onBack = useCallback(() => {
    if (!activeApp) return
    setActiveApp(null)
    setOpeningApp(null)
    setSelectedIndex(0)
    setProjectIndex(0)
    setIntroComplete(false)
    restartMusic()
    // Re-trigger intro delay
    setTimeout(() => setIntroComplete(true), INTRO_DELAY_MS)
  }, [activeApp, restartMusic])

  const onCameraShutter = cameraStream ? () => playCamera() : undefined

  useKeyboardInput({
    onLeft,
    onRight,
    onConfirm,
    onCamera: toggleCamera,
    onCameraShutter,
    onUp,
    onDown,
    onBack,
    enabled: activeApp ? true : inputEnabled,
  })

  // Projects view
  if (activeApp === 'projects') {
    return (
      <Device
        top={<ProjectsTopScreen projects={projects} selectedIndex={projectIndex} />}
        bottom={<ProjectsBottomScreen project={projects[projectIndex]} />}
      />
    )
  }

  // Home menu
  return (
    <>
      <Device
        top={<TopScreen cameraStream={cameraStream} muted={muted} toggleMute={toggleMute} isOpeningApp={isOpeningApp} />}
        bottom={<BottomScreen apps={apps} selectedIndex={selectedIndex} onSelectIndex={onSelectIndex} onConfirm={onConfirm} introComplete={introComplete} isOpeningApp={isOpeningApp} />}
      />
    </>
  )
}
