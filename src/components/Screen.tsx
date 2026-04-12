import type { ReactNode, CSSProperties } from 'react'

interface ScreenProps {
  children?: ReactNode
  style?: CSSProperties
}

export function Screen({ children, style }: ScreenProps) {
  return (
    <div
      style={{
        width: 256,
        height: 192,
        position: 'relative',
        overflow: 'hidden',
        background: '#1a2742',
        color: '#f0f0f0',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
