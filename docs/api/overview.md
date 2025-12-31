---
sidebar_position: 1
---

# API Overview

The Horizon Service provides a RESTful API for interacting with the protocol.

## Base URL

```
Production:  https://api.horizon.xyz/v1
Testnet:     https://api-testnet.horizon.xyz/v1
Local:       http://localhost:3001/v1
```

## Authentication

Most endpoints require authentication via JWT bearer token:

```bash
curl -H "Authorization: Bearer <token>" https://api.horizon.xyz/v1/missions
```

### Obtaining a Token

1. Connect wallet via Privy
2. Sign authentication message
3. Receive JWT token (valid 24 hours)

## Rate Limits

| Tier | Requests/min | Burst |
|------|-------------|-------|
| Anonymous | 30 | 50 |
| Authenticated | 100 | 200 |
| Guild Curator | 200 | 400 |

## Response Format

All responses follow this structure:

```json
{
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    { "field": "latitude", "message": "must be between -90 and 90" }
  ]
}
```

## API Sections

- [**Missions**](/docs/api/missions) - Create, query, and manage missions
- [**Guilds**](/docs/api/guilds) - Guild membership and boards
- [**Users**](/docs/api/users) - User profiles and identity
- [**Map**](/docs/api/map) - Geospatial queries and location
- [**XP & NFT**](/docs/api/xp-nft) - XP ledger, levels, and achievements
- [**Feed**](/docs/api/feed) - Personalized mission discovery
- [**Ratings**](/docs/api/ratings) - On-chain EAS reputation attestations
- [**Notifications**](/docs/api/notifications) - Push and in-app notifications
- [**WebSocket**](/docs/api/websocket) - Real-time events

## OpenAPI Specification

Full OpenAPI 3.0 spec available at:

```
https://api.horizon.xyz/v1/openapi.json
```

## SDKs

Official SDKs coming soon:
- TypeScript/JavaScript
- React Native hooks (included in mobile package)
- Python

