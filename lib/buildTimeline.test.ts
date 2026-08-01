import { describe, expect, it } from 'vitest'

import { buildTimeline, timelineProgress } from './buildTimeline'
import { calcOrder } from './calcOrder'
import { formatClock, NOW } from './now'

function timeline(spellId: string, tariffId: string) {
  const calc = calcOrder({ spellId, tariffId, optionIds: [], now: NOW })
  return { calc, phases: buildTimeline({ spellId, tariffId }, calc) }
}

describe('buildTimeline', () => {
  it('заголовки фаз собираются из мастерской и тарифа', () => {
    const { phases } = timeline('thunder', 'horse')

    expect(phases[0].title).toBe('МАСТЕРСКАЯ ВИММЕРА, ВЫЗИМА')
    expect(phases[1].title).toBe('ДОСТАВКА · КОННАЯ')
  })

  it('фаза 1 начинается в NOW и учитывает изготовление', () => {
    const { phases } = timeline('thunder', 'horse')
    const [accepted, started, ready] = phases[0].events

    expect(formatClock(accepted.at!)).toBe('09:12')
    expect(formatClock(started.at!)).toBe('09:20')
    expect(formatClock(ready.at!)).toBe('11:12')
  })

  it('закрытая мастерская сдвигает готовность на время ожидания', () => {
    const { calc, phases } = timeline('swallow', 'horse')
    const ready = phases[0].events[2]

    expect(calc.waitUntilOpen).toBeGreaterThan(0)
    // 09:12 + 408 мин ожидания + 480 мин изготовления
    expect(formatClock(ready.at!)).toBe('00:00')
  })

  it('смена тарифа меняет таймлайн', () => {
    const horse = timeline('moondust', 'horse')
    const portal = timeline('moondust', 'portal')

    expect(horse.phases[1].title).not.toBe(portal.phases[1].title)
    const horseDelay = horse.phases[1].events.find((event) => event.id === 'delayed')
    const portalDelay = portal.phases[1].events.find((event) => event.id === 'delayed')
    expect(horseDelay?.detail).not.toBe(portalDelay?.detail)
    expect(portalDelay?.detail).toBe(`Курьер ждёт паром, новый срок — ${formatClock(portal.calc.readyAt)}`)
  })

  it('два последних события без времени, остальные пройдены', () => {
    const { phases } = timeline('cat', 'horse')
    const events = phases.flatMap((phase) => phase.events)
    const future = events.filter((event) => event.state === 'future')

    expect(future.map((event) => event.title)).toEqual([
      'Прибыло в отделение получателя',
      'Вручено',
    ])
    expect(future.every((event) => event.at === null)).toBe(true)
    expect(events.filter((event) => event.state === 'current')).toHaveLength(1)
  })

  it('прогресс — доля пройденных событий', () => {
    const { phases } = timeline('cat', 'horse')
    expect(timelineProgress(phases)).toBeCloseTo(6 / 8)
  })
})
