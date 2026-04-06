# Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Pablo Alejandro Nistal's personal portfolio using Astro 5, Tailwind CSS 4, bilingual EN/ES, dark indigo/violet theme, deployed to Cloudflare Pages via GitHub Actions.

**Architecture:** Static Astro 5 site with Content Collections for blog posts and case studies, native i18n via `/en/` (default) and `/es/` routes, MDX for rich content, Cloudflare Pages for global CDN hosting.

**Tech Stack:** Astro 6, Tailwind CSS 4, MDX, Lucide icons, Devicons, GitHub Actions, Cloudflare Pages (wrangler-action@v3)

**Reference files:**
- Design doc: `docs/plans/2026-04-06-portfolio-design.md`
- Visual reference: `portfolio-assets/app/src/index.css` (colors/gradients)
- Photo: `/home/paul/Imágenes/nis.png`
- CV data: `CV Pablo Alejandro Nistal del Rio.docx` (already extracted)

---

## Task 1: Initialize Astro 5 project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`

**Step 1: Scaffold Astro project**

```bash
cd /home/paul/workspace/claude/projects/web/portfolio
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
# Esto instala la última versión disponible (Astro 6 a día de hoy)
# Verifica con: cat package.json | grep '"astro"'
```

Expected: project files created in current directory.

**Step 2: Add integrations**

```bash
npx astro add tailwind mdx --yes
```

Expected: `@astrojs/tailwind` and `@astrojs/mdx` installed and added to `astro.config.mjs`.

**Step 3: Install additional deps**

```bash
npm install lucide-astro @iconify/json @iconify-json/devicon
npm install -D @types/node
```

**Step 4: Verify build works**

```bash
npm run build
```

Expected: `dist/` folder created, 0 errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json tailwind.config.mjs
git commit -m "feat: initialize Astro 5 portfolio project — the spice begins to flow"
```

---

## Task 2: Configure Tailwind with dark theme + brand colors

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`

**Step 1: Write `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        card: '#1a1a1a',
        border: '#2a2a2a',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        muted: '#404040',
        'muted-foreground': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
```

**Step 2: Write `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-background text-white antialiased;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
}

@layer utilities {
  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  }
  .gradient-bg {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  }
  .glow-hover:hover {
    box-shadow: 0 0 60px rgba(99, 102, 241, 0.5);
  }
  .card {
    @apply bg-card border border-border rounded-2xl;
  }
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #0f0f0f; }
::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }
```

**Step 3: Add Inter font to BaseLayout (next task) — note for later**

**Step 4: Verify build**

```bash
npm run build
```

Expected: 0 errors.

**Step 5: Commit**

```bash
git add src/styles/global.css tailwind.config.mjs
git commit -m "style: add dark theme with indigo/violet brand colors"
```

---

## Task 3: Set up i18n + Content Collections

**Files:**
- Create: `src/i18n/en.json`
- Create: `src/i18n/es.json`
- Create: `src/i18n/utils.ts`
- Create: `src/content.config.ts` ← Astro 6: raíz del proyecto, NO dentro de src/content/
- Create: `src/content/blog/en/.gitkeep`
- Create: `src/content/blog/es/.gitkeep`
- Create: `src/content/case-studies/en/.gitkeep`
- Create: `src/content/case-studies/es/.gitkeep`

**Step 1: Write `src/i18n/en.json`**

```json
{
  "nav.about": "About",
  "nav.stack": "Stack",
  "nav.experience": "Experience",
  "nav.platform": "Platform",
  "nav.projects": "Projects",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
  "hero.greeting": "Hi, I'm",
  "hero.role": "DevOps / SRE / Platform Engineer",
  "hero.tagline": "Linux (RHEL) · Kubernetes/K3s · GitLab CI/CD · Ansible · AWS · Cloudflare · Observability · GitOps · SLOs",
  "hero.cta.projects": "View Projects",
  "hero.cta.contact": "Get in Touch",
  "hero.metrics.years": "Years experience",
  "hero.metrics.services": "Services managed",
  "hero.metrics.nodes": "Proxmox nodes",
  "hero.metrics.remote": "Remote EMEA",
  "about.title": "About",
  "about.subtitle": "me",
  "stack.title": "Tech",
  "stack.subtitle": "Stack",
  "experience.title": "Work",
  "experience.subtitle": "Experience",
  "experience.present": "Present",
  "platform.title": "Personal",
  "platform.subtitle": "Platform",
  "platform.description": "A production-like 3-node cluster I operate, monitor and improve — not a hobby list, a working system.",
  "projects.title": "Case",
  "projects.subtitle": "Studies",
  "certs.title": "Certifications",
  "blog.title": "Blog",
  "blog.subtitle": "& Notes",
  "blog.readmore": "Read more",
  "blog.viewall": "View all posts",
  "contact.title": "Get in",
  "contact.subtitle": "Touch",
  "contact.availability": "Open to remote EMEA opportunities",
  "contact.timezone": "Timezone: CET/CEST (UTC+1/+2)",
  "lang.switch": "ES"
}
```

**Step 2: Write `src/i18n/es.json`** (Spanish translations)

```json
{
  "nav.about": "Sobre mí",
  "nav.stack": "Stack",
  "nav.experience": "Experiencia",
  "nav.platform": "Plataforma",
  "nav.projects": "Proyectos",
  "nav.blog": "Blog",
  "nav.contact": "Contacto",
  "hero.greeting": "Hola, soy",
  "hero.role": "DevOps / SRE / Platform Engineer",
  "hero.tagline": "Linux (RHEL) · Kubernetes/K3s · GitLab CI/CD · Ansible · AWS · Cloudflare · Observabilidad · GitOps · SLOs",
  "hero.cta.projects": "Ver Proyectos",
  "hero.cta.contact": "Contactar",
  "hero.metrics.years": "Años de experiencia",
  "hero.metrics.services": "Servicios gestionados",
  "hero.metrics.nodes": "Nodos Proxmox",
  "hero.metrics.remote": "Remoto EMEA",
  "about.title": "Sobre",
  "about.subtitle": "mí",
  "stack.title": "Tech",
  "stack.subtitle": "Stack",
  "experience.title": "Experiencia",
  "experience.subtitle": "Laboral",
  "experience.present": "Presente",
  "platform.title": "Plataforma",
  "platform.subtitle": "Personal",
  "platform.description": "Un cluster de 3 nodos que opero, monitorizo y mejoro continuamente — no una lista de hobbies, un sistema real.",
  "projects.title": "Casos de",
  "projects.subtitle": "Estudio",
  "certs.title": "Certificaciones",
  "blog.title": "Blog",
  "blog.subtitle": "y Notas",
  "blog.readmore": "Leer más",
  "blog.viewall": "Ver todos los posts",
  "contact.title": "Hablemos",
  "contact.subtitle": "",
  "contact.availability": "Disponible para remoto EMEA",
  "contact.timezone": "Zona horaria: CET/CEST (UTC+1/+2)",
  "lang.switch": "EN"
}
```

**Step 3: Write `src/i18n/utils.ts`**

```ts
import en from './en.json';
import es from './es.json';

const translations = { en, es } as const;
export type Lang = keyof typeof translations;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof en): string {
    return translations[lang][key] ?? translations['en'][key] ?? key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === 'es') return `/es${path}`;
  return path;
}
```

**Step 4: Write `src/content.config.ts`** ← Astro 6: archivo en raíz de src/, no dentro de content/

```ts
// Astro 6 Content Layer API
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'; // ← Astro 6: z viene de 'astro/zod', no de 'astro:content'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: 0 errors.

**Step 6: Commit**

```bash
git add src/i18n/ src/content/ src/content.config.ts
git commit -m "feat: add i18n strings and Content Collections schema (Astro 6 Content Layer API)"
```

---

## Task 4: BaseLayout — navigation, footer, lang toggle

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Navigation.astro`
- Create: `src/components/Footer.astro`

**Step 1: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';
import { getLangFromUrl } from '../i18n/utils';

interface Props {
  title?: string;
  description?: string;
  lang?: 'en' | 'es';
}

const {
  title = 'Pablo Alejandro Nistal — DevOps / SRE / Platform Engineer',
  description = 'DevOps Architect and SRE based in A Coruña, Spain. Kubernetes, Ansible, GitOps, Observability, Linux.',
  lang = getLangFromUrl(Astro.url),
} = Astro.props;
---
<!DOCTYPE html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body class="bg-background text-white">
    <Navigation lang={lang} />
    <main>
      <slot />
    </main>
    <Footer lang={lang} />
  </body>
</html>
```

**Step 2: Write `src/components/Navigation.astro`**

```astro
---
import { useTranslations, getLocalizedPath, type Lang } from '../i18n/utils';

interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const navLinks = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.stack', href: '#stack' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.platform', href: '#platform' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.blog', href: getLocalizedPath('/blog', lang) },
  { key: 'nav.contact', href: '#contact' },
] as const;

const altLang = lang === 'en' ? 'es' : 'en';
const altPath = lang === 'en' ? '/es/' : '/';
---
<nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href={getLocalizedPath('/', lang)} class="font-bold text-lg gradient-text">
      Pablo Nistal
    </a>
    <div class="hidden md:flex items-center gap-6">
      {navLinks.map(link => (
        <a href={link.href} class="text-sm text-muted-foreground hover:text-white transition-colors">
          {t(link.key as any)}
        </a>
      ))}
      <a
        href={altPath}
        class="text-sm font-medium px-3 py-1 rounded-full border border-border hover:border-primary text-muted-foreground hover:text-white transition-all"
      >
        {t('lang.switch')}
      </a>
    </div>
    <!-- Mobile menu button placeholder -->
    <button class="md:hidden text-muted-foreground" aria-label="Menu">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  </div>
</nav>
```

**Step 3: Write `src/components/Footer.astro`**

```astro
---
import type { Lang } from '../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const year = new Date().getFullYear();
---
<footer class="border-t border-border py-8 px-6">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
    <p>© {year} Pablo Alejandro Nistal</p>
    <p>Built with <a href="https://astro.build" target="_blank" rel="noopener" class="hover:text-white transition-colors">Astro</a> · Deployed on <a href="https://pages.cloudflare.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Cloudflare Pages</a></p>
    <div class="flex gap-4">
      <a href="https://github.com/niskeletor" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub</a>
      <a href="https://linkedin.com/in/pnistalrio" target="_blank" rel="noopener" class="hover:text-white transition-colors">LinkedIn</a>
    </div>
  </div>
</footer>
```

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/layouts/ src/components/Navigation.astro src/components/Footer.astro
git commit -m "feat: add BaseLayout with navigation, footer and language toggle"
```

---

## Task 5: Copy profile photo and create favicon

**Files:**
- Create: `public/profile.jpg`
- Create: `public/favicon.svg`

**Step 1: Copy profile photo**

```bash
cp /home/paul/Imágenes/nis.png public/profile.jpg
```

**Step 2: Create `public/favicon.svg`** (simple terminal icon)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#6366f1"/>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
    font-family="monospace" font-size="18" fill="white">P</text>
</svg>
```

**Step 3: Commit**

```bash
git add public/
git commit -m "assets: add profile photo and favicon"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/sections/Hero.astro`

**Step 1: Write `src/components/sections/Hero.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const metrics = [
  { value: '6+', key: 'hero.metrics.years' },
  { value: '50+', key: 'hero.metrics.services' },
  { value: '3', key: 'hero.metrics.nodes' },
  { value: '🌍', key: 'hero.metrics.remote' },
] as const;
---
<section id="hero" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
  <!-- Background glows -->
  <div class="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
  <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
  <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse" style="animation-delay:1s" />

  <div class="relative z-10 max-w-5xl mx-auto px-6">
    <div class="flex flex-col md:flex-row items-center gap-12">
      <!-- Photo -->
      <div class="flex-shrink-0">
        <div class="relative w-48 h-48 md:w-56 md:h-56">
          <div class="absolute inset-0 rounded-full gradient-bg p-1">
            <div class="w-full h-full rounded-full bg-background overflow-hidden">
              <img src="/profile.jpg" alt="Pablo Alejandro Nistal" class="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
          <div class="absolute -top-2 -right-2 w-16 h-16 bg-primary/30 rounded-full blur-xl" />
        </div>
      </div>

      <!-- Text -->
      <div class="text-center md:text-left">
        <p class="text-muted-foreground text-lg mb-2">{t('hero.greeting')}</p>
        <h1 class="text-4xl md:text-6xl font-bold mb-3">
          <span class="gradient-text">Pablo Alejandro Nistal</span>
        </h1>
        <h2 class="text-xl md:text-2xl font-semibold text-white mb-4">
          {t('hero.role')}
        </h2>
        <p class="text-muted-foreground text-sm md:text-base mb-6 max-w-xl font-mono">
          {t('hero.tagline')}
        </p>

        <!-- Metrics -->
        <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
          {metrics.map(m => (
            <div class="text-center">
              <div class="text-2xl font-bold gradient-text">{m.value}</div>
              <div class="text-xs text-muted-foreground">{t(m.key as any)}</div>
            </div>
          ))}
        </div>

        <!-- CTAs -->
        <div class="flex flex-wrap justify-center md:justify-start gap-3">
          <a href="#projects" class="gradient-bg text-white rounded-full px-6 py-3 text-sm font-medium glow-hover transition-all hover:scale-105">
            {t('hero.cta.projects')}
          </a>
          <a href="#contact" class="border border-border text-white rounded-full px-6 py-3 text-sm font-medium hover:border-primary transition-all hover:scale-105">
            {t('hero.cta.contact')}
          </a>
          <a href="https://github.com/niskeletor" target="_blank" rel="noopener" class="border border-border text-muted-foreground rounded-full px-4 py-3 text-sm hover:text-white hover:border-primary transition-all">
            GitHub
          </a>
          <a href="https://linkedin.com/in/pnistalrio" target="_blank" rel="noopener" class="border border-border text-muted-foreground rounded-full px-4 py-3 text-sm hover:text-white hover:border-primary transition-all">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  </div>
</section>
```

**Step 2: Add to `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/sections/Hero.astro';
---
<BaseLayout>
  <Hero lang="en" />
</BaseLayout>
```

**Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:4321` — should see Hero with photo, name, role, metrics, CTAs.

**Step 4: Commit**

```bash
git add src/components/sections/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero section with photo, metrics and CTAs"
```

---

## Task 7: About section

**Files:**
- Create: `src/components/sections/About.astro`

**Step 1: Write `src/components/sections/About.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const bioEN = `I'm a DevOps Architect and SRE based in A Coruña, Spain, with 6+ years operating, automating and improving Linux infrastructure. I currently work at Allenta Consulting on high-availability systems, observability pipelines and automation with Ansible.

I apply SRE principles — SLOs, error budgets, blameless postmortems, toil reduction — both at work and in my personal platform (a production-like 3-node cluster I run at home). I believe the best way to grow is to operate real systems under real constraints.

I'm open to remote EMEA roles where reliability engineering and platform thinking matter.`;

const bioES = `Soy Arquitecto DevOps y SRE basado en A Coruña, con 6+ años operando, automatizando y mejorando infraestructura Linux. Actualmente trabajo en Allenta Consulting en sistemas de alta disponibilidad, pipelines de observabilidad y automatización con Ansible.

Aplico principios SRE — SLOs, error budgets, postmortems blameless, reducción de toil — tanto en el trabajo como en mi plataforma personal (un cluster de 3 nodos que opero en casa como entorno production-like). Creo que la mejor manera de crecer es operar sistemas reales con restricciones reales.

Estoy abierto a roles remotos EMEA donde la ingeniería de fiabilidad y el pensamiento de plataforma sean importantes.`;

const bio = lang === 'es' ? bioES : bioEN;
---
<section id="about" class="py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12">
      {t('about.title')} <span class="gradient-text">{t('about.subtitle')}</span>
    </h2>
    <div class="max-w-3xl">
      {bio.split('\n\n').map(para => (
        <p class="text-muted-foreground text-lg leading-relaxed mb-6">{para}</p>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Add to `src/pages/index.astro`**

```astro
import About from '../components/sections/About.astro';
// ...
<About lang="en" />
```

**Step 3: Verify**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/sections/About.astro src/pages/index.astro
git commit -m "feat: add About section with honest bio"
```

---

## Task 8: Stack section

**Files:**
- Create: `src/components/sections/Stack.astro`

**Step 1: Write `src/components/sections/Stack.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const categories = [
  {
    title: 'Infrastructure',
    titleES: 'Infraestructura',
    icon: '🖥️',
    skills: [
      { name: 'Proxmox VE', context: lang === 'es' ? 'Plataforma homelab, 3 nodos, 208GB RAM' : 'Homelab platform, 3 nodes, 208GB RAM' },
      { name: 'K3s / Kubernetes', context: lang === 'es' ? 'Cluster en producción, GitOps con ArgoCD' : 'Production cluster, GitOps with ArgoCD' },
      { name: 'Docker', context: lang === 'es' ? 'Trabajo diario + homelab (50+ servicios)' : 'Daily work + homelab (50+ services)' },
      { name: 'Linux / RHEL', context: lang === 'es' ? 'SO principal — trabajo y personal' : 'Primary OS — work and personal' },
    ],
  },
  {
    title: 'Observability',
    titleES: 'Observabilidad',
    icon: '📊',
    skills: [
      { name: 'VictoriaMetrics', context: lang === 'es' ? 'Métricas homelab + trabajo (Allenta)' : 'Homelab metrics + work (Allenta)' },
      { name: 'Zabbix', context: lang === 'es' ? 'Monitorización trabajo (Allenta)' : 'Work monitoring (Allenta)' },
      { name: 'Grafana', context: lang === 'es' ? 'Dashboards + alertas' : 'Dashboards + alerting' },
    ],
  },
  {
    title: 'Automation & IaC',
    titleES: 'Automatización e IaC',
    icon: '⚙️',
    skills: [
      { name: 'Ansible', context: lang === 'es' ? 'IaC principal — trabajo + homelab' : 'Primary IaC — work + homelab' },
      { name: 'Bash / Python', context: lang === 'es' ? 'Scripts, automatización, APIs' : 'Scripting, automation, APIs' },
      { name: 'GitOps / ArgoCD', context: lang === 'es' ? 'Gestión declarativa del cluster K3s' : 'Declarative K3s cluster management' },
    ],
  },
  {
    title: 'CI/CD',
    icon: '🔄',
    titleES: 'CI/CD',
    skills: [
      { name: 'GitLab CI/CD', context: lang === 'es' ? 'CI/CD principal en trabajo' : 'Primary CI/CD at work' },
      { name: 'GitHub Actions', context: lang === 'es' ? 'Proyectos personales + este portfolio' : 'Personal projects + this portfolio' },
    ],
  },
  {
    title: 'Cloud & Network',
    titleES: 'Cloud y Red',
    icon: '☁️',
    skills: [
      { name: 'AWS', context: lang === 'es' ? 'EC2, S3, IAM — trabajo (Allenta)' : 'EC2, S3, IAM — work (Allenta)' },
      { name: 'Cloudflare', context: lang === 'es' ? 'DNS, Tunnel, Pages, Workers' : 'DNS, Tunnel, Pages, Workers' },
      { name: 'Azure', context: lang === 'es' ? 'AZ-900 certificado, conceptos fundamentales' : 'AZ-900 certified, fundamentals' },
    ],
  },
  {
    title: 'Security',
    titleES: 'Seguridad',
    icon: '🔒',
    skills: [
      { name: 'Vaultwarden', context: lang === 'es' ? 'Gestión de secretos — homelab' : 'Secrets management — homelab' },
      { name: 'Network segmentation', context: lang === 'es' ? 'VLANs, Pi-hole, WireGuard' : 'VLANs, Pi-hole, WireGuard' },
    ],
  },
];
---
<section id="stack" class="py-24 px-6 bg-card/30">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">
      {t('stack.title')} <span class="gradient-text">{t('stack.subtitle')}</span>
    </h2>
    <p class="text-muted-foreground mb-12 max-w-2xl">
      {lang === 'es'
        ? 'Herramientas que uso en contexto real — no porcentajes arbitrarios.'
        : 'Tools I use in real context — no arbitrary percentage bars.'}
    </p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(cat => (
        <div class="card p-6 hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">{cat.icon}</span>
            <h3 class="text-lg font-semibold text-white">
              {lang === 'es' ? cat.titleES : cat.title}
            </h3>
          </div>
          <div class="space-y-3">
            {cat.skills.map(skill => (
              <div>
                <p class="text-sm font-medium text-white">{skill.name}</p>
                <p class="text-xs text-muted-foreground">{skill.context}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Add to `src/pages/index.astro`**

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/sections/Stack.astro src/pages/index.astro
git commit -m "feat: add Stack section with domain categories and real context"
```

---

## Task 9: Experience section

**Files:**
- Create: `src/components/sections/Experience.astro`

**Step 1: Write `src/components/sections/Experience.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const experiences = [
  {
    title: 'DevOps Architect | Sysadmin',
    company: 'Allenta Consulting',
    location: 'A Coruña, Spain (Hybrid)',
    period: lang === 'es' ? 'Ene 2026 — Presente' : 'Jan 2026 — Present',
    bullets: lang === 'es'
      ? [
          'Operación y monitorización de infraestructura Linux crítica con VictoriaMetrics y Zabbix',
          'Automatización con Ansible — configuración, despliegues y mantenimiento',
          'Gestión de servicios en Docker con CI/CD en GitLab',
          'Seguridad perimetral con Cloudflare y administración RHEL',
        ]
      : [
          'Operating and monitoring critical Linux infrastructure with VictoriaMetrics and Zabbix',
          'Automation with Ansible — configuration management, deployments and maintenance',
          'Docker service management with GitLab CI/CD pipelines',
          'Perimeter security with Cloudflare, RHEL system administration',
        ],
    tech: ['RHEL', 'Ansible', 'Docker', 'GitLab CI/CD', 'VictoriaMetrics', 'Zabbix', 'Cloudflare', 'AWS'],
  },
  {
    title: 'DevOps SRE',
    company: 'Ozona Tech',
    location: 'Santiago de Compostela, Spain',
    period: 'Nov 2024 — Jan 2026',
    bullets: lang === 'es'
      ? ['Ingeniería de fiabilidad y operaciones de plataforma', 'Mejora de pipelines CI/CD y observabilidad']
      : ['Site reliability engineering and platform operations', 'CI/CD pipeline improvement and observability'],
    tech: ['Linux', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    title: 'DevOps Engineer',
    company: 'Altia',
    location: 'A Coruña, Spain',
    period: 'Apr 2024 — Nov 2024',
    bullets: lang === 'es'
      ? ['Ingeniería DevOps en proyectos cliente', 'Automatización e integración de infraestructura']
      : ['DevOps engineering on client projects', 'Infrastructure automation and integration'],
    tech: ['Linux', 'Docker', 'CI/CD', 'Ansible'],
  },
  {
    title: 'Sysadmin | Software Developer',
    company: 'TABIGAL SL',
    location: 'A Coruña, Spain',
    period: 'Nov 2021 — Apr 2024',
    bullets: lang === 'es'
      ? ['Administración de sistemas Linux y desarrollo de herramientas internas', 'Automatización de procesos y mantenimiento de infraestructura']
      : ['Linux systems administration and internal tooling development', 'Process automation and infrastructure maintenance'],
    tech: ['Linux', 'Python', 'Bash', 'Networking'],
  },
  {
    title: 'Systems Administrator',
    company: 'INCOGA NORTE',
    location: 'A Coruña, Spain',
    period: 'Feb 2020 — Nov 2021',
    bullets: lang === 'es'
      ? ['Administración de sistemas informáticos corporativos', 'Soporte técnico y mantenimiento de infraestructura']
      : ['Corporate IT systems administration', 'Technical support and infrastructure maintenance'],
    tech: ['Windows Server', 'Linux', 'Networking'],
  },
];
---
<section id="experience" class="py-24 px-6">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-16">
      {t('experience.title')} <span class="gradient-text">{t('experience.subtitle')}</span>
    </h2>
    <div class="relative">
      <div class="absolute left-4 top-0 bottom-0 w-px bg-border" />
      {experiences.map((exp, i) => (
        <div class="relative mb-10 pl-16">
          <div class="absolute left-0 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="text-primary">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <div class="card p-6 hover:border-primary/30 transition-colors">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-sm font-medium text-primary">{exp.period}</span>
              <span class="text-xs text-muted-foreground">· {exp.location}</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-1">{exp.title}</h3>
            <p class="text-muted-foreground mb-3">{exp.company}</p>
            <ul class="space-y-1 mb-4">
              {exp.bullets.map(b => (
                <li class="text-sm text-muted-foreground flex gap-2">
                  <span class="text-primary mt-0.5">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div class="flex flex-wrap gap-2">
              {exp.tech.map(tag => (
                <span class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Add to index.astro, verify build, commit**

```bash
git commit -m "feat: add Experience section with impact-oriented timeline"
```

---

## Task 10: Personal Platform section (Landsraad)

**Files:**
- Create: `src/components/sections/Platform.astro`

**Step 1: Write `src/components/sections/Platform.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const isEN = lang === 'en';

const stats = [
  { value: '3', label: isEN ? 'Proxmox nodes' : 'Nodos Proxmox' },
  { value: '208GB', label: isEN ? 'Total RAM' : 'RAM total' },
  { value: '~65TB', label: isEN ? 'Storage' : 'Almacenamiento' },
  { value: '50+', label: isEN ? 'Services' : 'Servicios' },
];

const blocks = [
  {
    icon: '🏗️',
    title: isEN ? 'Architecture' : 'Arquitectura',
    desc: isEN
      ? '3 Proxmox nodes (Andromeda, Triangulum, Orion), K3s cluster with ArgoCD GitOps, TrueNAS storage, Pi-hole DNS. Every service follows a golden path: repo template → CI/CD pipeline → GitOps deploy → SLO dashboard → alerting.'
      : '3 nodos Proxmox (Andromeda, Triangulum, Orion), cluster K3s con ArgoCD GitOps, almacenamiento TrueNAS, DNS con Pi-hole. Cada servicio sigue un golden path: template repo → pipeline CI/CD → deploy GitOps → SLO dashboard → alertas.',
  },
  {
    icon: '📈',
    title: isEN ? 'Delivery Metrics' : 'Métricas de entrega',
    desc: isEN
      ? 'Real DORA-style metrics tracked via GitOps commit history: multiple deployments per week, commit-to-deploy lead time under 5 minutes via ArgoCD reconciliation, change fail rate tracked per incident log.'
      : 'Métricas DORA reales extraídas del historial GitOps: varios despliegues por semana, lead time commit→deploy inferior a 5 minutos vía reconciliación ArgoCD, change fail rate registrado por incident log.',
  },
  {
    icon: '🔍',
    title: isEN ? 'Observability' : 'Observabilidad',
    desc: isEN
      ? 'VictoriaMetrics + Grafana for metrics and dashboards. Zabbix for host-level monitoring. Alert routing configured for actionable notifications — not noise. Dashboards cover resource saturation, service health and storage capacity.'
      : 'VictoriaMetrics + Grafana para métricas y dashboards. Zabbix para monitorización a nivel de host. Alertas configuradas para notificaciones accionables — no ruido. Dashboards de saturación de recursos, salud de servicios y capacidad de almacenamiento.',
  },
  {
    icon: '⚡',
    title: isEN ? 'Toil Reduction' : 'Reducción de toil',
    desc: isEN
      ? 'Ansible playbooks handle system updates, service configuration and new node provisioning. Manual operations that were weekly routines are now automated runs. GitOps reconciliation eliminates manual kubectl apply.'
      : 'Playbooks Ansible gestionan actualizaciones del sistema, configuración de servicios y aprovisionamiento de nuevos nodos. Operaciones manuales que eran rutinas semanales son ahora ejecuciones automatizadas. La reconciliación GitOps elimina el kubectl apply manual.',
  },
  {
    icon: '🛡️',
    title: isEN ? 'Security & Reliability' : 'Seguridad y fiabilidad',
    desc: isEN
      ? 'Network segmentation, secrets managed with Vaultwarden, Tailscale for remote access, Cloudflare tunnels for public services. TLS everywhere. Regular backup verification.'
      : 'Segmentación de red, secretos gestionados con Vaultwarden, Tailscale para acceso remoto, túneles Cloudflare para servicios públicos. TLS en todos los servicios. Verificación periódica de backups.',
  },
];
---
<section id="platform" class="py-24 px-6 bg-card/30">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">
      {t('platform.title')} <span class="gradient-text">{t('platform.subtitle')}</span>
    </h2>
    <p class="text-muted-foreground mb-4 max-w-2xl">{t('platform.description')}</p>
    <a href="https://github.com/niskeletor" target="_blank" rel="noopener"
      class="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-10">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.73-4.03-1.61-4.03-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
      {isEN ? 'View GitOps repository →' : 'Ver repositorio GitOps →'}
    </a>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map(s => (
        <div class="card p-4 text-center">
          <div class="text-3xl font-bold gradient-text mb-1">{s.value}</div>
          <div class="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    <!-- Blocks -->
    <div class="grid md:grid-cols-2 gap-6">
      {blocks.map(block => (
        <div class="card p-6 hover:border-primary/50 transition-colors">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">{block.icon}</span>
            <h3 class="text-lg font-semibold text-white">{block.title}</h3>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">{block.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Add to index.astro, verify build, commit**

```bash
git commit -m "feat: add Personal Platform section — Landsraad as production-like lab"
```

---

## Task 11: Case Studies preview + placeholder content

**Files:**
- Create: `src/components/sections/CaseStudies.astro`
- Create: `src/content/case-studies/en/gitops-k3s-migration.mdx`

**Step 1: Write placeholder case study `src/content/case-studies/en/gitops-k3s-migration.mdx`**

```mdx
---
title: "GitOps migration: moving 50+ services to K3s with ArgoCD"
description: "How I migrated a Docker Compose homelab to a GitOps-managed K3s cluster, and what I learned about declarative infrastructure."
pubDate: 2026-04-06
tags: ["kubernetes", "gitops", "argocd", "k3s", "migration"]
metrics:
  - label: "Services migrated"
    value: "50+"
  - label: "Deployment method"
    value: "GitOps / ArgoCD"
  - label: "Manual kubectl apply"
    value: "0 (reconciled)"
draft: true
---

# Coming soon

This case study is being written. Check back soon.
```

**Step 2: Write `src/components/sections/CaseStudies.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const allStudies = await getCollection('case-studies', entry =>
  entry.id.startsWith(`${lang}/`) && !entry.data.draft
);

const placeholder = {
  title: lang === 'en' ? 'Case studies coming soon' : 'Casos de estudio próximamente',
  desc: lang === 'en'
    ? 'I\'m documenting real work and infrastructure decisions. Check back soon.'
    : 'Estoy documentando trabajo real y decisiones de infraestructura. Vuelve pronto.',
};
---
<section id="projects" class="py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">
      {t('projects.title')} <span class="gradient-text">{t('projects.subtitle')}</span>
    </h2>
    <p class="text-muted-foreground mb-12 max-w-2xl">
      {lang === 'en'
        ? 'Real infrastructure decisions — context, constraints, solutions and measured outcomes.'
        : 'Decisiones reales de infraestructura — contexto, restricciones, soluciones y resultados medibles.'}
    </p>

    {allStudies.length === 0 ? (
      <div class="card p-12 text-center">
        <p class="text-4xl mb-4">🔧</p>
        <h3 class="text-xl font-semibold text-white mb-2">{placeholder.title}</h3>
        <p class="text-muted-foreground">{placeholder.desc}</p>
      </div>
    ) : (
      <div class="grid md:grid-cols-2 gap-8">
        {allStudies.map(study => (
          <a href={`/case-studies/${study.id.split('/').slice(1).join('/')}`}
            class="card p-6 hover:border-primary/50 transition-all hover:scale-[1.01] group">
            <h3 class="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
              {study.data.title}
            </h3>
            <p class="text-sm text-muted-foreground mb-4">{study.data.description}</p>
            {study.data.metrics.length > 0 && (
              <div class="flex flex-wrap gap-3 mb-4">
                {study.data.metrics.map(m => (
                  <div class="text-center">
                    <div class="text-lg font-bold gradient-text">{m.value}</div>
                    <div class="text-xs text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div class="flex flex-wrap gap-2">
              {study.data.tags.map(tag => (
                <span class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
</section>
```

**Step 3: Add to index.astro, verify build, commit**

```bash
git commit -m "feat: add Case Studies section with placeholder content"
```

---

## Task 12: Certifications + Blog preview + Contact sections

**Files:**
- Create: `src/components/sections/Certifications.astro`
- Create: `src/components/sections/BlogPreview.astro`
- Create: `src/components/sections/Contact.astro`

**Step 1: Write `src/components/sections/Certifications.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const isEN = lang === 'en';

const certs = [
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    code: 'AZ-900',
    issuer: 'Microsoft',
    date: isEN ? 'March 2024' : 'Marzo 2024',
    icon: '☁️',
  },
  {
    name: 'Linux Essentials',
    code: 'LPI 010-160',
    issuer: 'Cisco / LPI',
    date: isEN ? 'May 2023' : 'Mayo 2023',
    icon: '🐧',
  },
  {
    name: 'PCEP — Certified Entry-Level Python Programmer',
    code: 'PCEP-30-02',
    issuer: 'OpenEDG Python Institute',
    date: isEN ? 'December 2023' : 'Diciembre 2023',
    icon: '🐍',
  },
  {
    name: 'Computer Science',
    code: isEN ? 'In progress (2024–2027)' : 'En curso (2024–2027)',
    issuer: 'Universitat Oberta de Catalunya (UOC)',
    date: '',
    icon: '🎓',
    inProgress: true,
  },
];
---
<section id="certifications" class="py-24 px-6 bg-card/30">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12">
      <span class="gradient-text">{t('certs.title')}</span>
    </h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {certs.map(cert => (
        <div class={`card p-5 hover:border-primary/50 transition-colors ${cert.inProgress ? 'border-primary/30' : ''}`}>
          <span class="text-3xl mb-3 block">{cert.icon}</span>
          {cert.inProgress && (
            <span class="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary mb-2 inline-block">
              {isEN ? 'In progress' : 'En curso'}
            </span>
          )}
          <h3 class="text-sm font-semibold text-white mb-1">{cert.name}</h3>
          <p class="text-xs text-primary mb-1">{cert.code}</p>
          <p class="text-xs text-muted-foreground">{cert.issuer}</p>
          {cert.date && <p class="text-xs text-muted-foreground mt-1">{cert.date}</p>}
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Write `src/components/sections/BlogPreview.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);

const posts = await getCollection('blog', entry =>
  entry.id.startsWith(`${lang}/`) && !entry.data.draft
);
const latest = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 3);
const isEN = lang === 'en';
---
<section id="blog" class="py-24 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="flex items-end justify-between mb-12">
      <h2 class="text-3xl md:text-4xl font-bold">
        {t('blog.title')} <span class="gradient-text">{t('blog.subtitle')}</span>
      </h2>
      <a href={lang === 'es' ? '/es/blog' : '/blog'} class="text-sm text-primary hover:underline hidden md:block">
        {t('blog.viewall')} →
      </a>
    </div>

    {latest.length === 0 ? (
      <div class="card p-12 text-center">
        <p class="text-4xl mb-4">✍️</p>
        <h3 class="text-xl font-semibold text-white mb-2">
          {isEN ? 'Posts coming soon' : 'Posts próximamente'}
        </h3>
        <p class="text-muted-foreground">
          {isEN
            ? 'Writing about real SRE problems, platform engineering and GitOps.'
            : 'Escribiendo sobre problemas SRE reales, platform engineering y GitOps.'}
        </p>
      </div>
    ) : (
      <div class="grid md:grid-cols-3 gap-6">
        {latest.map(post => (
          <a href={`/blog/${post.id.split('/').slice(1).join('/')}`}
            class="card p-6 hover:border-primary/50 transition-all group">
            <p class="text-xs text-muted-foreground mb-2">
              {post.data.pubDate.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h3 class="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
              {post.data.title}
            </h3>
            <p class="text-sm text-muted-foreground">{post.data.description}</p>
          </a>
        ))}
      </div>
    )}
  </div>
</section>
```

**Step 3: Write `src/components/sections/Contact.astro`**

```astro
---
import { useTranslations, type Lang } from '../../i18n/utils';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const isEN = lang === 'en';
---
<section id="contact" class="py-24 px-6 bg-card/30">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">
      {t('contact.title')} <span class="gradient-text">{t('contact.subtitle')}</span>
    </h2>
    <p class="text-muted-foreground mb-2">{t('contact.availability')}</p>
    <p class="text-muted-foreground text-sm mb-10">{t('contact.timezone')}</p>

    <div class="flex flex-wrap justify-center gap-4 mb-10">
      <a href="mailto:nistalin@gmail.com"
        class="gradient-bg text-white rounded-full px-8 py-4 text-base font-medium glow-hover transition-all hover:scale-105">
        {isEN ? '✉️ Send email' : '✉️ Enviar email'}
      </a>
      <a href="https://linkedin.com/in/pnistalrio" target="_blank" rel="noopener"
        class="border border-border text-white rounded-full px-8 py-4 text-base font-medium hover:border-primary transition-all hover:scale-105">
        LinkedIn
      </a>
      <a href="https://github.com/niskeletor" target="_blank" rel="noopener"
        class="border border-border text-white rounded-full px-8 py-4 text-base font-medium hover:border-primary transition-all hover:scale-105">
        GitHub
      </a>
    </div>

    <p class="text-sm text-muted-foreground">
      {isEN ? 'Based in A Coruña, Galicia, Spain 🇪🇸' : 'Basado en A Coruña, Galicia, España 🇪🇸'}
    </p>
  </div>
</section>
```

**Step 4: Add all 3 sections to index.astro, verify build, commit**

```bash
git commit -m "feat: add Certifications, Blog preview and Contact sections"
```

---

## Task 13: Blog index + post pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

**Step 1: Write `src/pages/blog/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = await getCollection('blog', e => e.id.startsWith('en/') && !e.data.draft);
const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---
<BaseLayout title="Blog — Pablo Nistal" lang="en">
  <div class="min-h-screen pt-24 pb-16 px-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">Blog <span class="gradient-text">& Notes</span></h1>
      <p class="text-muted-foreground mb-12">
        SRE in practice, platform engineering, GitOps, and honest ops war stories.
      </p>
      {sorted.length === 0 ? (
        <div class="card p-12 text-center">
          <p class="text-4xl mb-4">✍️</p>
          <p class="text-xl text-white mb-2">Posts coming soon</p>
          <p class="text-muted-foreground">Writing in progress — check back soon.</p>
        </div>
      ) : (
        <div class="space-y-6">
          {sorted.map(post => (
            <a href={`/blog/${post.id.split('/').slice(1).join('/')}`}
              class="card p-6 block hover:border-primary/50 transition-all group">
              <p class="text-xs text-muted-foreground mb-2">
                {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <h2 class="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                {post.data.title}
              </h2>
              <p class="text-muted-foreground">{post.data.description}</p>
              <div class="flex flex-wrap gap-2 mt-3">
                {post.data.tags.map((tag: string) => (
                  <span class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
</BaseLayout>
```

**Step 2: Write `src/pages/blog/[...slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', e => !e.data.draft);
  return posts.map(post => {
    const [, ...slug] = post.id.split('/');
    return { params: { slug: slug.join('/') }, props: post };
  });
}

const post = Astro.props;
const { Content } = await render(post);
---
<BaseLayout title={`${post.data.title} — Pablo Nistal`} description={post.data.description} lang="en">
  <article class="min-h-screen pt-24 pb-16 px-6">
    <div class="max-w-3xl mx-auto">
      <a href="/blog" class="text-sm text-muted-foreground hover:text-white transition-colors mb-8 block">← Back to blog</a>
      <p class="text-sm text-muted-foreground mb-2">
        {post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <h1 class="text-4xl font-bold text-white mb-4">{post.data.title}</h1>
      <p class="text-muted-foreground text-lg mb-8">{post.data.description}</p>
      <div class="flex flex-wrap gap-2 mb-10">
        {post.data.tags.map((tag: string) => (
          <span class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>
        ))}
      </div>
      <div class="prose prose-invert prose-primary max-w-none">
        <Content />
      </div>
    </div>
  </article>
</BaseLayout>
```

**Step 3: Verify build, commit**

```bash
npm run build
git commit -m "feat: add blog index and post pages with MDX rendering"
```

---

## Task 14: Spanish version (`/es/`)

**Files:**
- Create: `src/pages/es/index.astro`
- Create: `src/pages/es/blog/index.astro`

**Step 1: Write `src/pages/es/index.astro`** — same as `/index.astro` but `lang="es"` on all components

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/sections/Hero.astro';
import About from '../../components/sections/About.astro';
import Stack from '../../components/sections/Stack.astro';
import Experience from '../../components/sections/Experience.astro';
import Platform from '../../components/sections/Platform.astro';
import CaseStudies from '../../components/sections/CaseStudies.astro';
import Certifications from '../../components/sections/Certifications.astro';
import BlogPreview from '../../components/sections/BlogPreview.astro';
import Contact from '../../components/sections/Contact.astro';
---
<BaseLayout
  title="Pablo Alejandro Nistal — DevOps / SRE / Platform Engineer"
  description="Arquitecto DevOps y SRE en A Coruña. Kubernetes, Ansible, GitOps, Observabilidad, Linux."
  lang="es"
>
  <Hero lang="es" />
  <About lang="es" />
  <Stack lang="es" />
  <Experience lang="es" />
  <Platform lang="es" />
  <CaseStudies lang="es" />
  <Certifications lang="es" />
  <BlogPreview lang="es" />
  <Contact lang="es" />
</BaseLayout>
```

**Step 2: Verify build, commit**

```bash
npm run build
git commit -m "feat: add Spanish version at /es/"
```

---

## Task 15: GitHub Actions + Cloudflare Pages CI/CD

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `wrangler.jsonc`

**Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=pablo-nistal-portfolio
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

**Step 2: Write `wrangler.jsonc`**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "pablo-nistal-portfolio",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2026-04-06"
}
```

**Step 3: Add secrets to GitHub repo**
Required secrets (add in GitHub repo → Settings → Secrets):
- `CLOUDFLARE_API_TOKEN` — from Cloudflare dashboard (Edit Cloudflare Workers permission)
- `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare dashboard URL

**Step 4: Push to GitHub and verify deploy**

```bash
git remote add origin https://github.com/niskeletor/portfolio.git
git push -u origin main
```

Check GitHub Actions tab for green build.

**Step 5: Commit**

```bash
git add .github/ wrangler.jsonc
git commit -m "ci: add GitHub Actions deploy to Cloudflare Pages"
```

---

## Task 16: Final polish — README + CI badge

**Files:**
- Create: `README.md`

**Step 1: Write `README.md`**

```markdown
# Pablo Alejandro Nistal — Portfolio

Personal portfolio site for Pablo Alejandro Nistal, DevOps Architect / SRE / Platform Engineer.

[![Deploy](https://github.com/niskeletor/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/niskeletor/portfolio/actions/workflows/deploy.yml)

## Stack

- **Framework:** Astro 5
- **Styles:** Tailwind CSS 4
- **Content:** MDX + Astro Content Collections
- **i18n:** EN (default) + ES
- **Deploy:** Cloudflare Pages via GitHub Actions

## Local dev

```bash
npm install
npm run dev
```

## Structure

- `/` — English (default)
- `/es/` — Spanish
- `/blog/` — Technical blog
- `/case-studies/` — Deep dives

## Adding content

Blog posts: `src/content/blog/en/<slug>.mdx`
Case studies: `src/content/case-studies/en/<slug>.mdx`
```

**Step 2: Final build verification**

```bash
npm run build
```

Expected: clean build, 0 errors, `dist/` ready.

**Step 3: Final commit**

```bash
git add README.md
git commit -m "docs: add README with CI badge and project structure"
```

---

## Summary

| Task | Component | Commit |
|------|-----------|--------|
| 1 | Astro 5 scaffold | ✅ |
| 2 | Tailwind dark theme | ✅ |
| 3 | i18n + Content Collections | ✅ |
| 4 | BaseLayout + Nav + Footer | ✅ |
| 5 | Photo + favicon | ✅ |
| 6 | Hero section | ✅ |
| 7 | About section | ✅ |
| 8 | Stack section | ✅ |
| 9 | Experience timeline | ✅ |
| 10 | Platform section | ✅ |
| 11 | Case Studies | ✅ |
| 12 | Certs + Blog preview + Contact | ✅ |
| 13 | Blog pages | ✅ |
| 14 | Spanish `/es/` | ✅ |
| 15 | GitHub Actions + Cloudflare deploy | ✅ |
| 16 | README + CI badge | ✅ |

**Result:** Full portfolio live at Cloudflare Pages, bilingual EN/ES, dark theme, all sections with honest content, ready to grow with real case studies and blog posts over time.
