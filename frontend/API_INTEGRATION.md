# Backend API Integration Guide

This document explains how to connect the frontend to the FastAPI backend when it's ready.

## Current State

The frontend currently **loads dummy CSV data** from `public/data/` and **stores everything in Zustand**. All API calls are mocked and return static data.

## Integration Steps

### 1. Create API Client (`src/lib/api.ts`)

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Crimes
  async getCrimes(filters?: any) {
    const query = new URLSearchParams(filters || {}).toString();
    const res = await fetch(`${API_BASE_URL}/crime/list?${query}`);
    return res.json();
  },

  async getCrime(id: string) {
    const res = await fetch(`${API_BASE_URL}/crime/${id}`);
    return res.json();
  },

  async createCrime(data: any) {
    const res = await fetch(`${API_BASE_URL}/crime`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Criminals
  async getCriminals(search?: string) {
    const query = search ? `?search=${search}` : '';
    const res = await fetch(`${API_BASE_URL}/criminal${query}`);
    return res.json();
  },

  async getCriminalNetwork() {
    const res = await fetch(`${API_BASE_URL}/criminal/network`);
    return res.json();
  },

  // Hotspots & Analysis
  async getHotspots() {
    const res = await fetch(`${API_BASE_URL}/crime/hotspots`);
    return res.json();
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
    return res.json();
  },

  // CyberCrime
  async getCyberIncidents() {
    const res = await fetch(`${API_BASE_URL}/cyber/incidents`);
    return res.json();
  },

  async getIPIntelligence(ip: string) {
    const res = await fetch(`${API_BASE_URL}/cyber/ip/${ip}`);
    return res.json();
  },

  async getDomainIntelligence(domain: string) {
    const res = await fetch(`${API_BASE_URL}/cyber/domain/${domain}`);
    return res.json();
  },
};
```

### 2. Update Store to Use API

Example for `crimeStore.ts`:

```typescript
export const useCrimeStore = create<CrimeState>((set) => ({
  // ... existing state
  
  // Replace CSV loading with API calls
  fetchCrimes: async () => {
    try {
      const data = await api.getCrimes();
      set({ crimes: data, loaded: true });
    } catch (error) {
      console.error('Error fetching crimes:', error);
    }
  },

  fetchCriminals: async () => {
    try {
      const data = await api.getCriminals();
      set({ criminals: data });
    } catch (error) {
      console.error('Error fetching criminals:', error);
    }
  },
}));
```

### 3. Update `page.tsx` to Call API Methods

```typescript
export default function Home() {
  // ... existing code

  useEffect(() => {
    // Replace CSV loading with API calls
    const loadData = async () => {
      try {
        await Promise.all([
          useCrimeStore.getState().fetchCrimes(),
          useCrimeStore.getState().fetchCriminals(),
          useCrimeStore.getState().fetchDistricts(),
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // ... rest of component
}
```

### 4. Add Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPS_API_KEY=your_key_if_needed
```

### 5. Update Page Components to Use Real Data

Example for `DashboardPage.tsx`:

```typescript
export function DashboardPage() {
  const { crimes, criminals, fetchCrimes } = useCrimeStore();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch real dashboard stats from API
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  // ... rest of component
}
```

## API Endpoints Expected

### Auth
- `POST /auth/login` — Login
- `POST /auth/register` — Register (Admin only)

### Crime
- `GET /crime/list` — List crimes (filters: district, type, status, date_range)
- `GET /crime/{id}` — Get crime detail
- `POST /crime` — Create crime (Admin/Sudo)
- `PUT /crime/{id}` — Update crime (Admin/Sudo)
- `DELETE /crime/{id}` — Delete crime (Admin)
- `GET /crime/hotspots` — DBSCAN cluster results
- `GET /crime/trends` — Time-series trends

### Criminal
- `GET /criminal` — List criminals (search: name)
- `GET /criminal/{id}` — Criminal detail + network
- `POST /criminal` — Create criminal (Admin/Sudo)
- `GET /criminal/risk/{id}` — Predictive risk score
- `GET /criminal/network` — Full criminal network (nodes + edges for Cytoscape)

### CyberCrime
- `GET /cyber/incidents` — List cyber incidents
- `GET /cyber/incident/{id}` — Incident detail
- `POST /cyber/incident` — Add incident (Admin/Sudo)
- `GET /cyber/ip/{address}` — IP intelligence
- `GET /cyber/domain/{domain}` — Domain intelligence
- `POST /cyber/ip/enrich` — Async IP enrichment (Sudo)
- `GET /cyber/flows` — Network flow records
- `GET /cyber/network` — Cyber network graph

### Analysis
- `GET /analysis/anomalies` — Anomaly detection results
- `GET /analysis/correlations` — Socio-economic correlations

### Dashboard
- `GET /dashboard/stats` — Unified dashboard KPIs
- `GET /dashboard/trends` — Crime trends

## Error Handling

Add a custom hook for API error handling:

```typescript
// hooks/useApi.ts
export function useApi<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, dependencies);

  return { data, loading, error };
}
```

## Authentication

Update `authStore` to use JWT tokens:

```typescript
export const useAuthStore = create<AuthState>((set, get) => ({
  // ... existing state
  
  login: async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      const token = response.access_token;
      
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Decode and set user
      const user = decodeToken(token);
      set({ isAuthenticated: true, user });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
}));
```

Add token to all API requests:

```typescript
export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('auth_token');
      }
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  },
};
```

## Real-Time Updates

For real-time updates (crimes, incidents), consider WebSocket:

```typescript
// hooks/useWebSocket.ts
export function useWebSocket(url: string) {
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update stores based on message type
    };

    return () => ws.close();
  }, [url]);
}
```

Usage in components:

```typescript
useWebSocket('ws://localhost:8000/ws/crimes');
```

## Deployment

### Development
```bash
# Terminal 1: Backend
cd backend && python -m uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend && npm run dev
```

### Production
```bash
# Build frontend
cd frontend && npm run build

# Run backend with built frontend as static files
cd backend && gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/ultron
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8000

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ultron
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Performance Optimization

1. **Add SWR for caching:**
```bash
npm install swr
```

2. **Use SWR hook:**
```typescript
import useSWR from 'swr';

function DashboardPage() {
  const { data: crimes } = useSWR('/crime/list', api.getCrimes);
  // ... component
}
```

3. **Enable incremental static regeneration (ISR):**
```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

---

**Questions?** Check the backend API documentation at `http://localhost:8000/docs` (OpenAPI/Swagger UI).
