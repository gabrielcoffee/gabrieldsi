import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { PortfolioApp } from '../types'
import { EMPTY_SLOT_COUNT } from '../data/apps'
import { Screen } from './Screen'
import { AppNameCard } from './AppNameCard'
import { AppRow } from './AppRow'
import { Scrollbar } from './Scrollbar'

interface BottomScreenProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelectIndex: (index: number) => void
  onConfirm: () => void
}

const INTRO_DELAY_MS = 1400

export function BottomScreen({ apps, selectedIndex, onSelectIndex, onConfirm }: BottomScreenProps) {
  const [isScrollbarActive, setIsScrollbarActive] = useState(false)
  const [isRowDragging, setIsRowDragging] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const totalSlots = apps.length + EMPTY_SLOT_COUNT

  const isInteracting = isScrollbarActive || isRowDragging

  useEffect(() => {
    const id = setTimeout(() => setIntroComplete(true), INTRO_DELAY_MS)
    return () => clearTimeout(id)
  }, [])

  const handleScrollbarDragStart = useCallback(() => setIsScrollbarActive(true), [])
  const handleScrollbarDragEnd = useCallback(() => setIsScrollbarActive(false), [])
  const handleRowDragStart = useCallback(() => setIsRowDragging(true), [])
  const handleRowDragEnd = useCallback(() => setIsRowDragging(false), [])

  return (
    <Screen>
      {/* Info bubble — hidden during intro and during any drag interaction */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={introComplete && !isInteracting
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <AppNameCard app={apps[selectedIndex]} />
      </motion.div>

      <AppRow
        apps={apps}
        selectedIndex={selectedIndex}
        onSelectIndex={onSelectIndex}
        onConfirm={onConfirm}
        hideSelector={isInteracting || !introComplete}
        onDragStart={handleRowDragStart}
        onDragEnd={handleRowDragEnd}
      />
      <Scrollbar
        selectedIndex={selectedIndex}
        totalSlots={totalSlots}
        onSelectIndex={onSelectIndex}
        onDragStart={handleScrollbarDragStart}
        onDragEnd={handleScrollbarDragEnd}
      />

      {/* White intro overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#fff',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />
    </Screen>
  )
}
