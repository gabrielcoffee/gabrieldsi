import { useEffect, useRef } from 'react'

const PIXEL_W = 208
const PIXEL_H = 156

// 2×2 Bayer-pattern tile as a data URL — simulates hardware sensor pixel gaps.
// Alternating dark pixels at low opacity mimic the RGGB sub-pixel grid.
const BAYER_TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E" +
  "%3Crect x='1' y='0' width='1' height='1' fill='rgba(0,0,0,.12)'/%3E" +
  "%3Crect x='0' y='1' width='1' height='1' fill='rgba(0,0,0,.07)'/%3E" +
  "%3C/svg%3E"

interface CameraFeedProps {
  stream: MediaStream | null
}

export function CameraFeed({ stream }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!stream) return

    const video = videoRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number

    const drawFrame = () => {
      if (video.readyState >= video.HAVE_ENOUGH_DATA) {
        // Draw mirrored frame
        ctx.save()
        ctx.translate(PIXEL_W, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(video, 0, 0, PIXEL_W, PIXEL_H)
        ctx.restore()

        // DSi 15-bit color quantization: snap each channel to nearest multiple of 8
        // (5 bits per channel = 32 levels, matching the hardware's BGR555 format)
        const imageData = ctx.getImageData(0, 0, PIXEL_W, PIXEL_H)
        const d = imageData.data
        for (let i = 0; i < d.length; i += 4) {
          d[i]   = Math.min(248, Math.round(d[i]   / 8) * 8)
          d[i+1] = Math.min(248, Math.round(d[i+1] / 8) * 8)
          d[i+2] = Math.min(248, Math.round(d[i+2] / 8) * 8)
        }
        ctx.putImageData(imageData, 0, 0)
      }
      animId = requestAnimationFrame(drawFrame)
    }

    video.srcObject = stream
    video.play().finally(() => {
      animId = requestAnimationFrame(drawFrame)
    })

    return () => {
      cancelAnimationFrame(animId)
      video.srcObject = null
    }
  }, [stream])

  if (!stream) return null

  return (
    <>
      <video ref={videoRef} playsInline muted style={{ display: 'none' }} />

      {/* Camera canvas with DSi colour grade */}
      <canvas
        ref={canvasRef}
        width={PIXEL_W}
        height={PIXEL_H}
        style={{
          position: 'absolute',
          left: 24,
          top: 24,
          width: 208,
          height: 156,
          display: 'block',
          filter: 'contrast(1.2) saturate(1.4) brightness(1.1) sepia(0.05)',
        }}
      />

      {/* Static Bayer-pattern overlay — pixel-gap simulation */}
      <div
        style={{
          position: 'absolute',
          left: 24,
          top: 24,
          width: 208,
          height: 156,
          backgroundImage: `url("${BAYER_TILE}")`,
          backgroundSize: '2px 2px',
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
