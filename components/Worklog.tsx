'use client'

import { useEffect, useRef, useState } from 'react'

import {
  checks,
  decisions,
  entries,
  harness,
  palette,
  PALETTE_NOTE,
  prompts,
  roles,
  rules,
  stack,
  typeScale,
  weakSpots,
  WORKLOG_HEAD,
  WORKLOG_REPO,
  type DefRow,
} from '@/data/worklog'

const PANEL_LABEL = 'AI Worklog'
const COMMAND = '$ cat worklog.md'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Пункт списка: тире висит в поле, текст переносится ровным блоком. */
function Item({ text, indent = '' }: { text: string; indent?: string }) {
  return (
    <p className={`flex gap-2 ${indent}`}>
      <span aria-hidden className="shrink-0 text-terminal-muted">
        ─
      </span>
      <span>{text}</span>
    </p>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h3 className="text-terminal-muted">## {title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

/** Две колонки: подпись фиксированной ширины и многострочное значение. */
function Definitions({ rows }: { rows: DefRow[] }) {
  return (
    <dl className="space-y-2">
      {rows.map((row, index) => (
        <div key={`${row.label}-${index}`} className="flex flex-wrap gap-x-4 sm:flex-nowrap">
          <dt className="w-[7.5rem] shrink-0 text-terminal-muted">{row.label}</dt>
          <dd>
            {row.value.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
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
          className="h-full w-screen overflow-y-auto bg-terminal-bg px-5 py-6 font-mono text-xs leading-relaxed text-terminal-text md:w-[44rem] md:px-8"
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

          <div className="mt-8 border-b border-terminal-muted pb-6">
            <p>{WORKLOG_HEAD}</p>
            <a
              href={WORKLOG_REPO}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block break-all text-terminal-muted underline underline-offset-2 hover:text-terminal-text"
            >
              {WORKLOG_REPO}
            </a>
          </div>

          <div className="mt-8 space-y-6">
            {entries.map((entry) => (
              <div key={entry.number}>
                <p className="flex flex-wrap gap-x-6">
                  <span className="w-10 shrink-0">[{entry.number}]</span>
                  <span className="w-28 shrink-0">{entry.stage}</span>
                  <span className="text-terminal-muted">{entry.env}</span>
                </p>
                <div className="mt-1 space-y-1">
                  {entry.lines.map((line) => (
                    <Item key={line} text={line} indent="sm:pl-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Section title="СТЕК">
            <Definitions rows={stack} />
          </Section>

          <Section title="ХАРНЕС">
            <Definitions rows={harness} />
          </Section>

          <Section title="ПРОМТЫ">
            {prompts.map((prompt) => (
              <div key={prompt.title} className="space-y-1">
                <Item text={prompt.title} />
                <p className="border-l border-terminal-muted pl-4 text-terminal-muted">
                  «{prompt.body}»
                </p>
              </div>
            ))}
          </Section>

          <Section title="РЕШЕНИЯ">
            {decisions.map((line) => (
              <Item key={line} text={line} />
            ))}
          </Section>

          <Section title="СЛАБЫЕ МЕСТА И ЧТО С НИМИ">
            {weakSpots.map((line) => (
              <Item key={line} text={line} />
            ))}
          </Section>

          <Section title="ПРОВЕРКА">
            {checks.map((line) => (
              <Item key={line} text={line} />
            ))}
          </Section>

          <Section title="ДИЗАЙН-СИСТЕМА">
            {palette.map((group) => (
              <div key={group.group}>
                <p className="text-terminal-muted">{group.group}</p>
                <ul className="mt-1 space-y-1">
                  {group.swatches.map((swatch) => (
                    <li key={swatch.token} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        style={{ background: `var(${swatch.token})` }}
                        className="h-4 w-4 shrink-0 border border-terminal-muted"
                      />
                      <span className="w-[7.5rem] shrink-0">{swatch.token}</span>
                      <span className="text-terminal-muted">{swatch.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="text-terminal-muted">{PALETTE_NOTE}</p>

            <div className="pt-3">
              <Definitions rows={typeScale} />
            </div>

            <div className="pt-3">
              <Definitions rows={roles} />
            </div>

            <div className="pt-3">
              <Definitions rows={rules} />
            </div>
          </Section>
        </div>
      </div>
    </>
  )
}
