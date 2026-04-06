# Portfolio Design — Pablo Alejandro Nistal

**Date:** 2026-04-06  
**Status:** Approved  
**Tech:** Astro 5 + Tailwind CSS + Cloudflare Pages

---

## Context

Personal portfolio for Pablo Alejandro Nistal — DevOps Architect / SRE / Platform Engineer based in A Coruña, Spain. Goals:

1. **Primary:** Better employment — Senior DevOps/SRE/Platform Engineer roles, international remote, max salary
2. **Secondary:** Technical visibility, personal brand, community presence

**Key constraint:** Honest representation only. Every claim must be defensible in an interview. No fabricated metrics, no enterprise-scale achievements that didn't happen. The homelab is real and powerful as-is.

---

## Identity

| Field | Value |
|-------|-------|
| Name | Pablo Alejandro Nistal |
| Email | nistalin@gmail.com |
| GitHub | github.com/niskeletor |
| LinkedIn | linkedin.com/in/pnistalrio |
| Location | A Coruña, Galicia, Spain |
| Availability | Open to remote EMEA |
| Languages | Spanish (native), English (professional) |

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Astro 5 | Zero JS by default, Content Collections, MDX, PageSpeed 100 |
| Styles | Tailwind CSS 4 | Proven in reference template |
| i18n | Astro native (`/en/` + `/es/`) | No extra deps, Content Collections per lang |
| Blog | MDX + Content Collections | Typed, SEO-ready, supports Article structured data |
| Icons | Lucide + Devicons | Official tech icons |
| Deploy | Cloudflare Pages | Global CDN, free tier, familiar stack |
| CI/CD | GitHub Actions + `cloudflare/wrangler-action@v3` | Public, visible, CI badge on README |
| Repo | github.com/niskeletor/portfolio | Recruiter-discoverable |

---

## Design Language

- **Theme:** Dark (background ~#0f0f0f)
- **Accent:** Indigo → Violet gradient (#6366f1 → #8b5cf6)
- **Font:** Inter (body) + monospace accents for code/tech terms
- **Style:** Professional, clean — NOT terminal/hacker aesthetic. Readable by both technical recruiters and CTOs.
- **Performance target:** PageSpeed 100 / Core Web Vitals green (Astro default)

---

## Site Structure

```
/ (EN — default)
├── #hero           — Name, title, photo, metrics, keyword cluster, CTAs
├── #about          — Bio, SRE mindset, open to remote
├── #stack          — Skills by domain with context (not % bars)
├── #experience     — Impact-oriented timeline
├── #platform       — Personal Platform / Production-like Lab (Landsraad)
├── #case-studies   — 3-4 deep dives preview → own URLs
├── #certifications — Certs with context
├── #blog           — Last 3 posts → /blog
└── #contact        — Email, LinkedIn, GitHub, timezone, CTA

/case-studies/[slug]    — Individual case study (MDX, own URL for SEO)
/blog                   — All posts
/blog/[slug]            — Post (MDX + Article structured data schema)
/es/                    — Full Spanish version (same structure)
```

### Language Strategy
- **EN as default** (`/`) — maximizes international pool, Boolean recruiting
- **ES as `/es/`** — Spanish market, accessible via header toggle
- Content Collections organized by lang: `blog/en/`, `blog/es/`, etc.

---

## Section Designs

### Hero
**Goal:** Answer in 5–8 seconds: who, what impact, what stack.

```
[Photo]  Pablo Alejandro Nistal
         DevOps / SRE / Platform Engineer

         Linux (RHEL) · K3s/Kubernetes · GitLab CI/CD · Ansible
         AWS · Cloudflare · Observability · GitOps · SLOs

         [6+ yrs]  [50+ services]  [3-node cluster]  [Remote EMEA]

         [View Projects]  [Contact]  [GitHub]  [LinkedIn]
```

### Stack Map
Organized by domain — context over percentages:

| Domain | Tools | Context |
|--------|-------|---------|
| Infrastructure | Proxmox, K3s/Kubernetes, Docker | Personal platform daily ops |
| Observability | VictoriaMetrics, Zabbix, Grafana | Production + homelab |
| Automation | Ansible, Bash, Python | Work (Allenta) + homelab |
| CI/CD | GitLab CI/CD, GitHub Actions, ArgoCD | Work + GitOps homelab |
| Cloud | AWS, Azure (AZ-900), Cloudflare | Work + personal |
| OS | RHEL, Debian/Ubuntu, Linux | Daily driver |

### Experience Timeline
Format: `Role @ Company (dates)` + 1-2 bullet points with impact language.
- Allenta: Arquitecto DevOps (2026–present)
- Ozona Tech: DevOps SRE (2024–2026)
- Altia: DevOps Engineer (2024)
- TABIGAL: Sysadmin / Dev (2021–2024)
- INCOGA NORTE: Sysadmin (2020–2021)

### Personal Platform (Landsraad)
**Framing:** "Production-like Lab" — operated, monitored, version-controlled. NOT a hobby list.

5 blocks:
1. **Architecture** — Diagram: 3 Proxmox nodes, K3s cluster, networking, storage, services topology. Golden path for new service deployment.
2. **Delivery metrics (DORA)** — Real data from GitOps repo: deployment frequency, lead time commit→deploy. Honest numbers from git history.
3. **Reliability (SLOs)** — Define 1-2 SLIs for critical services (Jellyfin uptime, API response). Show error budget concept.
4. **Observability** — Real VictoriaMetrics/Grafana dashboard screenshots (sanitized — no internal IPs/domains).
5. **Toil reduction** — What was manual → what got automated → time saved. Specific examples (Ansible playbooks, GitOps reconciliation).

GitOps repo link: github.com/niskeletor (public repo).

**Security:** No internal IPs, no domain names, no credentials visible in screenshots.

### Case Studies (3-4 entries, own URL each)
Format per case:
- **Context:** What was the situation
- **Constraints:** What couldn't change (time, budget, compatibility)
- **Solution:** What was built/automated
- **Results:** Measured outcome (deployment time, manual work reduced, services migrated)

Initial candidates:
1. `gitops-k3s-migration` — Moving services to K3s with ArgoCD GitOps
2. `observability-stack` — VictoriaMetrics + Zabbix + Grafana setup
3. `ansible-automation` — Infrastructure automation at Allenta/homelab
4. `parody-critics-api` — Python API + Jellyfin plugin development

### Certifications
- Microsoft Certified: Azure Fundamentals (AZ-900) — March 2024
- Linux Essentials — Cisco, May 2023
- PCEP — Python Programmer, December 2023
- In progress: Computer Science @ UOC (2024–2027)

### Blog — 3 Editorial Pillars
**Pilar 1 — SRE Practical:**
- "How I defined SLOs for my homelab services (and what I learned)"
- "From noisy alerts to actionable alerts: SLO burn rate in VictoriaMetrics"
- "Blameless postmortem: the time my K3s cluster went dark"

**Pilar 2 — Platform Engineering in small:**
- "My golden path for deploying a new service: template → pipeline → GitOps → monitoring"
- "Treating my homelab as a product: backlog, versioning, self-service"

**Pilar 3 — Realistic Cloud Ops:**
- "GitOps and drift detection: how ArgoCD keeps my cluster honest"
- "50 services, 3 nodes: what I run and why"

### Contact
- Email: nistalin@gmail.com
- LinkedIn: linkedin.com/in/pnistalrio
- GitHub: github.com/niskeletor
- Timezone: CET/CEST (UTC+1/+2)
- "Open to remote EMEA opportunities"
- Clear CTA button: "Get in touch"

---

## Content Strategy

**Principle:** Build the structure first, fill with real content over time.

- Case studies and blog posts are populated incrementally via daily/weekly sessions
- Each session: Paul shares what he did/solved at work or in homelab → SAL-9000 transforms into draft post or case study update
- No fabrication — every metric comes from real systems (git history, Grafana, deployment logs)

---

## SEO Strategy

**Keyword cluster (in hero + headings):**
```
DevOps Engineer · Site Reliability Engineer (SRE) · Platform Engineer
Linux (RHEL) · Kubernetes/K3s · GitLab CI/CD · Ansible · AWS · Cloudflare
Observability · VictoriaMetrics · GitOps · SLOs · Incident Response
```

- Individual URLs per case study for intent-specific Google indexing
- Article structured data (JSON-LD) on all blog posts
- Author page with E-E-A-T signals
- Core Web Vitals green (Astro static output)
- `robots.txt` for crawling; `noindex` on any demo/internal pages if needed

---

## Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install && npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=pablo-nistal-portfolio
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

CI badge visible in README.

---

## File Structure

```
src/
├── pages/
│   ├── index.astro              # EN (default)
│   ├── blog/index.astro
│   ├── blog/[slug].astro
│   ├── case-studies/[slug].astro
│   └── es/index.astro           # ES version
├── content/
│   ├── blog/
│   │   ├── en/                  # English posts (.mdx)
│   │   └── es/                  # Spanish posts (.mdx)
│   ├── case-studies/
│   │   ├── en/
│   │   └── es/
│   └── config.ts                # Zod schemas
├── components/
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Stack.astro
│   │   ├── Experience.astro
│   │   ├── Platform.astro
│   │   ├── CaseStudies.astro
│   │   ├── Certifications.astro
│   │   ├── Blog.astro
│   │   └── Contact.astro
│   └── ui/
│       ├── Button.astro
│       ├── Card.astro
│       ├── Badge.astro
│       └── LanguageToggle.astro
├── layouts/
│   └── BaseLayout.astro         # Head, nav, footer, i18n context
├── i18n/
│   ├── en.json
│   └── es.json
└── styles/
    └── global.css               # Tailwind + gradient utilities
```

---

## What This Portfolio Is NOT

- Not a fabrication of enterprise-scale impact
- Not % skill bars (arbitrary and unverifiable)
- Not a "services list" disguised as homelab
- Not a generic developer portfolio with DevOps sprinkled in

## What This Portfolio IS

- Honest evidence of 6+ years of real infrastructure work
- A production-like platform that demonstrates SRE practices at personal scale
- A content machine that grows with daily work experience
- A technical signal that positions Pablo for Platform Engineer / Senior SRE roles

---

*Design approved by Pablo Alejandro Nistal — 2026-04-06*  
*Documented by SAL-9000 — "I'm completely operational and all my circuits are functioning perfectly!"*
