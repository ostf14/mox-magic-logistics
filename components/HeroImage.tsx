import Image from 'next/image'

const IMAGE_WIDTH = 1663
const IMAGE_HEIGHT = 2142
const IMAGE_SIZES = '(max-width: 768px) 0px, 50vw'

/**
 * Правая половина первого экрана. Без src — пустая область: ни рамки,
 * ни заливки, страница должна выглядеть целостно и до изображения.
 *
 * Кадр вписывается по высоте секции и прижимается к правому краю контентной
 * колонки. Фон исходника снимается умножением, как у остальных иллюстраций;
 * наклон и прозрачные поля заданы в самом файле.
 */
/**
 * Кадр выше текстовой колонки, поэтому он вынут из потока и центрируется по
 * её середине — через inset-0 и my-auto, а не через transform: трансформ
 * создал бы контекст наложения и погасил multiply, светлый лист исходника
 * перестал бы растворяться. Потолок высоты — секция за вычетом шапки и ленты.
 */
const FRAME_HEIGHT = 'h-[min(34rem,calc(100svh-var(--header-height)-13rem))]'

export function HeroImage({ src, alt = '' }: { src?: string; alt?: string }) {
  return (
    <div className="relative hidden h-full min-h-[24rem] md:block">
      {src && (
        <div className={`absolute inset-0 my-auto ${FRAME_HEIGHT} min-h-[24rem]`}>
          <Image
            src={src}
            alt={alt}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            priority
            sizes={IMAGE_SIZES}
            className="h-full w-full object-contain object-right mix-blend-multiply"
          />
        </div>
      )}
    </div>
  )
}
