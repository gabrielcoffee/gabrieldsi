import type { AppId, PortfolioApp } from '../types'

interface AppIconProps {
  app?: PortfolioApp
  empty?: boolean
  onClick?: () => void
}

const SPRITE_WIDTH = 50
const SPRITE_HEIGHT = 56
const SHADOW_WIDTH = 42
const SHADOW_HEIGHT = 4

const SPRITES: Record<AppId, string> = {
  about:    '/images/about_me.gif',
  projects: '/images/projects.gif',
  music:    '/images/about_me.png',
  camera:   '/images/about_me.png',
  contact:  '/images/about_me.png',
}

export function AppIcon({ app, empty, onClick }: AppIconProps) {
  const isEmpty = empty || !app
  const src = isEmpty ? '/images/empty.png' : SPRITES[app.id]
  const alt = isEmpty ? '' : (app?.name ?? '')
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: SPRITE_WIDTH, height: SPRITE_HEIGHT, display: 'block' }}
      />
      <img
        src="/images/shadow.png"
        alt=""
        draggable={false}
        style={{ width: SHADOW_WIDTH, height: SHADOW_HEIGHT, display: 'block' }}
      />
    </div>
  )
}
