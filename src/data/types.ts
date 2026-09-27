export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'email' | 'leetcode' | 'hackerrank'
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export interface RoleEntry {
  title: string
  startDate: string
  endDate: string
  bullets: string[]
}

export interface ExperienceEntry {
  company: string
  location: string
  workMode?: string
  roles: RoleEntry[]
}

export interface ProjectLink {
  label: 'Live Demo' | 'GitHub'
  url: string
}

export type ProjectCategory = 'Full Stack' | 'Backend' | 'IoT' | 'Frontend'

export interface Project {
  slug: string
  name: string
  description: string
  bullets: string[]
  techStack: string[]
  categories: ProjectCategory[]
  links: ProjectLink[]
  featured?: boolean
}

export interface Certification {
  name: string
  issuer: string
  date: string
}

export interface Achievement {
  title: string
  description?: string
}
