const BAR_WIDTH = 256
const BAR_HEIGHT = 21

export function Scrollbar() {
  return (
    <img
      src="/scrollbar.png"
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
  )
}
