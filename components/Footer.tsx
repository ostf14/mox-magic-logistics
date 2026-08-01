const COLUMNS = [
  ['Тарифы', 'Каталог', 'Отследить', 'Отделения'],
  ['Правила применения', 'Страхование', 'Претензии'],
  ['Мастерским: стать партнёром', 'Курьерам: вакансии'],
]

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <span className="block text-base font-semibold tracking-[0.18em] text-ink">ПЛОТВА</span>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">
              Служба доставки заклинаний. Работаем с 1178 года.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <ul key={column[0]} className="space-y-2 text-sm text-muted">
              {column.map((item) => (
                <li key={item}>
                  <span className="hover:text-ink">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="mt-10 border-t border-rule pt-5 text-xs leading-relaxed text-muted">
          Лицензия Гильдии магов № 1178/КМ-04 · Новиград, ул. Гончарная, 4 · Тестовое задание,
          сервис вымышленный
        </p>
      </div>
    </footer>
  )
}
