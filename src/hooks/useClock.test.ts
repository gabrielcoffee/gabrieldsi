import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useClock } from './useClock'

describe('useClock', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns the current Date on mount', () => {
    const fixed = new Date('2026-04-11T22:03:00Z')
    vi.setSystemTime(fixed)
    const { result } = renderHook(() => useClock())
    expect(result.current.getTime()).toBe(fixed.getTime())
  })

  it('updates every second', () => {
    const start = new Date('2026-04-11T22:03:00Z')
    vi.setSystemTime(start)
    const { result } = renderHook(() => useClock())
    act(() => { vi.advanceTimersByTime(1000) })
    expect(result.current.getTime()).toBe(start.getTime() + 1000)
  })
})
