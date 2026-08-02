export const STEP_COMPOSITION = 1
export const STEP_RECIPIENT = 2
export const STEP_SHIPMENT = 3

const STEPS = ['Состав', 'Получатель', 'Отправление']

/** Полоски шагов: пройденные и текущий закрашены, будущие — линейкой. */
export function Steps({ current }: { current: number }) {
  return (
    <div>
      <div className="flex gap-2">
        {STEPS.map((label, index) => (
          <span
            key={label}
            className={`h-1 flex-1 ${index < current ? 'bg-ink' : 'bg-rule'}`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">{STEPS[current - 1]}</p>
    </div>
  )
}
