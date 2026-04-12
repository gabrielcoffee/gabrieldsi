import type { PortfolioApp } from '../types'
import { AppIcon } from './AppIcon'

interface AppRowProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelect: (index: number) => void
  onOpen: (index: number) => void
}

export function AppRow({ apps, selectedIndex, onSelect, onOpen }: AppRowProps) {
  const handleClick = (index: number) => {
    if (index === selectedIndex) onOpen(index)
    else onSelect(index)
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, top: 48,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      {apps.map((app, index) => (
        <AppIcon
          key={app.id}
          app={app}
          selected={index === selectedIndex}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}
