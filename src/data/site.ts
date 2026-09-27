import type {
  Achievement,
  Certification,
  ExperienceEntry,
  Project,
  SkillCategory,
  SocialLink,
} from './types'

export const personal = {
  name: 'Akshay Shelke',
  title: 'Java Full Stack Developer',
  location: 'Nashik, Maharashtra, India',
  phone: '+91 9284188705',
  email: 'akshayshelk86@gmail.com',
  summary:
    'Java Full Stack Developer with hands-on experience building and deploying web and IoT applications using React.js, Node.js, Java, Spring Boot, MySQL, MongoDB, REST APIs, and AWS. Skilled in frontend development, backend architecture, database design, and production deployment.',
  resumeUrl: '/resume/Akshay_Shelke_Resume.pdf',
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Akshayshelke86', icon: 'github' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/akshay-shelke-883038236/',
    icon: 'linkedin',
  },
  { label: 'Email', url: 'mailto:akshayshelk86@gmail.com', icon: 'email' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/Akshay9284/', icon: 'leetcode' },
  {
    label: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/akshayshelk86',
    icon: 'hackerrank',
  },
]

export const skillCategories: SkillCategory[] = [
  { title: 'Languages', skills: ['Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { title: 'Frontend', skills: ['React.js'] },
  { title: 'Backend', skills: ['Node.js', 'Spring Boot', 'Express.js', 'REST APIs', 'JWT'] },
  { title: 'Databases', skills: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Git', 'GitHub'] },
  { title: 'Tools', skills: ['Postman', 'VS Code', 'IntelliJ', 'Vercel', 'Render'] },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'AARYA INNOVTECH Private Limited',
    location: 'Nashik, India',
    workMode: 'On-site',
    roles: [
      {
        title: 'Software Engineer',
        startDate: 'Jun 2026',
        endDate: 'Present',
        bullets: [
          'Developing and maintaining real-world web and IoT applications spanning frontend, backend, APIs, databases, and deployment.',
          'Building features with React.js, JavaScript, Node.js, Java, Spring Boot, MySQL, MongoDB, and REST APIs.',
          'Contributing to IoT dashboards, kiosk-based applications, responsive interfaces, system integration, and AWS deployments.',
          'Handling application security, troubleshooting, database management, and production-oriented deployment.',
        ],
      },
      {
        title: 'Software Engineer Intern',
        startDate: 'May 2026',
        endDate: 'Jun 2026',
        bullets: [
          'Worked on real-world software and IoT-based projects covering frontend, backend, APIs, and system integration.',
          'Collaborated with the development team on troubleshooting, feature development, testing, and deployment workflows.',
        ],
      },
    ],
  },
  {
    company: 'ESDS Software Solution Limited',
    location: 'Nashik, India',
    roles: [
      {
        title: 'Intern',
        startDate: 'Jan 2024',
        endDate: 'Mar 2024',
        bullets: [
          'Collaborated with the Learning & Development team to design training programs and assess learning gaps.',
          'Developed training materials that improved knowledge retention and skill enhancement.',
        ],
      },
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'projectproof-marketplace',
    name: 'ProjectProof — Academic Project Marketplace',
    description:
      'A full-stack academic project marketplace built to enable secure, plagiarism-free, and trustworthy project sharing — with paid downloads, watermarked delivery, and automated originality scoring.',
    bullets: [
      'Built secure checkout and delivery with Razorpay payments and Cloudinary-hosted, watermarked downloads with dynamic license injection.',
      'Integrated a Python microservice for automated plagiarism detection via GitHub scanning with originality scoring.',
      'Implemented Google OAuth and email OTP verification, with Redux Toolkit managing app-wide state.',
      'Designed REST APIs on Node.js/Express with MongoDB, plus SEO-optimized social preview tags.',
    ],
    techStack: [
      'React',
      'Vite',
      'Redux Toolkit',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Razorpay',
      'Cloudinary',
      'Google OAuth',
      'Python',
    ],
    categories: ['Full Stack'],
    links: [
      { label: 'Live Demo', url: 'https://projectproof-academics-marketplace.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Akshayshelke86/Projectproof-Academics-Marketplace' },
    ],
    featured: true,
  },
  {
    slug: 'budgetbuddy',
    name: 'BudgetBuddy — Personal Finance Tracker',
    description:
      'An AI-powered personal finance and wealth management platform for expense tracking, budgeting, and spending analysis, with AI-assisted receipt scanning.',
    bullets: [
      'Built with Next.js 15 (App Router) and React 19, styled with Tailwind CSS and Shadcn UI.',
      'Used Supabase (PostgreSQL) with Prisma ORM for data modeling, and Clerk for authentication.',
      'Integrated Google Gemini AI for receipt scanning and Resend for email notifications.',
    ],
    techStack: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'Shadcn UI',
      'Supabase',
      'PostgreSQL',
      'Prisma',
      'Clerk',
      'Gemini AI',
    ],
    categories: ['Full Stack'],
    links: [
      { label: 'Live Demo', url: 'https://budgetbuddy-six.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Akshayshelke86/BudgetBuddy' },
    ],
    featured: true,
  },
  {
    slug: 'smartbuddy-iot-dashboard',
    name: 'Smartbuddy — IoT Dashboard',
    description:
      'A real-time IoT monitoring and dashboard platform for live device data, built for production hardware deployed in the field.',
    bullets: [
      'Built real-time device monitoring with MQTT for IoT device communication and Express/MySQL on the backend.',
      'Implemented live data visualization with Recharts, QR-based device onboarding, and PDF report generation.',
      'Integrated AWS S3 for asset storage and Razorpay for billing, with JWT-secured REST APIs.',
    ],
    techStack: ['React', 'Vite', 'Node.js', 'Express.js', 'MySQL', 'MQTT', 'AWS S3', 'JWT', 'Recharts'],
    categories: ['IoT', 'Full Stack'],
    links: [{ label: 'Live Demo', url: 'https://aaryainnovtech.com/e2t/' }],
    featured: true,
  },
  {
    slug: 'aaryainnovtech-website',
    name: 'AARYA INNOVTECH — Company Website',
    description:
      "The company's live, client-facing website — contributed to development, deployment, and ongoing maintenance.",
    bullets: [
      'Built interactive UI with React and Framer Motion animations.',
      'Implemented an interactive map with Leaflet and 3D visuals with Three.js.',
      'Deployed and maintained on AWS-backed infrastructure with a REST API integration.',
    ],
    techStack: ['React', 'Vite', 'Framer Motion', 'Three.js', 'Leaflet', 'REST API', 'AWS'],
    categories: ['Frontend'],
    links: [{ label: 'Live Demo', url: 'https://aaryainnovtech.com' }],
  },
  {
    slug: 'asems-expense-management',
    name: 'ASEMS — Site Expense Management System',
    description:
      'A role-based web app for tracking money and progress on on-site installation projects — site supervisors log field expenses, Operations approves them, Accounts verifies and pays, and Admin has full oversight.',
    bullets: [
      'Built a 4-role workflow (Admin, Operations, Accounts, Site Supervisor) with a public no-login quick-expense form for field use.',
      'Backend built with Node.js, Express, and Prisma over MySQL, with JWT authentication and role-based access control.',
      'Integrated AWS S3 for bill/receipt uploads, with rate limiting, Helmet, and input validation for production security.',
    ],
    techStack: ['React', 'Vite', 'Node.js', 'Express.js', 'Prisma', 'MySQL', 'AWS S3', 'JWT'],
    categories: ['Full Stack'],
    links: [{ label: 'Live Demo', url: 'https://aaryainnovtech.com/expense' }],
  },
]

export const certifications: Certification[] = [
  { name: 'Java Full Stack Training', issuer: 'Zensar Technologies', date: '2023' },
  { name: 'Java Training', issuer: 'Besant Technologies', date: '2024' },
  { name: 'Advanced Java with DSA & Soft Skills', issuer: 'TNS Organisation', date: '2024' },
]

export const achievements: Achievement[] = [
  { title: 'Top 50 Ranker, Naukri Campus Young Turks' },
  { title: 'Active contributor to GitHub projects and coding platforms' },
]
