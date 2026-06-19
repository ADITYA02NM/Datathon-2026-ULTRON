# 📋 Change Log — ULTRON

> Track all changes made to the project — who, what, when, and why.
> Append new entries at the top.

---

## How to Use

```markdown
## YYYY-MM-DD HH:MM
**Author:** Your Name
**Files changed:**
- `path/to/file` — what changed
**Reason:** Why this change was needed
**Status:** Draft / In Review / Done
**Verified by:** Who checked it works
```

---

## 2026-06-16 23:20
**Author:** OpenCode (Build mode)
**Files changed:**
- `README.md` — Updated tech stack (React 19, anime.js, React Flow), architecture diagram with KSP Header → Radial Nav → Intel Graph, added ring nav to features
- `split.md` — Rewrote Day 1 Person 1 tasks: KSP Header, Section Nav (anime.js), 4-Ring Radial Navigation, Intel Graph (React Flow, 7 nodes), dummy CSV data
- `Promts/main.md` — Updated architecture + 3-day plan with new UI components
- `Promts/frontend.md` — Complete rewrite for v0.dev: single-page app, 4-ring SVG radial nav (gold/teal/purple/red), KSP branding bar, anime.js transitions, Flowsint Intel Graph with 7 node types (IP/Name/Place/Object/How/Why/What), dummy SCRB CSV data in /public/data/, all Zustand stores, animation specs
- `Promts/ppt.md` — Added Slide 8 (Interactive UI & Navigation), renumbered slides 9-11
**Reason:** Full frontend redesign — single dynamic page with radial navigation, Flowsint-style graph editor, KSP official branding. Ready for v0.dev generation.
**Status:** Done

---
**Author:** OpenCode (Build mode)
**Files changed:**
- `Promts/flow.md` — Created comprehensive flowchart doc: 14 diagrams covering system architecture, data flow, page layouts, DB schema, ML models, user journeys, auth flow, data pipeline, deployment, API lifecycle, and full frontend component tree
**Reason:** Visual learner needs — all graphs and flowcharts in a single reference file
**Status:** Done

---

## 2026-06-16 22:50
**Author:** OpenCode (Build mode)
**Files changed:**
- `split.md` — Added API contract for all new endpoints: spatiotemporal, red-zone, MO matching, socio-economic, Strategic Hub intelligence; updated rule 1; updated dashboard stats shape
**Reason:** Complete API contract for frontend dev reference — all enhanced crime features now documented
**Status:** Done

---

## 2026-06-16 23:15
**Author:** OpenCode (Build mode)
**Files changed:**
- `centre.jpeg` — Added radial navigation reference image (4-ring SVG design from original centre.jpeg)
- `flowsint.png` — Added Flowsint-style graph editor reference image
**Reason:** Push design reference images for frontend development
**Status:** Done

---

## 2026-06-19 12:00
**Author:** OpenCode (Build mode)
**Files changed:**
- `Frontend(OC.1)/*` — Created the entire frontend React application (Vite + React 19 + TypeScript).
- Includes all dependencies (Tailwind, Anime.js, Leaflet, Cytoscape, React Flow, Recharts, Zustand, Papaparse).
- Built all layout components (KSPHeader, RadialNav) and pages (Login, Dashboard, Maps, Network, Intelligence, Admin, IntelGraph).
- Built dummy data CSVs matching SCRB formats.
- `.gitignore` — updated to ignore opencode config.
**Reason:** Execute Day 1 Frontend build tasks as requested by the user.
**Status:** Done

---

## 2026-06-16 23:05
**Author:** OpenCode (Build mode)
**Files changed:**
- `PRD.md` — Created comprehensive Product Requirements Document mapping ULTRON to the Zoho Catalyst ecosystem, detailing architecture, ML models, features, schema, and step-by-step migration plan.
**Reason:** Document in-detail Catalyst migration plan and project architecture as requested by user.
**Status:** Done

---

## 2026-06-16 22:45
**Author:** OpenCode (Build mode)
**Files changed:**
- `README.md` — Replaced problem statement with 6 SCRB core capabilities; enhanced Crime features; renamed ML models; added SCRB to User Roles
- `split.md` — Updated Rule 1 to Log Before Push; updated Day 1 tasks with new crime features
- `Promts/main.md` — Added 6 core capabilities, enhanced crime features, updated ML models
- `Promts/frontend.md` — Added Strategic Intelligence Hub page; enhanced maps/graphs with red-zone, MO, socio-economic features
- `Promts/ppt.md` — Updated slides 2-3 with SCRB context and 6 capabilities
- `changes.md` — Added this entry + OpenCode build logs
**Reason:** Align with official KSP SCRB problem statement — 6 capabilities with enhanced crime features
**Status:** Done

---

## 2026-06-16 22:30
**Author:** OpenCode (Build mode)
**Files changed:**
- `Promts/main.md` — Created comprehensive project prompt covering Crime + CyberCrime tracks, 6 core capabilities, full tech stack, architecture, API, ML models, 3-day plan
- `Promts/frontend.md` — Created v0.dev prompt with references to Flowsint + WorldMonitor, 9 pages, dark theme, all components
- `Promts/ppt.md` — Created Gamma.ai prompt for 10-slide presentation
- `README.md` — Updated problem statement with 6 source capabilities + SCRB; enhanced Crime features (spatiotemporal, red-zone, MO tracking, Strategic Hub, socio-economic overlays); renamed ML models to match source terminology; added SCRB to User Roles
- `split.md` — Updated Day 1 tasks with new crime features; 7-day → 3-day plan
- `Promts/` — Created folder with 3 prompt files
**Reason:** Align project with official problem statement from Karnataka State Police source document
**Status:** Done
**Verified by:** OpenCode

---

## 2026-06-16 22:20
**Author:** OpenCode (Build mode)
**Files changed:**
- `README.md` — Split architecture into Crime + CyberCrime tracks; added cyber models, endpoints, ML models; updated project structure
**Reason:** User requested two major system sections — Crime (OSINT + tracking) and CyberCrime (IPs, networks, forensics)
**Status:** Done
**Verified by:** OpenCode

---

## 2026-06-16 22:00
**Author:** OpenCode (Build mode)
**Files changed:**
- `README.md` — Wrote comprehensive README (architecture, features, API, ML models, team plan)
- `commitlint.config.js` — Added commit linting
**Reason:** Initial project documentation for Datathon 2026
**Status:** Done
**Verified by:** OpenCode

---

## Template (Copy This)

```markdown
## YYYY-MM-DD HH:MM
**Author:** Your Name
**Files changed:**
- `path/to/file` — what changed
**Reason:** Why this change was needed
**Status:** Draft / In Review / Done
**Verified by:** Who checked it works
```
