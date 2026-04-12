import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useKeyboardInput } from './useKeyboardInput'

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key }))
}

describe('useKeyboardInput', () => {
  it('calls onLeft when ArrowLeft is pressed', () => {
    const onLeft = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft, onRight: () => {}, onConfirm: () => {} }))
    fireKey('ArrowLeft')
    expect(onLeft).toHaveBeenCalledTimes(1)
  })

  it('calls onRight when ArrowRight is pressed', () => {
    const onRight = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft: () => {}, onRight, onConfirm: () => {} }))
    fireKey('ArrowRight')
    expect(onRight).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm on Enter and Space', () => {
    const onConfirm = vi.fn()
    renderHook(() => useKeyboardInput({ onLeft: () => {}, onRight: () => {}, onConfirm }))
    fireKey('Enter')
    fireKey(' ')
    expect(onConfirm).toHaveBeenCalledTimes(2)
  })

  it('cleans up listener on unmount', () => {
    const onLeft = vi.fn()
    const { unmount } = renderHook(() => useKeyboardInput({ onLeft, onRight: () => {}, onConfirm: () => {} }))
    unmount()
    fireKey('ArrowLeft')
    expect(onLeft).not.toHaveBeenCalled()
  })
})
