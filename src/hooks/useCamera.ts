import { useCallback, useState } from 'react'

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null)

  const toggle = useCallback(async () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
      setStream(null)
      return
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(s)
    } catch {
      // Permission denied or no camera — stay off
    }
  }, [stream])

  return { stream, toggle }
}
