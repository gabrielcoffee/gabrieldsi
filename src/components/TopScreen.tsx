import { motion } from 'framer-motion'
import { Screen } from './Screen'
import { InfoBar } from './InfoBar'
import { CameraFeed } from './CameraFeed'

interface TopScreenProps {
  cameraStream: MediaStream | null
  muted: boolean
  toggleMute: () => void
}

export function TopScreen({ cameraStream, muted, toggleMute }: TopScreenProps) {
  return (
    <Screen style={{ backgroundImage: 'url(/images/topbg.png)' }}>
      <CameraFeed stream={cameraStream} />
      <InfoBar />
      <img
        src={muted ? '/images/nosound.png' : '/images/yessound.png'}
        alt={muted ? 'Unmute' : 'Mute'}
        onClick={toggleMute}
        style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer', imageRendering: 'pixelated', display: 'block' }}
      />
      {/* Camera UI overlays — always visible */}
      <img
        src="/images/cameraL.png"
        alt=""
        style={{ position: 'absolute', left: 0, bottom: 0, width: 73, height: 21, display: 'block' }}
      />
      <img
        src="/images/cameraR.png"
        alt=""
        style={{ position: 'absolute', right: 0, bottom: 0, width: 73, height: 21, display: 'block' }}
      />
      {/* White intro overlay */}
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
