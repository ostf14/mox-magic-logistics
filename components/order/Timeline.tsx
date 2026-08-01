import type { TimelinePhase } from '@/lib/buildTimeline'
import { formatClock } from '@/lib/now'

const NO_TIME = '—:—'

const TONE = {
  done: 'text-ink',
  current: 'text-ink',
  future: 'text-muted',
} as const

export function Timeline({ phases }: { phases: TimelinePhase[] }) {
  return (
    <div className="mt-8">
      {phases.map((phase) => (
        <section key={phase.title} className="mt-6 first:mt-0">
          <h3 className="border-b border-rule pb-2 text-xs uppercase tracking-[0.14em] text-muted">
            {phase.title}
          </h3>

          <ol>
            {phase.events.map((event) => (
              <li
                key={event.id}
                className={`flex gap-4 border-b border-rule py-3 ${
                  event.state === 'current' ? 'border-l border-l-accent pl-3' : ''
                }`}
              >
                <span
                  className={`w-14 shrink-0 font-mono text-sm ${
                    event.state === 'future' ? 'text-muted' : 'text-ink'
                  }`}
                >
                  {event.at ? formatClock(event.at) : NO_TIME}
                </span>
                <span className="min-w-0">
                  <span className={`block text-sm leading-relaxed ${TONE[event.state]}`}>
                    {event.title}
                  </span>
                  {event.detail && (
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {event.detail}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
