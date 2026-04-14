import { useAnimate, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { PortfolioApp } from '../types'
import { EMPTY_SLOT_COUNT } from '../data/apps'
import { AppIcon } from './AppIcon'

interface AppRowProps {
  apps: PortfolioApp[]
  selectedIndex: number
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

export function AppRow({ apps, selectedIndex }: AppRowProps) {
  const totalSlots = apps.length + EMPTY_SLOT_COUNT
  const translateX = FRAME_LEFT - selectedIndex * SLOT_PITCH

  const [selectorScope, animateSelector] = useAnimate()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    animateSelector(selectorScope.current, { scale: [1, 0.92, 1] }, { duration: 0.12, ease: 'easeInOut', delay: 0.12 })
  }, [selectedIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, top: ROW_TOP_Y,
        height: FRAME_HEIGHT,
      }}
    >
      {/* Sliding row of slots */}
      <motion.div
        animate={{ x: translateX }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        style={{
          position: 'absolute',
          left: 0,
          top: ICON_Y_OFFSET,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {Array.from({ length: totalSlots }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: INTRO_START_Y }}
            animate={{ y: [INTRO_START_Y, 0, -50, 0, -18, 0, -6, 0] }}
            transition={{
              duration: 1.4,
              delay: i * 0.1,
              times: [0, 0.38, 0.53, 0.68, 0.77, 0.87, 0.93, 1.0],
              ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
            }}
            style={{
              width: SLOT_PITCH,
              height: SLOT_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {i < apps.length ? <AppIcon app={apps[i]} /> : <AppIcon empty />}
          </motion.div>
        ))}
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
        }}
      />
    </div>
  )
}
