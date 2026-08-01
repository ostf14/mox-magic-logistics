const RULES = [
  'Отправление вскрывается в момент применения. Вскрытое заранее заклинание службой не возмещается.',
  'Курьер вправе отказать в перевозке, если печать мастерской повреждена, отсутствует или поставлена не при нём.',
  'Служба не доставляет заклинания на территорию Каэр Морхена, в Аретузу и на закрытые участки Велена. Список закрытых участков обновляется еженедельно.',
  'Белый мёд отменяет действие заклинания, применённого не ранее часа назад. Более поздние отмены службой не гарантируются.',
  'Отправления класса IV принимаются к перевозке до 18:00. Позднее этого времени сопровождение недоступно.',
  'Отправление, не востребованное в отделении в течение семи суток, утилизируется в присутствии двух свидетелей.',
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

        <ol className="mt-9 grid list-outside list-decimal gap-x-12 pl-6 md:grid-cols-2">
          {RULES.map((rule) => (
            <li
              key={rule}
              className="border-t border-rule py-4 pl-2 text-sm leading-relaxed text-ink marker:font-mono marker:text-xs marker:text-muted"
            >
              {rule}
            </li>
          ))}
        </ol>

        <p className="mt-8 border-t border-rule pt-5 text-xs leading-relaxed text-muted">
          Деятельность лицензирована. Реестровая запись Гильдии магов № 1178/КМ-04. Юридическое
          сопровождение — контора «Кодрингер и Фенн», Оксенфурт.
        </p>
      </div>
    </section>
  )
}
