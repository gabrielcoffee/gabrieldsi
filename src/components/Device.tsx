import type { ReactNode } from 'react'

interface DeviceProps {
  top: ReactNode
  bottom: ReactNode
  /** Integer scale multiplier for the whole device. */
  scale?: number
}

const SCREEN_WIDTH = 256
const SCREEN_HEIGHT = 192
const HINGE_GAP = 8

export function Device({ top, bottom, scale = 2 }: DeviceProps) {
  const unscaledHeight = SCREEN_HEIGHT * 2 + HINGE_GAP // 392

  // Wrap the scaled element in a box whose layout size equals the *rendered*
  // size, so flexbox on <body> reserves enough room and nothing gets clipped.
  return (
    <div
      style={{
        width: SCREEN_WIDTH * scale,
        height: unscaledHeight * scale,
        position: 'relative',
      }}
    >
      <div
        className="device-scale"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: SCREEN_WIDTH,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: HINGE_GAP,
        }}
      >
        {top}
        {bottom}
      </div>
    </div>
  )
}
