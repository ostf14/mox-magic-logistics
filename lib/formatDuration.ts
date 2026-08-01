import { MINUTES_IN_DAY, MINUTES_IN_HOUR } from './now'

const ONE_DAY = 1

/**
 * SPEC §4.
 * < 60      → `40 мин`
 * 60…1439   → `6 ч`, floor до часа
 * ≥ 1440    → `2 суток`, floor до суток
 *
 * Огрубление до суток — продуктовое решение: грифон и портал на Лунной пыли
 * обязаны показать одинаковые «2 суток».
 */
export function formatDuration(totalMinutes: number): string {
  if (totalMinutes < MINUTES_IN_HOUR) return `${totalMinutes} мин`
  if (totalMinutes < MINUTES_IN_DAY) return `${Math.floor(totalMinutes / MINUTES_IN_HOUR)} ч`

  const days = Math.floor(totalMinutes / MINUTES_IN_DAY)
  return days === ONE_DAY ? `${days} сутки` : `${days} суток`
}
