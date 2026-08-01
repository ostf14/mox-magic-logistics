import type { HazardClass } from '@/data/spells'

import { HazardBadge } from './HazardBadge'

type CargoImageProps = {
  id: string
  name: string
  hazardClass: HazardClass
  city?: string
  src?: string
}

/** Штрихкод: чередование штрихов чернилами по бумаге, без изображений. */
const BARCODE =
  'repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 3px, var(--ink) 3px 5px, transparent 5px 9px, var(--ink) 9px 10px, transparent 10px 13px)'

/**
 * Почтовая бирка груза. Пропс src готов принять изображение;
 * без него страница обязана выглядеть законченной.
 */
export function CargoImage({ id, name, hazardClass, city, src }: CargoImageProps) {
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
        <span aria-hidden className="h-5 w-12 shrink-0" style={{ backgroundImage: BARCODE }} />
      </div>

      {/* Строка города рисуется всегда: без неё бирки разной высоты и карточки съезжают. */}
      <figcaption className="min-h-[1.5rem] border-t border-rule px-4 py-1.5 text-[0.625rem] uppercase leading-none tracking-[0.2em] text-muted">
        {city}
      </figcaption>
    </figure>
  )
}
