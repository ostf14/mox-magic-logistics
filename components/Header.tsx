const NAV = [
  { label: 'Тарифы', href: '#tariffs' },
  { label: 'Каталог', href: '#catalog' },
  { label: 'Отследить', href: '#order' },
  { label: 'Правила', href: '#rules' },
]

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
        <a href="#top" className="shrink-0">
          <span className="block text-lg font-semibold tracking-[0.18em] text-ink">ПЛОТВА</span>
          <span className="block text-[0.6875rem] leading-tight text-muted">
            служба доставки заклинаний
          </span>
        </a>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
