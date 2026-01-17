---
sidebar_position: 1
---

# Use Cases (Verticals)

Horizon Protocol provides the infrastructure for building decentralized coordination platforms. This section showcases real-world applications built on Horizon, demonstrating how the protocol adapts to different industries.

## Why Build on Horizon?

### For Builders

| Benefit | Description |
|---------|-------------|
| **Trustless Escrow** | Built-in USDC escrow eliminates payment disputes |
| **Location Verification** | Geofencing for location-based task verification |
| **Reputation System** | On-chain reputation and achievement NFTs |
| **Guild Coordination** | DAO-based organization and governance |
| **SDK & API** | Ready-to-use SDK and comprehensive API |

### For Users

| Benefit | Description |
|---------|-------------|
| **Fair Payments** | Guaranteed payment release on completion |
| **Portable Reputation** | Reputation travels across all Horizon apps |
| **Own Your Data** | Full control over personal data via Data Vault |
| **Community Ownership** | Participate in guild governance |

## Active Verticals

### iTake - Food Delivery

A decentralized food delivery platform connecting restaurants with delivery drivers.

**Key Features:**
- Restaurant onboarding and menu management
- Order-to-mission conversion
- Real-time delivery tracking
- Automatic payment splitting

[Learn more about iTake →](/docs/use-cases/itake)

---

### ridesDAO - Ride Sharing

Decentralized ride-sharing where drivers own the platform.

**Key Features:**
- Driver-rider matching
- Fair fare distribution
- Driver collectives (guilds)
- Community governance

[Learn more about ridesDAO →](/docs/use-cases/ridesdao)

---

### BuildDAO - Construction

Connecting skilled tradespeople with construction projects.

**Key Features:**
- Project-based missions
- Milestone payments
- Trade-specific guilds
- Skill attestations

[Learn more about BuildDAO →](/docs/use-cases/builddao)

## Building Your Own Vertical

Want to build on Horizon? Here's how:

### 1. Define Your Domain

Map your use case to Horizon concepts:

| Your Domain | Horizon Concept |
|-------------|-----------------|
| Tasks/Jobs | Missions |
| Organizations | Guilds |
| Workers | Performers |
| Customers | Posters |

### 2. Integrate the SDK

```typescript
import { HorizonClient, MissionFactoryABI } from '@horizon-protocol/sdk';

// Create missions programmatically
const mission = await client.writeContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [/* your mission params */],
});
```

### 3. Customize the Experience

- Build your own UI
- Add domain-specific features
- Integrate with existing systems
- Create custom guild types

## Integration Patterns

### Order-to-Mission Pattern (iTake)

```
Customer Order → Create Horizon Mission → Driver Accepts → Delivery → Settlement
```

### Project-to-Milestone Pattern (BuildDAO)

```
Project Created → Multiple Milestone Missions → Worker Claims → Verification → Payment
```

### Request-to-Match Pattern (ridesDAO)

```
Ride Request → Mission Created → Driver Matched → Trip Completed → Auto-Settlement
```

## Getting Started

1. **Read the SDK docs**: [SDK Overview](/docs/sdk/overview)
2. **Explore the API**: [API Reference](/docs/api/overview)
3. **Study existing verticals**: Review iTake, ridesDAO, BuildDAO
4. **Join the community**: Connect with other builders

## Resources

- [TypeScript SDK](https://github.com/HrznLabs/horizon-sdk)
- [Smart Contracts](https://github.com/HrznLabs/horizon-contracts)
- [API Documentation](/docs/api/overview)
- [Getting Started Guide](/docs/guides/getting-started)
