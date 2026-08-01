import { SERVICE_FEE, SERVICE_FEE_LABEL, INSURANCE_OPTION_ID, options } from '../data/options'
import { spellById } from '../data/spells'
import { FOOT_TARIFF_ID, tariffById } from '../data/tariffs'
import { workshopById, type Workshop } from '../data/workshops'
import { MINUTES_IN_DAY, addMinutes, minutesOfDay } from './now'

/** Класс, при котором пешая доставка недоступна: только с сопровождением чародея. */
const ESCORT_ONLY_CLASS = 4
/** Класс, начиная с которого страховка включена и не снимается. */
const FORCED_INSURANCE_CLASS = 3
/** Опция без цены в чек не попадает. */
const FREE = 0
const NO_WAIT = 0

export type OrderLine = { label: string; value: number }

export type OrderCalc = {
  waitUntilOpen: number // минут до открытия мастерской, 0 если открыта
  prepMinutes: number
  deliveryMinutes: number
  totalMinutes: number // сумма трёх выше
  readyAt: Date
  lines: OrderLine[]
  total: number
  blockedTariffIds: string[]
  forcedOptionIds: string[]
}

export type OrderInput = {
  spellId: string
  tariffId: string
  optionIds: string[]
  now: Date
}

/** Минут до ближайшего открытия мастерской. 0, если открыта сейчас. */
export function minutesUntilOpen(workshop: Workshop, now: Date): number {
  const current = minutesOfDay(now)
  if (current >= workshop.opensAt && current < workshop.closesAt) return NO_WAIT
  if (current < workshop.opensAt) return workshop.opensAt - current
  return MINUTES_IN_DAY - current + workshop.opensAt
}

export function calcOrder(input: OrderInput): OrderCalc {
  const spell = spellById(input.spellId)
  const workshop = workshopById(spell.workshopId)
  const tariff = tariffById(input.tariffId)

  const blockedTariffIds = spell.hazardClass === ESCORT_ONLY_CLASS ? [FOOT_TARIFF_ID] : []
  const forcedOptionIds =
    spell.hazardClass >= FORCED_INSURANCE_CLASS ? [INSURANCE_OPTION_ID] : []

  const selectedIds = new Set([...forcedOptionIds, ...input.optionIds])

  const waitUntilOpen = minutesUntilOpen(workshop, input.now)
  const totalMinutes = waitUntilOpen + spell.prepMinutes + tariff.deliveryMinutes

  const lines: OrderLine[] = [
    { label: spell.name, value: spell.price },
    { label: tariff.lineLabel, value: tariff.price },
    ...options
      .filter((option) => selectedIds.has(option.id) && option.price > FREE)
      .map((option) => ({ label: option.lineLabel, value: option.price })),
    { label: SERVICE_FEE_LABEL, value: SERVICE_FEE },
  ]

  return {
    waitUntilOpen,
    prepMinutes: spell.prepMinutes,
    deliveryMinutes: tariff.deliveryMinutes,
    totalMinutes,
    readyAt: addMinutes(input.now, totalMinutes),
    lines,
    total: lines.reduce((sum, line) => sum + line.value, 0),
    blockedTariffIds,
    forcedOptionIds,
  }
}
