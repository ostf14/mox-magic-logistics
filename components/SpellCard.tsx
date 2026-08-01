'use client'

import type { Spell } from '@/data/spells'
import { workshopById } from '@/data/workshops'
import { catalogMinutes, minutesUntilOpen } from '@/lib/calcOrder'
import { formatDuration } from '@/lib/formatDuration'
import { formatPrice } from '@/lib/formatPrice'
import { NOW, formatMinutesOfDay } from '@/lib/now'

import { CargoImage } from './CargoImage'
import { scrollToOrder, useOrder } from './order/OrderSection'

const DOT = '·'

export function SpellCard({ spell }: { spell: Spell }) {
  const { selectSpell } = useOrder()
  const workshop = workshopById(spell.workshopId)
  const opensIn = minutesUntilOpen(workshop, NOW)
  const isClosed = opensIn > 0
  const opensAt = formatMinutesOfDay(workshop.opensAt)

  // Ремарка на изображении одна: состояние мастерской важнее остатка и примечания.
  const badge = isClosed
    ? `закрыто ${DOT} открывается в ${opensAt}`
    : spell.stock !== undefined
      ? `осталось ${spell.stock} шт`
      : spell.note

  function handleOrder() {
    selectSpell(spell.id)
    scrollToOrder()
  }

  return (
    <article className="flex flex-col border border-rule bg-card">
      <CargoImage
        id={spell.id}
        name={spell.name}
        hazardClass={spell.hazardClass}
        src={spell.image}
        badge={badge}
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium text-ink">{spell.name}</h3>
        <p className="mt-1 text-xs text-muted">
          {workshop.name}
          {workshop.city ? `, ${workshop.city}` : ''}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink">{spell.effect}</p>

        <div className="mt-auto">
          <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
            <span className="font-mono text-lg text-ink">{formatPrice(spell.price)}</span>
            <span className="text-xs text-muted">
              готовится {formatDuration(catalogMinutes(spell))}
            </span>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            disabled={isClosed}
            className="mt-4 w-full border border-ink bg-ink px-4 py-2.5 text-sm text-paper hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:border-rule disabled:bg-transparent disabled:text-muted"
          >
            {isClosed ? `Откроется в ${opensAt}` : 'Оформить'}
          </button>
        </div>
      </div>
    </article>
  )
}
