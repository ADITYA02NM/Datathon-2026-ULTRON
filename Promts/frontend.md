# ULTRON — Frontend Prompt for v0.app (v0.dev)

## Important: Reference Projects

Study these two projects carefully before generating code:

### Reference 1: Flowsint (Graph Investigation UI)
**GitHub:** https://github.com/reconurge/flowsint
**Local copy:** /home/ego/Documents/flowsint

Flowsint is an OSINT graph exploration tool. Key UI/UX patterns to replicate:
- **Dark theme** with professional blue/gray color palette
- **Flow/network graph** as central interaction paradigm (similar to @xyflow/react / React Flow)
- **Sidebar** with investigation selectors, tool panels, and node lists
- **Command palette** (cmdk-style) for quick actions
- **Bottom log panel** showing real-time activity
- **Clean, minimal card layouts** for data display
- **Loading states** with subtle animations
- Use Radix UI primitives for accessibility
- shadcn/ui component styling patterns
- **Status bar** at bottom showing system state
- **Resizable panels** for flexible layouts

### Reference 2: WorldMonitor (Real-time Dashboard)
**GitHub:** https://github.com/koala73/worldmonitor
**Context:** Build for INDIA / KARNATAKA region specifically

WorldMonitor is a real-time global intelligence dashboard. Key UI/UX patterns to replicate:
- **Full-screen map** as the primary visualization layer
- **KPI cards** at the top with live counters (total crimes, active cases, alerts today, cyber incidents)
- **Real-time feed** sidebar showing latest events
- **Trend charts** (Recharts) with time-series data
- **3D/globe visualization** aesthetic — modern, dark, glowing elements
- **Alert/anomaly panel** with severity badges
- **Drill-down capability** — click a region to see detailed stats
- **Responsive grid layouts** that work on different screen sizes

## Tech Stack for v0.dev

Generate React 19 + TypeScript + Vite + Tailwind CSS 4 code using:
- `lucide-react` for all icons
- `recharts` for charts (trend lines, bar charts, pie charts)
- `leaflet` + `react-leaflet` + `leaflet.heat` for maps
- `cytoscape` + `cytoscape-react` for network graphs
- `@radix-ui/*` for accessible UI primitives
- `framer-motion` for animations
- `zod` for validation
- `zustand` for state management
- `@tanstack/react-query` for data fetching
- `sonner` for toasts/notifications
- `tailwind-merge` + `clsx` + `class-variance-authority` for styling
- `react-hook-form` for forms
- Use shadcn/ui patterns for component architecture

## Pages to Generate

### 1. Login Page (`/login`)
- Clean centered card with ULTRON logo/branding
- Email + password fields
- "Remember me" checkbox
- Role indicator (shows Admin/Sudo/User after login)
- Animated gradient or dark background with subtle grid pattern
- Responsive — works on mobile

### 2. Dashboard Page (`/dashboard`)
**WorldMonitor-inspired layout:**
- Top row: 4-6 KPI cards with live counters (Total Crimes, Active Cases, Alerts Today, Cyber Incidents, Risk Score Avg, Hotspots Active)
- Left panel: real-time crime + cyber feed (scrollable list)
- Center: Leaflet map of Karnataka with crime pins and heatmap overlay
- Right panel: anomaly alerts with severity badges and anomaly charts
- Bottom: 30-day trend chart (Recharts line chart with dual axis for crime + cyber)
- All data fetched via API hooks

### 3. Crime Page (`/crime`)
- **Map view:** Full-screen Leaflet map of Karnataka with DBSCAN hotspot cluster overlays
  - Click any pin → popup with crime details (type, date, status, link to detail)
  - Hotspot polygons with density coloring (low=green, medium=yellow, high=red, extreme=purple)
  - District boundaries overlay
  - Filters panel: district dropdown, crime type, date range, status
- **List view:** Table with sortable columns (ID, Type, Date, District, Status, Actions)
  - Search bar, filter chips, pagination
  - Click row → slide-in detail panel or modal
- **Detail view:** Full crime record with map pin, criminal associations, evidence list, timeline

### 4. Criminals Page (`/criminal`)
- **Table view:** Searchable, filterable table of known criminals
  - Columns: Name, Age, Risk Score (with color badge), Priors Count, Last Crime, Actions
  - Risk score badge colors: Low=green, Medium=yellow, High=orange, Extreme=red
  - Repeat offender badge (star icon) for 3+ priors
- **Detail view:** Modal/slide-in with:
  - Personal info + photo placeholder
  - Risk score gauge/donut chart
  - Crime history timeline
  - Network graph (mini Cytoscape) showing criminal associates
  - Links to associated crimes

### 5. Cyber Page (`/cyber`)
**Flowsint-inspired layout with tabs:**
- **Tab 1 — Incidents:** Table of cyber incidents with type, status, date, source IP, target domain
  - Status badges: Open=yellow, Investigating=blue, Resolved=green, False Positive=gray
  - Click for detail modal with full evidence chain
- **Tab 2 — IP Tracker:** Search bar for IP address → displays:
  - IP geolocation map (Leaflet pin)
  - Info cards: ISP, ASN, Country, City, Reputation Score
  - Linked incidents table
  - WHOIS data
  - Timeline of when IP appeared in cases
- **Tab 3 — Domain Analyzer:** Search bar for domain → displays:
  - Domain info: Registrar, Creation Date, Expiry, SSL Status
  - DNS records table
  - Phishing probability gauge (0-100%)
  - Risk flags checklist
  - Associated IPs list
- **Tab 4 — Network Flow:** Full Cytoscape.js graph
  - Nodes: IPs (circles), Domains (rectangles), Victims (diamonds)
  - Edges: connections with arrow direction
  - Color code by threat level
  - Zoom, pan, click to highlight
  - Search/filter nodes

### 6. Network Page (`/network`)
- **Crime Network:** Cytoscape.js graph showing criminals and their connections
  - Nodes sized by risk score
  - Edges colored by link type (shared location, shared crime type, known associate)
  - Click node → highlight connected nodes, show details
  - Legend panel
- **Cyber Network:** Cytoscape.js graph showing IP↔domain↔victim connections
  - Attack path highlighting
  - Timeline slider to see how connections evolved

### 7. Analysis Page (`/analysis`)
Four-panel grid layout:
- **Hotspots panel:** Map with cluster results, cluster table with density scores, top crime types per cluster
- **Trends panel:** Time-series charts (crimes per day/week/month, by type, by district) — Recharts
- **Anomalies panel:** Alert cards with severity, district, type, expected vs actual counts, timestamp
- **Correlations panel:** Bar charts showing crime vs socio-economic factors (literacy rate, population density, etc.)

### 8. Data Page (`/data`)
- **Tab 1 — File Upload:** Drag-and-drop zone for CSV/JSON files, progress indicator, recent uploads table
- **Tab 2 — Web Scraping:** Add source URL form, scrape schedule config, sources table with last run status
- **Tab 3 — Manual Entry:** Form to add crime + criminal + cyber incident manually, with validation

### 9. Admin Page (`/admin`)
- User table with roles, status, last login
- Role editor dropdown per user
- System config panel (API endpoints status, model retrain button, DB stats)
- Activity log

## Layout & Navigation

### Sidebar (Flowsint-inspired)
- ULTRON logo + branding at top
- Nav items with icons: Dashboard, Crime, Criminals, Cyber, Network, Analysis, Data, Admin
- Active state highlighting
- Collapsible (hamburger on mobile)
- User avatar + role badge at bottom

### Top Header
- Search bar (global search across crimes, criminals, IPs, domains)
- Notification bell with unread count
- User dropdown (profile, settings, logout)
- Theme toggle (dark mode — default dark)

## Visual Design Requirements

### Color Palette (Dark Theme)
- Background: `#0a0a0f` (very dark navy)
- Surface: `#13131a` (card backgrounds)
- Surface elevated: `#1a1a24` (hover, elevated cards)
- Border: `#2a2a3a`
- Primary: `#3b82f6` (blue)
- Success: `#22c55e` (green)
- Warning: `#f59e0b` (amber)
- Danger: `#ef4444` (red)
- Info: `#8b5cf6` (purple)
- Text primary: `#f1f5f9`
- Text secondary: `#94a3b8`
- Text muted: `#64748b`

### Typography
- Font: Inter or system font stack
- Headings: bold, tight tracking
- Body: regular weight, good line height
- Mono: JetBrains Mono or similar for IPs, domains, technical data

### Design Principles
- Glassmorphism/translucency on cards (backdrop-blur where appropriate)
- Subtle borders instead of heavy shadows
- Smooth transitions (150-200ms ease-in-out)
- Consistent 4px spacing grid
- Rounded corners (8px cards, 6px buttons, 4px inputs)
- Loading skeletons for data-fetching states
- Toast notifications for actions (success/error)

## API Integration Pattern

All pages should use this pattern for API calls:

```typescript
// /src/api/client.ts — base API client with JWT token
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8000';

// /src/hooks/useCrimes.ts — example hook
export function useCrimes(filters?: CrimeFilters) {
  return useQuery({
    queryKey: ['crimes', filters],
    queryFn: () => fetch(`${API_BASE}/crime/list?${toQueryString(filters)}`).then(r => r.json()),
  });
}
```

All data fetching via `@tanstack/react-query`. All mutations via `useMutation`.

## State Management (Zustand)

```typescript
// Auth store
interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// UI store  
interface UIState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
  toggleSidebar: () => void;
  toggleTheme: () => void;
}
```

## Deliverables

Generate a complete working React + TypeScript + Vite + Tailwind frontend with:
1. All 9 pages fully implemented
2. All shared components (charts, maps, graphs, tables, forms)
3. API integration layer ready to connect to FastAPI backend
4. Full auth flow with JWT token management
5. Dark theme throughout
6. Responsive design (desktop + tablet + mobile)
7. Loading states, error states, empty states everywhere
8. TypeScript strict mode — no `any` types
