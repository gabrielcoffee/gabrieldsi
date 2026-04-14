import type { AppId, PortfolioApp } from '../types'

interface AppIconProps {
  app?: PortfolioApp
  empty?: boolean
}

const SPRITE_WIDTH = 50
const SPRITE_HEIGHT = 56
const SHADOW_WIDTH = 42
const SHADOW_HEIGHT = 4

const SPRITES: Record<AppId, string> = {
  about:    '/images/about_me.png',
  projects: '/images/projects.gif',
  music:    '/images/about_me.png',
  camera:   '/images/about_me.png',
  contact:  '/images/about_me.png',
}

export function AppIcon({ app, empty }: AppIconProps) {
  const isEmpty = empty || !app
  const src = isEmpty ? '/images/empty.png' : SPRITES[app.id]
  const alt = isEmpty ? '' : (app?.name ?? '')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: SPRITE_WIDTH, height: SPRITE_HEIGHT, display: 'block' }}
      />
      <img
        src="/images/shadow.png"
        alt=""
        style={{ width: SHADOW_WIDTH, height: SHADOW_HEIGHT, display: 'block' }}
      />
    </div>
  )
}
