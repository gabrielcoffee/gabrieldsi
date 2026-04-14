import { Screen } from './Screen'
import { InfoBar } from './InfoBar'
import { CameraFeed } from './CameraFeed'

interface TopScreenProps {
  cameraStream: MediaStream | null
}

export function TopScreen({ cameraStream }: TopScreenProps) {
  return (
    <Screen style={{ backgroundImage: 'url(/images/topbg.png)' }}>
      <CameraFeed stream={cameraStream} />
      <InfoBar />
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
    </Screen>
  )
}
