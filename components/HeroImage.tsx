import Image from 'next/image'

const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 1200
const IMAGE_SIZES = '(max-width: 768px) 0px, 50vw'

/**
 * Правая половина первого экрана. Без src — пустая область: ни рамки,
 * ни заливки, страница должна выглядеть целостно и до изображения.
 */
export function HeroImage({ src, alt = '' }: { src?: string; alt?: string }) {
  return (
    <div className="relative hidden h-full min-h-[24rem] md:block">
      {src && (
        <Image
          src={src}
          alt={alt}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes={IMAGE_SIZES}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
