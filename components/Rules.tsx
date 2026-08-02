import { rules } from '@/data/rules'

import { RuleIcon } from './RuleIcon'

export function Rules() {
  return (
    <section id="rules" className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Правила безопасного применения
        </h2>
        <p className="mt-3 text-sm text-muted">
          Редакция от 14 июля. Действуют для всех отправлений.
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {rules.map((rule) => (
            <article key={rule.id}>
              <RuleIcon src={rule.image} alt={rule.title} />
              <h3 className="mt-6 text-sm font-medium leading-tight text-ink">{rule.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{rule.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
