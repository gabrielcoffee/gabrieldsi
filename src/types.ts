export type AppId = 'about' | 'projects' | 'music' | 'camera' | 'contact'

export interface PortfolioApp {
  id: AppId
  name: string
  description: string
  /** Placeholder color for the icon in V1 (pixel art comes later). */
  color: string
}
