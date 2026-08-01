export type OrderOption = {
  id: string
  label: string
  price: number
  /** Подпись чекбокса в конфигураторе. Текст из CONTENT.md. */
  checkboxLabel: string
  /** Название строки в чеке. */
  lineLabel: string
}

export const options: OrderOption[] = [
  {
    id: 'insurance',
    label: 'Страховка от побочных эффектов',
    price: 15,
    checkboxLabel: 'Страховка от побочных эффектов',
    lineLabel: 'Страховка',
  },
  {
    id: 'signature',
    label: 'Подпись получателя при вручении',
    price: 0,
    checkboxLabel: 'Подпись получателя при вручении',
    lineLabel: 'Подпись получателя при вручении',
  },
  {
    id: 'anonymous',
    label: 'Анонимная доставка',
    price: 20,
    checkboxLabel: 'Анонимная доставка, без имени отправителя',
    lineLabel: 'Анонимная доставка',
  },
]

export const INSURANCE_OPTION_ID = 'insurance'

/** Плоский сбор службы, крон. */
export const SERVICE_FEE = 20
export const SERVICE_FEE_LABEL = 'Сбор службы'

/** 18:00, позже класс IV не принимается. */
export const CLASS_IV_CUTOFF = 1080

export function optionById(id: string): OrderOption {
  const option = options.find((item) => item.id === id)
  if (!option) throw new Error(`Неизвестная опция: ${id}`)
  return option
}
