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
    id: 'gate',
    title: 'Есть закрытые адреса',
    text: 'Каэр Морхен, Аретуза и закрытые участки Велена, список обновляется еженедельно',
    image: '/images/glyphs/gate.jpg',
  },
  {
    id: 'undo',
    title: 'Отмена в течение часа',
    text: 'Белый мёд отменяет заклинание, применённое не ранее часа назад',
    image: '/images/glyphs/undo.jpg',
  },
  {
    id: 'candle',
    title: 'Класс IV — до 18:00',
    text: 'позднее этого времени сопровождение чародея недоступно',
    image: '/images/glyphs/candle.jpg',
  },
  {
    id: 'hourglass',
    title: 'Хранение семь суток',
    text: 'невостребованное отправление утилизируется в присутствии двух свидетелей',
    image: '/images/glyphs/hourglass.jpg',
  },
]
