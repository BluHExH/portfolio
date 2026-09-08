import { useEffect, useState } from 'react'

export function useCountUp(end: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    if (end <= 0) {
      setValue(0)
      return
    }

    let raf = 0
    const startTime = performance.now()
    const from = 0

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(from + (end - from) * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
      else setValue(end)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, active, duration])

  return value
}
