# ⚡ ULTRON — Unified Law Enforcement Threat Response & Optimization Nexus

**Datathon 2026** — *Nationwide Innovation Challenge by the Karnataka State Police*

> **AI-Driven.** Transforming fragmented crime and cybercrime data into actionable intelligence through 7 ML models — predicting risk, detecting hotspots, uncovering anomalies, and tracing cyber attacks — all unified in a single platform.

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [AI-Driven at Its Core](#-ai-driven-at-its-core)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
- [Dataset](#-dataset)
- [Project Structure](#-project-structure)
- [API Overview](#-api-overview)
- [ML Models](#-ml-models)
- [User Roles](#-user-roles)
- [Team](#-team)
- [Roadmap](#-roadmap)

---

## 🎯 Problem Statement

Current law enforcement systems rely on **siloed data and manual reporting**, limiting advanced analytics and proactive policing capabilities. Officers lack the tools to:

- **Crime Track** — Visualize crime patterns, detect hotspots, track repeat offenders, and monitor criminal networks using OSINT and records
- **CyberCrime Track** — Trace IP addresses, analyze website/domain trails, map network flows, and correlate digital evidence across cyber incidents
- Unify both tracks into a single command dashboard for holistic threat awareness

**ULTRON** solves this by providing **two specialized data pipelines** — one for traditional crime intelligence and one for cyber forensic analysis — unified under a single AI-powered platform with **7 ML models working continuously at its core**.

---

## 🤖 AI-Driven at Its Core

ULTRON is not just a dashboard — it's an **AI-native platform** where machine learning runs on every layer:

| ML Model | Algorithm | What It Does | Why It's AI |
|---|---|---|---|
| **🏆 Crime Hotspot Detection** | DBSCAN clustering | Automatically finds crime clusters on the map — no human draws those boundaries | Algorithm detects spatial patterns invisible to the naked eye |
| **⚠️ Criminal Risk Scoring** | Random Forest | Predicts re-offending risk (0-100) from age, priors, crime types, associates | Learns which factor combinations predict risk — not just a weighted sum |
| **🚨 Crime Anomaly Detection** | Isolation Forest | Spikes alerts when a district's crime count breaks its normal pattern | Adapts threshold per district — quiet areas trigger earlier than busy ones |
| **🔗 Criminal Link Prediction** | Jaccard Similarity + Rules | Finds hidden connections between criminals by shared attributes | Links that would take days of manual investigation appear in seconds |
| **🌐 IP Reputation Scoring** | Random Forest | Each IP gets a reputation score based on past incidents and WHOIS/DNS data | Same IP appearing in multiple cases auto-escalates |
| **🎣 Phishing Domain Detection** | ML Classifier + Heuristics | Catches zero-day phishing domains before any report | Flags domains by behavior patterns (age, registrar, SSL, DNS) |
| **📡 Network Flow Anomaly** | Isolation Forest + Stats | Distinguishes normal traffic from C2 beacons or data exfiltration | Learns normal traffic shape per network — flags deviations |

All models run on **Celery workers** in the background, update automatically on schedule, and can be **retrained with one click** when new data arrives. Results flow into the API and appear on the dashboard in real time.

---

## ✨ Features

### 🚔 Crime (OSINT + Tracking + Records)

Traditional crime intelligence powered by open-source data and structured records.

| Feature | What It Does |
|---|---|
| 🗺️ **Crime Heatmap** | Full-screen Leaflet map of Karnataka with DBSCAN-based hotspot overlays. Click any pin for crime details. |
| 📊 **Command Dashboard** | KPI cards (total crimes, active cases, alerts), live crime feed, 30-day trend chart, anomaly alerts. |
| 👥 **Criminal Directory** | Searchable table of known criminals with risk scores, repeat offender badges, and full history. |
| 🕸️ **Criminal Network Graph** | Interactive Cytoscape.js visualization showing links between criminals and crimes (shared locations, associates, MO). |
| 📈 **Crime Analysis Hub** | Four AI-powered panels: hotspots, trends, anomalies, and socio-economic correlations. |
| 🔍 **District Drilldown** | Click any district on the map for granular stats and crime breakdown by type. |
| 📰 **OSINT Scraping** | Scrape news websites for crime reports → auto-extract location, suspects, and case details. |
| 📂 **Bulk Upload** | Drag-and-drop CSV/JSON upload → stored in Floci S3 → auto-parsed into database. |

### 💻 CyberCrime (IPs + Websites + Network Flow + Forensics)

Advanced cybercrime investigation with digital trail tracking and network analysis.

| Feature | What It Does |
|---|---|
| 🌐 **IP Tracker** | Search and visualize IP addresses involved in cyber incidents — geolocation, ISP, reputation score, associated domains. |
| 🔗 **Domain Analyzer** | WHOIS lookup, SSL certificate analysis, DNS records, domain age/registrar — flag suspicious domains. |
| 🕸️ **Network Flow Visualizer** | Interactive Cytoscape.js graph showing connections between IPs, domains, servers, and victims — trace attack paths. |
| 🚨 **Phishing Case Manager** | Track phishing campaigns — source IPs, target domains, screenshot evidence, victim list, takedown status. |
| 📊 **Cyber Dashboard** | KPI cards (incidents today, active investigations, IPs blacklisted), live cyber feed, trend chart. |
| 📡 **Network Evidence** | Store and visualize PCAP metadata, NetFlow records, firewall logs — map attacker infrastructure. |
| 🧠 **Threat Intelligence** | Auto-correlate IPs/domains across cases — flag repeat offenders in cyber space. |
| 🔬 **Digital Forensics Tracker** | Chain-of-custody for digital evidence — device images, disk hashes, forensic reports per case. |

### 👑 Admin (Full Access)

Everything above plus user management, role assignment, and system configuration.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS 3 | Modern, fast UI framework |
| **Maps** | Leaflet + React-Leaflet + Leaflet.heat | Geospatial crime hotspot visualization |
| **Graphs** | Cytoscape.js | Criminal network & cyber attack path visualization |
| **Charts** | Recharts | Trend lines, district drilldown, cyber incident charts |
| **Backend** | Python FastAPI + Uvicorn | REST API with auto-generated OpenAPI docs |
| **ML/AI** | scikit-learn (Random Forest, DBSCAN, Isolation Forest) | Risk scoring, clustering, anomaly detection |
| **Cyber Intel** | Python `whois`, `dnspython`, `ipinfo`, `pyshark` | IP geolocation, DNS/WHOIS lookups, PCAP parsing |
| **OSINT** | BeautifulSoup4 + Playwright | Static & dynamic web scraping for crime news |
| **Task Queue** | Celery + Redis | Async web scraping, IP enrichment, model training |
| **Database** | PostgreSQL 16 + PostGIS 3.4 | Crime data with spatial query support |
| **File Storage** | Floci (Local AWS Emulator — S3-compatible) | Uploaded CSV/image/PCAP storage (no AWS account needed) |
| **Auth** | JWT (python-jose + passlib + bcrypt) | Role-based access control (Admin / Sudo / User) |
| **Infrastructure** | Docker Compose | Single-command local deployment |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Browser                              │
│            React + TypeScript + Tailwind + Leaflet                │
│         Crime Views  |  CyberCrime Views  |  Dashboard            │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP/JSON
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Nginx Reverse Proxy (:80)                       │
└──────────┬──────────────────────────────────┬───────────────────┘
           │                                  │
           ▼                                  ▼
┌──────────────────────────┐    ┌──────────────────────────────┐
│    FastAPI Backend       │    │    Vite Dev Server           │
│      port 8000           │    │      port 5173               │
│  ┌────────────────────┐  │    └──────────────────────────────┘
│  │  CRIME TRACK       │  │
│  │  ─────────────     │  │
│  │  • Crime CRUD      │  │
│  │  • Criminals       │  │
│  │  • OSINT Scrape    │  │
│  │  • Network Graph   │  │
│  │  • Hotspot ML      │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │  CYBERCRIME TRACK  │  │
│  │  ─────────────     │  │
│  │  • IP/Domain APIs  │  │
│  │  • Phishing Cases  │  │
│  │  • Network Flow    │  │
│  │  • Forensics       │  │
│  │  • Threat Intel    │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │  SHARED SERVICES   │  │
│  │  • JWT Auth        │  │
│  │  • S3 Service      │  │
│  │  • Celery Client   │  │
│  │  • ML Engine       │  │
│  └────────────────────┘  │
└──────────────────────────┘
           │
    ┌──────┼──────────────┬──────────────┐
    ▼      ▼              ▼              ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌──────────────┐
│PostGIS │ │ Floci  │ │ Redis  │ │  Celery       │
│ :5432  │ │ S3     │ │ :6379  │ │  Workers      │
│        │ │ :4566  │ │        │ │ (scrape + ML  │
└────────┘ └────────┘ └────────┘ │  + enrichment)│
                                 └──────────────┘
```

**Data Flow:**

```
┌───────────────────────┐    ┌───────────────────────────┐
│   CRIME PIPELINE      │    │   CYBERCRIME PIPELINE      │
│                       │    │                            │
│ File Upload / Scrape  │    │ Manual Entry / IP Lookup   │
│   ↓                   │    │   ↓                        │
│ Floci S3 → Parse      │    │ Floci S3 → Enrich          │
│   ↓                   │    │ (WHOIS, DNS, IPinfo)       │
│ PostgreSQL + PostGIS  │    │   ↓                        │
│   ↓                   │    │ PostgreSQL                 │
│ ML: DBSCAN, RF, IF   │    │   ↓                        │
│   ↓                   │    │ ML: Anomaly, Correlate     │
└───────┬───────────────┘    └───────────┬───────────────┘
        │                                │
        └────────────┬───────────────────┘
                     ▼
           FastAPI → JSON → React
         Unified Dashboard + Drill-down (AI-enriched everywhere)
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.20+)
- Git

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ADITYA02NM/Datathon-2026-ULTRON.git
cd Datathon-2026-ULTRON

# 2. Start everything (PostgreSQL, Redis, Floci, Backend, Frontend)
docker compose up -d

# 3. Access the platform
Frontend: http://localhost:5173
API Docs: http://localhost:8000/docs
```

### Default Login Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@ultron.ksp | admin123 |
| **Sudo** | sudo@ultron.ksp | sudo123 |
| **User** | user@ultron.ksp | user123 |

---

## 📊 Dataset

ULTRON uses a **dual-track dataset strategy**:

### Crime Track Data

| Tier | Source | Records | Used For |
|---|---|---|---|
| **Real (Aggregated)** | [data.opencity.in](https://data.opencity.in/dataset/karnataka-crime-data-2025) — Karnataka Police crime statistics | ~70 crime categories across 40 districts | Trend charts, district drilldown, correlation analysis |
| **Synthetic (Individual)** | Python-generated crime records with realistic lat/lng within Karnataka | 5,000+ records | Leaflet heatmap, DBSCAN clustering, anomaly detection |
| **Synthetic (Criminal Profiles)** | Python-generated criminals with cross-references to crimes | 500+ profiles + 2,000+ links | Network graph, risk scoring, repeat offender tracking |

### CyberCrime Track Data

| Tier | Source | Records | Used For |
|---|---|---|---|
| **Synthetic (Cyber Incidents)** | Python-generated phishing, hacking, fraud cases with realistic IPs, domains, and network trails | 500+ incidents | IP tracking, domain analysis, network flow visualization |
| **Synthetic (Network Flows)** | Python-generated NetFlow-style connection records between IPs | 2,000+ flows | Attack path reconstruction, traffic pattern analysis |
| **Enrichment** | live `ipinfo.io` / WHOIS lookups via Celery workers | On-demand | Real-time IP geolocation, domain reputation |

Synthetic data generators at `backend/scripts/seed_data.py` and `backend/scripts/seed_cyber.py`.

---

## 📁 Project Structure

```
ULTRON/
├── backend/
│   ├── app/
│   │   ├── main.py                   # FastAPI entry point
│   │   ├── config.py                 # Environment configuration
│   │   ├── database.py               # SQLAlchemy + PostGIS setup
│   │   │
│   │   ├── models/                   # Database models
│   │   │   ├── user.py
│   │   │   ├── crime.py              # Crime records (traditional)
│   │   │   ├── criminal.py           # Criminal profiles
│   │   │   ├── crime_link.py         # Criminal-crime associations
│   │   │   ├── ml_prediction.py
│   │   │   ├── cyber_incident.py     # Cybercrime case records
│   │   │   ├── cyber_ip.py           # IP intelligence data
│   │   │   ├── cyber_domain.py       # Domain intelligence data
│   │   │   ├── cyber_flow.py         # Network flow records
│   │   │   ├── cyber_evidence.py     # Digital forensics chain
│   │   │   └── scrape_source.py      # Web scraping sources
│   │   │
│   │   ├── schemas/                  # Pydantic request/response schemas
│   │   │   ├── auth_schemas.py
│   │   │   ├── crime_schemas.py
│   │   │   ├── criminal_schemas.py
│   │   │   ├── cyber_schemas.py      # Cybercrime Pydantic schemas
│   │   │   ├── analysis_schemas.py
│   │   │   └── dashboard_schemas.py
│   │   │
│   │   ├── routers/                  # API route handlers
│   │   │   ├── auth.py
│   │   │   ├── crimes.py             # /crime/* endpoints
│   │   │   ├── criminals.py
│   │   │   ├── analysis.py
│   │   │   ├── network.py            # Crime network graph
│   │   │   ├── cyber.py              # /cyber/* endpoints
│   │   │   ├── cyber_network.py      # Cyber network flow
│   │   │   ├── scrape.py
│   │   │   ├── ingestion.py
│   │   │   └── dashboard.py
│   │   │
│   │   ├── services/                 # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   ├── ml_service.py
│   │   │   ├── scrape_service.py
│   │   │   ├── s3_service.py
│   │   │   ├── network_service.py    # Crime network algo
│   │   │   ├── cyber_service.py      # Cybercrime business logic
│   │   │   ├── ip_enrich_service.py  # WHOIS/DNS/IPinfo lookups
│   │   │   └── forensics_service.py  # PCAP parsing, evidence chain
│   │   │
│   │   └── middleware/
│   │       └── auth_middleware.py
│   │
│   ├── workers/
│   │   ├── celery_app.py
│   │   └── tasks/
│   │       ├── scrape_task.py
│   │       ├── ml_train_task.py
│   │       ├── ip_enrich_task.py     # Async IP/Domain enrichment
│   │       └── pcap_parse_task.py    # Async PCAP processing
│   │
│   ├── scripts/
│   │   ├── seed_data.py              # Crime synthetic data generator
│   │   ├── seed_cyber.py             # CyberCrime synthetic data generator
│   │   └── load_opencity.py          # Import real opencity.in data
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/               # Sidebar, Header, ProtectedRoute
│   │   │   ├── dashboard/            # Overview, TrendChart, AlertPanel
│   │   │   ├── crime/                # Crime-specific components
│   │   │   │   ├── CrimeMap.tsx
│   │   │   │   ├── CrimeList.tsx
│   │   │   │   ├── CrimeDetail.tsx
│   │   │   │   ├── CriminalTable.tsx
│   │   │   │   └── CrimeNetworkGraph.tsx
│   │   │   ├── cyber/                # CyberCrime-specific components
│   │   │   │   ├── CyberDashboard.tsx
│   │   │   │   ├── IPTracker.tsx
│   │   │   │   ├── DomainAnalyzer.tsx
│   │   │   │   ├── NetworkFlowGraph.tsx
│   │   │   │   ├── PhishingCaseView.tsx
│   │   │   │   └── ForensicsTracker.tsx
│   │   │   ├── analysis/             # HotspotPanel, RiskScores, Correlations
│   │   │   └── data/                 # FileUpload, ScrapeConfig, ManualEntry
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── CrimePage.tsx
│   │   │   ├── CriminalsPage.tsx
│   │   │   ├── CyberPage.tsx
│   │   │   ├── NetworkPage.tsx
│   │   │   ├── AnalysisPage.tsx
│   │   │   ├── DataPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── api/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docker-compose.yml                # All services + Floci S3
├── nginx/
│   └── default.conf                  # Reverse proxy config
└── README.md
```

---

## 🔌 API Overview

### Auth

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **POST** | `/auth/login` | All | JWT login |
| **POST** | `/auth/register` | Admin | Create new user |

### Crime Track (`/crime/*`)

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **GET** | `/crime/list` | All | List crimes (filterable by district, type, date) |
| **GET** | `/crime/{id}` | All | Crime detail |
| **POST** | `/crime` | Admin/Sudo | Add crime (manual) |
| **POST** | `/crime/bulk` | Admin/Sudo | Bulk upload (CSV/JSON) |
| **PUT** | `/crime/{id}` | Admin/Sudo | Update crime |
| **DELETE** | `/crime/{id}` | Admin | Delete crime |
| **GET** | `/crime/hotspots` | All | DBSCAN cluster results |
| **GET** | `/crime/trends` | All | Time-series trends (crime) |

### Criminal Track (`/criminal/*`)

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **GET** | `/criminal` | All | List criminals |
| **GET** | `/criminal/{id}` | All | Criminal detail + network |
| **POST** | `/criminal` | Admin/Sudo | Add criminal |
| **GET** | `/criminal/risk/{id}` | All | Predictive risk score |
| **GET** | `/criminal/network` | All | Full criminal network graph |

### CyberCrime Track (`/cyber/*`)

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **GET** | `/cyber/incidents` | All | List cyber incidents |
| **GET** | `/cyber/incident/{id}` | All | Cyber incident detail |
| **POST** | `/cyber/incident` | Admin/Sudo | Add cyber incident |
| **PUT** | `/cyber/incident/{id}` | Admin/Sudo | Update cyber incident |
| **GET** | `/cyber/ip/{address}` | All | IP intelligence (geo, ISP, reputation, cases) |
| **GET** | `/cyber/domain/{domain}` | All | Domain intelligence (WHOIS, DNS, SSL) |
| **POST** | `/cyber/ip/enrich` | Sudo | Trigger async IP enrichment |
| **GET** | `/cyber/flows` | All | Network flow records |
| **GET** | `/cyber/flow/{id}` | All | Single flow detail |
| **GET** | `/cyber/network` | All | Cyber network graph (IP-domain links) |
| **GET** | `/cyber/evidence` | All | Digital evidence records |
| **POST** | `/cyber/evidence` | Admin/Sudo | Add evidence item |
| **GET** | `/cyber/threats` | All | Correlated threat intelligence |
| **GET** | `/cyber/stats` | All | Cyber dashboard stats |
| **GET** | `/cyber/trends` | All | Cyber incident trends |

### Shared

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **GET** | `/analysis/anomalies` | All | Anomaly detection results (both tracks) |
| **GET** | `/analysis/correlations` | All | Socio-economic + cyber correlation |
| **GET** | `/dashboard/stats` | All | Unified dashboard stats |
| **POST** | `/scrape/run` | Admin/Sudo | Trigger web scrape |
| **POST** | `/scrape/sources` | Admin/Sudo | Add scrape source |
| **GET** | `/scrape/sources` | All | List scrape sources |
| **POST** | `/ml/retrain` | Sudo | Retrain ML models |

Full interactive API documentation at `http://localhost:8000/docs` (Swagger UI).

---

## 🤖 ML Models

### Crime Track Models

| Model | Algorithm | Input | Output | Update Frequency |
|---|---|---|---|---|
| **Crime Hotspot Detection** | DBSCAN (spatial clustering) | lat/lng of recent crimes | Cluster polygons with density score | Every hour |
| **Criminal Risk Scoring** | Random Forest Classifier | Age, priors, crime types, associates | Risk score (0-100) + tier (Low/Medium/High/Extreme) | On each new case |
| **Crime Anomaly Detection** | Isolation Forest | Crime frequency by district/time | Anomaly score + severity flag | Daily |
| **Criminal Link Prediction** | Jaccard Similarity + Association Rules | Shared attributes between criminals | Link confidence score (0-1) | Hourly |

### CyberCrime Track Models

| Model | Algorithm | Input | Output | Update Frequency |
|---|---|---|---|---|
| **IP Reputation Scoring** | Random Forest + Historical data | IP geolocation, ASN, past incidents, WHOIS data | Reputation score (0-100) + threat tier | On each enrichment |
| **Phishing Domain Detection** | Feature-based heuristic + ML classifier | Domain age, registrar, SSL validity, DNS records, URL patterns | Phishing probability (0-1) + flags | Real-time on lookup |
| **Network Flow Anomaly** | Isolation Forest + Statistical | Flow duration, bytes, packets, ports, protocols | Anomaly score + traffic type classification | Continuous |
| **Attack Path Correlation** | Graph-based (BFS + Association) | Shared IPs, domains, certificates across incidents | Attack cluster ID + confidence | Daily |

---

## 👥 User Roles

| Role | Description | Capabilities |
|---|---|---|
| **Admin** | System administrator with full control | Manage users, all CRUD, data ingestion, ML retrain, system config, access both tracks |
| **Sudo** | Data manager / analyst | Upload data (crime + cyber), scrape sources, manual entry, enrich IPs, train models, view everything |
| **User** | Intelligence officer (view-only) | Crime dashboards, maps, network graphs, cyber dashboards, IP lookups, analysis reports |

---

## 👨‍💻 Team

| Member | Focus | Level |
|---|---|---|
| **You** | Backend (FastAPI, ML, DB, scraping, Docker), everything non-frontend | Medium |
| **Person 1** | Frontend — all React components, pages, maps, graphs, dashboards | Good |

### 3-Day Execution Plan (2-Person Team)

| Day | You (Backend + DB + ML + Infra) | Person 1 (Frontend) |
|---|---|---|
| **D1 — Design + Architecture + Frontend** | Design full architecture (diagrams), finalize project structure, set up Docker Compose skeleton, define API contract shapes, set up PostgreSQL + PostGIS schema (all tables), create seed scripts | Vite + React + Tailwind scaffold, ALL pages (Login, Dashboard, Crime, Cyber, Network, Analysis, Data, Admin), ALL components (crime list/detail/map, cyber IP/domain/flow, network graphs, analysis panels, data upload), routing, auth context, layout shell |
| **D2 — Backend + Verify + Deploy + Setup** | FastAPI scaffold + JWT auth, ALL CRUD APIs (crime, criminal, cyber incident, IP, domain), scraping engine + Celery, ALL ML models (RF risk, DBSCAN, Isolation Forest, IP reputation, phishing detect, flow anomaly), network graph APIs, dashboard stats, admin endpoints, S3 file upload, Docker Compose + Floci integration | Integrate frontend with live backend APIs, verify every page loads real data, fix TypeScript errors, ensure maps/graphs render with API data, build loading/error/empty states |
| **D3 — Test + Demo** | Full smoke test all endpoints (curl/httpx), run seed scripts + verify DB, fix backend bugs, Docker compose up —d test from clean state, README/split.md final updates | UI polish (consistent spacing/colors/fonts), responsive fixes (mobile + tablet), demo walkthrough recording, final bug fixes |

---

## 🛣️ Roadmap & Future Enhancements

- [ ] **Real-time WebSocket feed** — live crime + cyber incident updates push to dashboard
- [ ] **WhatsApp bot integration** — officers can query crime & IP data via chat
- [ ] **Mobile app** — React Native companion for field officers
- [ ] **Live PCAP ingestion** — real-time packet capture analysis pipeline
- [ ] **Threat Intelligence Feeds** — integrate MISP/OpenCTI for shared IOCs
- [ ] **LSTM time-series forecasting** — predict crime & cyber attack trends
- [ ] **GNN for network analysis** — Graph Neural Networks for criminal & attack path prediction
- [ ] **Multi-language support** — Kannada, Hindi, English UI
- [ ] **AWS/Cloud deployment** — Full cloud deployment guide for production
- [ ] **Integration with KSP legacy systems** — API connectors for existing databases

---

## 📄 License

This project is created for **Datathon 2026 — Karnataka State Police**. All rights reserved.

---

## 🙏 Acknowledgments

- [Karnataka State Police](https://ksp.karnataka.gov.in/) — for organizing Datathon 2026
- [data.opencity.in](https://data.opencity.in/) — for Karnataka crime statistics
- [Floci](https://github.com/floci-io/floci) — free local AWS emulator
- [Flowsint](https://github.com/reconurge/flowsint) — inspiration for network graph visualization
- [WorldMonitor](https://github.com/koala73/worldmonitor) — inspiration for real-time monitoring dashboard
