import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function Badge({
  children,
  className,
  muted = false,
}: {
  children: ReactNode
  className?: string
  muted?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        muted
          ? 'border-(--color-border) text-(--color-text-muted)'
          : 'border-(--color-accent)/30 bg-(--color-accent-soft) text-(--color-accent)',
        className,
      )}
    >
      {children}
    </span>
  )
}
