import { useClock } from '../hooks/useClock'

function format2(n: number) { return n.toString().padStart(2, '0') }

export function InfoBar() {
  const now = useClock()
  const date = `${format2(now.getMonth() + 1)}/${format2(now.getDate())}`
  const time = `${format2(now.getHours())}:${format2(now.getMinutes())}`

  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4px',
        fontSize: 8,
        background: 'rgba(0,0,0,0.25)',
      }}
    >
      <span aria-label="volume">{'\u{1F50A}'}</span>
      <span>Gabriel</span>
      <span>{date} {time}</span>
      <span aria-label="battery">{'\u{1F50B}'}</span>
    </div>
  )
}
