import Image from 'next/image'

/** Размеры обработанных файлов в public/cargo. */
const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 600
const IMAGE_SIZES = '(max-width: 768px) 100vw, 33vw'

/** Ширина под квадрат 4rem: исходник 2:1, по высоте его кроет вдвое большая ширина. */
const THUMB_WIDTH = 128

type CargoImageProps = {
  name: string
  src?: string
  /** Ремарка поверх изображения в левом верхнем углу. Одна на карточку. */
  badge?: string
  /** Квадратная миниатюра для строки заказа. */
  thumb?: boolean
}

/**
 * Изображение груза. Пропс src готов принять картинку; без него остаётся
 * пустая область на подложке — страница выглядит законченной и так.
 */
export function CargoImage({ name, src, badge, thumb }: CargoImageProps) {
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
        <span className="cargo-vignette absolute inset-0 block">
          <Image
            src={src}
            alt={name}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            sizes={IMAGE_SIZES}
            className="h-full w-full object-cover"
          />
        </span>
      )}

      {badge && (
        <span className="absolute left-3 top-3 max-w-[66%] truncate whitespace-nowrap border border-rule bg-paper/85 px-2 py-1 text-xs leading-tight text-ink">
          {badge}
        </span>
      )}
    </figure>
  )
}
