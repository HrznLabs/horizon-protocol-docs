---
sidebar_position: 3
---

# ridesDAO - Ride Sharing

A decentralized ride-sharing network built on Horizon Protocol.

## Overview

ridesDAO reimagines ride-sharing with:
- **Driver-owned guilds** instead of corporate control
- **Transparent pricing** visible to both parties
- **Direct payments** via on-chain escrow
- **Portable reputation** across the network

## Concept Design

> **Note**: ridesDAO is currently in the design phase. This document outlines the planned architecture.

### Vision

Replace centralized ride-sharing with a network of driver cooperatives that:
- Set their own pricing
- Keep 90%+ of fares
- Build long-term customer relationships
- Share governance of the platform

## How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Rider     │────▶│  ridesDAO   │────▶│   Driver    │
│  (Poster)   │     │    App      │     │   Guild     │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │   Horizon   │
                    │  Protocol   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Escrow  │ │   Map    │ │ Ratings  │
        └──────────┘ └──────────┘ └──────────┘
```

### Ride Flow

1. **Rider requests ride** → Mission created with estimated fare in escrow
2. **Guild receives request** → Dispatched to available drivers
3. **Driver claims ride** → Mission accepted
4. **Pickup confirmed** → Location proof at pickup point
5. **Ride completed** → Metered fare calculated, escrow adjusted
6. **Payment settled** → Funds distributed, ratings exchanged

## Mission Structure

### Ride Request

```json
{
  "type": "RIDE",
  "pickup": {
    "location": { "lat": 40.7128, "lng": -74.0060 },
    "address": "123 Main St"
  },
  "destination": {
    "location": { "lat": 40.7580, "lng": -73.9855 },
    "address": "789 Broadway"
  },
  "passengers": 2,
  "rideType": "STANDARD",
  "estimatedFare": "15.00",
  "maxFare": "20.00"
}
```

### Ride Types

| Type | Description |
|------|-------------|
| **Standard** | Regular sedan, 1-4 passengers |
| **XL** | Larger vehicle, 5-7 passengers |
| **Comfort** | Premium vehicles |
| **Pool** | Shared rides, lower cost |

## Guild-Based Dispatch

### Driver Guilds

Drivers organize into location-based guilds:
- **City guilds**: Cover metropolitan areas
- **Airport guilds**: Specialize in airport transfers
- **Specialty guilds**: Luxury, accessibility, etc.

### Dispatch Priority

1. Guild members in proximity
2. Highest-rated available driver
3. Optimal route considerations

## Dynamic Pricing

Fares calculated using on-chain logic:

```typescript
function calculateFare(ride: RideDetails): bigint {
  const baseFare = parseUSDC(2.50);
  const perMile = parseUSDC(1.50);
  const perMinute = parseUSDC(0.25);
  
  const distanceFare = ride.miles * perMile;
  const timeFare = ride.minutes * perMinute;
  
  let fare = baseFare + distanceFare + timeFare;
  
  // Surge pricing during high demand
  if (ride.demandMultiplier > 1) {
    fare = fare * BigInt(ride.demandMultiplier);
  }
  
  return fare;
}
```

### Surge Transparency

Unlike traditional apps, surge pricing is:
- **Visible on-chain**: Anyone can verify the multiplier
- **Guild-controlled**: Each guild sets their surge caps
- **Time-limited**: Automatic decay after demand normalizes

## Fee Structure

| Recipient | Percentage |
|-----------|------------|
| Driver | 87-90% |
| Protocol | 4% |
| Labs | 4% |
| Resolver | 2% |
| Guild | 0-3% |

**Result**: Drivers keep significantly more than with centralized platforms.

## Safety Features

### Rider Safety
- Driver identity verified on-chain
- Reputation history visible
- Real-time location sharing
- Emergency dispute button

### Driver Safety
- Rider identity verified
- Payment guaranteed in escrow
- Route tracking for disputes
- Guild support network

## Technical Integration

```typescript
// Request a ride
const ride = await ridesDAO.requestRide({
  pickup: pickupLocation,
  destination: destinationLocation,
  rideType: 'STANDARD',
  maxFare: parseUSDC(25),
});

// Driver accepts
await ridesDAO.acceptRide(ride.missionId);

// Complete ride
await ridesDAO.completeRide(ride.missionId, {
  actualRoute: gpsTrack,
  finalFare: calculateFare(gpsTrack),
});
```

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| Design | ✅ Complete | Architecture and protocol design |
| Contracts | 🔄 In Progress | Ride-specific smart contracts |
| App MVP | Planned | Basic rider/driver apps |
| Guild Launch | Planned | First driver cooperatives |
| Public Launch | Planned | Wide availability |

## Get Involved

Interested in contributing to ridesDAO?

- [GitHub Issues](https://github.com/HrznLabs/ridesDAO/issues)
- [Discord Community](https://discord.gg/horizon)
