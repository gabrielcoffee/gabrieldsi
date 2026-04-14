interface ScrollbarProps {
  selectedIndex: number
}

const BAR_WIDTH = 256
const BAR_HEIGHT = 21
const THUMB_WIDTH = 29
const THUMB_HEIGHT = 21

// ⬇ Tweak me: thumb position = THUMB_START_X + selectedIndex * THUMB_STEP
const THUMB_START_X = 19
const THUMB_STEP = 5

export function Scrollbar({ selectedIndex }: ScrollbarProps) {
  const thumbX = THUMB_START_X + selectedIndex * THUMB_STEP
  return (
    <>
      <img
        src="/images/scrollbar.png"
        alt=""
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
    </>
  )
}
