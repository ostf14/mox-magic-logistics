import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

/** Курсив в наборе только под логотип: PLOTVA, 700 italic. */
const ui = IBM_Plex_Sans({
  variable: '--font-ui',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const numeric = IBM_Plex_Mono({
  variable: '--font-numeric',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'PLOTVA — служба доставки заклинаний и зелий',
  description: 'Доставляем заклинания и зелья. Работаем с 47 мастерскими Новиграда, Оксенфурта и Велена.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${ui.variable} ${numeric.variable} antialiased`}>{children}</body>
    </html>
  )
}
