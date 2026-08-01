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
  /** Примечание в карточке, если есть. Текст из CONTENT.md. */
  note?: string
}

export const spells: Spell[] = [
  {
    id: 'cat',
    name: 'Кошка',
    workshopId: 'fenn',
    situation: 'искать что-то в темноте',
    effect: 'ночное зрение, 4 часа',
    hazardClass: 1,
    prepMinutes: 20,
    price: 45,
  },
  {
    id: 'oriole',
    name: 'Иволга',
    workshopId: 'daerhenna',
    situation: 'утро после праздника цеха',
    effect: 'выводит яд и его последствия за 15 минут',
    hazardClass: 1,
    prepMinutes: 40,
    price: 60,
    stock: 3,
  },
  {
    id: 'thunder',
    name: 'Гром',
    workshopId: 'wimmer',
    situation: 'дотерпеть до цирюльника',
    effect: 'снимает боль на 6 часов, сознание не туманит',
    hazardClass: 2,
    prepMinutes: 120,
    price: 180,
  },
  {
    id: 'whitehoney',
    name: 'Белый мёд',
    workshopId: 'wimmer',
    situation: 'сказанное на совете прозвучало не так',
    effect: 'отменяет действие любого заклинания, применённого за последний час',
    hazardClass: 2,
    prepMinutes: 180,
    price: 210,
  },
  {
    id: 'swallow',
    name: 'Ласточка',
    workshopId: 'banard',
    situation: 'третья неделя без выходных',
    effect: 'восстанавливает силы, действует сутки',
    hazardClass: 3,
    prepMinutes: 480,
    price: 340,
  },
  {
    id: 'moondust',
    name: 'Лунная пыль',
    workshopId: 'loantil',
    situation: 'на участке поселилось нечто крупное',
    effect: 'усмиряет одно существо до восхода солнца',
    hazardClass: 4,
    prepMinutes: 2880,
    price: 890,
    note: 'пешая доставка недоступна, сопровождение обязательно',
  },
]

export function spellById(id: string): Spell {
  const spell = spells.find((item) => item.id === id)
  if (!spell) throw new Error(`Неизвестное заклинание: ${id}`)
  return spell
}
