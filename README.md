# 🚀 KnowledgeOps

### Real-Time Knowledge Base & Content Intelligence Platform

KnowledgeOps is a fullstack, DevOps-oriented platform designed for managing, searching, and analyzing technical knowledge in real time.  
It combines **Next.js (App Router)**, **Sanity CMS**, **Fastify**, **PostgreSQL**, **Docker**, **Terraform**, **Ansible**, and **GitHub Actions** to create a production-ready system demonstrating modern engineering practices end-to-end.

This project serves as a portfolio-level showcase of **fullstack development**, **infrastructure-as-code**, **automation**, and **reliable DevOps pipelines**.

---

## ⭐ Features

### 🔍 Content & Knowledge

- Markdown-based content management via **Sanity CMS**
- Full-text search with PostgreSQL FTS (`tsvector`)
- Tag, category, and difficulty filters
- Reading time, TOC, syntax highlighting

### 💬 Interactivity

- Real-time comments (WebSockets or SSE)
- Likes / helpful votes
- View analytics
- Related posts suggestion engine

### 🧠 Semantic Search

- PostgreSQL trigram similarity for typo-tolerant search
- Weighted ranking by content relevance
- Combined Sanity metadata + DB search

### 📊 DevOps Dashboard

- Deployment history (via GitHub Actions webhook → Fastify → PostgreSQL)
- Build status, environment overview
- Runtime version visibility (frontend / backend)
- Uptime + metrics (optional)

### 🔒 Admin Dashboard

- Authentication and role-based access
- Admin/editor views for content insights

---

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Sanity Client + GROQ**
- **SSR & SSG**

### Backend (API)

- **Fastify + TypeScript**
- REST API + WebSockets/SSE
- Schema validation with Zod or AJV
- Full-text search service

### Database

- **PostgreSQL**
- Knex/Prisma (your choice)
- PostgreSQL FTS + GIN indexes
- Engagement analytics tables

### CMS

- **Sanity v3**
- Custom schemas (posts, tags, categories, difficulties)
- PortableText rendering

### QA / Testing

- **Playwright**
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
