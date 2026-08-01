'use client'

import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  'Отправлений в пути: 1 284',
  'Отделений: 47',
  'Переправа в Скеллиге: задержка 4 ч',
  'Оксенфуртский мост закрыт, объезд',
]

const SEPARATOR = '·'
/** Лента идёт двумя одинаковыми половинами: сдвиг на 50% замыкает прокрутку. */
const HALVES = [0, 1]
const MIN_RUNS = 1
/** Скорость прокрутки, пикселей в секунду: от ширины набора не зависит. */
const PIXELS_PER_SECOND = 26

function Run({ hidden, innerRef }: { hidden: boolean; innerRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={innerRef} aria-hidden={hidden} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center whitespace-nowrap text-xs text-muted">
          <span className="px-4">{item}</span>
          <span className="text-rule">{SEPARATOR}</span>
        </span>
      ))}
    </div>
  )
}

export function Ticker() {
  const runRef = useRef<HTMLDivElement>(null)
  const [runs, setRuns] = useState(MIN_RUNS)
  const [duration, setDuration] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      const runWidth = runRef.current?.scrollWidth ?? 0
      if (!runWidth) return

      // Половина ленты должна быть не уже вьюпорта, иначе в конце открывается пустота.
      const needed = Math.max(MIN_RUNS, Math.ceil(window.innerWidth / runWidth))
      setRuns(needed)
      setDuration((runWidth * needed) / PIXELS_PER_SECOND)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div aria-label="Операционная сводка" className="overflow-hidden border-t border-rule py-2">
      <div
        className="ticker-track flex w-max"
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {HALVES.map((half) =>
          Array.from({ length: runs }, (_, run) => (
            <Run
              key={`${half}-${run}`}
              hidden={half > 0 || run > 0}
              innerRef={half === 0 && run === 0 ? runRef : undefined}
            />
          ))
        )}
      </div>
    </div>
  )
}
