export type Tariff = {
  id: string
  name: string
  method: string
  deliveryMinutes: number
  price: number
  /** Название строки в чеке и в разбивке срока. */
  lineLabel: string
  /** Иллюстрация тарифа в public/images/glyphs. */
  image: string
}

export const tariffs: Tariff[] = [
  {
    id: 'foot',
    name: 'Пешая',
    method: 'курьер идёт ногами',
    deliveryMinutes: 4320,
    price: 12,
    lineLabel: 'Пешая доставка',
    image: '/images/glyphs/foot.jpg',
  },
  {
    id: 'horse',
    name: 'Конная',
    method: 'верховой',
    deliveryMinutes: 1440,
    price: 30,
    lineLabel: 'Конная доставка',
    image: '/images/glyphs/horse.jpg',
  },
  {
    id: 'griffin',
    name: 'Грифоном',
    method: 'воздух',
    deliveryMinutes: 360,
    price: 85,
    lineLabel: 'Доставка грифоном',
    image: '/images/glyphs/griffin.jpg',
  },
  {
    id: 'portal',
    name: 'Портальная',
    method: 'портал в отделении получателя',
    deliveryMinutes: 60,
    price: 240,
    lineLabel: 'Портальная доставка',
    image: '/images/glyphs/portal.jpg',
  },
]

export const RECOMMENDED_TARIFF_ID = 'horse'
export const FOOT_TARIFF_ID = 'foot'

export function tariffById(id: string): Tariff {
  const tariff = tariffs.find((item) => item.id === id)
  if (!tariff) throw new Error(`Неизвестный тариф: ${id}`)
  return tariff
}
