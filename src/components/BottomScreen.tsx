import { useCallback, useState } from 'react'
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
  introComplete: boolean
  isOpeningApp?: boolean
}

export function BottomScreen({ apps, selectedIndex, onSelectIndex, onConfirm, introComplete, isOpeningApp }: BottomScreenProps) {
  const [isScrollbarActive, setIsScrollbarActive] = useState(false)
  const [isRowDragging, setIsRowDragging] = useState(false)
  const totalSlots = apps.length + EMPTY_SLOT_COUNT

  const isInteracting = isScrollbarActive || isRowDragging
  const isEmptySlot = selectedIndex >= apps.length

  const showBubble = introComplete && !isInteracting && !isEmptySlot && !isOpeningApp
  const showSelector = !isInteracting && introComplete && !isEmptySlot && !isOpeningApp

  const handleScrollbarDragStart = useCallback(() => setIsScrollbarActive(true), [])
  const handleScrollbarDragEnd = useCallback(() => setIsScrollbarActive(false), [])
  const handleRowDragStart = useCallback(() => setIsRowDragging(true), [])
  const handleRowDragEnd = useCallback(() => setIsRowDragging(false), [])

  return (
    <Screen>
      {/* Info bubble */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showBubble ? 1 : 0 }}
        transition={{ duration: 0.15, ease: 'easeOut', delay: showBubble ? 0.08 : 0 }}
      >
        <AppNameCard app={apps[selectedIndex]} />
      </motion.div>

      <AppRow
        apps={apps}
        selectedIndex={selectedIndex}
        onSelectIndex={onSelectIndex}
        onConfirm={onConfirm}
        hideSelector={!showSelector}
        onDragStart={handleRowDragStart}
        onDragEnd={handleRowDragEnd}
        openingIndex={isOpeningApp ? selectedIndex : null}
      />
      <Scrollbar
        selectedIndex={selectedIndex}
        totalSlots={totalSlots}
        onSelectIndex={onSelectIndex}
        onDragStart={handleScrollbarDragStart}
        onDragEnd={handleScrollbarDragEnd}
      />

      {/* White overlay — intro fade-out + app opening fade-in */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpeningApp ? 1 : 0 }}
        transition={{ duration: isOpeningApp ? 1 : 0.8, ease: 'easeOut' }}
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
