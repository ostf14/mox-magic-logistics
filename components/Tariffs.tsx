import { RECOMMENDED_TARIFF_ID, tariffs } from '@/data/tariffs'

import { TariffCard } from './TariffTile'

export function Tariffs() {
  return (
    <section id="tariffs" className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Тарифы доставки
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Срок считается от момента, когда мастерская передала заклинание курьеру.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {tariffs.map((tariff) => (
            <TariffCard
              key={tariff.id}
              tariff={tariff}
              recommended={tariff.id === RECOMMENDED_TARIFF_ID}
            />
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
          Страховка от побочных эффектов — 15 крон, для отправлений класса III и выше включена в
          тариф и не снимается.
        </p>
      </div>
    </section>
  )
}
