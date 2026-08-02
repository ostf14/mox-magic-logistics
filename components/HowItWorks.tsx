const STEPS = [
  {
    number: '01',
    title: 'Вы выбираете заклинание',
    text: 'В каталоге собрано то, что мастерские готовы отдать в перевозку. Сроки и класс указаны в карточке.',
  },
  {
    number: '02',
    title: 'Мастерская готовит и опечатывает',
    text: 'Печать ставится при курьере. Вскрытая в пути печать означает, что отправление утрачено.',
  },
  {
    number: '03',
    title: 'Курьер везёт по выбранному тарифу',
    text: 'Отправления класса IV сопровождает чародей. Он же расписывается за груз.',
  },
  {
    number: '04',
    title: 'Вручение под подпись',
    text: 'Получатель должен быть на месте. Курьер ждёт не более получаса, дальше отправление уходит в отделение.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Как это устроено
        </h2>

        <ol className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 md:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.number} className="bg-card p-5">
              <span className="font-mono text-xs text-muted">{step.number}</span>
              <h3 className="mt-3 text-lg font-medium text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
