const ITEMS = [
  'Отправлений в пути: 1 284',
  'Отделений: 47',
  'Переправа в Скеллиге: задержка 4 ч',
  'Оксенфуртский мост закрыт, объезд',
]

const SEPARATOR = '·'
/** Лента дублируется, чтобы прокрутка замыкалась без разрыва. */
const COPIES = [0, 1]

export function Ticker() {
  return (
    <div aria-label="Операционная сводка" className="overflow-hidden border-t border-rule py-2">
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
    </div>
  )
}
