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

### Obtaining a Token (SIWE)

1. Connect wallet (CDP Embedded Wallet, Coinbase Wallet, or WalletConnect)
2. Request challenge: `GET /auth/challenge?address=0x...`
3. Sign EIP-4361 SIWE message with wallet
4. Submit signature: `POST /auth/login` with address, message, signature
5. Receive JWT token (valid 24 hours)

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
- [**Disputes**](/docs/api/disputes) - DDR/LPP dispute resolution
- [**Data Vault**](/docs/api/data-vault) - GDPR data export and privacy
- [**WebSocket**](/docs/api/websocket) - Real-time events

## OpenAPI Specification

Full OpenAPI 3.0 spec available at:

```
https://api.horizon.xyz/v1/openapi.json
```

## SDKs

- **TypeScript SDK**: [@horizon-protocol/sdk](https://github.com/HrznLabs/horizon-sdk) - ABIs, utilities, contract addresses
- React Native hooks included in mobile package

