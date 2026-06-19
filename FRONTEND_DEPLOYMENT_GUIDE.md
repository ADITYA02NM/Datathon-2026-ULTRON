# ULTRON Frontend - Complete Deployment Guide

## Overview

The **ULTRON** frontend is a comprehensive AI-Driven Crime Analytics Platform built for the Karnataka State Police (KSP). This modern, full-stack application features real-time crime analytics, geographic mapping, criminal network visualization, and intelligent graph analysis.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main application page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Top header with KSP branding
│   │   │   ├── SectionNav.tsx  # Section navigation
│   │   │   └── RadialNav.tsx   # 4-ring radial navigation
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx      # Dashboard with KPIs
│   │   │   ├── MapsPage.tsx           # Leaflet maps integration
│   │   │   ├── NetworkPage.tsx        # Cytoscape criminal network
│   │   │   ├── IntelligencePage.tsx   # Intelligence analysis
│   │   │   └── AdminPage.tsx          # Admin management
│   │   ├── charts/
│   │   │   ├── TrendChart.tsx    # Crime trend visualization
│   │   │   └── CrimeTypeChart.tsx # Crime type distribution
│   ├── stores/
│   │   ├── authStore.ts         # Authentication state
│   │   ├── navStore.ts          # Navigation state
│   │   ├── crimeStore.ts        # Crime data state
│   │   └── graphStore.ts        # Intelligence graph state
│   ├── styles/
│   │   └── globals.css          # Global styling
│   ├── data/
│   │   ├── crime_records.csv    # Crime records data
│   │   ├── criminals.csv        # Criminal database
│   │   └── districts.csv        # District information
│   └── types/                   # TypeScript type definitions
├── public/
│   ├── data/                    # CSV data files
│   └── favicon.ico              # Application favicon
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config
└── tailwind.config.ts           # Tailwind CSS config
```

## Technology Stack

### Core Framework
- **Next.js 16.2.9** - React framework with Turbopack
- **React 19.2** - UI library with latest hooks
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Animate.js** - Advanced animations

### State Management
- **Zustand** - Lightweight state management
- **Papa Parse** - CSV parsing

### Data Visualization
- **Recharts** - React charting library
- **Cytoscape.js** - Network graph visualization
- **Leaflet** - Map visualization
- **React Leaflet** - React wrapper for Leaflet

### Development
- **ESLint** - Code linting
- **TypeScript** - Type checking

## Color Scheme

The application uses a sophisticated dark theme optimized for law enforcement:

- **Primary Background**: `#0a0e1a` (Deep navy)
- **Secondary Background**: `#111827` (Dark gray-blue)
- **Accent Color**: `#f0b000` (Gold/Orange)
- **Alert/Danger**: `#c02040` (Deep red)
- **Text Primary**: `#f1f5f9` (Off-white)
- **Text Secondary**: `#94a3b8` (Muted blue)
- **Border**: `#2a2a3a` (Dark borders)

## Features

### 1. Dashboard
- Real-time crime analytics KPIs
- Crime trend charts
- Crime type distribution
- Quick statistics overview
- Recent crime alerts

### 2. Geographic Mapping
- Interactive Leaflet maps
- Crime hotspot visualization
- District-level crime density
- Heatmap layers
- Geographic filtering

### 3. Criminal Network
- Graph-based criminal relationships
- Network node sizing by crime count
- Edge connections for associations
- Interactive node selection
- Network statistics

### 4. Intelligence Analysis
- Graph-based intelligence relationships
- Entity relationship mapping
- Incident correlation
- Link analysis
- Pattern detection

### 5. Admin Management
- User account management
- System settings
- Data management
- Report generation
- System logs

## Authentication Flow

The application includes built-in demo authentication:

```typescript
// Auto-login for demo
useEffect(() => {
  setIsAuthenticated(true);
}, []);
```

**Demo Credentials:**
- Email: `admin@ultron.ksp`
- Role: `Administrator`

## Getting Started

### Installation

```bash
cd /vercel/share/v0-project/frontend
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Deployment

### Vercel Deployment (Recommended)

1. Connect the repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push

```bash
vercel deploy
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t ultron-frontend .
docker run -p 3000:3000 ultron-frontend
```

## Environment Variables

Currently, the application doesn't require environment variables for the demo, but for production:

```bash
# Optional configuration
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=ULTRON
NEXT_PUBLIC_KSP_NAME="Karnataka State Police"
```

## Data Integration

### CSV Data Files

The application expects CSV files in `public/data/`:

**crime_records.csv:**
```csv
FIR_No,District,Type,Date,Severity,Status
FIR001,Bangalore,Theft,2024-01-15,Low,Resolved
...
```

**criminals.csv:**
```csv
Criminal_ID,Name,Type,District,Crime_Count,Risk_Score
CRIM001,Name,Violent,Bangalore,5,85
...
```

**districts.csv:**
```csv
District_Name,Lat,Lon,Crime_Rate,Literacy_Rate,Poverty_Index
Bangalore,12.9716,77.5946,15.5,75.2,12.3
...
```

### API Integration

To integrate with a backend API, update the stores:

```typescript
// In crimeStore.ts
const fetchCrimes = async () => {
  const response = await fetch('/api/crimes');
  const data = await response.json();
  setCrimes(data);
};
```

## Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **CSS Purging**: Tailwind CSS automatically purges unused styles
- **Lazy Loading**: React Suspense and dynamic imports
- **Caching**: Efficient browser caching with Next.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Build Issues

```bash
# Clear cache
rm -rf .next
npm run build
```

### Type Errors

```bash
npm run type-check
```

### Port Already in Use

```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live data
2. **Advanced Analytics**: Machine learning-based crime prediction
3. **Mobile App**: React Native mobile application
4. **Multi-language Support**: i18n integration
5. **Advanced Reporting**: PDF export and custom reports
6. **Video Integration**: CCTV footage viewer
7. **AI Chat**: Conversational AI assistant
8. **Role-based Access**: Granular permission system

## Security Considerations

1. **Authentication**: Implement JWT or OAuth2
2. **HTTPS**: Always use HTTPS in production
3. **API Security**: Implement API rate limiting
4. **Data Protection**: Use encryption for sensitive data
5. **CORS**: Configure proper CORS policies
6. **Input Validation**: Validate all user inputs
7. **Audit Logs**: Track all system activities

## Support & Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org
- **Zustand**: https://github.com/pmndrs/zustand

## License

This project is proprietary software for Karnataka State Police.

## Version History

- **v1.0.0** (Current) - Initial release with core features
  - Dashboard with crime analytics
  - Geographic mapping
  - Criminal network visualization
  - Intelligence analysis
  - Admin management

---

**Last Updated:** June 19, 2026
**Maintained by:** ULTRON Development Team
**Contact:** ultron@ksp.gov.in
