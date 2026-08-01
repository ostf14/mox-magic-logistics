import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const ui = IBM_Plex_Sans({
  variable: '--font-ui',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
})

const numeric = IBM_Plex_Mono({
  variable: '--font-numeric',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'ПЛОТВА — служба доставки заклинаний',
  description: 'Доставляем заклинания. Работаем с 47 мастерскими Новиграда, Оксенфурта и Велена.',
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
