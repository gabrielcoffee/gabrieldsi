import type { PortfolioApp } from '../types'

interface AppNameCardProps {
  app: PortfolioApp | undefined
}

const BUBBLE_WIDTH = 250
const BUBBLE_HEIGHT = 85
const SCREEN_WIDTH = 256

// ⬇ Tweak me: vertical offset of the info bubble from the top of the bottom screen.
const BUBBLE_TOP_Y = 6

export function AppNameCard({ app }: AppNameCardProps) {
  const left = (SCREEN_WIDTH - BUBBLE_WIDTH) / 2 // 3
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: BUBBLE_TOP_Y,
        width: BUBBLE_WIDTH,
        height: BUBBLE_HEIGHT,
      }}
    >
      <img
        src="/info_bubble.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#222',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700 }}>{app?.name ?? ''}</span>
        <span style={{ fontSize: 7, opacity: 0.8, marginTop: 2 }}>
          {app ? 'by Gabriel' : ''}
        </span>
      </div>
    </div>
  )
}
