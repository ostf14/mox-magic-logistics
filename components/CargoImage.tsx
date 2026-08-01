type CargoImageProps = {
  id: string
  name: string
  src?: string
}

/**
 * Типографская заглушка груза. Страница обязана выглядеть законченной
 * без единого изображения, поэтому серых прямоугольников здесь нет.
 */
export function CargoImage({ id, name, src }: CargoImageProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className="aspect-[3/2] w-full border border-rule" />
  }

  return (
    <div className="flex aspect-[3/2] w-full flex-col items-center justify-center border border-rule">
      <span className="font-mono text-xs tracking-wider text-muted">
        PL-CARGO-{id.toUpperCase()}
      </span>
      <span className="mt-1 text-xs text-muted">{name}</span>
    </div>
  )
}
