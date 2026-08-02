import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const ui = IBM_Plex_Sans({
  variable: '--font-ui',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
})

/**
 * Логотип и только он. Вариативный, с осью ширины: вес и ширина задаются
 * через font-variation-settings, статическое начертание оси wdth не даёт.
 * Кириллического сабсета у Archivo в каталоге нет, и он не нужен: в знаке
 * только латиница.
 */
const logo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
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
      <body className={`${ui.variable} ${numeric.variable} ${logo.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
