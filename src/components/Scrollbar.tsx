import { useCallback, useRef } from 'react'
import { clampIndex } from '../logic/selection'

interface ScrollbarProps {
  selectedIndex: number
  totalSlots: number
  onSelectIndex: (index: number) => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

const BAR_WIDTH = 256
const BAR_HEIGHT = 21
const THUMB_WIDTH = 29
const THUMB_HEIGHT = 21

// ⬇ Tweak me: thumb position = THUMB_START_X + selectedIndex * THUMB_STEP
const THUMB_START_X = 19
const THUMB_STEP = 5

const EDGE_ZONE = 19 // far-left / far-right nudge zone

export function Scrollbar({ selectedIndex, totalSlots, onSelectIndex, onDragStart, onDragEnd }: ScrollbarProps) {
  const thumbX = THUMB_START_X + selectedIndex * THUMB_STEP
  const barRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const unscaleX = useCallback((clientX: number) => {
    const rect = barRef.current!.getBoundingClientRect()
    const scale = rect.width / BAR_WIDTH
    return (clientX - rect.left) / scale
  }, [])

  const indexFromX = useCallback((unscaledX: number) => {
    return clampIndex(Math.round((unscaledX - THUMB_START_X) / THUMB_STEP), totalSlots)
  }, [totalSlots])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = unscaleX(e.clientX)

    // Far-left edge: nudge one position left
    if (x < EDGE_ZONE) {
      onSelectIndex(clampIndex(selectedIndex - 1, totalSlots))
      return
    }

    // Far-right edge: nudge one position right
    if (x > BAR_WIDTH - EDGE_ZONE) {
      onSelectIndex(clampIndex(selectedIndex + 1, totalSlots))
      return
    }

    // Click on thumb: start drag
    if (x >= thumbX && x <= thumbX + THUMB_WIDTH) {
      isDragging.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      onDragStart?.()
      return
    }

    // Click elsewhere in track: jump to position
    onSelectIndex(indexFromX(x))
  }, [unscaleX, indexFromX, selectedIndex, totalSlots, thumbX, onSelectIndex, onDragStart])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const x = unscaleX(e.clientX)
    onSelectIndex(indexFromX(x))
  }, [unscaleX, indexFromX, onSelectIndex])

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    onDragEnd?.()
  }, [onDragEnd])

  return (
    <div
      ref={barRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
        cursor: 'pointer',
        touchAction: 'none',
      }}
    >
      <img
        src="/images/scrollbar.png"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: BAR_WIDTH,
          height: BAR_HEIGHT,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      <img
        src="/images/selected_scrollbar.png"
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          left: thumbX,
          bottom: 0,
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
