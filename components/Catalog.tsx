import { spells } from '@/data/spells'

import { SpellCard } from './SpellCard'

export function Catalog() {
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

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {spells.map((spell) => (
            <SpellCard key={spell.id} spell={spell} />
          ))}
        </div>
      </div>
    </section>
  )
}
