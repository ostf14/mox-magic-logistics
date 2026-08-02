export type HazardClass = 1 | 2 | 3 | 4

export type Spell = {
  id: string
  name: string
  workshopId: string
  situation: string
  effect: string
  hazardClass: HazardClass
  prepMinutes: number
  price: number
  stock?: number
  /** Путь к обработанному изображению груза в public/cargo. */
  image?: string
  /** Примечание в карточке, если есть. Текст из CONTENT.md. */
  note?: string
}

export const spells: Spell[] = [
  {
    id: 'cat',
    name: 'Кошка',
    workshopId: 'fenn',
    situation: 'Искать что-то в темноте',
    effect: 'Ночное зрение, 4 часа',
    hazardClass: 1,
    prepMinutes: 20,
    price: 45,
    image: '/images/cargo/cat.webp',
  },
  {
    id: 'oriole',
    name: 'Иволга',
    workshopId: 'daerhenna',
    situation: 'Утро после праздника цеха',
    effect: 'Выводит яд и его последствия за 15 минут',
    hazardClass: 1,
    prepMinutes: 40,
    price: 60,
    image: '/images/cargo/oriole.webp',
    stock: 3,
  },
  {
    id: 'thunder',
    name: 'Гром',
    workshopId: 'wimmer',
    situation: 'Дотерпеть до цирюльника',
    effect: 'Снимает боль на 6 часов, сознание не туманит',
    hazardClass: 2,
    prepMinutes: 120,
    price: 180,
    image: '/images/cargo/thunder.webp',
  },
  {
    id: 'whitehoney',
    name: 'Белый мёд',
    workshopId: 'wimmer',
    situation: 'Сказанное на совете прозвучало не так',
    effect: 'Отменяет действие любого заклинания, применённого за последний час',
    hazardClass: 2,
    prepMinutes: 180,
    price: 210,
    image: '/images/cargo/whitehoney.webp',
  },
  {
    id: 'swallow',
    name: 'Ласточка',
    workshopId: 'banard',
    situation: 'Третья неделя без выходных',
    effect: 'Восстанавливает силы, действует сутки',
    hazardClass: 3,
    prepMinutes: 480,
    price: 340,
    image: '/images/cargo/swallow.webp',
  },
  {
    id: 'moondust',
    name: 'Лунная пыль',
    workshopId: 'loantil',
    situation: 'На участке поселилось нечто крупное',
    effect: 'Усмиряет одно существо до восхода солнца',
    hazardClass: 4,
    prepMinutes: 2880,
    price: 890,
    image: '/images/cargo/moondust.webp',
    note: 'Только с сопровождением',
  },
]

export function spellById(id: string): Spell {
  const spell = spells.find((item) => item.id === id)
  if (!spell) throw new Error(`Неизвестное заклинание: ${id}`)
  return spell
}
