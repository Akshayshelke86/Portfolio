import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { projects } from '@/data/site'
import { projectImages } from '@/data/projectImages'
import type { Project, ProjectCategory } from '@/data/types'
import { cn } from '@/utils/cn'

export function Projects() {
  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>()
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)))
    return ['All', ...Array.from(set)] as const
  }, [])

  const [filter, setFilter] = useState<string>('All')
  const [active, setActive] = useState<Project | null>(null)

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter as ProjectCategory))

  return (
    <section id="projects" className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built and shipped"
          description="Real, deployed applications — each one live in production."
        />

        <div className="mb-10 flex flex-wrap gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                filter === category
                  ? 'bg-(--color-accent) text-white'
                  : 'border border-(--color-accent)/50 text-(--color-accent) hover:bg-(--color-accent-soft)',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                image={projectImages[project.slug]}
                onOpen={() => setActive(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>

      <ProjectModal project={active} image={active ? projectImages[active.slug] : undefined} onClose={() => setActive(null)} />
    </section>
  )
}
