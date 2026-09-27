import { motion } from 'framer-motion'
import { Boxes } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillCategories } from '@/data/site'
import { skillIcons } from '@/data/skillIcons'

export function Skills() {
  const tiles = skillCategories.flatMap((category) => category.skills)

  return (
    <section id="skills" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Technical Skills"
          title="Technologies I work with"
          align="center"
          description="Languages, frameworks, and tools I use to build and ship full-stack applications."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map((skill, i) => {
            const meta = skillIcons[skill]
            const Icon = meta?.icon ?? Boxes
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
                className="flex flex-col items-center gap-3 rounded-xl border border-(--color-border) bg-(--color-surface) p-5 text-center shadow-(--shadow-card) transition-transform hover:-translate-y-1"
              >
                <Icon
                  className="h-9 w-9 text-(--color-text)"
                  style={meta && meta.color !== 'currentColor' ? { color: meta.color } : undefined}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-(--color-text)">{skill}</span>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
