'use client'

import { buildTimeline, timelineProgress } from '@/lib/buildTimeline'
import { calcOrder } from '@/lib/calcOrder'
import { formatAbsolute } from '@/lib/formatAbsolute'
import { NOW } from '@/lib/now'

import { Steps, STEP_SHIPMENT } from './Steps'
import { Timeline } from './Timeline'
import { useOrder } from './OrderSection'

const PERCENT = 100

export function Tracking() {
  const { order, reset } = useOrder()
  const calc = calcOrder({
    spellId: order.spellId,
    tariffId: order.tariffId,
    optionIds: order.optionIds,
    now: NOW,
  })
  const phases = buildTimeline(order, calc)
  const progress = timelineProgress(phases)

  return (
    <div className="max-w-3xl">
      <Steps current={STEP_SHIPMENT} />

      <div className="mt-6 border border-rule p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Трек-номер</span>
          <span className="font-mono text-sm text-ink">{order.trackingNumber}</span>
        </div>

        <p className="mt-5 text-3xl font-semibold tracking-tight text-ink md:text-4xl">В ПУТИ</p>
        <p className="mt-2 text-sm text-muted">
          Прибудет <span className="font-mono">{formatAbsolute(calc.readyAt)}</span>
        </p>

        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * PERCENT)}
          className="mt-5 h-1 w-full border border-rule"
        >
          <div className="h-full bg-accent" style={{ width: `${progress * PERCENT}%` }} />
        </div>
      </div>

      <Timeline phases={phases} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="border border-ink bg-ink px-6 py-3 text-sm text-paper hover:border-accent hover:bg-accent"
        >
          Оформить ещё одно отправление
        </button>
        <button
          type="button"
          className="border border-rule px-6 py-3 text-sm text-ink hover:border-ink"
        >
          Написать в службу
        </button>
      </div>
    </div>
  )
}
