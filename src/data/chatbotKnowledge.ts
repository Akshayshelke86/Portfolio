import { personal, socialLinks, skillCategories, experience, projects, certifications, achievements } from './site'

interface Intent {
  id: string
  keywords: string[]
  respond: () => string
}

const linkedin = socialLinks.find((l) => l.icon === 'linkedin')?.url ?? ''
const github = socialLinks.find((l) => l.icon === 'github')?.url ?? ''

function formatSkills(): string {
  return skillCategories.map((c) => `**${c.title}:** ${c.skills.join(', ')}`).join('\n')
}

function formatProjects(): string {
  return projects
    .map((p) => {
      const live = p.links.find((l) => l.label === 'Live Demo')
      const code = p.links.find((l) => l.label === 'GitHub')
      const links = [live && `[Live Demo](${live.url})`, code && `[GitHub](${code.url})`]
        .filter(Boolean)
        .join(' · ')
      return `**${p.name}**\n${p.description}${links ? `\n${links}` : ''}`
    })
    .join('\n\n')
}

function formatExperience(): string {
  return experience
    .map((e) => {
      const roles = e.roles.map((r) => `${r.title} (${r.startDate} – ${r.endDate})`).join(' → ')
      return `**${e.company}** — ${roles}`
    })
    .join('\n')
}

function formatCertifications(): string {
  const certs = certifications.map((c) => `${c.name} — ${c.issuer}, ${c.date}`).join('\n')
  const achv = achievements.map((a) => a.title).join('\n')
  return `${certs}\n\n${achv}`
}

export const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: [
      'hi', 'hello', 'hey', 'namaste', 'yo',
      'good morning', 'good afternoon', 'good evening',
    ],
    respond: () =>
      `Hi! I'm a small assistant trained only on ${personal.name}'s portfolio. Ask me about skills, projects, experience, or how to get in touch.`,
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'thx', 'appreciate it', 'cheers'],
    respond: () =>
      `You're welcome! Let me know if you'd like to know more about ${personal.name}'s skills, projects, or how to get in touch.`,
  },
  {
    id: 'farewell',
    keywords: ['bye', 'goodbye', 'see you', 'take care', 'good night'],
    respond: () =>
      `Thanks for stopping by! Feel free to reach out through the contact section whenever you're ready.`,
  },
  {
    id: 'skills',
    keywords: [
      'skill', 'skills',
      'tech', 'stack',
      'language', 'languages',
      'technology', 'technologies',
      'know', 'knows',
      'code', 'coding', 'program', 'programming',
      'developer', 'good at',
    ],
    respond: () => `Here's the tech stack:\n\n${formatSkills()}`,
  },
  {
    id: 'projects',
    keywords: [
      'project', 'projects',
      'built', 'build', 'made', 'created',
      'work on', 'worked on', 'your work',
      'portfolio piece',
      'app', 'apps', 'application', 'applications',
    ],
    respond: () => `Here are the featured projects:\n\n${formatProjects()}`,
  },
  {
    id: 'experience',
    keywords: [
      'experience', 'experiences',
      'job', 'jobs',
      'work history',
      'company', 'companies',
      'aarya', 'esds', 'career',
    ],
    respond: () => `Professional experience:\n\n${formatExperience()}`,
  },
  {
    id: 'certifications',
    keywords: [
      'certificate', 'certificates', 'certification', 'certifications',
      'achievement', 'achievements',
      'award', 'awards',
      'honor', 'honors',
    ],
    respond: () => `Certifications & achievements:\n\n${formatCertifications()}`,
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'hire', 'hiring', 'email', 'mail', 'connect', 'phone', 'linkedin'],
    respond: () =>
      `You can reach Akshay by [email](mailto:${personal.email}) or on [LinkedIn](${linkedin}).\nThere's also a contact form further down this page.`,
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'download'],
    respond: () => `You can download it here: [${personal.name.split(' ')[0]}'s Resume (PDF)](${personal.resumeUrl})`,
  },
  {
    id: 'github',
    keywords: ['github', 'repo', 'repos', 'source code', 'open source'],
    respond: () => `[GitHub Profile](${github})\nThe project cards above also link to individual repos where public.`,
  },
  {
    id: 'location',
    keywords: ['location', 'based', 'nashik', 'city', 'where'],
    respond: () => `${personal.name} is based in ${personal.location}.`,
  },
  {
    // Checked last: generic words like "about" and "who" appear inside many
    // more specific questions ("tell me about your experience"), so this only
    // catches messages that don't match a more specific topic above.
    id: 'about',
    keywords: ['who', 'about', 'yourself', 'akshay', 'introduce', 'what do you do'],
    respond: () => `${personal.summary}\n\nBased in ${personal.location}.`,
  },
]

export const suggestedPrompts = ['Skills', 'Projects', 'Experience', 'Contact']

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Every keyword (including multi-word phrases) is matched as a whole word/phrase
// with boundaries on both sides — this avoids both false positives from naive
// substring checks (e.g. "yo" inside "you") and false negatives from partial-stem
// checks (e.g. "skill" not matching "skills"). Inflected forms are listed explicitly.
function hasKeyword(message: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(message)
}

export function matchIntent(message: string): string {
  const lower = message.toLowerCase()
  for (const intent of intents) {
    if (intent.keywords.some((kw) => hasKeyword(lower, kw))) {
      return intent.respond()
    }
  }
  return `I can only answer questions about what's on this portfolio — try asking about skills, projects, experience, certifications, or how to contact ${personal.name}. For anything else, [email](mailto:${personal.email}) directly.`
}
