'use client'

import { useState, type FormEvent } from 'react'

import { formatClock, NOW } from '@/lib/now'

import { scrollToOrder, useOrder } from './order/OrderSection'

const OPERATIONS = [
  { label: 'Отправлений в пути', value: '1 284' },
  { label: 'Отделений', value: '47' },
  { label: 'Ближайшая доставка', value: 'через час' },
]

const LIMITS = [
  { label: 'Переправа в Скеллиге', value: 'задержка 4 ч' },
  { label: 'Оксенфуртский мост', value: 'закрыт, объезд' },
  { label: 'Приём класса IV', value: 'до 18:00' },
]

function SummaryGroup({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: string }[]
}) {
  return (
    <div>
      <h2 className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{title}</h2>
      <dl className="mt-3 border-t border-rule">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5"
          >
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-right font-mono text-sm text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function Hero() {
  const { track } = useOrder()
  const [trackingNumber, setTrackingNumber] = useState('')

  function handleTrack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    track(trackingNumber)
    scrollToOrder()
  }

  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto grid w-full max-w-[76rem] gap-12 px-5 py-14 md:min-h-[calc(100svh-var(--header-height))] md:grid-cols-[minmax(0,1fr)_22rem] md:items-center md:gap-16 md:px-8 md:py-16">
        <div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Доставляем заклинания
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Работаем с 47 мастерскими Новиграда, Оксенфурта и Велена.
            <br />
            Ближайшая доставка — через час.
          </p>

          <div className="mt-9">
            <button
              type="button"
              onClick={scrollToOrder}
              className="border border-ink bg-ink px-6 py-3 text-sm text-paper hover:bg-transparent hover:text-ink"
            >
              Оформить доставку
            </button>
          </div>

          <form onSubmit={handleTrack} className="mt-10 max-w-md">
            <div className="flex items-stretch border border-rule bg-paper">
              <input
                value={trackingNumber}
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder="PL-0000-0000"
                aria-label="Трек-номер"
                className="w-full bg-transparent px-4 py-3 font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 border-l border-rule px-5 py-3 text-sm text-ink hover:bg-ink hover:text-paper"
              >
                Отследить
              </button>
            </div>
            <p className="mt-2 text-xs text-muted">Например: PL-4471-0293</p>
          </form>
        </div>

        <aside className="space-y-8 border border-rule p-5">
          <SummaryGroup title={`Сводка на ${formatClock(NOW)}`} rows={OPERATIONS} />
          <SummaryGroup title="Ограничения" rows={LIMITS} />
        </aside>
      </div>
    </section>
  )
}
