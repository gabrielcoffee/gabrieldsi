import type { PortfolioApp } from '../types'
import { Screen } from './Screen'
import { InfoBar } from './InfoBar'

interface TopScreenProps {
  selectedApp: PortfolioApp
}

export function TopScreen({ selectedApp }: TopScreenProps) {
  return (
    <Screen>
      <InfoBar />
      {/* Main area */}
      <div
        style={{
          position: 'absolute',
          top: 12, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(180deg, #2a4070 0%, #1a2742 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, opacity: 0.6 }}>[photo placeholder]</span>
      </div>
      {/* Welcome panel at bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: 24,
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <span style={{ fontSize: 8, fontWeight: 700 }}>{selectedApp.name}</span>
        <span style={{ fontSize: 7, opacity: 0.8 }}>{selectedApp.description}</span>
      </div>
    </Screen>
  )
}
