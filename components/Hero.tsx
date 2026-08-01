'use client'

import { useState, type FormEvent } from 'react'

import { scrollToOrder, useOrder } from './order/OrderSection'

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
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-24">
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Доставляем заклинания
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Работаем с 47 мастерскими Новиграда, Оксенфурта и Велена.
          <br />
          Ближайшая доставка — через час.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={scrollToOrder}
            className="border border-ink bg-ink px-6 py-3 text-sm text-paper hover:bg-transparent hover:text-ink"
          >
            Оформить доставку
          </button>
          <a
            href="#catalog"
            className="border border-rule px-6 py-3 text-center text-sm text-ink hover:border-ink"
          >
            Смотреть каталог
          </a>
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
    </section>
  )
}
