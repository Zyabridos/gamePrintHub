# [Game Print Hub](https://gameprinthub.online/)

[![Backend Unit Tests](https://github.com/Zyabridos/gamePrintHub/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/Zyabridos/gamePrintHub/actions/workflows/backend-tests.yml)

[![Push docker image to Docker Hub](https://github.com/Zyabridos/gamePrintHub/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/Zyabridos/gamePrintHub/actions/workflows/deploy-prod.yml)

[![Deploy to Production Server](https://github.com/Zyabridos/gamePrintHub/actions/workflows/docker-push.yml/badge.svg)](https://github.com/Zyabridos/gamePrintHub/actions/workflows/docker-push.yml)

### Real-Time Knowledge Base & Content Intelligence Platform

Game Print Hub is a **personal full-stack engineering playground** created partly for fun and partly to help me grow as an engineer.  
It’s where I experiment with frontend, backend, infrastructure, DevOps, 3D printing workflows, and everything in between.

Although the platform is deployed and continuously evolving, **it is far from being a finished or polished product**.  
Many features are incomplete, some routes break, and parts of the system may change drastically from one week to another. This is intentional — Game Print Hub is a long-term learning project, not a commercial service.

Over time, as I refine both the codebase and the architecture, I hope the site will grow into a fully working, stable environment that reflects my progress as an engineer.

---

This is not a blog — it’s a structured place for my own notes, progress logs, painting diaries, STL experiments, and technical prototypes.  
I use it to track my learning, document mistakes, and measure improvement — especially in 3D printing and miniature painting, where my long-term target is to eventually build a large, detailed, historically accurate WWII diorama.

Game Print Hub combines everything I work with:  
Next.js, Fastify, PostgreSQL, Docker, CI/CD, Terraform, Ansible, testing, monitoring — all within one ecosystem.  
It’s essentially a _meta-project_ that evolves together with my skills.

You are free to use any pictures or STL files as long as proper credit is kept.  
All content is provided **as is**, with no guarantees of printability or correctness.

## Why This Project Exists

Game Print Hub exists because I needed a single place where all parts of my engineering journey could live together — code, infrastructure, experiments, mistakes, notes, and creative projects.  
It’s a personal laboratory built to help me grow: a space where I can test ideas, break things safely, document what I learn, and see long-term progress both as a developer and as a hobbyist.

From CI/CD pipelines to miniature painting techniques, everything here serves one purpose:  
to steadily build the skills and confidence I need to eventually create something much bigger — a large, detailed, historically accurate WWII diorama that has lived in my head for years.

This project is my way of learning by doing, having fun along the way, and keeping track of every improvement — technical or artistic.

## Features
*(Some are the features do not exist yet, but I have huge plans)*

### Content & Knowledge

- All content stored directly in PostgreSQL
- Markdown-based articles and painting logs
- Full-text search using PostgreSQL FTS
- Category, tag, and difficulty filtering
- Reading time, TOC, syntax highlighting

### Interactivity

- Real-time comments (WebSocket / SSE)
- Likes / helpful votes
- View analytics
- Related content suggestions

### Semantic Search

- Weighted relevance ranking
- Combined metadata + text search

### DevOps Dashboard

- Deployment history (GitHub Actions → Fastify → PostgreSQL)
- Build status + environment overview
- Runtime version visibility
- Optional uptime & metrics

### Admin Dashboard

- Authentication & RBAC
- Editor views (articles, tags, categories, users)

---

## Tech Stack

### Frontend

- Next.js 15 (App Router, SSR, CSR)
- React 18 (Client + Server Components)
- TypeScript
- Tailwind CSS
- Formik for CSR validation

### Backend

- Fastify (TypeScript)
- REST API + WebSockets/SSE
- Zod for schema validation
- File storage (images / STL metadata)
- Full-text search service

### Database

- PostgreSQL
- Knex query builder + migrations

### Infrastructure & DevOps

- Docker / Docker Compose
- Terraform (Hetzner Cloud)
  - VM provisioning
  - Private networking
  - Cloud firewall
  - DNS + HTTPS
- Ansible
  - Docker installation
  - Production deploy (frontend + backend)
  - Environment templating
- GitHub Actions
  - CI (lint, typecheck, unit tests, e2e tests)
  - CD with full automation
  - Docker build & push
  - Terraform apply
  - Ansible deploy
  - Health checks & Telegram notifications

### CI/CD (Automatic Deployment)

Every push to the `main` branch triggers a full production deployment:

1. Runs tests
2. Build & push Docker images
3. Terraform infrastructure update
4. Ansible deploy to production servers
5. Health checks for backend & frontend

This gives completely automated, reproducible, zero-touch deployments.
