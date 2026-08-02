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
 * Кадр вынут из потока и центрируется по середине текстовой колонки — через
 * inset-y-0 и my-auto, а не через transform: трансформ создал бы контекст
 * наложения и погасил multiply, светлый лист исходника перестал бы
 * растворяться.
 *
 * Высота вьюпортом не ограничена: кадру разрешено выходить за секцию, вверх
 * под шапку и вниз на ленту. Размер задаёт ширина — колонка изображения плюс
 * межколоночный зазор; дальше влево начинается текстовая колонка, и кадр
 * перекрыл бы строки заголовка. Поле сверху и снизу в исходнике большое,
 * поэтому сам рисунок до навигации и до ленты не достаёт. Отступ справа
 * держит кадр в стороне от ярлыка шторки, пока контентная колонка прижата
 * к краю окна.
 */
const FRAME_HEIGHT = 'h-[52rem]'

export function HeroImage({ src, alt = '' }: { src?: string; alt?: string }) {
  return (
    <div className="relative hidden h-full min-h-[24rem] md:block">
      {src && (
        <div
          className={`absolute inset-y-0 right-0 my-auto w-[calc(100%_+_4rem)] pr-12 ${FRAME_HEIGHT} min-h-[24rem] xl:pr-0`}
        >
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
