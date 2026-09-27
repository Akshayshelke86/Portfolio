import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/data/types'

export function ProjectModal({
  project,
  image,
  onClose,
}: {
  project: Project | null
  image?: string
  onClose: () => void
}) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  const liveLink = project?.links.find((l) => l.label === 'Live Demo')
  const codeLink = project?.links.find((l) => l.label === 'GitHub')

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="my-8 w-full max-w-2xl rounded-xl border border-(--color-border) bg-(--color-surface) shadow-(--shadow-card-hover)"
            onClick={(e) => e.stopPropagation()}
          >
            {image && (
              <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                <img src={image} alt={`${project.name} screenshot`} className="h-full w-full object-cover object-top" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 id="project-modal-title" className="text-xl font-semibold text-(--color-text)">
                  {project.name}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--color-text-muted) hover:bg-(--color-surface-hover) hover:text-(--color-text)"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">
                {project.description}
              </p>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wide text-(--color-text-faint)">
                Key Features & Implementation
              </h4>
              <ul className="mt-3 space-y-2">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-(--color-text-muted)">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-accent)" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wide text-(--color-text-faint)">
                Tech Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {(liveLink || codeLink) && (
                <div className="mt-8 flex flex-wrap gap-3 border-t border-(--color-border) pt-6">
                  {liveLink && (
                    <Button href={liveLink.url} target="_blank" rel="noreferrer" icon={<ArrowUpRight className="h-4 w-4" />}>
                      Live Demo
                    </Button>
                  )}
                  {codeLink && (
                    <Button
                      variant="secondary"
                      href={codeLink.url}
                      target="_blank"
                      rel="noreferrer"
                      icon={<GithubIcon className="h-4 w-4" />}
                    >
                      GitHub Code
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
