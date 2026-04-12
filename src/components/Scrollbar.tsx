import type { CSSProperties } from 'react'

interface ScrollbarProps {
  total: number
  selectedIndex: number
  onLeft: () => void
  onRight: () => void
}

export function Scrollbar({ total, selectedIndex, onLeft, onRight }: ScrollbarProps) {
  const trackWidth = 208
  const thumbWidth = Math.max(16, Math.floor(trackWidth / total))
  const thumbX = Math.floor((trackWidth - thumbWidth) * (selectedIndex / Math.max(1, total - 1)))

  return (
    <div
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 4,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <button onClick={onLeft} aria-label="scroll left" style={arrowStyle}>{'<'}</button>
      <div
        style={{
          position: 'relative',
          width: trackWidth,
          height: 8,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: thumbX,
            top: 0,
            width: thumbWidth,
            height: '100%',
            background: '#f0f0f0',
          }}
        />
      </div>
      <button onClick={onRight} aria-label="scroll right" style={arrowStyle}>{'>'}</button>
    </div>
  )
}

const arrowStyle: CSSProperties = {
  width: 14,
  height: 14,
  background: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.4)',
  color: '#f0f0f0',
  fontSize: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'inherit',
}
