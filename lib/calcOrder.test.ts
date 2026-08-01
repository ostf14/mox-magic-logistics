import { describe, expect, it } from 'vitest'

import { options, SERVICE_FEE } from '../data/options'
import { spellById, spells } from '../data/spells'
import { tariffById } from '../data/tariffs'
import { workshops } from '../data/workshops'
import { calcOrder, catalogMinutes, minutesUntilOpen } from './calcOrder'
import { formatAbsolute } from './formatAbsolute'
import { formatDuration } from './formatDuration'
import { NOW, addMinutes, minutesOfDay } from './now'

const base = { optionIds: [] as string[], now: NOW }

describe('NOW', () => {
  it('09:12 в расчётном поясе, независимо от TZ машины', () => {
    expect(minutesOfDay(NOW)).toBe(552)
  })

  it('при NOW закрыта только Лаборатория Бан Ард', () => {
    const closed = workshops.filter((workshop) => minutesUntilOpen(workshop, NOW) > 0)
    expect(closed.map((workshop) => workshop.id)).toEqual(['banard'])
  })
})

describe('formatDuration', () => {
  it('меньше часа — минуты', () => {
    expect(formatDuration(40)).toBe('40 мин')
    expect(formatDuration(59)).toBe('59 мин')
  })

  it('от часа до суток — floor до часа', () => {
    expect(formatDuration(60)).toBe('1 ч')
    expect(formatDuration(380)).toBe('6 ч')
    expect(formatDuration(1439)).toBe('23 ч')
  })

  it('от суток — floor до суток', () => {
    expect(formatDuration(1440)).toBe('1 сутки')
    expect(formatDuration(2880)).toBe('2 суток')
    expect(formatDuration(4399)).toBe('3 суток')
  })
})

describe('formatAbsolute', () => {
  it('сегодня', () => {
    expect(formatAbsolute(addMinutes(NOW, 628))).toBe('сегодня, к 19:40')
  })

  it('завтра', () => {
    expect(formatAbsolute(addMinutes(NOW, 1548))).toBe('завтра, к 11:00')
  })

  it('дальше — день недели', () => {
    expect(formatAbsolute(addMinutes(NOW, 2988))).toBe('понедельник, к 11:00')
  })
})

describe('calcOrder — срок', () => {
  it('Лунная пыль: грифон и портал дают одинаковый formatDuration', () => {
    const griffin = calcOrder({ ...base, spellId: 'moondust', tariffId: 'griffin' })
    const portal = calcOrder({ ...base, spellId: 'moondust', tariffId: 'portal' })

    expect(griffin.totalMinutes).toBe(3240)
    expect(portal.totalMinutes).toBe(2940)
    expect(formatDuration(griffin.totalMinutes)).toBe(formatDuration(portal.totalMinutes))
    expect(formatDuration(portal.totalMinutes)).toBe('2 суток')
  })

  it('Ласточка: мастерская закрыта, waitUntilOpen больше нуля', () => {
    const calc = calcOrder({ ...base, spellId: 'swallow', tariffId: 'horse' })

    expect(calc.waitUntilOpen).toBeGreaterThan(0)
    expect(calc.totalMinutes).toBe(calc.waitUntilOpen + 480 + 1440)
  })

  it('Кошка: мастерская открыта, ожидания нет', () => {
    const calc = calcOrder({ ...base, spellId: 'cat', tariffId: 'foot' })

    expect(calc.waitUntilOpen).toBe(0)
    expect(calc.totalMinutes).toBe(4340)
  })

  it('readyAt считается от now, а не от текущего времени машины', () => {
    const calc = calcOrder({ ...base, spellId: 'cat', tariffId: 'portal' })

    expect(calc.readyAt.toISOString()).toBe(addMinutes(NOW, 80).toISOString())
    expect(formatAbsolute(calc.readyAt)).toBe('сегодня, к 10:32')
  })
})

describe('catalogMinutes', () => {
  it('срок в карточке — только изготовление, доставка и ожидание не входят', () => {
    for (const spell of spells) {
      expect(catalogMinutes(spell)).toBe(spell.prepMinutes)
    }
    expect(formatDuration(catalogMinutes(spellById('cat')))).toBe('20 мин')
    expect(formatDuration(catalogMinutes(spellById('swallow')))).toBe('8 ч')
    expect(formatDuration(catalogMinutes(spellById('moondust')))).toBe('2 суток')
  })
})

describe('calcOrder — ограничения', () => {
  it('класс IV блокирует пешую доставку', () => {
    const calc = calcOrder({ ...base, spellId: 'moondust', tariffId: 'portal' })
    expect(calc.blockedTariffIds).toEqual(['foot'])
  })

  it('класс ниже IV пешую не блокирует', () => {
    const calc = calcOrder({ ...base, spellId: 'swallow', tariffId: 'horse' })
    expect(calc.blockedTariffIds).toEqual([])
  })

  it('класс III и выше: страховка принудительная и попадает в чек без выбора', () => {
    const swallow = calcOrder({ ...base, spellId: 'swallow', tariffId: 'horse' })
    const moondust = calcOrder({ ...base, spellId: 'moondust', tariffId: 'portal' })

    expect(swallow.forcedOptionIds).toEqual(['insurance'])
    expect(moondust.forcedOptionIds).toEqual(['insurance'])
    expect(swallow.lines.map((line) => line.label)).toContain('Страховка')
  })

  it('класс I и II: страховка не навязывается', () => {
    const calc = calcOrder({ ...base, spellId: 'thunder', tariffId: 'horse' })

    expect(calc.forcedOptionIds).toEqual([])
    expect(calc.lines.map((line) => line.label)).not.toContain('Страховка')
  })
})

describe('calcOrder — чек', () => {
  it('Лунная пыль порталом: строки и итог как в CONTENT', () => {
    const calc = calcOrder({ ...base, spellId: 'moondust', tariffId: 'portal' })

    expect(calc.lines).toEqual([
      { label: 'Лунная пыль', value: 890 },
      { label: 'Портальная доставка', value: 240 },
      { label: 'Страховка', value: 15 },
      { label: 'Сбор службы', value: 20 },
    ])
    expect(calc.total).toBe(1165)
  })

  it('порядок строк: заклинание → доставка → опции → сбор службы', () => {
    const calc = calcOrder({
      ...base,
      spellId: 'cat',
      tariffId: 'horse',
      optionIds: ['anonymous', 'insurance'],
    })

    expect(calc.lines.map((line) => line.label)).toEqual([
      'Кошка',
      'Конная доставка',
      'Страховка',
      'Анонимная доставка',
      'Сбор службы',
    ])
  })

  it('бесплатная опция в чек не попадает', () => {
    const calc = calcOrder({ ...base, spellId: 'cat', tariffId: 'horse', optionIds: ['signature'] })

    expect(calc.lines.map((line) => line.label)).not.toContain('Подпись получателя при вручении')
    expect(calc.total).toBe(45 + 30 + SERVICE_FEE)
  })

  it('итог равен сумме строк для любой пары заклинание × тариф', () => {
    for (const spell of spells) {
      for (const tariff of ['foot', 'horse', 'griffin', 'portal']) {
        const calc = calcOrder({ ...base, spellId: spell.id, tariffId: tariff })
        const sum = calc.lines.reduce((total, line) => total + line.value, 0)

        expect(calc.total).toBe(sum)
        expect(calc.prepMinutes).toBe(spellById(spell.id).prepMinutes)
        expect(calc.deliveryMinutes).toBe(tariffById(tariff).deliveryMinutes)
      }
    }
  })

  it('каждая платная опция удорожает заказ ровно на свою цену', () => {
    const plain = calcOrder({ ...base, spellId: 'cat', tariffId: 'horse' })

    for (const option of options) {
      const withOption = calcOrder({
        ...base,
        spellId: 'cat',
        tariffId: 'horse',
        optionIds: [option.id],
      })
      expect(withOption.total).toBe(plain.total + option.price)
    }
  })
})
