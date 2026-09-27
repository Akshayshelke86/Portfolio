import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center')}
    >
      <span className="font-mono text-sm font-medium text-(--color-accent)">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--color-text) sm:text-4xl text-balance">
        {title}
      </h2>
      {align === 'center' && (
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-(--color-accent)" />
      )}
      {description && (
        <p className="mt-4 text-base leading-relaxed text-(--color-text-muted)">{description}</p>
      )}
    </motion.div>
  )
}
