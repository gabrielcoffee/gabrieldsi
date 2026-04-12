import type { PortfolioApp } from '../types'

interface AppIconProps {
  app?: PortfolioApp
  empty?: boolean
}

const SPRITE_WIDTH = 50
const SPRITE_HEIGHT = 56
const SHADOW_WIDTH = 42
const SHADOW_HEIGHT = 4

export function AppIcon({ app, empty }: AppIconProps) {
  const isEmpty = empty || !app
  const src = isEmpty ? '/empty.png' : '/about_me.png'
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
      {!isEmpty && (
        <img
          src="/shadow.png"
          alt=""
          style={{ width: SHADOW_WIDTH, height: SHADOW_HEIGHT, display: 'block' }}
        />
      )}
    </div>
  )
}
