import { formatDate } from '@/lib/formatAbsolute'
import { NOW } from '@/lib/now'

const DOCUMENT_NUMBER = 'PL-0000-0001'
/** Прочерк в незаполненной графе накладной. */
const EMPTY = '—'

const COLUMNS = ['№', 'Этап', 'Инструмент', 'Что сделал AI', 'Что доработал руками']

const STAGES = [
  { number: '01', title: 'Концепция и позиционирование' },
  { number: '02', title: 'Тексты и микрокопии' },
  { number: '03', title: 'Информационная архитектура' },
  { number: '04', title: 'Визуальное направление и типографика' },
  { number: '05', title: 'Сборка интерфейса' },
  { number: '06', title: 'Изображения груза' },
  { number: '07', title: 'Проверка и адаптив' },
]

const STACK = [
  { label: 'Фреймворк', value: 'Next.js 15, App Router · TypeScript · Tailwind v4' },
  { label: 'Хостинг', value: 'Vercel, сборка с main' },
  { label: 'Шрифты', value: 'IBM Plex Sans и IBM Plex Mono через next/font/google' },
]

const HARNESS = [
  { label: 'Скиллы', value: EMPTY },
  { label: 'MCP-коннекторы', value: EMPTY },
  { label: 'Плагины', value: EMPTY },
]

const PROMPTS = [
  { label: 'Чекпоинт 1', value: EMPTY },
  { label: 'Чекпоинт 2', value: EMPTY },
  { label: 'Чекпоинт 3', value: EMPTY },
  { label: 'Чекпоинт 4', value: EMPTY },
]

function Block({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: string }[]
}) {
  return (
    <section>
      <h3 className="text-xs uppercase tracking-[0.14em] text-muted">{title}</h3>
      <dl className="mt-3 border-t border-rule">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-rule py-3">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function Worklog() {
  return (
    <section id="worklog" className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-3 border-b border-rule pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Накладная на выполненные работы
            </h2>
            <p className="mt-3 text-sm text-muted">
              Отправление {DOCUMENT_NUMBER} · тестовое задание MOX
            </p>
          </div>
          <p className="font-mono text-sm text-muted">{formatDate(NOW)}</p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="py-2 pr-6 text-xs font-medium uppercase tracking-[0.14em] text-muted"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAGES.map((stage) => (
                <tr key={stage.number} className="border-b border-rule align-top">
                  <td className="w-10 py-3 pr-6 font-mono text-sm text-muted">{stage.number}</td>
                  <td className="w-64 py-3 pr-6 text-sm text-ink">{stage.title}</td>
                  <td className="w-48 py-3 pr-6 text-sm text-muted">{EMPTY}</td>
                  <td className="py-3 pr-6 text-sm text-muted">{EMPTY}</td>
                  <td className="py-3 text-sm text-muted">{EMPTY}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <Block title="Стек" rows={STACK} />
          <Block title="Харнес" rows={HARNESS} />
          <Block title="Промты" rows={PROMPTS} />
        </div>
      </div>
    </section>
  )
}
