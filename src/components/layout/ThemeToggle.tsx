import { Moon, Sun } from 'lucide-react'
import type { Theme } from '@/hooks/useTheme'

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-border) text-(--color-text-muted) transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
    >
      <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" aria-hidden="true" />
      <Moon
        className="absolute h-4 w-4 scale-0 dark:scale-100 transition-transform"
        aria-hidden="true"
      />
    </button>
  )
}
