'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import { spells } from '@/data/spells'
import { RECOMMENDED_TARIFF_ID } from '@/data/tariffs'
import { calcOrder } from '@/lib/calcOrder'
import { NOW } from '@/lib/now'

import { Config } from './Config'
import { Form } from './Form'
import { Tracking } from './Tracking'

export const ORDER_SECTION_ID = 'order'

const DEFAULT_SPELL_ID = spells[0].id
const TRACKING_NUMBER = 'PL-4471-0293'

/** Показательное отправление для пункта «Отследить»: Кошка, конная доставка. */
const DEMO_SPELL_ID = 'cat'
const DEMO_TARIFF_ID = RECOMMENDED_TARIFF_ID

export type OrderView = 'config' | 'form' | 'tracking'

export type Recipient = {
  name: string
  address: string
  when: string
  note: string
}

export type OrderState = {
  view: OrderView
  spellId: string
  tariffId: string
  optionIds: string[]
  recipient: Recipient
  trackingNumber: string | null
}

const initialOrder: OrderState = {
  view: 'config',
  spellId: DEFAULT_SPELL_ID,
  tariffId: RECOMMENDED_TARIFF_ID,
  optionIds: [],
  recipient: { name: '', address: '', when: '', note: '' },
  trackingNumber: null,
}

type OrderApi = {
  order: OrderState
  selectSpell: (spellId: string) => void
  selectTariff: (tariffId: string) => void
  toggleOption: (optionId: string) => void
  setRecipientField: (field: keyof Recipient, value: string) => void
  goToForm: () => void
  goToConfig: () => void
  submit: () => void
  reset: () => void
  /** Поиск по трек-номеру из первого экрана: открывает секцию в состоянии трекинга. */
  track: (trackingNumber: string) => void
  /** Пункт «Отследить» в шапке и подвале: показательное отправление. */
  showDemoTracking: () => void
}

const OrderContext = createContext<OrderApi | null>(null)

export function useOrder(): OrderApi {
  const api = useContext(OrderContext)
  if (!api) throw new Error('useOrder вызван вне OrderProvider')
  return api
}

/** Прокручивает страницу к секции оформления. */
export function scrollToOrder(): void {
  document.getElementById(ORDER_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderState>(initialOrder)

  const api: OrderApi = {
    order,
    selectSpell: (spellId) =>
      setOrder((current) => {
        // Новое заклинание может запрещать выбранный тариф: тогда возвращаемся к конной.
        const probe = calcOrder({
          spellId,
          tariffId: current.tariffId,
          optionIds: current.optionIds,
          now: NOW,
        })
        const tariffId = probe.blockedTariffIds.includes(current.tariffId)
          ? RECOMMENDED_TARIFF_ID
          : current.tariffId

        return { ...current, spellId, tariffId, view: 'config' }
      }),
    selectTariff: (tariffId) => setOrder((current) => ({ ...current, tariffId, view: 'config' })),
    toggleOption: (optionId) =>
      setOrder((current) => ({
        ...current,
        optionIds: current.optionIds.includes(optionId)
          ? current.optionIds.filter((id) => id !== optionId)
          : [...current.optionIds, optionId],
      })),
    setRecipientField: (field, value) =>
      setOrder((current) => ({ ...current, recipient: { ...current.recipient, [field]: value } })),
    goToForm: () => setOrder((current) => ({ ...current, view: 'form' })),
    goToConfig: () => setOrder((current) => ({ ...current, view: 'config' })),
    submit: () =>
      setOrder((current) => ({ ...current, view: 'tracking', trackingNumber: TRACKING_NUMBER })),
    reset: () => setOrder(initialOrder),
    track: (trackingNumber) =>
      setOrder((current) => ({
        ...current,
        view: 'tracking',
        trackingNumber: trackingNumber.trim().toUpperCase() || TRACKING_NUMBER,
      })),
    showDemoTracking: () =>
      setOrder({
        ...initialOrder,
        spellId: DEMO_SPELL_ID,
        tariffId: DEMO_TARIFF_ID,
        view: 'tracking',
        trackingNumber: TRACKING_NUMBER,
      }),
  }

  return <OrderContext.Provider value={api}>{children}</OrderContext.Provider>
}

export function OrderSection() {
  const { order } = useOrder()

  return (
    <section id={ORDER_SECTION_ID} className="border-t border-rule">
      <div className="mx-auto w-full max-w-[76rem] px-5 py-14 md:min-h-[42rem] md:px-8 md:py-20">
        {order.view === 'config' && <Config />}
        {order.view === 'form' && <Form />}
        {order.view === 'tracking' && <Tracking />}
      </div>
    </section>
  )
}
