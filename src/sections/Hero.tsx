import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { NetworkBackground } from '@/components/ui/NetworkBackground'
import { SocialIcon } from '@/components/layout/SocialIcon'
import { personal, socialLinks } from '@/data/site'

const roleLine =
  'Java Full Stack Developer | React.js + Spring Boot | Node.js, MySQL, MongoDB | AWS & Cloud Deployment'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-28 text-center sm:pt-48 sm:pb-36">
      <NetworkBackground
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          maskImage: 'radial-gradient(ellipse 55% 50% at 50% 42%, transparent 35%, black 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 50% at 50% 42%, transparent 35%, black 90%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-(--color-text) sm:text-5xl lg:text-6xl text-balance">
            Hi, I&apos;m {personal.name} —
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-(--color-accent) sm:text-xl">
            {roleLine}
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-(--color-text-muted) sm:text-base">
            {personal.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="#projects" icon={<ArrowRight className="h-4 w-4" />}>
              View Projects
            </Button>
            <Button variant="accent-outline" href="#contact" icon={<Mail className="h-4 w-4" />}>
              Contact Me
            </Button>
            <Button
              variant="accent-outline"
              href={personal.resumeUrl}
              download
              icon={<Download className="h-4 w-4" />}
            >
              Download Resume
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {socialLinks
              .filter((l) => l.icon === 'github' || l.icon === 'linkedin' || l.icon === 'email')
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.icon === 'email' ? undefined : '_blank'}
                  rel={link.icon === 'email' ? undefined : 'noreferrer'}
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-soft) text-(--color-accent) transition-transform hover:-translate-y-0.5 hover:bg-(--color-accent) hover:text-white"
                >
                  <SocialIcon icon={link.icon} className="h-4.5 w-4.5" />
                </a>
              ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
