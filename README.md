# Akshay Shelke — Portfolio

Personal portfolio site for **Akshay Shelke**, Java Full Stack Developer.

**Live:** [akshayshelke.in](https://akshayshelke.in)

## Overview

A single-page portfolio built with React, TypeScript, and Tailwind CSS, covering skills, featured projects, professional experience, and certifications, plus a small built-in chat assistant that answers visitor questions using only the information on the site.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tooling
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations
- **react-icons** / **lucide-react** — icons

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # lint the codebase
```

## Project Structure

```
src/
  components/   # reusable UI, layout, and chatbot components
  sections/     # page sections (Hero, Projects, Skills, Experience, ...)
  data/         # site content — edit this to update text, projects, skills, etc.
  hooks/        # theme, scroll, and other custom hooks
  utils/        # small shared helpers
```

To update any content on the site (name, projects, skills, experience, links), edit the files in `src/data/`.

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`), served from the custom domain `akshayshelke.in`.

## Contact

- Email: akshayshelk86@gmail.com
- LinkedIn: [akshay-shelke-883038236](https://www.linkedin.com/in/akshay-shelke-883038236/)
- GitHub: [@Akshayshelke86](https://github.com/Akshayshelke86)
