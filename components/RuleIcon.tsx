import Image from 'next/image'

const ICON_SIDE = 160

/**
 * Место под пиктограмму правила. Пропс src готов принять картинку;
 * без него остаётся пустой квадрат на подложке.
 */
export function RuleIcon({ src, alt = '' }: { src?: string; alt?: string }) {
  return (
    <div className="relative h-20 w-20 overflow-hidden bg-paper-shade">
      {src && (
        <Image
          src={src}
          alt={alt}
          width={ICON_SIDE}
          height={ICON_SIDE}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
