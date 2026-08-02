export type Rule = {
  id: string
  title: string
  text: string
  /** Иллюстрация правила в public/images/glyphs. */
  image: string
}

export const rules: Rule[] = [
  {
    id: 'sealed',
    title: 'Не вскрывать до применения',
    text: 'вскрытое заранее заклинание службой не возмещается',
    image: '/images/glyphs/sealed.jpg',
  },
  {
    id: 'stamp',
    title: 'Печать ставится при курьере',
    text: 'повреждённая или чужая печать даёт право отказать в перевозке',
    image: '/images/glyphs/stamp.jpg',
  },
  {
    id: 'candle',
    title: 'Класс IV — до 18:00',
    text: 'позднее этого времени сопровождение чародея недоступно',
    image: '/images/glyphs/candle.jpg',
  },
  {
    id: 'storage',
    title: 'Хранение семь суток',
    text: 'невостребованное отправление утилизируется в присутствии двух свидетелей',
    image: '/images/glyphs/undo.jpg',
  },
]
