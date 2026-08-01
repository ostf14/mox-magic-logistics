'use client'

import { useEffect, useRef, useState } from 'react'

const PANEL_LABEL = 'AI Worklog'
const COMMAND = '$ cat worklog.md'
/** Заглушка: содержимое лога заполняется отдельно. */
const STUB = '—'
const STUB_TIME = '--:--'

type LogEntry = {
  time: string
  stage: string
  env: string
  lines: string[]
}

const ENTRIES: LogEntry[] = [
  { time: STUB_TIME, stage: 'concept', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'copy', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'ia', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'visual', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'build', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'cargo', env: STUB, lines: [STUB, STUB] },
  { time: STUB_TIME, stage: 'qa', env: STUB, lines: [STUB, STUB] },
]

const SECTIONS: { title: string; lines: string[] }[] = [
  {
    title: '## СТЕК',
    lines: [
      'Next.js 15, App Router · TypeScript · Tailwind v4',
      'Vercel, сборка с main',
      'IBM Plex Sans и IBM Plex Mono через next/font/google',
    ],
  },
  { title: '## ХАРНЕС', lines: [STUB, STUB, STUB] },
  { title: '## ПРОМТЫ', lines: [STUB, STUB, STUB] },
]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Line({ text }: { text: string }) {
  return (
    <p className="flex gap-2 pl-[7rem] text-terminal-muted">
      <span aria-hidden>─</span>
      <span>{text}</span>
    </p>
  )
}

export function Worklog() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  function close() {
    setOpen(false)
    tabRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return

    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        tabRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-40 bg-ink/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 flex transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          ref={tabRef}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="absolute right-full top-1/2 -translate-y-1/2 bg-terminal-text px-2 py-5 font-mono text-xs uppercase tracking-[0.3em] text-ink [writing-mode:vertical-rl] rotate-180"
        >
          {PANEL_LABEL}
        </button>

        <div
          ref={panelRef}
          inert={!open}
          role="dialog"
          aria-modal="true"
          aria-label={PANEL_LABEL}
          className="h-full w-screen overflow-y-auto bg-terminal-bg px-5 py-6 font-mono text-xs leading-relaxed text-terminal-text md:w-[40rem] md:px-8"
        >
          <div className="flex items-start justify-between gap-6">
            <p>{COMMAND}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="shrink-0 border border-terminal-muted px-2 py-1 uppercase tracking-[0.2em] text-terminal-muted hover:text-terminal-text"
            >
              esc
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {ENTRIES.map((entry) => (
              <div key={entry.stage}>
                <p className="flex flex-wrap gap-x-6">
                  <span className="w-[5.5rem] shrink-0">[{entry.time}]</span>
                  <span className="w-40 shrink-0">{entry.stage}</span>
                  <span className="text-terminal-muted">{entry.env}</span>
                </p>
                {entry.lines.map((line, index) => (
                  <Line key={`${entry.stage}-${index}`} text={line} />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-terminal-muted">{section.title}</p>
                <div className="mt-2">
                  {section.lines.map((line, index) => (
                    <p key={`${section.title}-${index}`} className="flex gap-2 text-terminal-text">
                      <span aria-hidden className="text-terminal-muted">
                        ─
                      </span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
