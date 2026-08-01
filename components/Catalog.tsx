'use client'

import { useState } from 'react'

import { spells, type HazardClass } from '@/data/spells'

import { ROMAN } from './HazardBadge'
import { SpellCard } from './SpellCard'

const CLASSES: HazardClass[] = [1, 2, 3, 4]

export function Catalog() {
  const [hazardClass, setHazardClass] = useState<HazardClass | null>(null)
  const shown = hazardClass ? spells.filter((spell) => spell.hazardClass === hazardClass) : spells

  return (
    <section id="catalog" className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Каталог заклинаний
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Мастерские готовят, мы везём. Сроки в карточках — время изготовления. Доставка считается
          отдельно.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Класс отправления</span>
          <div className="flex flex-wrap items-center gap-2">
            {CLASSES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setHazardClass(item)}
                aria-pressed={hazardClass === item}
                className={`border px-3 py-1 font-mono text-xs ${
                  hazardClass === item
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule text-ink hover:border-ink'
                }`}
              >
                {ROMAN[item]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setHazardClass(null)}
              aria-pressed={hazardClass === null}
              className="px-1 py-1 text-xs text-muted underline underline-offset-4 hover:text-ink"
            >
              Показать все
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {shown.map((spell) => (
            <SpellCard key={spell.id} spell={spell} />
          ))}
        </div>
      </div>
    </section>
  )
}
