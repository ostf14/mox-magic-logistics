import type { HazardClass } from '@/data/spells'

export const ROMAN: Record<HazardClass, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
}

const DESCRIPTION: Record<HazardClass, string> = {
  1: 'обычное вложение. Ограничений при перевозке нет.',
  2: 'не вскрывать в пути. При вскрытии срабатывает раньше срока, груз считается утраченным.',
  3: 'не вскрывать, не ронять. При повреждении задевает всё в радиусе десяти шагов.',
  4: 'перевозка только с сопровождением чародея.',
}

const TONE: Record<HazardClass, string> = {
  1: 'border-class-1 text-class-1',
  2: 'border-class-2 text-class-2',
  3: 'border-class-3 text-class-3',
  4: 'border-class-4 text-class-4',
}

/** В тултипе цветом класса красится только рамка, текст остаётся чернилами. */
const TOOLTIP_TONE: Record<HazardClass, string> = {
  1: 'border-class-1',
  2: 'border-class-2',
  3: 'border-class-3',
  4: 'border-class-4',
}

export function hazardDescription(hazardClass: HazardClass): string {
  return `${ROMAN[hazardClass]} — ${DESCRIPTION[hazardClass]}`
}

export function HazardBadge({ hazardClass }: { hazardClass: HazardClass }) {
  return (
    <span className="group relative inline-flex items-center">
      <button
        type="button"
        aria-label={hazardDescription(hazardClass)}
        className={`inline-flex h-5 w-5 rotate-45 items-center justify-center border bg-paper focus:outline-none focus-visible:ring-1 focus-visible:ring-ink ${TONE[hazardClass]}`}
      >
        <span className="-rotate-45 font-mono text-[0.5625rem] font-medium leading-none tracking-tight">
          {ROMAN[hazardClass]}
        </span>
      </button>
      <span
        className={`pointer-events-none absolute bottom-[calc(100%+0.5rem)] right-0 z-10 w-60 border bg-card p-3 text-xs leading-relaxed text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${TOOLTIP_TONE[hazardClass]}`}
        role="tooltip"
      >
        {hazardDescription(hazardClass)}
      </span>
    </span>
  )
}
