/**
 * Фиксированное время проекта. SPEC §1.
 * Date.now() и new Date() без аргументов запрещены во всём проекте.
 * Любой расчёт времени идёт от NOW.
 */
export const NOW = new Date('2026-08-01T09:12:00+02:00')

/**
 * Смещение расчётного часового пояса относительно UTC, минут.
 * Взято из NOW и применяется явно, чтобы расчёт не зависел от TZ машины:
 * страница должна быть детерминированной.
 */
export const TZ_OFFSET = 120

export const MINUTES_IN_HOUR = 60
export const HOURS_IN_DAY = 24
export const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY

const MS_IN_MINUTE = 60_000
const DAYS_IN_WEEK = 7

/** 1970-01-01 — четверг. Сдвиг, чтобы дни недели считались от воскресенья. */
const EPOCH_WEEKDAY_SHIFT = 4

const WEEKDAYS = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
] as const

/** Минуты от эпохи в расчётном поясе. */
function zonedMinutes(date: Date): number {
  return Math.floor(date.getTime() / MS_IN_MINUTE) + TZ_OFFSET
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * MS_IN_MINUTE)
}

/** Минут от полуночи в расчётном поясе. */
export function minutesOfDay(date: Date): number {
  return ((zonedMinutes(date) % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY
}

/** Номер суток от эпохи в расчётном поясе. Нужен для «сегодня / завтра». */
export function dayNumber(date: Date): number {
  return Math.floor(zonedMinutes(date) / MINUTES_IN_DAY)
}

export function weekdayName(date: Date): string {
  return WEEKDAYS[(dayNumber(date) + EPOCH_WEEKDAY_SHIFT) % DAYS_IN_WEEK]
}

/** Минуты от полуночи → `06:00`. */
export function formatMinutesOfDay(minutes: number): string {
  const normalized = ((minutes % MINUTES_IN_DAY) + MINUTES_IN_DAY) % MINUTES_IN_DAY
  const hours = Math.floor(normalized / MINUTES_IN_HOUR)
  const rest = normalized % MINUTES_IN_HOUR
  return `${pad(hours)}:${pad(rest)}`
}

/** Дата → `09:12` в расчётном поясе. */
export function formatClock(date: Date): string {
  return formatMinutesOfDay(minutesOfDay(date))
}

function pad(value: number): string {
  const padLength = 2
  return String(value).padStart(padLength, '0')
}
