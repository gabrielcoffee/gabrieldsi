import type { ReactNode } from 'react'

interface DeviceProps {
  top: ReactNode
  bottom: ReactNode
  /** Integer scale multiplier for the whole device. */
  scale?: number
}

export function Device({ top, bottom, scale = 3 }: DeviceProps) {
  return (
    <div
      className="device-scale"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8, // implied hinge gap in native pixels
      }}
    >
      {top}
      {bottom}
    </div>
  )
}
