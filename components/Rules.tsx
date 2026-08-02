import { RuleIcon } from './RuleIcon'

const RULES = [
  {
    title: 'Не вскрывать до применения',
    text: 'вскрытое заранее заклинание службой не возмещается',
  },
  {
    title: 'Печать ставится при курьере',
    text: 'повреждённая или чужая печать даёт право отказать в перевозке',
  },
  {
    title: 'Есть закрытые адреса',
    text: 'Каэр Морхен, Аретуза и закрытые участки Велена, список обновляется еженедельно',
  },
  {
    title: 'Отмена в течение часа',
    text: 'Белый мёд отменяет заклинание, применённое не ранее часа назад',
  },
  {
    title: 'Класс IV — до 18:00',
    text: 'позднее этого времени сопровождение чародея недоступно',
  },
  {
    title: 'Хранение семь суток',
    text: 'невостребованное отправление утилизируется в присутствии двух свидетелей',
  },
]

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

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule) => (
            <article key={rule.title}>
              <RuleIcon alt={rule.title} />
              <h3 className="mt-4 text-sm font-medium leading-tight text-ink">{rule.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{rule.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
