import { motion } from 'framer-motion'
import { Award, Trophy } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications, achievements } from '@/data/site'

const cards = [
  ...certifications.map((cert) => ({
    icon: Award,
    title: cert.name,
    badge: cert.date,
    description: cert.issuer,
  })),
  ...achievements.map((achievement) => ({
    icon: Trophy,
    title: achievement.title,
    badge: undefined,
    description: achievement.description,
  })),
]

export function Certifications() {
  return (
    <section id="achievements" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Achievements & Certifications"
          title="Continued learning"
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-(--color-border) bg-(--color-surface) p-6 text-center shadow-(--shadow-card)"
            >
              <div className="relative mx-auto flex h-16 w-24 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-(--color-accent) opacity-15 blur-md" />
                <card.icon className="relative h-7 w-7 text-(--color-accent)" aria-hidden="true" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-(--color-text)">{card.title}</h3>
              {card.badge && (
                <span className="mt-2 inline-flex items-center rounded-full bg-(--color-accent-soft) px-3 py-1 text-xs font-medium text-(--color-accent)">
                  {card.badge}
                </span>
              )}
              {card.description && (
                <p className="mt-2 text-xs leading-relaxed text-(--color-text-muted)">
                  {card.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
