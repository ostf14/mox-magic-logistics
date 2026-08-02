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
 * Строки плитки заданы жёстко: название со сроком, бейдж, иллюстрация и цена
 * выравниваются по одним линиям во всех четырёх плитках. Строка бейджа есть
 * и там, где бейджа нет, — иначе плитки разъезжаются по ширине.
 */
const ROWS = 'grid-rows-[2rem_1.5rem_auto_auto]'

const GLYPH_SIDE = 320

/**
 * Иллюстрация тарифа в свободной зоне между бейджем и разделителем. Зона
 * раздвинута до краёв плитки (-mx-4 гасит padding), изображение по центру по
 * обеим осям, ширина — доля ширины плитки. Отступы разные: сверху зону уже
 * поднимает пустая строка бейджа, поэтому просвет до заголовка и просвет до
 * разделителя выходят равными. Светлый фон растворяется умножением.
 */
function Glyph({ tariff, width }: { tariff: Tariff; width: string }) {
  return (
    <span aria-hidden className="-mx-4 mb-8 mt-1 flex items-center justify-center">
      <Image
        src={tariff.image}
        alt=""
        width={GLYPH_SIDE}
        height={GLYPH_SIDE}
        className={`${width} h-auto max-w-[15rem] object-contain opacity-30 mix-blend-multiply`}
      />
    </span>
  )
}

/** Название и срок на одной базовой линии: срок прижат к правому краю. */
function Head({ name, minutes, tone }: { name: string; minutes: number; tone: string }) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <span className={`text-lg font-medium leading-tight ${tone}`}>{name}</span>
      <span className="shrink-0 font-mono text-xs text-muted">{formatDuration(minutes)}</span>
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
      <Head name={tariff.name} minutes={tariff.deliveryMinutes} tone="text-ink" />

      <span className="flex items-start">{recommended && <Recommended />}</span>

      <Glyph tariff={tariff} width="w-4/5" />

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
      <Head name={tariff.name} minutes={tariff.deliveryMinutes} tone={tone} />

      <span className="flex items-start">{recommended && <Recommended />}</span>

      <Glyph tariff={tariff} width="w-[80%]" />

      <span className="border-t border-rule pt-3">
        <span className={`block font-mono text-lg ${tone}`}>{formatPrice(tariff.price)}</span>
        {recommended && <Note />}
      </span>
    </button>
  )
}
