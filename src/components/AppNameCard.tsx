import type { PortfolioApp } from '../types'

interface AppNameCardProps {
  app: PortfolioApp | undefined
}

const BUBBLE_WIDTH = 250
const BUBBLE_HEIGHT = 85
const SCREEN_WIDTH = 256


const BUBBLE_TOP_Y = 2

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
        zIndex: 10,
      }}
    >
      <img
        src="/images/info_bubble.png"
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 11,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#222',
          textAlign: 'center',
          padding: '0 16px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'RodinNTLG, sans-serif' }}>{app?.name ?? ''}</span>
        <span style={{ fontSize: 12, fontWeight: 300, opacity: 0.8, marginTop: -1, fontFamily: 'RodinNTLG, sans-serif' }}>
          {app ? 'by Gabriel' : ''}
        </span>
      </div>
    </div>
  )
}
