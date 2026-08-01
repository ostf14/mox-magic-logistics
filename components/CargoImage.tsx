import type { HazardClass } from '@/data/spells'

import { HazardBadge } from './HazardBadge'

type CargoImageProps = {
  id: string
  name: string
  hazardClass: HazardClass
  city?: string
  src?: string
  /** Мини-бирка: только полоса с ромбом и кодом, без области изображения. */
  compact?: boolean
}

const BAR_GROUPS = 7
const HASH_SEED = 5381
const HASH_SHIFT = 5
const BAR_MIN = 1
const GAP_MIN = 2
const WIDTH_MASK = 3
const BITS_PER_GROUP = 4

/** Детерминированный хеш идентификатора: у каждой бирки свой рисунок штрихов. */
function hashId(id: string): number {
  let hash = HASH_SEED
  for (const char of id) {
    hash = ((hash << HASH_SHIFT) + hash + char.charCodeAt(0)) >>> 0
  }
  return hash
}

/** Штрихкод: чередование штрихов чернилами по бумаге, без изображений. */
function barcode(id: string): string {
  const hash = hashId(id)
  const stops: string[] = []
  let offset = 0

  for (let group = 0; group < BAR_GROUPS; group += 1) {
    const shift = group * BITS_PER_GROUP
    const bar = BAR_MIN + ((hash >> shift) & WIDTH_MASK)
    const gap = GAP_MIN + ((hash >> (shift + WIDTH_MASK)) & WIDTH_MASK)

    stops.push(`var(--ink) ${offset}px ${offset + bar}px`)
    stops.push(`transparent ${offset + bar}px ${offset + bar + gap}px`)
    offset += bar + gap
  }

  return `repeating-linear-gradient(90deg, ${stops.join(', ')})`
}

/**
 * Почтовая бирка груза. Пропс src готов принять изображение;
 * без него страница обязана выглядеть законченной.
 */
export function CargoImage({ id, name, hazardClass, city, src, compact }: CargoImageProps) {
  if (compact) {
    return (
      <figure className="flex shrink-0 items-center gap-3 border border-rule px-3 py-2">
        <HazardBadge hazardClass={hazardClass} />
        <figcaption className="font-mono text-[0.6875rem] tracking-wider text-ink">
          PL-CARGO-{id.toUpperCase()}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="border border-rule">
      <div className="relative aspect-[5/2] w-full overflow-hidden bg-paper-shade">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-rule px-4 py-2">
        <HazardBadge hazardClass={hazardClass} />
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[0.6875rem] tracking-wider text-ink">
          PL-CARGO-{id.toUpperCase()}
        </span>
        <span aria-hidden className="h-5 w-12 shrink-0" style={{ backgroundImage: barcode(id) }} />
      </div>

      {/* Строка города рисуется всегда: без неё бирки разной высоты и карточки съезжают. */}
      <figcaption className="min-h-[1.5rem] border-t border-rule px-4 py-1.5 text-[0.625rem] uppercase leading-none tracking-[0.2em] text-muted">
        {city}
      </figcaption>
    </figure>
  )
}
