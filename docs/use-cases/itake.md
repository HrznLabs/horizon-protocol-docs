---
sidebar_position: 2
---

# iTake - Food Delivery

A decentralized food delivery platform built on Horizon Protocol.

## Overview

iTake connects local restaurants with delivery performers through guild-based coordination. Unlike traditional platforms, iTake:
- **No central intermediary** taking 30%+ fees
- **Performer-owned guilds** coordinate deliveries
- **Transparent pricing** with on-chain escrow
- **Reputation portability** across the Horizon ecosystem

## How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Customer   │────▶│   iTake     │────▶│  Restaurant │
│  (Poster)   │     │   App       │     │             │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                   │
                    ┌──────▼──────┐            │
                    │   Horizon   │◀───────────┘
                    │  Protocol   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Delivery   │
                    │   Guild     │
                    └─────────────┘
```

### Order Flow

1. **Customer places order** → Mission created with USDC in escrow
2. **Guild receives notification** → Available to guild members first
3. **Performer claims delivery** → Mission accepted, timer starts
4. **Food picked up** → Location proof submitted
5. **Delivery completed** → Customer confirms, funds released
6. **Ratings exchanged** → Both parties rate each other

## Mission Types

### Delivery Mission

```json
{
  "type": "DELIVERY",
  "restaurant": {
    "name": "Pizza Palace",
    "location": { "lat": 40.7128, "lng": -74.0060 }
  },
  "customer": {
    "location": { "lat": 40.7580, "lng": -73.9855 }
  },
  "items": ["1x Large Pizza", "1x Garlic Bread"],
  "reward": {
    "base": "5.00",
    "tip": "3.00",
    "total": "8.00"
  },
  "pickupBy": "2026-01-04T12:30:00Z",
  "deliverBy": "2026-01-04T13:00:00Z"
}
```

### Batch Delivery

Multiple orders from same restaurant area:

```json
{
  "type": "BATCH_DELIVERY",
  "stops": [
    { "restaurant": "...", "customer": "...", "items": [...] },
    { "restaurant": "...", "customer": "...", "items": [...] }
  ],
  "reward": "15.00"
}
```

## Guild Structure

iTake uses delivery guilds organized by region:

| Role | Permissions |
|------|-------------|
| **Admin** | Manage guild, set fees, remove members |
| **Dispatcher** | Assign missions, prioritize orders |
| **Performer** | Claim and complete deliveries |

### Guild Benefits

- **Priority access** to new orders
- **Shared resources** (vehicles, equipment)
- **Collective bargaining** for better rates
- **Training and onboarding** for new performers

## Fee Structure

| Recipient | Percentage |
|-----------|------------|
| Performer | 87-90% |
| Protocol | 4% |
| Labs | 4% |
| Resolver | 2% |
| Guild | 0-3% (configurable) |

**Example**: $10 delivery

| Recipient | Amount |
|-----------|--------|
| Performer | $8.70 |
| Protocol | $0.40 |
| Labs | $0.40 |
| Resolver | $0.20 |
| Guild | $0.30 |

## Location Verification

Deliveries use Horizon's map layer for:
- **Pickup proof**: GPS + timestamp at restaurant
- **Delivery proof**: GPS + timestamp at customer
- **Route optimization**: Suggested efficient paths

## Integration Points

iTake integrates with Horizon via:

```typescript
// Create delivery mission
await horizonClient.missions.create({
  type: 'DELIVERY',
  metadata: deliveryMetadata,
  reward: parseUSDC(8),
  guildId: 'downtown-couriers',
  expiresAt: calculateExpiresAt(3600),
});

// Claim delivery
await horizonClient.missions.claim(missionId);

// Submit delivery proof
await horizonClient.missions.submitProof(missionId, {
  photos: [deliveryPhoto],
  location: currentLocation,
  signature: customerSignature,
});
```

## Getting Started

Want to build on iTake or create a similar delivery platform?

1. [Set up development environment](/docs/guides/getting-started)
2. [Review the SDK](/docs/sdk/overview)
3. [Explore the Map API](/docs/api/map)
4. [Understand Guilds](/docs/protocol/guilds)
