import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/ui/ContactForm'
import { personal, socialLinks } from '@/data/site'

const infoItems = [
  { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'akshay-shelke-883038236',
    href: socialLinks.find((l) => l.icon === 'linkedin')?.url ?? '#',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: '@Akshayshelke86',
    href: socialLinks.find((l) => l.icon === 'github')?.url ?? '#',
  },
  { icon: MapPin, label: 'Location', value: personal.location, href: undefined },
]

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a role, project, or question in mind? Reach out."
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {infoItems.map((item) => {
              const content = (
                <>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-accent-soft) text-(--color-accent)">
                    <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-(--color-text-faint)">{item.label}</p>
                    <p className="text-sm font-medium text-(--color-text)">{item.value}</p>
                  </div>
                </>
              )

              const className =
                'flex items-center gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 shadow-(--shadow-card) transition-colors'

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`${className} hover:border-(--color-accent)`}
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className={className}>
                  {content}
                </div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
