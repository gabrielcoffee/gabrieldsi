import type { PortfolioApp } from '../types'

interface AppNameCardProps {
  app: PortfolioApp
}

export function AppNameCard({ app }: AppNameCardProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 6, left: 16, right: 16,
        height: 36,
        border: '1px solid #f0f0f0',
        background: 'rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 700 }}>{app.name}</span>
      <span style={{ fontSize: 7, opacity: 0.8, marginTop: 1 }}>by Gabriel</span>
    </div>
  )
}
