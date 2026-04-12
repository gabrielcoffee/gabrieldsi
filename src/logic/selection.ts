export function moveLeft(index: number, _total: number): number {
  return Math.max(0, index - 1)
}

export function moveRight(index: number, total: number): number {
  return Math.min(total - 1, index + 1)
}
