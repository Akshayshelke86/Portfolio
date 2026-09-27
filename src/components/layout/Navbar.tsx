import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/data/nav'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useTheme } from '@/hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'
import { Container } from '@/components/ui/Container'
import { cn } from '@/utils/cn'
import profilePhoto from '@/assets/profile.webp'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const activeId = useActiveSection(navItems.map((item) => item.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-lg'
          : 'border-b border-transparent',
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Primary">
          <a href="#home" className="flex items-center gap-2.5">
            <img
              src={profilePhoto}
              alt="Akshay Shelke"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border border-(--color-border-strong) object-cover"
            />
            <span className="text-base font-semibold tracking-tight">
              <span className="text-(--color-text)">Akshay</span>{' '}
              <span className="text-(--color-accent)">Shelke</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    activeId === item.href.slice(1)
                      ? 'text-(--color-accent)'
                      : 'text-(--color-text-muted) hover:text-(--color-text)',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--color-border) text-(--color-text) md:hidden"
            >
              {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-b border-(--color-border) bg-(--color-bg) md:hidden"
          >
            <Container>
              <ul className="flex flex-col gap-1 py-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        // The menu's exit animation (height "auto" measurement)
                        // disrupts the browser's native anchor-scroll if it starts
                        // in the same tick as the click. Close first, let the exit
                        // transition finish, then scroll manually.
                        e.preventDefault()
                        setIsOpen(false)
                        const id = item.href.slice(1)
                        window.setTimeout(() => {
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                          window.history.replaceState(null, '', item.href)
                        }, 250)
                      }}
                      className={cn(
                        'block rounded-md px-3 py-2.5 text-base font-medium transition-colors',
                        activeId === item.href.slice(1)
                          ? 'text-(--color-accent)'
                          : 'text-(--color-text-muted) hover:text-(--color-text)',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
