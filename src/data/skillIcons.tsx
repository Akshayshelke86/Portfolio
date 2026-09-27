import type { IconType } from 'react-icons'
import { DiCss3, DiJava, DiVisualstudio } from 'react-icons/di'
import { FaAws } from 'react-icons/fa6'
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRender,
  SiSpringboot,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { Server } from 'lucide-react'

interface SkillIconMeta {
  icon: IconType
  color: string
}

export const skillIcons: Record<string, SkillIconMeta> = {
  Java: { icon: DiJava, color: '#ea2d2e' },
  JavaScript: { icon: SiJavascript, color: '#f7df1e' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  HTML: { icon: SiHtml5, color: '#e34f26' },
  CSS: { icon: DiCss3, color: '#1572b6' },
  'React.js': { icon: SiReact, color: '#61dafb' },
  'Node.js': { icon: SiNodedotjs, color: '#5fa04e' },
  'Spring Boot': { icon: SiSpringboot, color: '#6db33f' },
  'Express.js': { icon: SiExpress, color: 'currentColor' },
  'REST APIs': { icon: Server, color: '#ff6b00' },
  JWT: { icon: SiJsonwebtokens, color: '#fb015b' },
  MySQL: { icon: SiMysql, color: '#4479a1' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169e1' },
  AWS: { icon: FaAws, color: '#ff9900' },
  Docker: { icon: SiDocker, color: '#2496ed' },
  Git: { icon: SiGit, color: '#f05032' },
  GitHub: { icon: SiGithub, color: 'currentColor' },
  Postman: { icon: SiPostman, color: '#ff6c37' },
  'VS Code': { icon: DiVisualstudio, color: '#007acc' },
  IntelliJ: { icon: SiIntellijidea, color: '#fe315d' },
  Vercel: { icon: SiVercel, color: 'currentColor' },
  Render: { icon: SiRender, color: '#46e3b7' },
}
