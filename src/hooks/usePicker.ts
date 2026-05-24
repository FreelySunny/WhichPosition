import { useCallback, useEffect, useRef } from 'react'
import { usePickerStore } from './usePickerStore'

interface AnimState {
  offset: number
  speed: number
  finalIndex: number
  finalCandidate: string
  startTime: number
  totalDuration: number
  lastTime: number
  running: boolean
  landing: boolean
  landingStartTime: number
  landingStartOffset: number
  landingTargetOffset: number
  landingDuration: number
}

const SPIN_UP_MS = 350
const DECEL_MS = 1200
const LANDING_MS = 400
const TOTAL_MIN = 3000
const TOTAL_MAX = 5000

export function usePicker() {
  const {
    candidates,
    isRolling,
    setRolling,
    setResult,
    addHistory,
  } = usePickerStore()

  const stripRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animFrameRef = useRef<number>(0)

  const animStateRef = useRef<AnimState>({
    offset: 0,
    speed: 0,
    finalIndex: 0,
    finalCandidate: '',
    startTime: 0,
    totalDuration: 0,
    lastTime: 0,
    running: false,
    landing: false,
    landingStartTime: 0,
    landingStartOffset: 0,
    landingTargetOffset: 0,
    landingDuration: 0,
  })

  const cachedCandidatesRef = useRef<string[]>([])

  const getItemHeight = useCallback((): number => {
    if (containerRef.current) {
      const el = containerRef.current.querySelector('[data-reel-item]') as HTMLElement | null
      if (el) return el.offsetHeight
    }
    return 96
  }, [])

  const cancelRoll = useCallback(() => {
    const state = animStateRef.current
    state.running = false
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = 0
    }
  }, [])

  const startRoll = useCallback(() => {
    if (isRolling || candidates.length < 2) return

    cachedCandidatesRef.current = [...candidates]
    const items = cachedCandidatesRef.current

    setResult(null)
    setRolling(true)

    const itemHeight = getItemHeight()
    const finalIndex = Math.floor(Math.random() * items.length)
    const finalCandidate = items[finalIndex]

    const state = animStateRef.current
    state.speed = 0
    state.finalIndex = finalIndex
    state.finalCandidate = finalCandidate
    state.startTime = performance.now()
    state.totalDuration = TOTAL_MIN + Math.random() * (TOTAL_MAX - TOTAL_MIN)
    state.lastTime = state.startTime
    state.running = true
    state.landing = false

    const MAX_SPEED = itemHeight * 0.025

    const tick = (now: number) => {
      const state = animStateRef.current
      if (!state.running) return

      const elapsed = now - state.startTime

      if (state.landing) {
        const landingElapsed = now - state.landingStartTime
        const landingProgress = Math.min(landingElapsed / state.landingDuration, 1)
        const eased = 1 - Math.pow(1 - landingProgress, 4)

        const currentOffset =
          state.landingStartOffset +
          (state.landingTargetOffset - state.landingStartOffset) * eased

        if (landingProgress >= 1) {
          if (stripRef.current) {
            stripRef.current.style.transform = `translateY(${-state.landingTargetOffset}px)`
            stripRef.current.style.filter = 'blur(0px)'
          }
          state.offset = state.landingTargetOffset
          state.speed = 0
          state.running = false
          state.landing = false

          setResult(finalCandidate)
          setRolling(false)
          addHistory({ result: finalCandidate, timestamp: Date.now() })
          return
        }

        state.offset = currentOffset
        if (stripRef.current) {
          stripRef.current.style.transform = `translateY(${-currentOffset}px)`
          const blurAmount = Math.max(0, (1 - landingProgress) * 2)
          stripRef.current.style.filter =
            blurAmount > 0.05 ? `blur(${blurAmount}px)` : 'blur(0px)'
        }

        animFrameRef.current = requestAnimationFrame(tick)
        return
      }

      const dt = Math.min(now - state.lastTime, 50)
      state.lastTime = now

      let newSpeed: number

      if (elapsed < SPIN_UP_MS) {
        const t = elapsed / SPIN_UP_MS
        newSpeed = MAX_SPEED * t
      } else if (elapsed < state.totalDuration - DECEL_MS) {
        newSpeed = MAX_SPEED
      } else if (elapsed < state.totalDuration) {
        const t = (elapsed - (state.totalDuration - DECEL_MS)) / DECEL_MS
        newSpeed = MAX_SPEED * (1 - t * t * t)
      } else {
        const cycleHeight = items.length * itemHeight
        const targetInCycle =
          ((finalIndex - 1 + items.length) % items.length) * itemHeight
        const currentPos = state.offset % cycleHeight
        let diff = targetInCycle - currentPos
        if (diff <= 0) diff += cycleHeight
        const targetOffset = state.offset + diff

        state.landing = true
        state.landingStartTime = now
        state.landingStartOffset = state.offset
        state.landingTargetOffset = targetOffset
        state.landingDuration = LANDING_MS + diff * 0.15

        animFrameRef.current = requestAnimationFrame(tick)
        return
      }

      state.speed = newSpeed
      state.offset += newSpeed * dt

      const cycleHeight = items.length * itemHeight
      if (state.offset > cycleHeight * 3) {
        state.offset -= cycleHeight * 2
      }

      if (stripRef.current) {
        const blurAmount =
          newSpeed > 0.5
            ? Math.min((newSpeed / MAX_SPEED) * 3, 3)
            : 0
        stripRef.current.style.transform = `translateY(${-state.offset}px)`
        stripRef.current.style.filter =
          blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'blur(0px)'
      }

      if (state.running) {
        animFrameRef.current = requestAnimationFrame(tick)
      }
    }

    animFrameRef.current = requestAnimationFrame(tick)
  }, [candidates, isRolling, setRolling, setResult, addHistory, getItemHeight])

  useEffect(() => {
    return () => cancelRoll()
  }, [cancelRoll])

  const setStripRef = useCallback((el: HTMLDivElement | null) => {
    stripRef.current = el
    if (el) {
      el.style.transform = `translateY(${-animStateRef.current.offset}px)`
    }
  }, [])

  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el
  }, [])

  return {
    startRoll,
    cancelRoll,
    canDraw: candidates.length >= 2 && !isRolling,
    stripRef: setStripRef,
    containerRef: setContainerRef,
    getItemHeight,
  }
}
