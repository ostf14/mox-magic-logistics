import Image from 'next/image'

const ICON_SIDE = 280

/**
 * Иллюстрация правила. Фон у исходников светлый и разный, поэтому вместо
 * вырезания альфы кадр множится на подложку — светлое растворяется само.
 */
export function RuleIcon({
  src,
  alt = '',
  dense = false,
}: {
  src?: string
  alt?: string
  /** Плотная штриховка: приглушаем, чтобы вес совпал с лёгким контуром. */
  dense?: boolean
}) {
  return (
    <div
      className={`relative h-[8.75rem] w-[8.75rem] overflow-hidden ${src ? '' : 'bg-paper-shade'}`}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          width={ICON_SIDE}
          height={ICON_SIDE}
          className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply ${
            dense ? 'opacity-75' : ''
          }`}
        />
      )}
    </div>
  )
}
