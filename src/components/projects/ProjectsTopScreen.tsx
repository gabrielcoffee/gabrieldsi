import { motion } from 'framer-motion'
import { Screen } from '../Screen'
import type { Project } from '../../data/projects'

interface ProjectsTopScreenProps {
  projects: Project[]
  selectedIndex: number
}

const ROW_HEIGHT = 38
const IMAGE_SIZE = 28
const SCREEN_HEIGHT = 192

export function ProjectsTopScreen({ projects, selectedIndex }: ProjectsTopScreenProps) {
  // Center the selected item in the viewport, but clamp so the list
  // doesn't scroll past the top or bottom edge.
  const totalHeight = projects.length * ROW_HEIGHT
  const centerOffset = (SCREEN_HEIGHT - ROW_HEIGHT) / 2
  const rawY = centerOffset - selectedIndex * ROW_HEIGHT
  const minY = SCREEN_HEIGHT - totalHeight
  const translateY = Math.max(minY, Math.min(0, rawY))

  return (
    <Screen style={{ backgroundImage: "url('/images/background_projects.png')" }}>
      <motion.div
        animate={{ y: translateY }}
        transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: ROW_HEIGHT,
              padding: '0 10px',
              backgroundColor: i === selectedIndex ? 'rgba(255,255,255,0.12)' : 'transparent',
              flexShrink: 0,
            }}
          >
            <img
              src={project.image}
              alt=""
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                flexShrink: 0,
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                marginLeft: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'RodinNTLG, sans-serif',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                }}
              >
                {project.name}
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontFamily: 'RodinNTLG, sans-serif',
                  color: 'rgba(255,255,255,0.6)',
                  whiteSpace: 'nowrap',
                  marginTop: 1,
                  lineHeight: 1,
                }}
              >
                {project.description}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* White fade-in overlay on mount */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#fff',
          pointerEvents: 'none',
          zIndex: 50,
        }}
      />
    </Screen>
  )
}
