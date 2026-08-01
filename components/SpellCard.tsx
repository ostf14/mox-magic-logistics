'use client'

import type { Spell } from '@/data/spells'
import { workshopById } from '@/data/workshops'
import { catalogMinutes, minutesUntilOpen } from '@/lib/calcOrder'
import { formatDuration } from '@/lib/formatDuration'
import { formatPrice } from '@/lib/formatPrice'
import { NOW, formatMinutesOfDay } from '@/lib/now'

import { CargoImage } from './CargoImage'
import { HazardBadge } from './HazardBadge'
import { scrollToOrder, useOrder } from './order/OrderSection'

const DOT = '·'

export function SpellCard({ spell }: { spell: Spell }) {
  const { selectSpell } = useOrder()
  const workshop = workshopById(spell.workshopId)
  const opensIn = minutesUntilOpen(workshop, NOW)
  const isClosed = opensIn > 0
  const opensAt = formatMinutesOfDay(workshop.opensAt)

  function handleOrder() {
    selectSpell(spell.id)
    scrollToOrder()
  }

  return (
    <article className="flex flex-col border border-rule p-5">
      <CargoImage id={spell.id} name={spell.name} />

      <h3 className="mt-5 text-lg font-medium text-ink">{spell.name}</h3>
      <p className="mt-1 text-xs text-muted">
        {workshop.name}
        {workshop.city ? `, ${workshop.city}` : ''}
      </p>

      <dl className="mt-4 space-y-2 text-sm leading-relaxed">
        <div>
          <dt className="inline text-muted">Ситуация: </dt>
          <dd className="inline text-ink">{spell.situation}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Эффект: </dt>
          <dd className="inline text-ink">{spell.effect}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-rule pt-4 text-xs text-muted">
        <HazardBadge hazardClass={spell.hazardClass} />
        <span className="text-rule">{DOT}</span>
        <span>готовится {formatDuration(catalogMinutes(spell))}</span>
        <span className="text-rule">{DOT}</span>
        <span className="font-mono text-ink">{formatPrice(spell.price)}</span>
      </div>

      {spell.stock !== undefined && (
        <p className="mt-3">
          <span className="border border-class-2 px-2 py-1 text-xs text-class-2">
            осталось {spell.stock} шт
          </span>
        </p>
      )}

      {isClosed && (
        <p className="mt-3">
          <span className="border border-rule px-2 py-1 text-xs text-muted">
            закрыто {DOT} открывается в {opensAt}
          </span>
        </p>
      )}

      {spell.note && <p className="mt-3 text-xs leading-relaxed text-muted">{spell.note}</p>}

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={handleOrder}
          disabled={isClosed}
          className="w-full border border-ink bg-ink px-4 py-2.5 text-sm text-paper hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:border-rule disabled:bg-transparent disabled:text-muted"
        >
          {isClosed ? `Откроется в ${opensAt}` : 'Оформить'}
        </button>
      </div>
    </article>
  )
}
