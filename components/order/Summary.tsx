'use client'

import { spellById } from '@/data/spells'
import { tariffById } from '@/data/tariffs'
import { workshopById } from '@/data/workshops'
import type { OrderCalc } from '@/lib/calcOrder'
import { formatAbsolute } from '@/lib/formatAbsolute'
import { formatDuration } from '@/lib/formatDuration'
import { formatPrice } from '@/lib/formatPrice'
import { formatMinutesOfDay } from '@/lib/now'

type SummaryProps = {
  calc: OrderCalc
  spellId: string
  tariffId: string
  actionLabel?: string
  onAction?: () => void
}

const NO_WAIT = 0

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-sm text-muted">{label}</span>
      <span className="font-mono text-sm text-ink">{value}</span>
    </div>
  )
}

export function Summary({ calc, spellId, tariffId, actionLabel, onAction }: SummaryProps) {
  const spell = spellById(spellId)
  const tariff = tariffById(tariffId)
  const workshop = workshopById(spell.workshopId)

  return (
    <div className="border border-rule bg-card p-5 md:sticky md:top-6 md:self-start">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-muted">Готово у вас</span>
        <span className="font-mono text-sm text-ink">
          через {formatDuration(calc.totalMinutes)}
        </span>
      </div>
      <p className="mt-1 text-right font-mono text-xs text-muted">
        {formatAbsolute(calc.readyAt)}
      </p>

      <div className="mt-4 border-t border-rule pt-3">
        {calc.waitUntilOpen > NO_WAIT && (
          <Row label="Мастерская откроется" value={`в ${formatMinutesOfDay(workshop.opensAt)}`} />
        )}
        <Row label="Мастерская готовит" value={formatDuration(calc.prepMinutes)} />
        <Row label={tariff.lineLabel} value={formatDuration(calc.deliveryMinutes)} />
      </div>

      <div className="mt-3 border-t border-rule pt-3">
        {calc.lines.map((line) => (
          <Row key={line.label} label={line.label} value={formatPrice(line.value)} />
        ))}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3">
        <span className="text-sm text-ink">Итого</span>
        <span className="font-mono text-lg text-ink">{formatPrice(calc.total)}</span>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 hidden w-full border border-ink bg-ink px-4 py-2.5 text-sm text-paper hover:border-accent hover:bg-accent md:block"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

/** Липкая полоса снизу на узком экране: итог и кнопка. */
export function SummaryBar({
  total,
  actionLabel,
  onAction,
}: {
  total: number
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 flex items-center justify-between gap-4 border-t border-rule bg-paper px-5 py-3 shadow-[0_-2px_6px_rgba(26,26,24,0.06)] md:hidden">
      <span className="font-mono text-sm text-ink">{formatPrice(total)}</span>
      <button
        type="button"
        onClick={onAction}
        className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper hover:border-accent hover:bg-accent"
      >
        {actionLabel}
      </button>
    </div>
  )
}
