export type Workshop = {
  id: string
  name: string
  city: string
  opensAt: number // минуты от полуночи
  closesAt: number // 1440 = круглосуточно
}

export const workshops: Workshop[] = [
  { id: 'fenn', name: 'Мастерская Фенна', city: 'Оксенфурт', opensAt: 480, closesAt: 1200 },
  {
    id: 'daerhenna',
    name: 'Аптекарский дом Аэп Даэрхенна',
    city: 'Новиград',
    opensAt: 0,
    closesAt: 1440,
  },
  { id: 'wimmer', name: 'Мастерская Виммера', city: 'Вызима', opensAt: 420, closesAt: 1140 },
  { id: 'banard', name: 'Лаборатория Бан Ард', city: '', opensAt: 960, closesAt: 1440 },
  { id: 'loantil', name: 'Мастерская Ло-Антиль', city: 'Горс Велен', opensAt: 0, closesAt: 1440 },
]

export function workshopById(id: string): Workshop {
  const workshop = workshops.find((item) => item.id === id)
  if (!workshop) throw new Error(`Неизвестная мастерская: ${id}`)
  return workshop
}
