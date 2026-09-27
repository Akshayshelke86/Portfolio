import type { ComponentType } from 'react'
import { Code2, Mail, Trophy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import type { SocialLink } from '@/data/types'

const iconMap: Record<SocialLink['icon'], ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  leetcode: Code2,
  hackerrank: Trophy,
}

export function SocialIcon({ icon, className }: { icon: SocialLink['icon']; className?: string }) {
  const Icon = iconMap[icon]
  return <Icon className={className} aria-hidden="true" />
}
