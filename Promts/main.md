# ULTRON — Full Project Prompt

## Project Overview

**ULTRON (Unified Law Enforcement Threat Response & Optimization Nexus)** is an AI-powered crime analytics platform built for Datathon 2026, a nationwide innovation challenge by the Karnataka State Police, India.

The platform transforms fragmented crime and cybercrime data into actionable intelligence through AI-powered analytics, geospatial mapping, criminal network visualization, and cyber forensics tracking.

## Two Major Tracks

### 1. 🚔 Crime Track (OSINT + Tracking + Records)
Traditional crime intelligence powered by open-source data and structured records:
- Crime heatmaps with DBSCAN-based hotspot overlays on Leaflet map of Karnataka
- Command dashboard with KPI cards, live feed, 30-day trend charts, anomaly alerts
- Criminal directory with risk scores, repeat offender badges, full history
- Interactive Cytoscape.js criminal network graph (shared locations, associates, MO)
- AI-powered Analysis Hub: hotspots, trends, anomalies, socio-economic correlations
- District drilldown with granular stats and crime breakdown by type
- OSINT web scraping of news websites for crime reports
- Bulk CSV/JSON upload via drag-and-drop → Floci S3 → auto-parsed into DB

### 2. 💻 CyberCrime Track (IPs + Websites + Network Flow + Forensics)
Advanced cybercrime investigation with digital trail tracking:
- IP Tracker — geolocation, ISP, reputation score, associated domains
- Domain Analyzer — WHOIS lookup, SSL certificate, DNS records, domain age
- Network Flow Visualizer — interactive Cytoscape.js graph of IP↔domain↔victim connections
- Phishing Case Manager — campaign tracking, source IPs, target domains, takedown status
- Cyber Dashboard — KPI cards, live cyber feed, trend charts
- Network Evidence — PCAP metadata, NetFlow records, firewall log visualization
- Threat Intelligence — auto-correlate IPs/domains across cases
- Digital Forensics Tracker — chain-of-custody for digital evidence

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS 4 |
| Maps | Leaflet + React-Leaflet + Leaflet.heat |
| Graphs | Cytoscape.js |
| Charts | Recharts |
| Backend | Python FastAPI + Uvicorn |
| ML/AI | scikit-learn (Random Forest, DBSCAN, Isolation Forest) |
| Cyber Intel | Python `whois`, `dnspython`, `ipinfo`, `pyshark` |
| OSINT | BeautifulSoup4 + Playwright |
| Task Queue | Celery + Redis |
| Database | PostgreSQL 16 + PostGIS 3.4 |
| File Storage | Floci (Local AWS Emulator — S3-compatible, no AWS account needed) |
| Auth | JWT (python-jose + passlib + bcrypt) — Role-based (Admin / Sudo / User) |
| Infrastructure | Docker Compose (single-command deploy) |

## Architecture

```
User Browser (React + TypeScript + Tailwind)
  └── Nginx Reverse Proxy (:80)
        ├── FastAPI Backend (:8000)
        │   ├── Crime Track (Crime CRUD, Criminals, OSINT Scrape, Network Graph, Hotspot ML)
        │   ├── CyberCrime Track (IP/Domain APIs, Phishing Cases, Network Flow, Forensics, Threat Intel)
        │   └── Shared Services (JWT Auth, S3 Service, Celery Client, ML Engine)
        └── Vite Dev Server (:5173)

Backend connects to:
  ├── PostgreSQL 16 + PostGIS 3.4 (:5432)
  ├── Floci S3 (:4566)
  ├── Redis (:6379)
  └── Celery Workers (scrape + ML + enrichment)
```

## Data Flow

**Crime Pipeline:** File Upload / Web Scrape → Floci S3 → Parse → PostgreSQL + PostGIS → ML (DBSCAN, RF, IF) → FastAPI → React

**CyberCrime Pipeline:** Manual Entry / IP Lookup → Floci S3 → Enrich (WHOIS, DNS, IPinfo) → PostgreSQL → ML (Anomaly, Correlate) → FastAPI → React

## API Endpoints

### Auth
- `POST /auth/login` — JWT login (All)
- `POST /auth/register` — Create user (Admin)

### Crime Track
- `GET /crime/list` — List crimes with filters (district, type, date range)
- `GET /crime/{id}` — Crime detail
- `POST /crime` — Add crime (Admin/Sudo)
- `POST /crime/bulk` — Bulk CSV/JSON upload
- `PUT /crime/{id}` — Update crime
- `DELETE /crime/{id}` — Delete crime (Admin)
- `GET /crime/hotspots` — DBSCAN cluster results
- `GET /crime/trends` — Time-series trends

### Criminal Track
- `GET /criminal` — List criminals with search
- `GET /criminal/{id}` — Criminal detail + network
- `POST /criminal` — Add criminal (Admin/Sudo)
- `GET /criminal/risk/{id}` — Predictive risk score
- `GET /criminal/network` — Full criminal network graph

### CyberCrime Track
- `GET /cyber/incidents` — List cyber incidents
- `GET /cyber/incident/{id}` — Incident detail
- `POST /cyber/incident` — Add incident (Admin/Sudo)
- `PUT /cyber/incident/{id}` — Update incident
- `GET /cyber/ip/{address}` — IP intelligence (geo, ISP, reputation, cases)
- `GET /cyber/domain/{domain}` — Domain intelligence (WHOIS, DNS, SSL)
- `POST /cyber/ip/enrich` — Trigger async IP enrichment (Sudo)
- `GET /cyber/flows` — Network flow records
- `GET /cyber/flow/{id}` — Single flow detail
- `GET /cyber/network` — Cyber network graph
- `GET /cyber/evidence` — Digital evidence records
- `POST /cyber/evidence` — Add evidence (Admin/Sudo)
- `GET /cyber/threats` — Correlated threat intelligence
- `GET /cyber/stats` — Cyber dashboard stats
- `GET /cyber/trends` — Cyber incident trends

### Shared
- `GET /analysis/anomalies` — Anomaly detection (both tracks)
- `GET /analysis/correlations` — Socio-economic + cyber correlation
- `GET /dashboard/stats` — Unified dashboard stats
- `POST /scrape/run` — Trigger web scrape (Admin/Sudo)
- `POST /scrape/sources` — Add scrape source
- `GET /scrape/sources` — List scrape sources
- `POST /ml/retrain` — Retrain ML models (Sudo)

## ML Models

### Crime
- **Hotspot Detection:** DBSCAN (spatial clustering) — lat/lng input → cluster polygons with density
- **Risk Scoring:** Random Forest — age, priors, crime types, associates → risk score 0-100 + tier
- **Anomaly Detection:** Isolation Forest — crime frequency by district/time → anomaly score + severity
- **Link Prediction:** Jaccard Similarity + Association Rules — shared attributes → link confidence 0-1

### CyberCrime
- **IP Reputation:** Random Forest — geolocation, ASN, past incidents, WHOIS → reputation score 0-100
- **Phishing Detection:** Heuristic + ML classifier — domain age, registrar, SSL, DNS, URL → probability 0-1
- **Flow Anomaly:** Isolation Forest + Statistical — duration, bytes, packets, ports → anomaly score
- **Attack Path Correlation:** Graph BFS + Association — shared IPs/domains/certs → attack cluster ID

## User Roles

| Role | Capabilities |
|---|---|
| **Admin** | Full control — manage users, all CRUD, data ingestion, ML retrain, system config, both tracks |
| **Sudo** | Data manager — upload data, scrape sources, manual entry, enrich IPs, train models, view everything |
| **User** | Intelligence officer (view-only) — dashboards, maps, graphs, IP lookups, analysis reports |

## Dataset

### Crime Track
- Real aggregated data from data.opencity.in — Karnataka crime statistics (~70 categories, 40 districts)
- Synthetic individual crime records with realistic lat/lng (5,000+ records)
- Synthetic criminal profiles with cross-references (500+ profiles, 2,000+ links)

### CyberCrime Track
- Synthetic cyber incidents — phishing, hacking, fraud with realistic IPs, domains, trails (500+)
- Synthetic NetFlow-style records (2,000+ flows)
- On-demand enrichment via ipinfo.io / WHOIS lookups

## Project Structure

```
ULTRON/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry
│   │   ├── config.py            # Config
│   │   ├── database.py          # SQLAlchemy + PostGIS
│   │   ├── models/              # DB models (user, crime, criminal, crime_link, cyber_*, scrape_source, ml_prediction)
│   │   ├── schemas/             # Pydantic schemas (auth, crime, criminal, cyber, analysis, dashboard)
│   │   ├── routers/             # API routes (auth, crimes, criminals, analysis, network, cyber, cyber_network, scrape, ingestion, dashboard)
│   │   ├── services/            # Business logic (auth, ml, scrape, s3, network, cyber, ip_enrich, forensics)
│   │   └── middleware/          # Auth middleware
│   ├── workers/                 # Celery + tasks (scrape, ml_train, ip_enrich, pcap_parse)
│   ├── scripts/                 # seed_data.py, seed_cyber.py, load_opencity.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Sidebar, Header, ProtectedRoute
│   │   │   ├── dashboard/       # Overview, TrendChart, AlertPanel
│   │   │   ├── crime/           # CrimeMap, CrimeList, CrimeDetail, CriminalTable, CrimeNetworkGraph
│   │   │   ├── cyber/           # CyberDashboard, IPTracker, DomainAnalyzer, NetworkFlowGraph, PhishingCaseView, ForensicsTracker
│   │   │   ├── analysis/        # HotspotPanel, RiskScores, Correlations
│   │   │   └── data/            # FileUpload, ScrapeConfig, ManualEntry
│   │   ├── pages/               # Login, Dashboard, Crime, Criminals, Cyber, Network, Analysis, Data, Admin
│   │   ├── hooks/               # Custom hooks
│   │   ├── context/             # AuthContext
│   │   ├── api/                 # API client
│   │   ├── types/               # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
├── nginx/default.conf
├── .gitignore
├── secret.md
├── split.md
├── Promts/
│   ├── main.md
│   ├── frontend.md
│   └── ppt.md
└── README.md
```

## 3-Day Execution Plan

### Day 1 — Design + Architecture + Frontend
- **You:** Architecture design, all DB models, Docker skeleton, seed scripts, API contract shapes
- **Person 1 (Frontend):** ALL frontend pages + components built with mock data — login, dashboard, crime list/detail/map, criminal table, cyber IP/domain/flow, network graph, analysis panels, data upload, admin page

### Day 2 — Backend + Verify + Deploy + Setup
- **You:** FastAPI scaffold, JWT auth, all CRUD APIs, scraping engine + Celery, all ML models, network graph APIs, dashboard stats, Docker Compose + Floci
- **Person 1 (Frontend):** Connect frontend to live backend APIs, verify every page, fix errors

### Day 3 — Test + Demo
- **You:** Full smoke test all endpoints, fresh Docker deploy, README updates
- **Person 1 (Frontend):** UI polish, responsive fixes, demo walkthrough recording

## Team
- **You:** Backend + DB + ML + Infra (Medium)
- **Person 1:** Frontend — all React/Tailwind/Leaflet/Cytoscape/Recharts (Good)
