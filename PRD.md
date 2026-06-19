# ULTRON: AI-Driven Crime Analytics Platform
**Product Requirements Document (PRD) & Zoho Catalyst Migration Guide**

**Client:** Karnataka State Police (SCRB) — Datathon 2026
**Target Platform:** Catalyst by Zoho

---

## 1. Product Overview

**ULTRON** is an AI-powered intelligence platform designed to bridge the gap between siloed crime data and proactive policing. Built specifically for the State Crime Records Bureau (SCRB), it transforms raw FIRs, criminal records, and cyber incident logs into actionable, predictive intelligence.

The platform is split into two specialized investigation tracks:
1. **Crime Track:** Physical crime analysis, spatiotemporal mapping, and socio-economic correlation.
2. **CyberCrime Track:** Digital forensics, network flow mapping, and phishing threat detection.

---

## 2. Core Capabilities (Official SCRB Pillars)

1. **Advanced Visualization:** High-fidelity interactive dashboards and map-based interfaces (Leaflet).
2. **Network & Link Analysis:** Criminal syndicates and cyber attack path mapping (Cytoscape).
3. **Sociological & Predictive Dashboards:** Correlating crime with literacy, poverty, and predicting future risk zones.
4. **Pattern & Trend Discovery:** Automated detection of Modus Operandi (MO) similarities across jurisdictions.
5. **Network & Behavioral Analysis:** Profiling suspect behavior and interaction frequencies.
6. **AI/ML-Driven Intelligence:** 5 specialized machine learning models powering automated insights.

---

## 3. Architecture Overview (Zoho Catalyst Ecosystem)

To meet the Datathon 2026 submission requirements, the entire stack will be hosted natively on Catalyst by Zoho.

| Component | Current Stack | Target Catalyst Service | Implementation Strategy |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 19 + Vite + TypeScript | **Catalyst Slate** | Auto-deploy from GitHub. Slate natively supports Vite/React, provides free SSL, custom domains, and deployment previews. |
| **Backend API** | FastAPI (Python) | **Catalyst Functions (Advanced I/O)** | Python SDK. Advanced I/O functions replace FastAPI routes. Handles REST CRUD, auth validation, and business logic. |
| **Heavy Compute**| Celery / Complex ML | **Catalyst AppSail** | Deploy Custom Runtime (Docker OCI) or Managed Runtime (Flask) for heavy Python workloads (TF-IDF, ARIMA). |
| **Database** | PostgreSQL + PostGIS | **Catalyst Data Store** | Relational tables queried via ZCQL. Geo-calculations (PostGIS) migrated to Python application layer (`shapely`). |
| **Authentication**| Custom JWT | **Catalyst Authentication** | Embedded Auth using Catalyst Web SDK in React. Token lifecycle managed by Catalyst. User roles: Admin, Analyst, Viewer. |
| **Machine Learning**| scikit-learn | **Zia AutoML / QuickML** | Tabular models (Random Forest, Logistic Regression) moved to Zia AutoML. Complex models (ARIMA) hosted in AppSail. |
| **Web Scraping** | Celery Beat workers | **Cron + SmartBrowz** | Catalyst Cron schedules Functions. SmartBrowz handles headless browser automation for OSINT collection. |
| **File Storage** | Floci S3 | **Catalyst Stratus** | Object storage for crime scene photos, FIR PDFs, and evidence files. |
| **API Routing** | Nginx | **Catalyst API Gateway** | Routes `/api/*` to Functions, handles CORS, and manages rate limiting. |

---

## 4. Key Features & Interface

### 4.1 Frontend Architecture (Single Page Application)
- **KSP Header:** Official branding, CM & Deputy CM photos, deep dark blue (`#0a0e1a`) with gold accents.
- **Section Navigation:** 5 items with `anime.js` sliding underline transitions.
- **Radial Navigation:** 4-ring SVG radial menu (Gold, Teal, Purple, Red segments) inspired by `centre.jpeg`.
- **Intel Graph:** React Flow node editor (Flowsint-style) with 7 node types (IP, Name, Place, Object, How, Why, What).

### 4.2 Strategic Intelligence Hub (Command Center)
- **Socio-Economic Correlation:** Heatmaps comparing crime vs. literacy/poverty indexes.
- **Predictive Risk Heatmap:** Tomorrow's high-risk zones overlaid on Karnataka map.
- **Emerging Trends:** Fastest-rising crime types per district.
- **Red-Zone Alerts:** Pulsing district borders when anomaly thresholds are breached.

### 4.3 Map & Graph Enhancements
- **Leaflet Map:** Spatiotemporal toggles (All-time, Weekly, Monthly), socio-economic overlays, cluster expansion.
- **Cytoscape Graph:** MO match highlighting (thick edges for high similarity), timeline slider, recency heat-glow.
- **Cyber Flow:** Attack path highlighting (shortest path IP to victim), threat level coloring.

---

## 5. Machine Learning Models

1. **Risk Score Generator:** Random Forest (Zia AutoML). Predicts criminal recidivism risk (1-100).
2. **Anomaly Detection:** Isolation Forest (Zia AutoML). Flags unusual spikes in district crime rates.
3. **Phishing Detection:** Logistic Regression (Zia AutoML). Classifies domains as malicious or benign based on WHOIS/entropy features.
4. **Predictive Zones:** ARIMA / Prophet (AppSail). Time-series forecasting for tomorrow's hotspot locations.
5. **MO Matcher:** TF-IDF + Cosine Similarity (AppSail). NLP text comparison of FIR descriptions to link unsolved cases.

---

## 6. Database Schema (Catalyst Data Store / ZCQL)

*Note: All tables to be created in Catalyst Data Store.*

1. **Crimes:** `FIR_No`, `District`, `Crime_Head`, `Date`, `Time`, `Lat`, `Lng`, `Status`, `MO_Description`
2. **Criminals:** `Criminal_ID`, `Name`, `Alias`, `DOB`, `Gender`, `Address`, `District`, `Risk_Score`
3. **CyberIncidents:** `Case_No`, `Incident_Type`, `Date`, `Source_IP`, `Target_Domain`, `Victim`, `Status`, `Geo_City`
4. **Districts:** `Name`, `Population`, `Literacy_Rate`, `Poverty_Index`, `Police_Stations`
5. **Users:** Managed natively by Catalyst Authentication, custom metadata stored in a linked `UserProfiles` table.

---

## 7. Migration & Execution Plan

### Phase 1: Frontend Deployment (Immediate)
- Push `Frontend(OC.1)` to GitHub.
- Connect GitHub repo to **Catalyst Slate**.
- Verify automated Vite build, preview URL generation, and SSL provisioning.

### Phase 2: Database & Auth Setup
- Create tables in **Catalyst Data Store**.
- Enable **Catalyst Authentication** (Embedded).
- Integrate Catalyst Web SDK into React frontend for login flow.

### Phase 3: Backend Rewrite (The Heavy Lift)
- Rewrite FastAPI endpoints into **Catalyst Functions (Advanced I/O)**.
- Implement Python SDK for ZCQL queries against Data Store.
- Implement `shapely` for distance/cluster calculations to replace PostGIS.
- Setup **API Gateway** to route frontend requests.

### Phase 4: ML & Automation
- Train baseline models in **Zia AutoML** using CSV datasets.
- Package TF-IDF/ARIMA models into a Docker container and deploy to **AppSail**.
- Configure **Cron + SmartBrowz** for scheduled data ingestion.

### Phase 5: Testing & Submission Prep
- End-to-end integration testing via API Gateway.
- Record Demo Video covering both Crime and Cyber tracks.
- Finalize Prototype Brief document.
- Submit via Hack2skill portal.

---

## 8. Datathon Submission Checklist
- [x] Public GitHub Repository created.
- [x] Frontend prototype built (React 19 / Vite).
- [ ] Deployed on Catalyst (Slate + Functions + Data Store).
- [ ] Prototype Brief finalized.
- [ ] Demo Video recorded.
- [ ] Submission Template completed.
