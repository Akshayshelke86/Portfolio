import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'accent-outline' | 'ghost'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-(--color-accent) text-white hover:bg-(--color-accent-hover) shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-(--color-border-strong) text-(--color-text) hover:border-(--color-accent) hover:text-(--color-accent) hover:-translate-y-0.5 active:translate-y-0',
  'accent-outline':
    'border border-(--color-accent) text-(--color-accent) hover:bg-(--color-accent-soft) hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-(--color-text-muted) hover:text-(--color-text) hover:bg-(--color-surface-hover)',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  sm: 'px-3.5 py-2 text-sm',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  )
}
