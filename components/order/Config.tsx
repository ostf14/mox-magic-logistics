'use client'

import { TariffTile } from '@/components/TariffTile'
import { options } from '@/data/options'
import { spells } from '@/data/spells'
import { RECOMMENDED_TARIFF_ID, tariffs } from '@/data/tariffs'
import { workshopById } from '@/data/workshops'
import { calcOrder } from '@/lib/calcOrder'
import { formatPrice } from '@/lib/formatPrice'
import { NOW } from '@/lib/now'

import { Summary, SummaryBar } from './Summary'
import { useOrder } from './OrderSection'

const FREE = 0

export function Config() {
  const { order, selectSpell, selectTariff, toggleOption, goToForm } = useOrder()
  const calc = calcOrder({
    spellId: order.spellId,
    tariffId: order.tariffId,
    optionIds: order.optionIds,
    now: NOW,
  })

  const hasBlockedTariff = calc.blockedTariffIds.length > FREE

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        Оформление отправления
      </h2>
      <p className="mt-3 text-sm text-muted">Шаг 1 из 3 — состав</p>

      <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.14em] text-muted">Что доставляем</span>
            <span className="relative mt-2 block">
              <select
                value={order.spellId}
                onChange={(event) => selectSpell(event.target.value)}
                className="w-full appearance-none border border-rule bg-paper px-3 py-2.5 pr-10 text-sm text-ink focus:border-ink focus:outline-none"
              >
                {spells.map((spell) => {
                  const workshop = workshopById(spell.workshopId)
                  return (
                    <option key={spell.id} value={spell.id}>
                      {spell.name} — {workshop.name}
                    </option>
                  )
                })}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-1/2 -mt-1 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-b border-r border-muted"
              />
            </span>
          </label>

          <div className="mt-8">
            <span className="text-xs uppercase tracking-[0.14em] text-muted">Тариф доставки</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {tariffs.map((tariff) => (
                <TariffTile
                  key={tariff.id}
                  tariff={tariff}
                  recommended={tariff.id === RECOMMENDED_TARIFF_ID}
                  selected={order.tariffId === tariff.id}
                  disabled={calc.blockedTariffIds.includes(tariff.id)}
                  onSelect={selectTariff}
                />
              ))}
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-xs uppercase tracking-[0.14em] text-muted">Дополнительно</legend>
            <div className="mt-3 divide-y divide-rule border-y border-rule">
              {options.map((option) => {
                const forced = calc.forcedOptionIds.includes(option.id)
                const checked = forced || order.optionIds.includes(option.id)

                return (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 py-3 text-sm ${
                      forced ? 'text-muted' : 'text-ink'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={forced}
                      onChange={() => toggleOption(option.id)}
                      className="h-4 w-4 shrink-0 accent-ink"
                    />
                    <span>
                      {option.checkboxLabel} —{' '}
                      {option.price > FREE ? formatPrice(option.price) : 'бесплатно'}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {hasBlockedTariff && (
            <p className="mt-5 border border-class-4 p-4 text-sm leading-relaxed text-class-4">
              Пешая доставка недоступна: отправления класса IV перевозятся только с сопровождением
              чародея.
              <br />
              Страховка включена и не снимается.
            </p>
          )}
        </div>

        <Summary
          calc={calc}
          spellId={order.spellId}
          tariffId={order.tariffId}
          actionLabel="Далее"
          onAction={goToForm}
        />
      </div>

      <SummaryBar total={calc.total} actionLabel="Далее" onAction={goToForm} />
    </div>
  )
}
