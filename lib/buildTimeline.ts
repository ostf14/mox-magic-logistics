import { spellById } from '../data/spells'
import { tariffById } from '../data/tariffs'
import { workshopById } from '../data/workshops'
import type { OrderCalc } from './calcOrder'
import { addMinutes, formatClock } from './now'

/** Сдвиги событий, минут. Каждый считается от предыдущего события. */
const STARTED_AFTER_ACCEPTED = 8
const COURIER_AFTER_READY = 4
const ON_THE_WAY_AFTER_COURIER = 27
const DELAY_AFTER_ON_THE_WAY = 44

export type TimelineState = 'done' | 'current' | 'future'

export type TimelineEvent = {
  id: string
  /** null — время ещё не определено, в степпере вместо него прочерк. */
  at: Date | null
  title: string
  detail?: string
  state: TimelineState
}

export type TimelinePhase = {
  title: string
  events: TimelineEvent[]
}

type TimelineInput = {
  spellId: string
  tariffId: string
}

/**
 * SPEC §6. События не хардкодятся, а строятся из заказа: смена тарифа
 * меняет и время передачи курьеру, и новый срок в строке задержки.
 */
export function buildTimeline(order: TimelineInput, calc: OrderCalc): TimelinePhase[] {
  const spell = spellById(order.spellId)
  const tariff = tariffById(order.tariffId)
  const workshop = workshopById(spell.workshopId)

  // Момент приёма — это now из расчёта: readyAt = now + totalMinutes.
  const accepted = addMinutes(calc.readyAt, -calc.totalMinutes)
  const started = addMinutes(accepted, STARTED_AFTER_ACCEPTED)
  const ready = addMinutes(accepted, calc.waitUntilOpen + calc.prepMinutes)
  const courier = addMinutes(ready, COURIER_AFTER_READY)
  const onTheWay = addMinutes(courier, ON_THE_WAY_AFTER_COURIER)
  const delayed = addMinutes(onTheWay, DELAY_AFTER_ON_THE_WAY)

  const workshopTitle = [workshop.name, workshop.city].filter(Boolean).join(', ').toUpperCase()

  const timed: TimelineEvent[][] = [
    [
      { id: 'accepted', at: accepted, title: 'Отправление принято', state: 'done' },
      { id: 'started', at: started, title: 'Мастерская приступила к изготовлению', state: 'done' },
      {
        id: 'ready',
        at: ready,
        title: 'Заклинание готово, опечатано, ожидает курьера',
        state: 'done',
      },
    ],
    [
      { id: 'courier', at: courier, title: 'Курьер принял груз, печать проверена', state: 'done' },
      { id: 'onTheWay', at: onTheWay, title: 'Отправление в пути', state: 'done' },
      {
        id: 'delayed',
        at: delayed,
        title: 'Задержка: шторм на переправе, Скеллиге',
        detail: `Курьер ждёт паром, новый срок — ${formatClock(calc.readyAt)}`,
        state: 'current',
      },
      { id: 'arrived', at: null, title: 'Прибыло в отделение получателя', state: 'future' },
      { id: 'handed', at: null, title: 'Вручено', state: 'future' },
    ],
  ]

  return [
    { title: workshopTitle, events: timed[0] },
    { title: `ДОСТАВКА · ${tariff.name.toUpperCase()}`, events: timed[1] },
  ]
}

/** Доля пройденных событий: полоса прогресса в карточке статуса. */
export function timelineProgress(phases: TimelinePhase[]): number {
  const events = phases.flatMap((phase) => phase.events)
  const passed = events.filter((event) => event.state !== 'future').length
  return passed / events.length
}
