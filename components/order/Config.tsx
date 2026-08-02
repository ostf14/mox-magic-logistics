'use client'

import { CargoImage } from '@/components/CargoImage'
import { TariffTile } from '@/components/TariffTile'
import { options } from '@/data/options'
import { spellById } from '@/data/spells'
import { RECOMMENDED_TARIFF_ID, tariffs } from '@/data/tariffs'
import { workshopById } from '@/data/workshops'
import { calcOrder } from '@/lib/calcOrder'
import { formatPrice } from '@/lib/formatPrice'
import { NOW } from '@/lib/now'

import { Steps, STEP_COMPOSITION } from './Steps'
import { Summary, SummaryBar } from './Summary'
import { useOrder } from './OrderSection'

const FREE = 0
const CATALOG_ID = 'catalog'

function scrollToCatalog() {
  document.getElementById(CATALOG_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Config() {
  const { order, selectTariff, toggleOption, goToForm } = useOrder()
  const calc = calcOrder({
    spellId: order.spellId,
    tariffId: order.tariffId,
    optionIds: order.optionIds,
    now: NOW,
  })

  const spell = spellById(order.spellId)
  const workshop = workshopById(spell.workshopId)
  const hasBlockedTariff = calc.blockedTariffIds.length > FREE

  return (
    <div>
      <Steps current={STEP_COMPOSITION} />

      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        Оформление отправления
      </h2>

      <div className="mt-9 grid gap-10 md:grid-cols-[minmax(0,1fr)_21rem]">
        <div>
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Что доставляем</span>
          <div className="mt-2 flex items-start justify-between gap-4 border border-rule bg-card p-4">
            <div className="flex min-w-0 items-start gap-4">
              <CargoImage thumb name={spell.name} src={spell.image} />
              <span className="min-w-0">
                <span className="block text-lg font-medium text-ink">{spell.name}</span>
                <span className="mt-1 block text-xs text-muted">
                  {workshop.name}
                  {workshop.city ? `, ${workshop.city}` : ''}
                </span>
              </span>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="text-xs text-muted underline underline-offset-4 hover:text-ink"
              >
                Выбрать другое
              </button>
              <span className="font-mono text-lg text-ink">{formatPrice(spell.price)}</span>
            </div>
          </div>

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
                      {option.price > FREE ? (
                        <span className="font-mono text-ink">{formatPrice(option.price)}</span>
                      ) : (
                        'бесплатно'
                      )}
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
