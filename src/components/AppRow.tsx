import { useAnimate, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { PortfolioApp } from '../types'
import { EMPTY_SLOT_COUNT } from '../data/apps'
import { clampIndex } from '../logic/selection'
import { AppIcon } from './AppIcon'

interface AppRowProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelectIndex: (index: number) => void
  onConfirm: () => void
  hideSelector?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
  openingIndex?: number | null
}

const SLOT_PITCH = 64
const SLOT_HEIGHT = 60 // sprite (56) + shadow (4)
const FRAME_WIDTH = 64
const FRAME_HEIGHT = 80
const SCREEN_WIDTH = 256
const FRAME_LEFT = (SCREEN_WIDTH - FRAME_WIDTH) / 2 // 96

const ROW_TOP_Y = 82      // moves the entire band (icons + selector frame) up/down
const ICON_Y_OFFSET = (FRAME_HEIGHT - SLOT_HEIGHT) / 2.5  // moves only icons within the band; tweak to shift icons independently of the selector

// Icons start from the very top of the bottom screen (clipped by overflow:hidden)
// and drop into position — no overflow above the screen needed.
const INTRO_START_Y = -(ROW_TOP_Y + ICON_Y_OFFSET + SLOT_HEIGHT) // ≈ -152

const MOMENTUM_FACTOR = 0.015 // seconds of projected travel for velocity-based momentum
const DRAG_DAMPEN = 0.4       // finger-to-row movement ratio (< 1 = heavier feel)

// Only the first 4 apps get the drop animation, staggered right-to-left
const ANIMATED_COUNT = 4

// How far the icon travels upward when opening an app (off the top of the screen)
const OPEN_FLY_Y = -250

export function AppRow({ apps, selectedIndex, onSelectIndex, onConfirm, hideSelector, onDragStart, onDragEnd, openingIndex }: AppRowProps) {
  const totalSlots = apps.length + EMPTY_SLOT_COUNT
  const translateX = FRAME_LEFT - selectedIndex * SLOT_PITCH

  const [dragOffset, setDragOffset] = useState(0)
  const isPanningRef = useRef(false)

  const [selectorScope, animateSelector] = useAnimate()
  const isFirstRender = useRef(true)
  const hasShownOnce = useRef(false)

  // Track when selector first becomes visible (intro complete)
  useEffect(() => {
    if (!hideSelector) hasShownOnce.current = true
  }, [hideSelector])

  // Scale pulse on navigation (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!hideSelector) {
      animateSelector(selectorScope.current, { scale: [1, 0.92, 1] }, { duration: 0.12, ease: 'easeInOut', delay: 0.12 })
    }
  }, [selectedIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePanStart = useCallback(() => {
    isPanningRef.current = true
    onDragStart?.()
  }, [onDragStart])

  const handlePan = useCallback((_: unknown, info: { offset: { x: number } }) => {
    setDragOffset(info.offset.x * DRAG_DAMPEN)
  }, [])

  const handlePanEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const dampedOffset = info.offset.x * DRAG_DAMPEN
    const rawDelta = -(dampedOffset + info.velocity.x * MOMENTUM_FACTOR) / SLOT_PITCH
    const newIndex = clampIndex(selectedIndex + Math.round(rawDelta), totalSlots)
    setDragOffset(0)
    onSelectIndex(newIndex)
    onDragEnd?.()

    // Reset panning flag after click events have fired
    requestAnimationFrame(() => {
      isPanningRef.current = false
    })
  }, [selectedIndex, totalSlots, onSelectIndex, onDragEnd])

  const handleSlotClick = useCallback((i: number) => {
    if (isPanningRef.current) return
    if (i === selectedIndex) {
      onConfirm()
    } else {
      onSelectIndex(i)
    }
  }, [selectedIndex, onConfirm, onSelectIndex])

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, top: ROW_TOP_Y,
        height: FRAME_HEIGHT,
      }}
    >
      {/* Sliding row of slots — pan handlers live here so drags from icons work */}
      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        animate={{ x: translateX + dragOffset }}
        transition={dragOffset !== 0
          ? { type: 'tween', duration: 0 }
          : { type: 'spring', stiffness: 300, damping: 30, bounce: 0 }
        }
        style={{
          position: 'absolute',
          left: 0,
          top: ICON_Y_OFFSET,
          display: 'flex',
          flexDirection: 'row',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {Array.from({ length: totalSlots }).map((_, i) => {
          const shouldAnimate = i < ANIMATED_COUNT
          const isOpening = openingIndex === i
          return (
            <motion.div
              key={i}
              initial={shouldAnimate ? { y: INTRO_START_Y } : { y: 0 }}
              animate={
                isOpening
                  ? { y: OPEN_FLY_Y }
                  : shouldAnimate
                    ? { y: [INTRO_START_Y, 0, -40, 0, -14, 0] }
                    : { y: 0 }
              }
              transition={
                isOpening
                  ? { type: 'tween', duration: 0.6, ease: 'linear' }
                  : shouldAnimate
                    ? {
                        duration: 1.2,
                        delay: (ANIMATED_COUNT - 1 - i) * 0.1,
                        times: [0, 0.42, 0.58, 0.75, 0.88, 1.0],
                        ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
                      }
                    : undefined
              }
              style={{
                width: SLOT_PITCH,
                height: SLOT_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {i < apps.length
                ? <AppIcon app={apps[i]} onClick={() => handleSlotClick(i)} />
                : <AppIcon empty />
              }
            </motion.div>
          )
        })}
      </motion.div>

      {/* Fixed selection frame, centered */}
      <img
        ref={selectorScope}
        src="/images/selected.png"
        alt=""
        style={{
          position: 'absolute',
          left: FRAME_LEFT,
          top: 0,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          pointerEvents: 'none',
          display: 'block',
          opacity: hideSelector ? 0 : 1,
        }}
      />
    </div>
  )
}
