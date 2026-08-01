import { NOW, dayNumber, formatClock, weekdayName } from './now'

const TODAY = 0
const TOMORROW = 1

/**
 * SPEC §4.
 * Сегодня → `сегодня, к 19:40`
 * Завтра  → `завтра, к 11:00`
 * Дальше  → `вторник, к 11:00`
 */
export function formatAbsolute(date: Date, now: Date = NOW): string {
  const shift = dayNumber(date) - dayNumber(now)
  const clock = formatClock(date)

  if (shift === TODAY) return `сегодня, к ${clock}`
  if (shift === TOMORROW) return `завтра, к ${clock}`
  return `${weekdayName(date)}, к ${clock}`
}
