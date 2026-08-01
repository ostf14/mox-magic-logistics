'use client'

import type { FormEvent } from 'react'

import { scrollToOrder } from './order/OrderSection'

const NAV = [
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Отследить', href: '#order' },
  { label: 'Правила', href: '#rules' },
]

export function Header() {
  function handleTrack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    scrollToOrder()
  }

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
        <a href="#top" className="shrink-0">
          <span className="block text-lg font-semibold tracking-[0.18em] text-ink">ПЛОТВА</span>
          <span className="block text-[0.6875rem] leading-tight text-muted">
            служба доставки заклинаний
          </span>
        </a>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <form onSubmit={handleTrack} className="flex items-stretch border border-rule">
          <input
            name="tracking"
            placeholder="PL-0000-0000"
            aria-label="Трек-номер"
            className="w-[10.5rem] bg-transparent px-3 py-2 font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="submit"
            className="border-l border-rule px-3 py-2 text-sm text-ink hover:bg-ink hover:text-paper"
          >
            Отследить
          </button>
        </form>
      </div>
    </header>
  )
}
