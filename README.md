# FrostOps

[![Backend Unit Tests](https://github.com/Zyabridos/knowledgeOps/actions/workflows/backend-unit.yml/badge.svg)](https://github.com/Zyabridos/knowledgeOps/actions/workflows/backend-unit.yml)

### Real-Time Knowledge Base & Content Intelligence Platform

FrostOps is a **personal** fullstack playground designed to help me grow as an engineer, stay motivated, and continuously experiment with ideas across frontend, backend, DevOps and infrastructure. This is not a blog. It’s a space for my own notes, boardgames scenarios, STL files, small painting tips, and modeling reminders — everything that helps _me_ keep track of what I learn, test, and build on my way toward (hopefully...) creating my dream enormous WW2 diorama one day.

But FrostOps is also something more: it’s a sandbox that ties together all technologies I work with.
Here I can freely mix and match everything — Next.js, Fastify, databases, Sanity CMS, CI/CD pipelines, e2e, Docker, Terraform, Ansible, GitHub Actions, monitoring, testing — anything I want to practice. Other technologies and languages can live in separate repositories, but FrostOps is where I combine them all in one environment. It’s essentially a “meta-project” built out of everything I’ve created before — only now, all at once.

Board games are my training ground: real-life scale modeling and historical painting are much harder, and it’s easier to practise in an imagined universe first.  
Anyway, it’s far more fun to play with painted minis than with cardboard. So any painting and modeling, even imperfect, is always better than none.

You are free to use any picture or STL file as you wish, as long as proper credit is kept.  
However, **all downloaded content is used at your own risk** — I provide my files and notes “as is,” without guarantees of correctness, printability, or suitability for any specific purpose.

At the same time, I’m always open to collaboration. If anyone finds my pet projects, ideas, or experiments useful, I’m more than happy to share and contribute.

---

## Features

### Content & Knowledge

- Markdown-based content management via **Sanity CMS**
- Full-text search with PostgreSQL FTS (`tsvector`)
- Tag, category, and difficulty filters
- Reading time, TOC, syntax highlighting

### Interactivity

- Real-time comments (WebSockets or SSE)
- Likes / helpful votes
- View analytics
- Related posts suggestion engine

### Semantic Search

- PostgreSQL trigram similarity for typo-tolerant search
- Weighted ranking by content relevance
- Combined Sanity metadata + DB search

### DevOps Dashboard

- Deployment history (via GitHub Actions webhook → Fastify → PostgreSQL)
- Build status, environment overview
- Runtime version visibility (frontend / backend)
- Uptime + metrics (optional)

### Admin Dashboard

- Authentication and role-based access
- Admin/editor views for content insights

---

## Tech Stack

### Frontend

- Next.js 15
- React 18
- TypeScript
- TailwindCSS
- Sanity Client + GROQ
- SSR & SSG

### Backend (API)

- Fastify + TypeScript
- REST API + WebSockets/SSE
- Schema validation with Zod or AJV
- Full-text search service

### Database

- PostgreSQL
- Knex
- PostgreSQL FTS + GIN indexes
- Engagement analytics tables

### CMS

- Sanity **v3**
- Custom schemas (posts, tags, categories, difficulties)
- PortableText rendering

### QA / Testing

- Playwright
- End-to-end flows:
  - searching
  - viewing articles
  - adding comments
  - like/helpful rating
  - dashboard auth
  - DevOps dashboard

### DevOps & Infra

- **Docker / Docker Compose**
- **Terraform (AWS)**
  - EC2 (frontend + backend)
  - RDS PostgreSQL
  - VPC, subnets, routing
  - ALB + HTTPS (ACM)
  - IAM + OIDC for GitHub Actions
- **Ansible**
  - Docker installation
  - Deploy frontend + backend containers
  - Environment templating
- **GitHub Actions**
  - CI (lint + typecheck + Playwright)
  - CD (docker build & push → Ansible deploy)
  - Deployment logging webhook
