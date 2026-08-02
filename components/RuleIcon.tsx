import Image from 'next/image'

const ICON_SIDE = 192

/**
 * Иллюстрация правила. Фон у исходников светлый и разный, поэтому вместо
 * вырезания альфы кадр множится на подложку — светлое растворяется само.
 */
export function RuleIcon({ src, alt = '' }: { src?: string; alt?: string }) {
  return (
    <div className={`relative h-24 w-24 overflow-hidden ${src ? '' : 'bg-paper-shade'}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          width={ICON_SIDE}
          height={ICON_SIDE}
          className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
        />
      )}
    </div>
  )
}
