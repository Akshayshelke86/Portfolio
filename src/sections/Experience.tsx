import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/site'

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <Container>
        <SectionHeading eyebrow="Professional Experience" title="Where I've worked" align="center" />

        <div className="mx-auto max-w-2xl space-y-10">
          {experience.map((entry) => (
            <div key={entry.company}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-base font-semibold text-(--color-text)">{entry.company}</h3>
                <span className="inline-flex items-center gap-1 text-xs text-(--color-text-faint)">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {entry.location}
                  {entry.workMode ? ` · ${entry.workMode}` : ''}
                </span>
              </div>

              <div className="relative mt-4 space-y-5 border-l-2 border-(--color-accent)/40 pl-6">
                {entry.roles.map((role, roleIndex) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: roleIndex * 0.08 }}
                    className="relative rounded-xl border border-(--color-border) bg-(--color-surface) p-5 shadow-(--shadow-card)"
                  >
                    <span className="absolute -left-[31px] top-6 h-3 w-3 rounded-full bg-(--color-accent)" />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-sm font-semibold text-(--color-accent)">{role.title}</h4>
                      <span className="font-mono text-xs text-(--color-text-faint)">
                        {role.startDate} – {role.endDate}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2 text-sm leading-relaxed text-(--color-text-muted)"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-text-faint)" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {entry.roles.length > 1 && (
                  <p className="pl-1 text-xs font-medium text-(--color-accent)">
                    ↳ Promoted from Intern to full-time Software Engineer
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
