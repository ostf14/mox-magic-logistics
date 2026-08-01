import Image from 'next/image'

import type { HazardClass } from '@/data/spells'

import { HazardBadge } from './HazardBadge'

/** Размеры обработанных файлов в public/cargo. */
const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 600
const IMAGE_SIZES = '(max-width: 768px) 100vw, 33vw'

const BAR_GROUPS = 7
const HASH_SEED = 5381
const HASH_SHIFT = 5
const BAR_MIN = 1
const GAP_MIN = 2
const WIDTH_MASK = 3
const BITS_PER_GROUP = 4

type CargoImageProps = {
  id: string
  name: string
  hazardClass: HazardClass
  src?: string
  /** Ремарка поверх изображения в левом верхнем углу. Одна на карточку. */
  badge?: string
  /** Квадратная миниатюра для строки заказа. */
  thumb?: boolean
}

/** Ширина под квадрат 4rem: исходник 2:1, по высоте его кроет вдвое большая ширина. */
const THUMB_WIDTH = 128

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
 * Груз с почтовой биркой. Пропс src готов принять изображение;
 * без него страница обязана выглядеть законченной.
 */
export function CargoImage({ id, name, hazardClass, src, badge, thumb }: CargoImageProps) {
  if (thumb) {
    return (
      <figure className="relative h-16 w-16 shrink-0 overflow-hidden border border-rule bg-paper-shade">
        {src && (
          <Image
            src={src}
            alt={name}
            width={THUMB_WIDTH}
            height={THUMB_WIDTH}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </figure>
    )
  }

  return (
    <figure className="relative aspect-[2/1] w-full overflow-hidden bg-paper-shade">
      {src && (
        <Image
          src={src}
          alt={name}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes={IMAGE_SIZES}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {badge && (
        <span className="absolute left-3 top-3 max-w-[66%] truncate whitespace-nowrap border border-rule bg-paper/85 px-2 py-1 text-xs leading-tight text-ink">
          {badge}
        </span>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-rule bg-paper/85 px-4 py-2">
        <HazardBadge hazardClass={hazardClass} />
        <span className="min-w-0 flex-1 truncate text-center font-mono text-xs tracking-wider text-muted">
          PL-CARGO-{id.toUpperCase()}
        </span>
        <span aria-hidden className="h-5 w-12 shrink-0" style={{ backgroundImage: barcode(id) }} />
      </figcaption>
    </figure>
  )
}
