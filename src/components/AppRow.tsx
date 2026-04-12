import { motion } from 'framer-motion'
import type { PortfolioApp } from '../types'
import { EMPTY_SLOT_COUNT } from '../data/apps'
import { AppIcon } from './AppIcon'

interface AppRowProps {
  apps: PortfolioApp[]
  selectedIndex: number
}

const SLOT_PITCH = 64
const SLOT_HEIGHT = 56
const FRAME_WIDTH = 64
const FRAME_HEIGHT = 80
const SCREEN_WIDTH = 256
const FRAME_LEFT = (SCREEN_WIDTH - FRAME_WIDTH) / 2 // 96

const ROW_TOP_Y = 80

export function AppRow({ apps, selectedIndex }: AppRowProps) {
  const totalSlots = apps.length + EMPTY_SLOT_COUNT
  const translateX = FRAME_LEFT - selectedIndex * SLOT_PITCH

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
          // Sprite (56 tall) vertically centered inside the 80-tall frame band.
          top: (FRAME_HEIGHT - SLOT_HEIGHT) / 2,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {Array.from({ length: totalSlots }).map((_, i) => (
          <div
            key={i}
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
          </div>
        ))}
      </motion.div>

      {/* Fixed selection frame, centered */}
      <img
        src="/selected.png"
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
