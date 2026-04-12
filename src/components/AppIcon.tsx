import type { PortfolioApp } from '../types'

interface AppIconProps {
  app?: PortfolioApp
  empty?: boolean
}

export function AppIcon({ app, empty }: AppIconProps) {
  const isEmpty = empty || !app
  const src = isEmpty ? '/empty.png' : '/about_me.png'
  const alt = isEmpty ? '' : (app?.name ?? '')
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: 50, height: 56, display: 'block' }}
    />
  )
}
