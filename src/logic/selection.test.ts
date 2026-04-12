import { describe, it, expect } from 'vitest'
import { moveLeft, moveRight } from './selection'

describe('selection', () => {
  describe('moveLeft', () => {
    it('decrements the index', () => {
      expect(moveLeft(2, 5)).toBe(1)
    })
    it('clamps at 0', () => {
      expect(moveLeft(0, 5)).toBe(0)
    })
  })

  describe('moveRight', () => {
    it('increments the index', () => {
      expect(moveRight(2, 5)).toBe(3)
    })
    it('clamps at total - 1', () => {
      expect(moveRight(4, 5)).toBe(4)
    })
  })
})
