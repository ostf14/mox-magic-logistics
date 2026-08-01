const ITEMS = [
  'В пути: 1 284 отправления',
  'Отделений: 47',
  'Задержка на переправе в Скеллиге: 4 ч',
  'Приём отправлений класса IV — до 18:00',
  'Оксенфуртский мост закрыт, курьеры идут в объезд',
]

const SEPARATOR = '·'
/** Лента дублируется, чтобы прокрутка замыкалась без разрыва. */
const COPIES = [0, 1]

export function Ticker() {
  return (
    <section aria-label="Операционная сводка" className="overflow-hidden border-b border-rule py-2">
      <div className="ticker-track flex w-max">
        {COPIES.map((copy) => (
          <div key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <span
                key={item}
                className="flex shrink-0 items-center whitespace-nowrap text-xs text-muted"
              >
                <span className="px-4">{item}</span>
                <span className="text-rule">{SEPARATOR}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
