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
        borderRadius: 3,
        backgroundColor: '#1a2742',
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: '256px 192px',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        color: '#f0f0f0',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
