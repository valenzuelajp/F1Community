---
title: "F1 API Reference & Recommendations"
aliases:
  - F1 API
  - API Reference
  - Jolpica
tags:
  - f1-community
  - wiki
  - api
  - f1
date: 2026-09-23
status: active
---

# F1 API Reference & Recommendations

## Overview

This document catalogs all Formula 1 data sources evaluated for the F1 Platform, with recommendations for each use case.

---

## Schedule, Standings & Historical Data

### **Primary: Jolpica F1 API (Recommended)** ⭐
**Status**: Accepted (ADR-013)

| Property | Details |
|----------|---------|
| **Base URL** | `https://api.jolpi.ca/ergast/f1/` |
| **Auth** | None required |
| **Rate Limit** | 500 requests/hour |
| **Format** | JSON (Ergast-compatible) |
| **CORS** | Enabled |
| **Maintenance** | Active community successor to Ergast |

#### Key Endpoints

| Data | Endpoint | Example |
|------|----------|---------|
| Current season races | `/current/races/` | `https://api.jolpi.ca/ergast/f1/current/races/` |
| Specific season | `/{season}/races/` | `https://api.jolpi.ca/ergast/f1/2024/races/` |
| Race results | `/{season}/{round}/results/` | `https://api.jolpi.ca/ergast/f1/2024/1/results/` |
| Driver standings | `/{season}/driverstandings/` | `https://api.jolpi.ca/ergast/f1/2024/driverstandings/` |
| Constructor standings | `/{season}/constructorstandings/` | `https://api.jolpi.ca/ergast/f1/2024/constructorstandings/` |
| Drivers list | `/drivers/` | `https://api.jolpi.ca/ergast/f1/drivers/` |
| Constructors list | `/constructors/` | `https://api.jolpi.ca/ergast/f1/constructors/` |
| Circuits | `/circuits/` | `https://api.jolpi.ca/ergast/f1/circuits/` |
| Seasons list | `/seasons/` | `https://api.jolpi.ca/ergast/f1/seasons/` |

#### Response Structure (Races)
```json
{
  "MRData": {
    "RaceTable": {
      "season": "2024",
      "Races": [{
        "season": "2024",
        "round": "1",
        "raceName": "Bahrain Grand Prix",
        "Circuit": {
          "circuitId": "bahrain",
          "circuitName": "Bahrain International Circuit",
          "Location": { "lat": "26.0325", "long": "50.5106", "locality": "Sakhir", "country": "Bahrain" }
        },
        "date": "2024-03-02",
        "time": "15:00:00Z",
        "FirstPractice": { "date": "2024-02-29", "time": "11:30:00Z" },
        "SecondPractice": { "date": "2024-02-29", "time": "15:00:00Z" },
        "ThirdPractice": { "date": "2024-03-01", "time": "12:30:00Z" },
        "Qualifying": { "date": "2024-03-01", "time": "16:00:00Z" }
      }]
    }
  }
}
```

#### Caching Strategy
- **ISR (Next.js)**: `fetch(..., { next: { revalidate: 3600 } })` - 1 hour
- **TanStack Query**: `staleTime: 3600000` (1 hour), `gcTime: 7200000` (2 hours)
- **Static fallback**: Pre-seed 2024/2025 seasons in database

---

### Alternative: Sportradar F1 API (Paid)
**Status**: Evaluated - Deferred to Post-Launch

| Property | Details |
|----------|---------|
| **Cost** | ~$500-2000+/month |
| **Auth** | API Key |
| **Features** | Official data, probabilities, live tracking, deeper stats |
| **Use Case** | Post-launch if Jolpica insufficient |

---

## Live Timing & Telemetry (Race Weekends Only)

### **Primary: f1-live-api (Recommended)** ⭐
**Status**: Proposed (ADR-014)

| Property | Details |
|----------|---------|
| **Base URL** | `https://f1-live-api.onrender.com` |
| **Auth** | Optional API key (`x-api-key` header) |
| **Rate Limit** | 100 req/min, 10 SSE connections/min (free) |
| **Protocol** | REST + SSE (Server-Sent Events) |
| **Data Source** | Official F1 SignalR WebSocket feed |

#### Key Endpoints

| Data | Endpoint | Notes |
|------|----------|-------|
| API Overview | `/` | Machine-readable endpoint reference |
| Documentation | `/docs` | Full OpenAPI spec |
| Connection Status | `/status` | Session info, lap count, flags |
| All Drivers | `/drivers` | Name, acronym, team, color, headshot |
| Full Timing | `/timing` | Leaderboard, gaps, sectors, telemetry |
| Single Driver | `/timing/:number` | Driver-specific timing |
| Weather | `/weather` | Air/track temp, humidity, wind, rain |
| Track Status | `/track` | Flags, track condition |
| Race Control | `/race-control` | Penalties, flags, notifications |
| Car Telemetry | `/car/:number` | RPM, speed, gear, throttle, brake, DRS |
| Telemetry Stream | `/telemetry/stream/all` | SSE ~3.7 Hz all cars |
| Historical | `/results`, `/sessions` | Archive back to 2018 |

#### SSE Usage (Live Timing)
```typescript
// Client-side hook pattern
const eventSource = new EventSource(`${LIVE_API}/stream/timing`);
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update leaderboard, gaps, sectors in real-time
};
```

#### Race Weekend Detection
1. Query Jolpica for current/next race
2. Check if session is active via `/status`
3. Enable SSE connection only during active sessions
4. Feature flag: `NEXT_PUBLIC_ENABLE_LIVE_TIMING`

---

## News Aggregation

### **Primary: RSS Feeds (Free, No Limits)** ⭐

| Source | RSS URL | Notes |
|--------|---------|-------|
| Formula1.com | `https://www.formula1.com/rss/news/latest.rss` | Official source |
| ESPN F1 | `https://www.espn.com/espn/rss/f1/news` | US-focused |
| BBC Sport F1 | `https://feeds.bbci.co.uk/sport/formula1/rss.xml` | UK-focused |
| Sky Sports F1 | Via RSS-Bridge or custom | May need proxy |

#### RSS Parser Implementation
```typescript
// Cron job (hourly) → parse feeds → store in NewsArticle table
// Dedupe by URL + title hash
// Categorize: Breaking, Analysis, Feature, Press Conference
```

### **Secondary: RapidAPI "F1 Latest News" (Aggregated)**

| Property | Details |
|----------|---------|
| **Endpoint** | `https://f1-latest-news.p.rapidapi.com/news` |
| **Sources** | F1.com, Sky F1, BBC F1, WTF1, Autosport |
| **Free Tier** | ~100 requests/month |
| **Auth** | RapidAPI Key |
| **Use Case** | Fallback when RSS fails, enrichment |

---

## Driver/Team Media Assets

### **Formula1.com Media** (Manual Curation)
- **Headshots**: `https://www.formula1.com/content/dam/fom-website/drivers/{CODE}.jpg`
- **Team Logos**: `https://www.formula1.com/content/dam/fom-website/teams/{TEAM}.png`
- **Circuit Maps**: `https://www.formula1.com/content/dam/fom-website/circuits/{CIRCUIT}.png`

### **Alternative: Ergast/Jolpica Images**
- Wikipedia URLs provided in API responses
- Can proxy/fetch for optimization

---

## Recommended Data Flow Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│   Jolpica API   │────▶│  Next.js ISR     │────▶│  Schedule/Standings│
│  (Schedule,     │     │  (1hr revalidate)│     │  Pages (SSG/ISR)   │
│  Standings)     │     └──────────────────┘     └────────────────────┘
└─────────────────┘
        │
        ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│   RSS Feeds     │────▶│  Cron Job        │────▶│  NewsArticle DB    │
│  (F1, ESPN,     │     │  (Hourly)        │     │  + Search Index    │
│  BBC, Sky)      │     └──────────────────┘     └────────────────────┘
└─────────────────┘
        │
        ▼
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐
│ f1-live-api     │────▶│  SSE Client      │────▶│  Live Timing UI    │
│ (Race Weekends) │     │  (React Hook)    │     │  (Conditional)     │
└─────────────────┘     └──────────────────┘     └────────────────────┘
```

---

## Environment Variables

```env
# F1 APIs
JOLPICA_BASE_URL="https://api.jolpi.ca/ergast/f1"
LIVE_API_BASE_URL="https://f1-live-api.onrender.com"
LIVE_API_KEY=""  # Optional, for higher limits

# News
RAPIDAPI_KEY=""  # Optional, for F1 Latest News fallback
RAPIDAPI_HOST="f1-latest-news.p.rapidapi.com"

# Feature Flags
NEXT_PUBLIC_ENABLE_LIVE_TIMING="true"
NEXT_PUBLIC_CURRENT_SEASON="2024"
```

---

## Implementation Priority

| Phase | API | Implementation |
|-------|-----|----------------|
| 1a | Jolpica | Server Components + ISR for schedule/standings |
| 1a | Jolpica | TanStack Query for client-side interactions |
| 1b | RSS + RapidAPI | Cron job → Prisma → News feed pages |
| 1b | f1-live-api | SSE hook + conditional live timing page |
| 2a+ | All | Cross-link: Team/Driver profiles → Store catalog |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Jolpica rate limit (500/hr) | Aggressive caching, ISR, static seed data |
| Jolpica downtime | Static fallback (pre-seeded 2024/2025), multiple cache layers |
| RSS feed changes | Multiple sources, monitoring alerts, graceful degradation |
| f1-live-api unavailable | Feature flag off, static race data display |
| No official F1 news API | RSS is standard syndication, legally safer than scraping |

---

## Testing Endpoints (Manual Verification)

```bash
# Schedule
curl "https://api.jolpi.ca/ergast/f1/current/races/"

# Standings
curl "https://api.jolpi.ca/ergast/f1/current/driverstandings/"

# Live API status
curl "https://f1-live-api.onrender.com/status"

# Live API drivers
curl "https://f1-live-api.onrender.com/drivers"

# RSS test
curl "https://www.formula1.com/rss/news/latest.rss"
```

---

*Last updated: 2026-08-28 | Review when implementing each phase*