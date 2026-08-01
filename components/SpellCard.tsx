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

export function SpellCard({ spell }: { spell: Spell }) {
  const { selectSpell } = useOrder()
  const workshop = workshopById(spell.workshopId)
  const opensIn = minutesUntilOpen(workshop, NOW)
  const isClosed = opensIn > 0
  const opensAt = formatMinutesOfDay(workshop.opensAt)

  // Ремарка на изображении — про сам груз: остаток и условия перевозки.
  const badge = spell.stock !== undefined ? `осталось ${spell.stock} шт` : spell.note

  function handleOrder() {
    selectSpell(spell.id)
    scrollToOrder()
  }

  return (
    <article className="flex flex-col border border-rule bg-card">
      <CargoImage name={spell.name} src={spell.image} badge={badge} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium leading-tight text-ink">{spell.name}</h3>
          <HazardBadge hazardClass={spell.hazardClass} />
        </div>

        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>
            {workshop.name}
            {workshop.city ? `, ${workshop.city}` : ''}
          </span>
          {isClosed && <span className="border border-rule px-1.5 py-0.5">закрыто</span>}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink">{spell.effect}</p>

        <div className="mt-auto">
          <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
            <span className="font-mono text-lg text-ink">{formatPrice(spell.price)}</span>
            <span className="text-xs text-muted">
              готовится <span className="font-mono">{formatDuration(catalogMinutes(spell))}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            disabled={isClosed}
            className="mt-4 w-full border border-ink bg-ink px-4 py-2.5 text-sm text-paper hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:border-dashed disabled:border-rule disabled:bg-transparent disabled:text-muted"
          >
            {isClosed ? `Откроется в ${opensAt}` : 'Оформить'}
          </button>
        </div>
      </div>
    </article>
  )
}
