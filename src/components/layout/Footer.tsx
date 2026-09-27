import { Container } from '@/components/ui/Container'
import { personal, socialLinks } from '@/data/site'
import { navItems } from '@/data/nav'
import { SocialIcon } from './SocialIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--color-border) py-10">
      <Container>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <a href="#home" className="font-mono text-base font-semibold text-(--color-text)">
            AS<span className="text-(--color-accent)">.</span>
          </a>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-(--color-text-muted)">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-(--color-text)">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks
              .filter((link) => link.icon === 'github' || link.icon === 'linkedin' || link.icon === 'email')
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.icon === 'email' ? undefined : '_blank'}
                  rel={link.icon === 'email' ? undefined : 'noreferrer'}
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-soft) text-(--color-accent) transition-transform hover:-translate-y-0.5 hover:bg-(--color-accent) hover:text-white"
                >
                  <SocialIcon icon={link.icon} className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-(--color-text-faint)">
          &copy; {year} {personal.name}. Built with React, TypeScript &amp; Tailwind CSS.
        </p>
      </Container>
    </footer>
  )
}
