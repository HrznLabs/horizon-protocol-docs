---
sidebar_position: 1
---

# Use Cases

Horizon Protocol is designed to power real-world coordination across diverse industries. These vertical applications demonstrate what can be built on Horizon.

## What Are Verticals?

Verticals are industry-specific applications built on Horizon Protocol. They share:
- **Common Infrastructure**: Smart contracts, escrow, dispute resolution
- **Customized UX**: Tailored interfaces for specific use cases
- **Guild Networks**: Community-driven coordination

## Current Verticals

### 🍔 [iTake](/docs/use-cases/itake)
**Food Delivery Platform**

Decentralized food delivery connecting local restaurants with delivery performers through guild-based coordination.

### 🚗 [ridesDAO](/docs/use-cases/ridesdao)
**Ride-Sharing Network**

Peer-to-peer ride-sharing with driver guilds, dynamic pricing, and transparent escrow.

### 🏗️ [BuildDao](/docs/use-cases/builddao)
**Construction & Contracting**

Multi-party project coordination with milestone-based payments and contractor reputation.

## Building Your Own Vertical

Horizon Protocol provides the building blocks:

| Component | Purpose |
|-----------|---------|
| **Mission Factory** | Create and manage tasks |
| **Escrow System** | Hold and release payments |
| **Guild Infrastructure** | Organize communities |
| **Reputation System** | Track performer quality |
| **Dispute Resolution** | Handle conflicts |

### Integration Options

1. **SDK Integration** - Use the TypeScript SDK directly
2. **API Integration** - Connect via REST/WebSocket APIs
3. **Smart Contract Extension** - Build custom contracts on top

## Architecture Pattern

All verticals follow a similar architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Vertical Application                      │
│              (iTake, ridesDAO, BuildDao, etc.)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Horizon Backend                           │
│           Missions · Guilds · XP · Escrow · Maps            │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Base L2 Blockchain                        │
│         Smart Contracts · USDC · Attestations               │
└─────────────────────────────────────────────────────────────┘
```

## Want to Build on Horizon?

- [Getting Started](/docs/guides/getting-started) - Set up your environment
- [SDK Documentation](/docs/sdk/overview) - TypeScript integration
- [API Reference](/docs/api/overview) - Backend endpoints
