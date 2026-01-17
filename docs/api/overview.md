---
sidebar_position: 1
---

# API Overview

The Horizon REST API provides programmatic access to all protocol features. This documentation covers endpoints, authentication, and common patterns.

## Base URLs

| Environment | Base URL |
|-------------|----------|
| **Testnet** | `https://api.horizon.dev` |
| **Mainnet** | Coming soon |

## Authentication

Most endpoints require authentication via JWT token:

```http
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

```typescript
// 1. Get message to sign
const messageRes = await fetch('https://api.horizon.dev/auth/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ address: walletAddress }),
});
const { message } = await messageRes.json();

// 2. Sign with wallet
const signature = await wallet.signMessage(message);

// 3. Get JWT
const authRes = await fetch('https://api.horizon.dev/auth/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ address: walletAddress, signature }),
});
const { token } = await authRes.json();
```

## Response Format

All responses follow a consistent format:

### Success

```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Mission not found"
  }
}
```

## Common Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `skip` | number | Pagination offset |
| `take` | number | Results per page (default: 20, max: 100) |
| `sortBy` | string | Sort field |
| `sortOrder` | string | `asc` or `desc` |

## Rate Limiting

| Tier | Requests/minute |
|------|-----------------|
| **Unauthenticated** | 30 |
| **Authenticated** | 300 |
| **Premium** | 1000 |

Rate limit headers:
```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1640000000
```

## API Endpoints

### Core Resources

| Resource | Endpoint | Description |
|----------|----------|-------------|
| [Missions](/docs/api/missions) | `/missions` | Create and manage missions |
| [Guilds](/docs/api/guilds) | `/guilds` | Guild management |
| [Users](/docs/api/users) | `/users` | User profiles |
| [Feed](/docs/api/feed) | `/feed` | Mission discovery |
| [Map](/docs/api/map) | `/map` | Location-based queries |

### Supporting Resources

| Resource | Endpoint | Description |
|----------|----------|-------------|
| [XP & NFT](/docs/api/xp-nft) | `/xp`, `/nft` | Progression system |
| [Ratings](/docs/api/ratings) | `/ratings` | Reputation |
| [Disputes](/docs/api/disputes) | `/resolver` | Dispute resolution |
| [Notifications](/docs/api/notifications) | `/notifications` | User notifications |
| [Data Vault](/docs/api/data-vault) | `/data-vault` | User data export |

### Real-time

| Resource | Endpoint | Description |
|----------|----------|-------------|
| [WebSocket](/docs/api/websocket) | `/ws` | Real-time updates |

## Quick Examples

### List Open Missions

```bash
curl -X GET "https://api.horizon.dev/missions?state=Open&take=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Create Mission

```bash
curl -X POST "https://api.horizon.dev/missions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Deliver package",
    "description": "Pick up and deliver",
    "rewardAmount": "10.00",
    "category": "delivery",
    "expiresIn": 86400
  }'
```

### Get User Profile

```bash
curl -X GET "https://api.horizon.dev/users/me" \
  -H "Authorization: Bearer $TOKEN"
```

## SDK Integration

For TypeScript projects, use the SDK with API endpoints:

```typescript
import { BASE_SEPOLIA } from '@horizon-protocol/sdk';

const apiClient = {
  baseUrl: 'https://api.horizon.dev',
  token: null,

  async fetch(path: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    });
    return response.json();
  },

  async getMissions(params?: { state?: string; take?: number }) {
    const query = new URLSearchParams(params as any).toString();
    return this.fetch(`/missions?${query}`);
  },

  async createMission(data: CreateMissionDto) {
    return this.fetch('/missions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Versioning

The API uses URL versioning (coming soon):
- Current: `/missions`
- Future: `/v2/missions`

## Resources

- [SDK Documentation](/docs/sdk/overview)
- [Smart Contracts](/docs/architecture/smart-contracts)
- [Getting Started](/docs/guides/getting-started)
