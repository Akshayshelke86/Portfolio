import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/data/types'

export function ProjectCard({
  project,
  onOpen,
  image,
}: {
  project: Project
  onOpen: () => void
  image?: string
}) {
  const liveLink = project.links.find((l) => l.label === 'Live Demo')
  const codeLink = project.links.find((l) => l.label === 'GitHub')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-1 hover:border-(--color-border-strong) hover:shadow-(--shadow-card-hover)"
    >
      <button
        type="button"
        onClick={onOpen}
        className="block aspect-video w-full overflow-hidden bg-(--color-bg-elevated) text-left"
        aria-label={`View details for ${project.name}`}
      >
        {image ? (
          <img
            src={image}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs text-(--color-text-faint)">
            {project.name}
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <button type="button" onClick={onOpen} className="text-left">
          <h3 className="text-base font-semibold text-(--color-text) group-hover:text-(--color-accent) transition-colors">
            {project.name}
          </h3>
        </button>
        <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted) line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} muted>
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge muted>+{project.techStack.length - 4}</Badge>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-(--color-border) pt-4">
          {liveLink && (
            <a
              href={liveLink.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-accent) hover:text-(--color-accent-hover)"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-(--color-text-muted) hover:text-(--color-text)"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
