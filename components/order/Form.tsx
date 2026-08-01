'use client'

import type { FormEvent } from 'react'

import { calcOrder } from '@/lib/calcOrder'
import { formatAbsolute } from '@/lib/formatAbsolute'
import { NOW } from '@/lib/now'

import { Summary, SummaryBar } from './Summary'
import { useOrder, type Recipient } from './OrderSection'

const SUBMIT_LABEL = 'Оформить отправление'
const NOTE_ROWS = 3

export function Form() {
  const { order, setRecipientField, goToConfig, submit } = useOrder()
  const calc = calcOrder({
    spellId: order.spellId,
    tariffId: order.tariffId,
    optionIds: order.optionIds,
    now: NOW,
  })

  const fields: {
    id: keyof Recipient
    label: string
    placeholder: string
    hint?: string
    multiline?: boolean
  }[] = [
    { id: 'name', label: 'Кому', placeholder: 'имя и прозвище' },
    {
      id: 'address',
      label: 'Куда',
      placeholder: 'адрес или номер отделения',
      hint: '47 отделений, ближайшее — Новиград, ул. Гончарная, 4',
    },
    {
      id: 'when',
      label: 'Когда',
      placeholder: formatAbsolute(calc.readyAt),
      hint: 'можно перенести на любой день в течение недели',
    },
    {
      id: 'note',
      label: 'Комментарий курьеру',
      placeholder: 'как найти, где оставить, кого спросить',
      multiline: true,
    },
  ]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        Оформление отправления
      </h2>
      <p className="mt-3 text-sm text-muted">Шаг 2 из 3 — получатель</p>

      <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,1fr)_21rem]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {fields.map((field) => (
              <label key={field.id} className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-muted">
                  {field.label}
                </span>
                {field.multiline ? (
                  <textarea
                    rows={NOTE_ROWS}
                    value={order.recipient[field.id]}
                    onChange={(event) => setRecipientField(field.id, event.target.value)}
                    placeholder={field.placeholder}
                    className="mt-2 w-full resize-none border border-rule bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                  />
                ) : (
                  <input
                    value={order.recipient[field.id]}
                    onChange={(event) => setRecipientField(field.id, event.target.value)}
                    placeholder={field.placeholder}
                    className="mt-2 w-full border border-rule bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                  />
                )}
                {field.hint && <span className="mt-2 block text-xs text-muted">{field.hint}</span>}
              </label>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="border border-ink bg-ink px-6 py-3 text-sm text-paper hover:bg-transparent hover:text-ink"
            >
              {SUBMIT_LABEL}
            </button>
            <button
              type="button"
              onClick={goToConfig}
              className="border border-rule px-6 py-3 text-sm text-ink hover:border-ink"
            >
              Назад к составу
            </button>
          </div>

          <p className="mt-6 max-w-xl text-xs leading-relaxed text-muted">
            Оформляя отправление, вы подтверждаете, что ознакомились с правилами безопасного
            применения и что получатель находится в трезвом уме.
          </p>
        </form>

        <Summary calc={calc} spellId={order.spellId} tariffId={order.tariffId} />
      </div>

      <SummaryBar total={calc.total} actionLabel={SUBMIT_LABEL} onAction={submit} />
    </div>
  )
}
