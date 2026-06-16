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
> Work through the execution plan in order (D1 → D2 → D3...). Do NOT skip ahead or parallelize across days unless explicitly told.

### 3. Test Before Marking Done
> Every API endpoint, every ML model, every frontend page must be verified working before moving to the next day's tasks.

### 4. Document Breaking Changes
> If a task requires changing something from a previous day (schema change, API redesign, etc.), document it in a comment or commit message. Do not silently rewrite.

### 5. Seed Data First
> Before any frontend can be built, seed data must exist. Always run seed scripts after schema migrations.

### 6. Docker Smoke Test
> At the end of D7, the entire system must work with a single `docker compose up -d`. No manual setup steps.

### 7. Commit Often
> Commit after every meaningful unit of work (a working API, a working page, a fixed bug). Messages: `feat:`, `fix:`, `db:`, `ml:`, `frontend:`, `infra:`.

### 8. Never Delete Without Asking
> If you think a file, route, or component needs removal — ask first.

---

## 📋 7-Day Execution Plan

### Day 1 — Scaffold & Foundation

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | FastAPI scaffold + config + DB connection | `backend/app/main.py`, `config.py`, `database.py` |
| 1h | User model + JWT auth (register/login/me) | `models/user.py`, `routers/auth.py`, `services/auth_service.py`, `middleware/auth_middleware.py` |
| 2h | Crime model + Criminal model + Link model | `models/crime.py`, `models/criminal.py`, `models/crime_link.py` |
| 1h | Crime + Criminal CRUD APIs | `routers/crimes.py`, `routers/criminals.py` |
| 1h | Seed script (crime data) + run it | `scripts/seed_data.py` |

**Definition of Done:** `POST /auth/login` returns JWT, `GET /crime/list` returns seeded crimes, `GET /criminal` returns seeded criminals.

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 2h | Vite + React + Tailwind scaffold, routing, layout | `frontend/src/App.tsx`, pages, layout components |
| 1h | Login/Register page | `pages/LoginPage.tsx`, auth context |
| 1h | App shell (sidebar, header, protected route) | `components/layout/` |

**Definition of Done:** User can log in, see sidebar, navigate to empty pages.

---

### Day 2 — Data Ingestion & Core Views

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | Cyber models (Incident, IP, Domain, Flow, Evidence) | `models/cyber_*.py` |
| 1h | S3 file upload service (Floci) | `services/s3_service.py`, `routers/ingestion.py` |
| 1h | Bulk upload + manual entry API | Extend `routers/ingestion.py` |
| 1h | Run cyber seed script | `scripts/seed_cyber.py` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 2h | Crime list/detail pages | `pages/CrimePage.tsx`, `components/crime/CrimeList.tsx`, `CrimeDetail.tsx` |
| 1h | Criminal table + search/filter | `components/crime/CriminalTable.tsx` |
| 1h | Leaflet map with crime pins | `components/crime/CrimeMap.tsx` |

**Definition of Done:** Crime list with filters, criminal table, map with pins.

---

### Day 3 — Scraping & Cyber Endpoints

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | Scrape source model + CRUD | `models/scrape_source.py`, `routers/scrape.py` |
| 1h | Celery + Redis setup, scrape task | `workers/celery_app.py`, `tasks/scrape_task.py` |
| 1.5h | Cyber endpoints (IP lookup, Domain lookup, Incidents) | `routers/cyber.py`, `services/cyber_service.py` |
| 0.5h | IP enrichment service (WHOIS/DNS mock) | `services/ip_enrich_service.py` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1h | File upload UI (drag-drop CSV/JSON) | `components/data/FileUpload.tsx` |
| 1h | Scrape config page | `components/data/ScrapeConfig.tsx` |
| 0.5h | Manual entry form | `components/data/ManualEntry.tsx` |
| 0.5h | Cyber incident list page | `components/cyber/CyberIncidentList.tsx` |

**Definition of Done:** Can upload a CSV → see it in DB. Can add a scrape source. Can view cyber incidents.

---

### Day 4 — ML Models (Crime)

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | ML service — Random Forest risk scoring | `services/ml_service.py` (risk_score method) |
| 1h | DBSCAN hotspot clustering | `services/ml_service.py` (hotspots method) |
| 1h | Isolation Forest anomaly detection | `services/ml_service.py` (anomalies method) |
| 1h | ML prediction model + Celery train task | `models/ml_prediction.py`, `tasks/ml_train_task.py` |
| 1h | Analysis API endpoints | `routers/analysis.py` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1h | Hotspot heatmap overlay on Leaflet | `components/analysis/HotspotPanel.tsx` |
| 1h | Anomaly alert panel | `components/analysis/AnomalyPanel.tsx` |
| 0.5h | Risk score badges on criminal cards | Update `CriminalTable.tsx` |
| 0.5h | IP Tracker UI | `components/cyber/IPTracker.tsx` |

**Definition of Done:** Map shows heatmap, criminals show risk badges, anomaly alerts appear, IP lookup works.

---

### Day 5 — ML (Cyber) & Network Graphs

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | IP reputation model (RF) | `services/ml_service.py` (ip_reputation method) |
| 1h | Phishing domain detection (heuristic + ML) | `services/ml_service.py` (phishing_score method) |
| 1h | Network flow anomaly (Isolation Forest) | `services/ml_service.py` (flow_anomaly method) |
| 1h | Network graph APIs (crime + cyber) | `routers/network.py`, `routers/cyber_network.py`, `services/network_service.py` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1.5h | Network flow graph (Cytoscape.js) | `components/cyber/NetworkFlowGraph.tsx` |
| 1h | Domain Analyzer UI | `components/cyber/DomainAnalyzer.tsx` |
| 0.5h | Phishing Case view | `components/cyber/PhishingCaseView.tsx` |
| 0.5h | Trend charts (Recharts) | `components/analysis/TrendChart.tsx` |

**Definition of Done:** Cytoscape graph shows IP↔domain↔victim links, domain analysis works, trends render.

---

### Day 6 — Dashboard & Admin

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1.5h | Dashboard stats API (unified KPI counts) | `routers/dashboard.py` |
| 1h | Admin endpoints (user management, config) | Extend `routers/auth.py` |
| 1h | Row-level security / query optimization | `middleware/rls.py`, DB views |
| 0.5h | Forensics evidence chain API | `routers/cyber_evidence.py`, `services/forensics_service.py` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1h | Unified dashboard — KPI cards, feed, alerts | `components/dashboard/` |
| 1h | Admin panel (user table, role editor) | `pages/AdminPage.tsx` |
| 1h | Forensics Tracker UI | `components/cyber/ForensicsTracker.tsx` |
| 0.5h | Loading states + error boundaries | Global hook/context |

**Definition of Done:** Dashboard loads with real numbers, admin can manage users, forensics chain visible.

---

### Day 7 — Polish, Docker, Demo

#### You (Backend + DB)
| Time | Task | Files |
|---|---|---|
| 1h | Migration scripts + squash | `backend/scripts/migrations/` |
| 1.5h | Docker Compose + Floci integration | `docker-compose.yml`, `backend/Dockerfile` |
| 1h | Smoke test all endpoints + seed fresh | Manual + seed scripts |
| 0.5h | Final README/split.md updates | `README.md`, `split.md` |

#### Person 1 (Frontend)
| Time | Task | Files |
|---|---|---|
| 1h | UI polish — consistent spacing, colors, fonts | Global CSS, Tailwind config |
| 1h | Responsive fixes (mobile + tablet) | Component-level tweaks |
| 1h | Demo walkthrough — record screen flow | — |

**Definition of Done:** `docker compose up -d` → everything works. Demo ready.

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
