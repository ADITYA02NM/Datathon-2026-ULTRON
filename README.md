# ⚡ ULTRON — Unified Law Enforcement Threat Response & Optimization Nexus

**Datathon 2026** — *Nationwide Innovation Challenge by the Karnataka State Police*

> Transforming fragmented crime records into actionable intelligence through AI-powered analytics, geospatial mapping, and criminal network visualization.

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
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

- Visualize crime patterns across districts in real time
- Detect emerging crime hotspots before they escalate
- Identify repeat offenders and criminal networks
- Correlate socio-economic factors with crime trends
- Receive AI-powered risk assessments and anomaly alerts

**ULTRON** solves this by unifying data ingestion, ML-powered analysis, and interactive visualization into a single platform.

---

## ✨ Features

### For the Intelligence Officer (View-Only User)

| Feature | What It Does |
|---|---|
| 🗺️ **Crime Heatmap** | Full-screen Leaflet map of Karnataka with DBSCAN-based hotspot overlays. Click any pin for crime details. |
| 📊 **Command Dashboard** | KPI cards (total crimes, active cases, alerts), live crime feed, 30-day trend chart, anomaly alerts. |
| 👥 **Criminal Directory** | Searchable table of known criminals with risk scores, repeat offender badges, and full history. |
| 🕸️ **Network Graph** | Interactive Cytoscape.js visualization showing links between criminals and crimes. Zoom, pan, click to explore. |
| 📈 **Analysis Hub** | Four AI-powered panels: hotspots, trends, anomalies, and socio-economic correlations. |
| 🔍 **District Drilldown** | Click any district on the map for granular stats and crime breakdown by type. |

### For the Data Manager (Sudo Role)

| Feature | What It Does |
|---|---|
| 📂 **File Upload** | Drag-and-drop CSV/JSON upload → stored in Floci S3 → auto-parsed into database |
| 🌐 **Web Scraping** | Add news URLs with schedule → Celery scrapes in background → extracts crime data |
| ✍️ **Manual Entry** | Fill crime/criminal details directly via form |
| 🧠 **Model Retrain** | One-click retrain of all ML models on latest data |

### For the Admin (Full Access)

Everything above plus user management, role assignment, and system configuration.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS 3 | Modern, fast UI framework |
| **Maps** | Leaflet + React-Leaflet + Leaflet.heat | Geospatial crime hotspot visualization |
| **Graphs** | Cytoscape.js | Criminal network & link analysis |
| **Charts** | Recharts | Trend lines, district drilldown charts |
| **Backend** | Python FastAPI + Uvicorn | REST API with auto-generated OpenAPI docs |
| **ML/AI** | scikit-learn (Random Forest, DBSCAN, Isolation Forest) | Risk scoring, clustering, anomaly detection |
| **Task Queue** | Celery + Redis | Async web scraping & model training |
| **Web Scraping** | BeautifulSoup4 + Playwright | Static & dynamic page data extraction |
| **Database** | PostgreSQL 16 + PostGIS 3.4 | Crime data with spatial query support |
| **File Storage** | Floci (Local AWS Emulator — S3-compatible) | Uploaded CSV/image storage (no AWS account needed) |
| **Auth** | JWT (python-jose + passlib + bcrypt) | Role-based access control (Admin / Sudo / User) |
| **Infrastructure** | Docker Compose | Single-command local deployment |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│        React + TypeScript + Tailwind + Leaflet           │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/JSON
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Nginx Reverse Proxy (:80)                    │
└──────────┬──────────────────────────────────┬───────────┘
           │                                  │
           ▼                                  ▼
┌─────────────────────┐          ┌──────────────────────┐
│   FastAPI Backend   │          │   Vite Dev Server    │
│     port 8000       │          │     port 5173        │
│  ┌───────────────┐  │          └──────────────────────┘
│  │ JWT Auth      │  │
│  │ CRUD APIs     │  │
│  │ ML Service    │  │
│  │ S3 Service    │  │
│  │ Scrape API    │  │
│  └───────┬───────┘  │
└──────────┼──────────┘
           │
    ┌──────┼──────────────┐
    ▼      ▼              ▼
┌────────┐ ┌────────┐ ┌────────┐
│PostGIS │ │ Floci  │ │ Redis  │
│ :5432  │ │ S3     │ │ :6379  │
│        │ │ :4566  │ │        │
└────────┘ └────────┘ └────────┘
               │
               ▼
        ┌──────────────┐
        │  Celery       │
        │  Workers      │
        │ (scrape + ML) │
        └──────────────┘
```

**Data Flow:**

```
File Upload / Web Scrape / Manual Entry
         │
         ▼
    Floci S3 (storage) → Parse → Validate
         │
         ▼
    PostgreSQL + PostGIS
         │
         ▼
    ML Pipeline (Celery)
    → DBSCAN (hotspots)
    → Random Forest (risk scores)
    → Isolation Forest (anomalies)
         │
         ▼
    FastAPI → JSON → React Frontend
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

ULTRON uses a **3-tier dataset strategy**:

| Tier | Source | Records | Used For |
|---|---|---|---|
| **Real (Aggregated)** | [data.opencity.in](https://data.opencity.in/dataset/karnataka-crime-data-2025) — Karnataka Police crime statistics | ~70 crime categories across 40 districts | Trend charts, district drilldown, correlation analysis |
| **Synthetic (Individual)** | Python-generated crime records with realistic lat/lng within Karnataka | 5,000+ records | Leaflet heatmap, DBSCAN clustering, anomaly detection |
| **Synthetic (Criminal Profiles)** | Python-generated criminals with cross-references to crimes | 500+ profiles + 2,000+ links | Network graph, risk scoring, repeat offender tracking |

The synthetic data generator is at `backend/scripts/seed_data.py` and runs automatically on first startup.

---

## 📁 Project Structure

```
ULTRON/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── config.py            # Environment configuration
│   │   ├── database.py          # SQLAlchemy + PostGIS setup
│   │   ├── models/              # Database models
│   │   │   ├── user.py
│   │   │   ├── crime.py
│   │   │   ├── criminal.py
│   │   │   ├── crime_link.py
│   │   │   └── ml_prediction.py
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   ├── routers/             # API route handlers
│   │   │   ├── auth.py
│   │   │   ├── crimes.py
│   │   │   ├── criminals.py
│   │   │   ├── analysis.py
│   │   │   ├── network.py
│   │   │   ├── scrape.py
│   │   │   ├── ingestion.py
│   │   │   └── dashboard.py
│   │   ├── services/            # Business logic layer
│   │   │   ├── auth_service.py
│   │   │   ├── ml_service.py
│   │   │   ├── scrape_service.py
│   │   │   ├── s3_service.py
│   │   │   └── network_service.py
│   │   └── middleware/
│   │       └── auth_middleware.py
│   ├── workers/
│   │   ├── celery_app.py
│   │   └── tasks/
│   │       ├── scrape_task.py
│   │       └── ml_train_task.py
│   ├── scripts/
│   │   ├── seed_data.py         # Synthetic data generator
│   │   └── load_opencity.py     # Import real opencity.in data
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Sidebar, Header, ProtectedRoute
│   │   │   ├── dashboard/       # Overview, TrendChart, AlertPanel
│   │   │   ├── maps/            # CrimeMap, DistrictDrilldown
│   │   │   ├── network/         # NetworkGraph, CriminalNode
│   │   │   ├── analysis/        # HotspotPanel, RiskScores, Correlations
│   │   │   └── data/            # FileUpload, ScrapeConfig, ManualEntry
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── api/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml           # All services + Floci S3
├── nginx/
│   └── default.conf             # Reverse proxy config
└── README.md
```

---

## 🔌 API Overview

| Method | Endpoint | Role | Description |
|---|---|---|---|
| **POST** | `/auth/login` | All | JWT login |
| **POST** | `/auth/register` | Admin | Create new user |
| **GET** | `/crimes` | All | List crimes (filterable) |
| **GET** | `/crimes/{id}` | All | Crime detail |
| **POST** | `/crimes` | Admin/Sudo | Add crime (manual) |
| **POST** | `/crimes/bulk` | Admin/Sudo | Bulk upload (CSV/JSON) |
| **PUT** | `/crimes/{id}` | Admin/Sudo | Update crime |
| **DELETE** | `/crimes/{id}` | Admin | Delete crime |
| **GET** | `/criminals` | All | List criminals |
| **GET** | `/criminals/{id}` | All | Criminal detail + network |
| **POST** | `/criminals` | Admin/Sudo | Add criminal |
| **GET** | `/analysis/hotspots` | All | DBSCAN cluster results |
| **GET** | `/analysis/trends` | All | Time-series trends |
| **GET** | `/analysis/anomalies` | All | Anomaly detection results |
| **GET** | `/analysis/risk/{criminal_id}` | All | Predictive risk score |
| **GET** | `/analysis/correlations` | All | Socio-economic correlation |
| **GET** | `/network/graph` | All | Full criminal network graph |
| **GET** | `/network/criminal/{id}` | All | Subgraph for one criminal |
| **POST** | `/scrape/run` | Admin/Sudo | Trigger web scrape |
| **POST** | `/scrape/sources` | Admin/Sudo | Add scrape source |
| **GET** | `/scrape/sources` | All | List scrape sources |
| **GET** | `/dashboard/stats` | All | Aggregated dashboard stats |
| **POST** | `/ml/retrain` | Sudo | Retrain ML models |

Full interactive API documentation available at `http://localhost:8000/docs` (Swagger UI).

---

## 🤖 ML Models

| Model | Algorithm | Input | Output | Update Frequency |
|---|---|---|---|---|
| **Crime Hotspot Detection** | DBSCAN (spatial clustering) | lat/lng of recent crimes | Cluster polygons with density score | Every hour |
| **Criminal Risk Scoring** | Random Forest Classifier | Age, priors, crime types, associates | Risk score (0-100) + tier (Low/Medium/High/Extreme) | On each new case |
| **Anomaly Detection** | Isolation Forest | Crime frequency by district/time | Anomaly score + severity flag | Daily |
| **Link Prediction** | Jaccard Similarity + Association Rules | Shared attributes between criminals | Link confidence score (0-1) | Hourly |

---

## 👥 User Roles

| Role | Description | Capabilities |
|---|---|---|
| **Admin** | System administrator with full control | Manage users, all CRUD, data ingestion, ML retrain, system config |
| **Sudo** | Data manager / analyst | Upload data, scrape sources, manual entry, train models, view everything |
| **User** | Intelligence officer (view-only) | Dashboards, maps, network graphs, analysis, reports |

---

## 👨‍💻 Team

| Member | Focus | Level |
|---|---|---|
| **Person 1 (You)** | Backend API, ML models, system integration | Medium |
| **Person 2** | Database design, data ingestion, web scraping | Okokish |
| **Person 3** | Frontend (all UI components) | Good |

### 7-Day Execution Plan

| Day | Person 1 | Person 2 | Person 3 |
|---|---|---|---|
| **D1** | FastAPI scaffold, JWT auth, DB connection | PostgreSQL + PostGIS setup, schema, import real data | Vite + React scaffold, login/register, routing |
| **D2** | Crime + Criminal CRUD APIs, file upload (S3) | Criminal/link tables, run synthetic data generator | Crime/criminal list pages, detail modals, Leaflet map |
| **D3** | Scraping engine, scrape API, Celery tasks | Scrape config tables, geocoding service | File upload UI, scrape config page, manual entry form |
| **D4** | ML: RF risk, DBSCAN hotspot, Isolation Forest | ML features via SQL views, seed predictions | Hotspot heatmap, anomaly alerts, risk score badges |
| **D5** | Network/link analysis, trend API, correlations | Query optimization, aggregation views | Network graph, trend charts, district drilldown |
| **D6** | Dashboard stats, admin permissions, monitoring | Row-level security, data export, views | Dashboard, admin panel, loading states, error handling |
| **D7** | Docker Compose + Floci, smoke test, README | Migration scripts, verify demo data | UI polish, responsive fixes, demo walkthrough |

---

## 🛣️ Roadmap & Future Enhancements

- [ ] **Real-time WebSocket feed** — live crime updates push to dashboard
- [ ] **WhatsApp bot integration** — officers can query crime data via chat
- [ ] **Mobile app** — React Native companion for field officers
- [ ] **More ML models** — LSTM for time-series forecasting, GNN for network analysis
- [ ] **Video analytics** — CCTV feed analysis for suspect tracking
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
