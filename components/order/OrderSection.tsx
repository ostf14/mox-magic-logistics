'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import { spells } from '@/data/spells'
import { RECOMMENDED_TARIFF_ID } from '@/data/tariffs'

export const ORDER_SECTION_ID = 'order'

const DEFAULT_SPELL_ID = spells[0].id
const TRACKING_NUMBER = 'PL-4471-0293'

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
    selectSpell: (spellId) => setOrder((current) => ({ ...current, spellId, view: 'config' })),
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
  }

  return <OrderContext.Provider value={api}>{children}</OrderContext.Provider>
}

export function OrderSection() {
  // Config, Form, Tracking и Summary собираются на шагах 7–9 (SPEC §12).
  return <section id={ORDER_SECTION_ID} className="border-t border-rule" />
}
