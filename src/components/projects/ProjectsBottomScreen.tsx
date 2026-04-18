import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Screen } from '../Screen'
import type { Project } from '../../data/projects'

interface ProjectsBottomScreenProps {
  project: Project
}

const MARGIN = 12

export function ProjectsBottomScreen({ project }: ProjectsBottomScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY
    }
  }

  return (
    <Screen style={{ backgroundImage: 'none', backgroundColor: '#2a2a2a' }}>
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: `${MARGIN}px ${MARGIN}px`,
        }}
      >
        <h2
          style={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'RodinNTLG, sans-serif',
            color: '#fff',
            margin: 0,
            marginBottom: 4,
          }}
        >
          {project.name}
        </h2>
        <p
          style={{
            fontSize: 12,
            fontWeight: 300,
            fontFamily: 'RodinNTLG, sans-serif',
            color: 'rgba(255,255,255,0.85)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {project.details}
        </p>
      </div>

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
