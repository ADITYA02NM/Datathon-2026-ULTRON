# ULTRON — Work Split & Execution Plan

## 👥 Team Structure

| Role | Person | Responsibilities |
|---|---|---|
| **You** | Backend + DB + ML + Infra | FastAPI, PostgreSQL, ML models, scraping engine, Celery, Docker, seed data, everything non-UI |
| **Person 1** | Frontend | React + TypeScript + Vite + Tailwind, Leaflet maps, Cytoscape graphs, Recharts, all pages/components |

---

## 🚦 Critical Rules for OpenCode

### 1. Ask Before Push
> Never `git push` without confirming with the user first. Always stage + commit locally, then ask: *"Ready to push?"*

### 2. One Task at a Time
> Work through the execution plan in order (D1 → D2 → D3). Do NOT skip ahead or parallelize across days unless explicitly told.

### 3. Test Before Marking Done
> Every API endpoint, every ML model, every frontend page must be verified working before moving to the next day's tasks.

### 4. Document Breaking Changes
> If a task requires changing something from a previous day (schema change, API redesign, etc.), document it in a comment or commit message. Do not silently rewrite.

### 5. Seed Data First
> Before any frontend can be built, seed data must exist. Always run seed scripts after schema migrations.
### 6. Docker Smoke Test

> At the end of D3, the entire system must work with a single `docker compose up -d`. No manual setup steps.

### 7. Commit Often
> Commit after every meaningful unit of work (a working API, a working page, a fixed bug). Messages: `feat:`, `fix:`, `db:`, `ml:`, `frontend:`, `infra:`.

### 8. Never Delete Without Asking
> If you think a file, route, or component needs removal — ask first.

---

## 📋 3-Day Execution Plan

### Day 1 — Design + Architecture + Frontend

> **Goal:** Complete frontend built (all pages + components), architecture finalized, project skeleton ready.

#### You (Backend + DB + Architecture)
| Time | Task | Files |
|---|---|---|
| 2h | Design full architecture diagrams, finalize project structure, Docker Compose skeleton + Nginx config | `docker-compose.yml`, `nginx/default.conf`, `backend/Dockerfile`, `frontend/Dockerfile` |
| 1h | PostgreSQL + PostGIS schema — ALL tables (user, crime, criminal, crime_link, cyber_incident, cyber_ip, cyber_domain, cyber_flow, cyber_evidence, scrape_source, ml_prediction) | `models/*.py`, `database.py` |
| 1h | Config + requirements + seed scripts | `config.py`, `requirements.txt`, `scripts/seed_data.py`, `scripts/seed_cyber.py` |
| 1h | API contract shapes finalized — all response schemas | `schemas/*.py` |

**Definition of Done:** Architecture design complete, all DB models defined, Docker skeleton ready, seed scripts prepared.

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1.5h | Vite + React + Tailwind scaffold, routing (TanStack Router or react-router), auth context, layout shell (sidebar, header, protected route) | `App.tsx`, `pages/*`, `components/layout/*`, `context/auth.tsx` |
| 1.5h | Login/Register page, Dashboard page (KPI cards, trend chart, alert panel) | `pages/LoginPage.tsx`, `pages/DashboardPage.tsx`, `components/dashboard/*` |
| 1h | Crime list + detail + criminal table + Leaflet map with pins | `components/crime/*` |
| 1h | Cyber incident list + detail + IP Tracker + Domain Analyzer | `components/cyber/*` |
| 1h | Network flow graph (Cytoscape.js), Analysis panels (hotspots, anomalies), Data upload (file, scrape, manual) | `components/analysis/*`, `components/data/*`, NetworkFlowGraph |
| 0.5h | Admin page (user table), loading/error states, responsive layout | `pages/AdminPage.tsx`, global hooks |

**Definition of Done:** All frontend pages render with mock data, routing works, auth flow works, maps/graphs render.

---

### Day 2 — Backend + Verify + Deploy + Setup

> **Goal:** All backend APIs built, frontend connected to live backend, Docker deployment working.

#### You (Backend + DB + ML)
| Time | Task | Files |
|---|---|---|
| 1h | FastAPI scaffold + config + DB connection + User model + JWT auth (login/register/me/middleware) | `main.py`, `config.py`, `database.py`, `models/user.py`, `routers/auth.py`, `services/auth_service.py`, `middleware/auth_middleware.py` |
| 1h | Crime + Criminal CRUD APIs, bulk upload (S3), manual entry API | `routers/crimes.py`, `routers/criminals.py`, `routers/ingestion.py`, `services/s3_service.py` |
| 1h | Cyber endpoints (incidents, IP lookup, domain lookup, flows, evidence), IP enrichment service | `routers/cyber.py`, `services/cyber_service.py`, `services/ip_enrich_service.py` |
| 1h | Scrape engine + Celery setup + scrape sources | `workers/celery_app.py`, `tasks/scrape_task.py`, `models/scrape_source.py`, `routers/scrape.py` |
| 1h | ML service — ALL models (RF risk, DBSCAN hotspot, Isolation Forest anomaly, IP reputation, phishing detection, flow anomaly) + Celery train task | `services/ml_service.py`, `tasks/ml_train_task.py`, `routers/analysis.py` |
| 1h | Network graph APIs (crime + cyber), Dashboard stats API, admin endpoints, forensics API | `routers/network.py`, `routers/cyber_network.py`, `routers/dashboard.py`, `services/network_service.py`, `services/forensics_service.py` |
| 1h | Run seed scripts, Docker Compose + Floci integration, smoke test all endpoints | Seed all data, verify `docker compose up -d` |

**Definition of Done:** `POST /auth/login` works, all CRUD APIs return data, ML models return predictions, `docker compose up -d` launches everything.

#### Person 1 (Frontend — Integration)
| Time | Task | Files |
|---|---|---|
| 3h | Connect all frontend pages to live backend APIs — swap mock data for real API calls, verify every page renders real data | All page + component files |
| 2h | Fix TypeScript errors, ensure Leaflet map pins load from API, Cytoscape graph renders real network data, Recharts show real trends, upload forms submit to real endpoints | All component files |
| 1h | Loading states + error boundaries + empty states across all pages | Global components, hooks |

**Definition of Done:** Frontend displays real DB data for all features, no console errors, all interactions work.

---

### Day 3 — Test + Demo

> **Goal:** Everything stable, polished, and demo-ready.

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 2h | Full smoke test — curl/httpx every endpoint, test edge cases (empty lists, missing IDs, bad params, auth failures), fix bugs | All backend files |
| 1h | Fresh `docker compose down -v` → `docker compose up -d` → verify everything works from scratch | Docker, seed scripts |
| 1h | Final README/split.md updates, verify `.gitignore` and `secret.md` | `README.md`, `split.md`, `.gitignore`, `secret.md` |

**Definition of Done:** Backend zero errors, fresh deploy works end-to-end.

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 2h | UI polish — consistent spacing/colors/fonts, responsive fixes (mobile + tablet), dark mode check | Global CSS, Tailwind config |
| 1h | Demo walkthrough — record screen flow (Loom/QuickTime), verify all features in demo order | — |
| 1h | Final bug fixes from integration testing | Component-level fixes |

**Definition of Done:** Frontend visually polished, responsive, demo recorded, zero console errors.

---

## 📂 File Ownership Map

```
ULTRON/
├── backend/
│   ├── app/
│   │   ├── main.py              ← YOU
│   │   ├── config.py            ← YOU
│   │   ├── database.py          ← YOU
│   │   ├── models/              ← YOU (all)
│   │   ├── schemas/             ← YOU (all)
│   │   ├── routers/             ← YOU (all)
│   │   ├── services/            ← YOU (all)
│   │   └── middleware/          ← YOU
│   ├── workers/                 ← YOU (all)
│   ├── scripts/                 ← YOU (all)
│   ├── requirements.txt         ← YOU
│   └── Dockerfile               ← YOU
├── frontend/
│   ├── src/
│   │   ├── components/          ← PERSON 1
│   │   │   ├── layout/          ← PERSON 1
│   │   │   ├── dashboard/       ← PERSON 1
│   │   │   ├── crime/           ← PERSON 1
│   │   │   ├── cyber/           ← PERSON 1
│   │   │   ├── analysis/        ← PERSON 1
│   │   │   └── data/            ← PERSON 1
│   │   ├── pages/               ← PERSON 1
│   │   ├── hooks/               ← PERSON 1
│   │   ├── context/             ← PERSON 1
│   │   ├── api/                 ← PERSON 1
│   │   ├── types/               ← PERSON 1
│   │   └── App.tsx              ← PERSON 1
│   ├── package.json             ← PERSON 1
│   ├── vite.config.ts           ← PERSON 1
│   ├── tailwind.config.js       ← PERSON 1
│   └── Dockerfile               ← PERSON 1
├── docker-compose.yml           ← YOU
├── nginx/
│   └── default.conf             ← YOU
├── split.md                     ← YOU
└── README.md                    ← YOU
```

---

## 🔗 API Contract (You → Person 1)

Person 1 builds frontend components that consume these APIs. Agree on shapes early.

### Crime Track
| Method | Endpoint | Response Shape |
|---|---|---|
| GET | `/crime/list?district=&type=&from=&to=` | `{ crimes: [{id, type, date, location, lat, lng, district, status, description}] }` |
| GET | `/crime/{id}` | `{ id, type, date, location, lat, lng, district, status, description, criminals: [...], evidence: [...] }` |
| GET | `/criminal?search=&page=` | `{ criminals: [{id, name, age, risk_score, risk_tier, priors_count, photo_url}] }` |
| GET | `/criminal/{id}` | `{ id, name, age, risk_score, risk_tier, priors, crimes: [...], links: [...] }` |

### Cyber Track
| Method | Endpoint | Response Shape |
|---|---|---|
| GET | `/cyber/incidents?type=&status=` | `{ incidents: [{id, type, title, status, date, source_ip, target_domain}] }` |
| GET | `/cyber/incident/{id}` | `{ id, type, title, description, status, ips: [...], domains: [...], evidence: [...], flows: [...] }` |
| GET | `/cyber/ip/{address}` | `{ ip, country, city, isp, asn, reputation_score, linked_incidents: [...], whois, first_seen }` |
| GET | `/cyber/domain/{domain}` | `{ domain, registrar, creation_date, expiry, ssl_valid, dns_records: [...], phishing_probability, flags: [...] }` |

### Analysis
| Method | Endpoint | Response Shape |
|---|---|---|
| GET | `/crime/hotspots` | `{ clusters: [{id, center_lat, center_lng, radius, density, crimes_count, top_types: [...]}] }` |
| GET | `/criminal/risk/{id}` | `{ risk_score, risk_tier, contributing_factors: [...] }` |
| GET | `/analysis/anomalies` | `{ anomalies: [{district, type, expected_count, actual_count, severity, timestamp}] }` |
| GET | `/cyber/flow/{id}` | `{ flow: {src_ip, dst_ip, src_port, dst_port, protocol, bytes, duration, anomaly_score} }` |
| GET | `/cyber/network` | `{ nodes: [{id, label, type}], edges: [{source, target, label, weight}] }` |

### Dashboard
| Method | Endpoint | Response Shape |
|---|---|---|
| GET | `/dashboard/stats` | `{ total_crimes, active_cases, alerts_today, cyber_incidents_today, crimes_trend: [...], cyber_trend: [...], top_districts: [...] }` |

---

## 🧪 Verification Checklist

Before marking any day complete, verify:

- [ ] All new APIs return correct JSON (test with curl/httpx)
- [ ] No 500 errors on edge cases (empty list, missing ID, bad params)
- [ ] Seed data is in the DB and queryable
- [ ] Frontend compiles without TypeScript errors
- [ ] Frontend pages render without console errors
- [ ] Maps/graphs render with real data (not hardcoded)
- [ ] Auth works — correct role sees correct content
- [ ] New code doesn't break previously working features
