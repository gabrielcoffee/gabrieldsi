import { useClock } from '../hooks/useClock'

function format2(n: number) { return n.toString().padStart(2, '0') }

const TEXT: React.CSSProperties = {
  fontFamily: 'RodinNTLG, sans-serif',
  fontSize: 9,
  lineHeight: 1,
}

export function InfoBar() {
  const now = useClock()
  const date = `${format2(now.getMonth() + 1)}/${format2(now.getDate())}`
  const time = `${format2(now.getHours())}:${format2(now.getMinutes())}`

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
      <span style={{ ...TEXT, color: '#ff3333', position: 'absolute', left: 30, top: 6 }}>
        Gabriel
      </span>
      <span style={{ ...TEXT, color: '#555555', position: 'absolute', right: 30, top: 6 }}>
        {date} {time}
      </span>
    </div>
  )
}
