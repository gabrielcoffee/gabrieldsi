import { motion } from 'framer-motion'
import type { PortfolioApp } from '../types'

interface AppIconProps {
  app: PortfolioApp
  selected: boolean
  onClick: () => void
}

export function AppIcon({ app, selected, onClick }: AppIconProps) {
  const size = selected ? 48 : 32
  return (
    <motion.button
      onClick={onClick}
      animate={selected ? { y: [0, -2, 0] } : { y: 0 }}
      transition={selected
        ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
        : { duration: 0.15 }}
      style={{
        width: size,
        height: size,
        background: app.color,
        border: selected ? '2px solid #fff' : '1px solid #000',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: selected ? 10 : 8,
        color: '#000',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
        flexShrink: 0,
      }}
      aria-label={app.name}
      aria-pressed={selected}
    >
      {app.name[0]}
    </motion.button>
  )
}
