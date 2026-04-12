import type { PortfolioApp } from '../types'
import { Screen } from './Screen'
import { AppNameCard } from './AppNameCard'
import { AppRow } from './AppRow'
import { Scrollbar } from './Scrollbar'

interface BottomScreenProps {
  apps: PortfolioApp[]
  selectedIndex: number
  onSelect: (index: number) => void
  onOpen: (index: number) => void
  onLeft: () => void
  onRight: () => void
}

export function BottomScreen({
  apps,
  selectedIndex,
  onSelect,
  onOpen,
  onLeft,
  onRight,
}: BottomScreenProps) {
  return (
    <Screen style={{ background: '#12224a' }}>
      <AppNameCard app={apps[selectedIndex]} />
      <AppRow
        apps={apps}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
        onOpen={onOpen}
      />
      <Scrollbar
        total={apps.length}
        selectedIndex={selectedIndex}
        onLeft={onLeft}
        onRight={onRight}
      />
    </Screen>
  )
}
