'use client'

import type { Tariff } from '@/data/tariffs'
import { formatDuration } from '@/lib/formatDuration'
import { formatPrice } from '@/lib/formatPrice'

type TariffTileProps = {
  tariff: Tariff
  recommended?: boolean
  selected?: boolean
  disabled?: boolean
  onSelect: (tariffId: string) => void
}

/**
 * Строки плитки заданы жёстко: название, срок, способ и цена выравниваются
 * по одним линиям во всех четырёх плитках, как бы ни был длинен способ.
 */
const ROWS = 'grid-rows-[2rem_1.5rem_2.5rem_auto]'

function Recommended() {
  return (
    <span className="shrink-0 border border-accent px-1.5 py-0.5 text-xs uppercase leading-none tracking-[0.12em] text-accent">
      рекомендуем
    </span>
  )
}

function Note() {
  return (
    <span className="mt-2 block text-xs leading-relaxed text-muted">
      наш первый тариф, работает с 1178 года
    </span>
  )
}

/** Статичная плитка для блока тарифов: витрина, а не выбор. */
export function TariffCard({
  tariff,
  recommended = false,
}: {
  tariff: Tariff
  recommended?: boolean
}) {
  return (
    <div className={`grid h-full ${ROWS} content-start gap-y-1 bg-card p-4`}>
      <span className="flex items-start justify-between gap-3">
        <span className="text-lg font-medium leading-tight text-ink">{tariff.name}</span>
        {recommended && <Recommended />}
      </span>

      <span className="font-mono text-xs leading-6 text-muted">
        {formatDuration(tariff.deliveryMinutes)}
      </span>

      <span className="text-xs leading-tight text-muted">{tariff.method}</span>

      <span className="border-t border-rule pt-3">
        <span className="block font-mono text-lg text-ink">{formatPrice(tariff.price)}</span>
        {recommended && <Note />}
      </span>
    </div>
  )
}

export function TariffTile({
  tariff,
  recommended = false,
  selected = false,
  disabled = false,
  onSelect,
}: TariffTileProps) {
  const tone = disabled ? 'text-muted' : 'text-ink'

  return (
    <button
      type="button"
      onClick={() => onSelect(tariff.id)}
      disabled={disabled}
      aria-pressed={selected}
      className={`grid h-full ${ROWS} content-start gap-y-1 border bg-card p-4 text-left ${
        selected ? 'border-ink' : 'border-rule'
      } ${disabled ? 'cursor-not-allowed' : 'hover:border-ink'}`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className={`text-lg font-medium leading-tight ${tone}`}>{tariff.name}</span>
        {recommended && <Recommended />}
      </span>

      <span className="font-mono text-xs leading-6 text-muted">
        {formatDuration(tariff.deliveryMinutes)}
      </span>

      <span className="text-xs leading-tight text-muted">{tariff.method}</span>

      <span className="border-t border-rule pt-3">
        <span className={`block font-mono text-lg ${tone}`}>{formatPrice(tariff.price)}</span>
        {recommended && <Note />}
      </span>
    </button>
  )
}
