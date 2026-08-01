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

export function TariffTile({
  tariff,
  recommended = false,
  selected = false,
  disabled = false,
  onSelect,
}: TariffTileProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tariff.id)}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex h-full flex-col border p-4 text-left ${
        selected ? 'border-ink' : 'border-rule'
      } ${disabled ? 'cursor-not-allowed text-muted' : 'hover:border-ink'}`}
    >
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-base font-medium text-ink">{tariff.name}</span>
        {recommended && (
          <span className="border border-accent px-1.5 py-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-accent">
            рекомендуем
          </span>
        )}
      </span>

      <span className="mt-3 font-mono text-sm text-ink">
        {formatDuration(tariff.deliveryMinutes)}
      </span>
      <span className="mt-1 text-xs leading-relaxed text-muted">{tariff.method}</span>

      <span className="mt-4 border-t border-rule pt-3 font-mono text-sm text-ink">
        {formatPrice(tariff.price)}
      </span>

      {recommended && (
        <span className="mt-2 text-[0.6875rem] leading-relaxed text-muted">
          наш первый тариф, работает с 1178 года
        </span>
      )}
    </button>
  )
}
