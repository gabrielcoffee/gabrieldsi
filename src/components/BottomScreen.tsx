import type { PortfolioApp } from '../types'
import { Screen } from './Screen'
import { AppNameCard } from './AppNameCard'
import { AppRow } from './AppRow'
import { Scrollbar } from './Scrollbar'

interface BottomScreenProps {
  apps: PortfolioApp[]
  selectedIndex: number
}

export function BottomScreen({ apps, selectedIndex }: BottomScreenProps) {
  return (
    <Screen>
      <AppNameCard app={apps[selectedIndex]} />
      <AppRow apps={apps} selectedIndex={selectedIndex} />
      <Scrollbar />
    </Screen>
  )
}
