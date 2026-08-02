'use client'

import Image from 'next/image'

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
 * Строки плитки заданы жёстко: название, бейдж, срок, иллюстрация и цена
 * выравниваются по одним линиям во всех четырёх плитках. Строка бейджа есть
 * и там, где бейджа нет, — иначе плитки разъезжаются по ширине.
 */
const ROWS = 'grid-rows-[2rem_1.5rem_1.5rem_auto_auto]'

const GLYPH_SIDE = 320

/**
 * Иллюстрация тарифа в свободной зоне между сроком и разделителем: справа,
 * ничем не перекрыта, размер от ширины плитки. Светлый фон исходника
 * растворяется умножением, альфа не вырезается.
 */
function Glyph({ tariff }: { tariff: Tariff }) {
  return (
    <span aria-hidden className="my-2 block aspect-square w-[70%] max-w-[11rem] justify-self-end">
      <Image
        src={tariff.image}
        alt=""
        width={GLYPH_SIDE}
        height={GLYPH_SIDE}
        className="h-full w-full object-contain opacity-15 mix-blend-multiply"
      />
    </span>
  )
}

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
      <span className="text-lg font-medium leading-tight text-ink">{tariff.name}</span>

      <span className="flex items-start">{recommended && <Recommended />}</span>

      <span className="font-mono text-xs leading-6 text-muted">
        {formatDuration(tariff.deliveryMinutes)}
      </span>

      <Glyph tariff={tariff} />

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
      className={`grid h-full ${ROWS} content-start gap-y-1 border p-4 text-left ${
        selected ? 'border-ink' : 'border-rule'
      } ${
        disabled ? 'cursor-not-allowed border-dashed bg-transparent' : 'bg-card hover:border-ink'
      }`}
    >
      <span className={`text-lg font-medium leading-tight ${tone}`}>{tariff.name}</span>

      <span className="flex items-start">{recommended && <Recommended />}</span>

      <span className="font-mono text-xs leading-6 text-muted">
        {formatDuration(tariff.deliveryMinutes)}
      </span>

      <Glyph tariff={tariff} />

      <span className="border-t border-rule pt-3">
        <span className={`block font-mono text-lg ${tone}`}>{formatPrice(tariff.price)}</span>
        {recommended && <Note />}
      </span>
    </button>
  )
}
