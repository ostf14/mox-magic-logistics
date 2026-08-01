const THOUSAND = 1000
const GROUP = 3
/** Неразрывный пробел: 1 165 крон не должно разрываться по строкам. */
const NBSP = ' '

/** 1165 → `1 165`. Разряды разделяются неразрывным пробелом. */
export function formatNumber(value: number): string {
  if (value < THOUSAND) return String(value)

  const digits = String(value)
  const head = digits.length % GROUP || GROUP
  const groups = [digits.slice(0, head)]
  for (let index = head; index < digits.length; index += GROUP) {
    groups.push(digits.slice(index, index + GROUP))
  }
  return groups.join(NBSP)
}

/** 1165 → `1 165 крон`. */
export function formatPrice(value: number): string {
  return `${formatNumber(value)}${NBSP}крон`
}
