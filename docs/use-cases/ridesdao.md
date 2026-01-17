---
sidebar_position: 3
---

# ridesDAO - Ride Sharing

ridesDAO is a conceptual decentralized ride-sharing platform built on Horizon Protocol, where drivers collectively own and govern the platform through guild-based coordination.

## Overview

ridesDAO reimagines ride-sharing as a driver-owned cooperative:

- **No middleman extraction** - Drivers keep more of each fare
- **Community governance** - Drivers vote on platform rules
- **Portable reputation** - Ratings follow drivers across the ecosystem
- **Fair matching** - Transparent ride assignment

## How It Works

### Ride Request Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Rider     │────▶│   Mission    │────▶│   Driver     │
│ Requests Ride│     │   Created    │     │   Matched    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Payment    │◀────│    Trip      │◀────│   Pickup     │
│  Settled     │     │  Completed   │     │   & Start    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Step-by-Step

1. **Rider requests** a ride with pickup and destination
2. **Mission created** with fare held in escrow
3. **Nearby drivers** receive the request
4. **Driver accepts** and heads to pickup
5. **Driver arrives** and rider confirms
6. **Trip begins** with live tracking
7. **Trip ends** at destination
8. **Payment settles** to driver automatically

## Guild Structure

ridesDAO organizes drivers into regional collectives:

```
┌─────────────────────────────────────────────────────────┐
│                  ridesDAO Protocol                       │
│               (Global Governance)                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  NYC Guild  │  │   LA Guild  │  │ Miami Guild │     │
│  │  (Drivers)  │  │  (Drivers)  │  │  (Drivers)  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Regional Guilds

- **Local governance** - Drivers set regional policies
- **Fair distribution** - Rides distributed among guild members
- **Collective bargaining** - Unified voice for regional issues
- **Shared resources** - Equipment, training, support

## Key Features

### For Drivers

- **Higher earnings** - Minimal platform fees
- **Ownership stake** - Vote on platform decisions
- **Flexible work** - Accept rides on your schedule
- **Reputation portability** - Ratings count everywhere

### For Riders

- **Competitive fares** - Lower overhead = better prices
- **Quality service** - Driver-owners care about experience
- **Transparent pricing** - No surge surprises
- **Secure payments** - Escrow-protected transactions

## Matching System

ridesDAO uses Horizon's mission feed for ride matching:

### Matching Factors

| Factor | Description |
|--------|-------------|
| **Distance** | Driver proximity to pickup |
| **Rating** | Driver reputation score |
| **Guild Status** | Guild membership benefits |
| **Availability** | Driver acceptance rate |

### Fair Distribution

The system ensures rides are distributed fairly:
- Prevents cherry-picking
- Rewards reliable drivers
- Considers driver earnings balance

## Economic Model

### Fare Distribution

When a ride completes:

| Recipient | Allocation |
|-----------|------------|
| **Driver** | Majority of fare |
| **Guild** | Small contribution to local treasury |
| **Protocol** | Minimal platform fee |

### Driver Incentives

- **Streak bonuses** - Consecutive ride completions
- **XP progression** - Level up for better opportunities
- **Achievement NFTs** - Recognition for milestones
- **Guild rewards** - Active participation benefits

## Governance

### Driver Voting

Drivers can vote on:
- Fare structures
- Guild policies
- Platform features
- Dispute resolution

### Proposal Process

1. **Proposal submitted** by guild member
2. **Discussion period** for community feedback
3. **Voting opens** for eligible drivers
4. **Implementation** if passed

## Location & Safety

### Verification Features

- **Pickup confirmation** - Rider verifies driver arrived
- **Trip tracking** - Real-time route monitoring
- **Destination verification** - Confirms arrival

### Privacy Protections

- Location data auto-purged
- Opt-in for enhanced tracking
- Driver/rider data encrypted

## Technical Concepts

### Ride as Mission

Each ride request becomes a Horizon mission:

```typescript
interface RideMission {
  pickup: {
    latitude: number;
    longitude: number;
    address: string;
  };
  dropoff: {
    latitude: number;
    longitude: number;
    address: string;
  };
  fare: bigint;        // USDC amount
  guild: string;       // Regional guild
  expiresIn: number;   // Match timeout
}
```

### Driver as Performer

Drivers accept ride missions:

```typescript
// Driver sees nearby rides
const nearbyRides = await horizonClient.getFeed({
  userId: driverId,
  location: { lat: driver.lat, lng: driver.lng },
  category: 'ride',
});

// Driver accepts ride
await horizonClient.acceptMission(rideId);
```

## Roadmap Concepts

### Phase 1: Core Rides
- Basic ride request/accept
- Payment settlement
- Driver ratings

### Phase 2: Guild Features
- Regional guilds
- Local governance
- Collective benefits

### Phase 3: Advanced Features
- Scheduled rides
- Shared rides
- Vehicle requirements

## Resources

- [Protocol Overview](/docs/protocol/overview)
- [Guild System](/docs/protocol/guilds)
- [Economics](/docs/protocol/economics)
- [SDK Documentation](/docs/sdk/overview)
