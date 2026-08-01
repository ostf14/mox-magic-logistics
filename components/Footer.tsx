'use client'

import { scrollToOrder, useOrder } from './order/OrderSection'

/**
 * href — пункт с якорем на странице, tracking — действие «Отследить».
 * Остальные пункты нерабочие и на наведение не реагируют.
 */
type FooterItem = { label: string; href?: string; tracking?: boolean }

const COLUMNS: FooterItem[][] = [
  [
    { label: 'Тарифы', href: '#tariffs' },
    { label: 'Каталог', href: '#catalog' },
    { label: 'Отследить', tracking: true },
    { label: 'Отделения' },
  ],
  [{ label: 'Правила применения', href: '#rules' }, { label: 'Страхование' }, { label: 'Претензии' }],
  [{ label: 'Мастерским: стать партнёром' }, { label: 'Курьерам: вакансии' }],
]

export function Footer() {
  const { showDemoTracking } = useOrder()

  function handleTrack() {
    showDemoTracking()
    scrollToOrder()
  }

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <span className="block text-lg font-semibold tracking-[0.18em] text-ink">ПЛОТВА</span>
            <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">
              Служба доставки заклинаний. Работаем с 1178 года.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <ul key={column[0].label} className="space-y-2 text-sm text-muted">
              {column.map((item) => (
                <li key={item.label}>
                  {item.href && (
                    <a href={item.href} className="hover:text-ink">
                      {item.label}
                    </a>
                  )}
                  {item.tracking && (
                    <button type="button" onClick={handleTrack} className="hover:text-ink">
                      {item.label}
                    </button>
                  )}
                  {!item.href && !item.tracking && <span>{item.label}</span>}
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
