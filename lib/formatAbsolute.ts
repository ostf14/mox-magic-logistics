import { NOW, TZ_OFFSET, dayNumber, formatClock, weekdayName } from './now'

const TODAY = 0
const TOMORROW = 1

/**
 * SPEC §4.
 * Сегодня → `сегодня, к 19:40`
 * Завтра  → `завтра, к 11:00`
 * Дальше  → `вторник, к 11:00`
 */
const MS_IN_MINUTE = 60_000
const PAD_LENGTH = 2
const FIRST_MONTH = 1

/** Дата документа: `01.08.2026`, в расчётном поясе. */
export function formatDate(date: Date): string {
  const zoned = new Date(date.getTime() + TZ_OFFSET * MS_IN_MINUTE)
  const day = String(zoned.getUTCDate()).padStart(PAD_LENGTH, '0')
  const month = String(zoned.getUTCMonth() + FIRST_MONTH).padStart(PAD_LENGTH, '0')
  return `${day}.${month}.${zoned.getUTCFullYear()}`
}

export function formatAbsolute(date: Date, now: Date = NOW): string {
  const shift = dayNumber(date) - dayNumber(now)
  const clock = formatClock(date)

  if (shift === TODAY) return `сегодня, к ${clock}`
  if (shift === TOMORROW) return `завтра, к ${clock}`
  return `${weekdayName(date)}, к ${clock}`
}
