---
sidebar_position: 1
---

# Protocol Overview

Horizon Protocol is a decentralized coordination system that connects task posters with performers through blockchain-backed escrow, location verification, and guild-based coordination.

## Core Actors

### Posters
Users who create missions by:
- Defining task requirements
- Depositing USDC rewards in escrow
- Optionally associating missions with guilds
- Approving completion and releasing funds

### Performers
Users who execute missions by:
- Browsing available missions on the map
- Accepting missions within their capability
- Completing tasks and submitting proof
- Earning rewards, XP, and reputation

### Guilds
Coordination groups that:
- Curate mission boards for members
- Maintain reputation standards
- Earn fee share on member completions
- Provide dispute resolution support

### Resolvers
Trusted arbitrators who:
- Handle mission disputes
- Review evidence from both parties
- Make binding decisions on fund distribution
- Earn fees from DDR pool

## Mission Engine

The Mission Engine is the core coordination mechanism:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Open      │────▶│   Accepted   │────▶│  Submitted   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    │                    ▼
       │                    │            ┌──────────────┐
       │                    │            │  Completed   │
       │                    │            └──────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Cancelled   │     │  Disputed    │◀────│    (or)      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### State Transitions

| From | To | Trigger | Actor |
|------|-------|---------|-------|
| Open | Accepted | `acceptMission()` | Performer |
| Open | Cancelled | `cancelMission()` | Poster |
| Open | Expired | Auto (time) | System |
| Accepted | Submitted | `submitProof()` | Performer |
| Submitted | Completed | `approveCompletion()` | Poster |
| Submitted | Disputed | `raiseDispute()` | Either |
| Disputed | Resolved | `resolveDispute()` | Resolver |

## Economic Model

### Fee Distribution (Fixed + Variable)

When a mission completes successfully:

**Fixed Fees (10% total):**

| Recipient | Percentage | Description |
|-----------|------------|-------------|
| **Protocol** | 4% | Platform sustainability |
| **Labs** | 4% | R&D and development |
| **Resolver** | 2% | Dispute resolution pool |

**Variable Fee:**

| Recipient | Percentage | Description |
|-----------|------------|-------------|
| **Guild** | 0-15% | Set by guild when curating mission |
| **Performer** | 90% - guild fee | Base reward minus guild cut |

Protocol and Labs fees are equal and higher than the Resolver fee. Guild fees are set by each guild's governance and can vary by mission difficulty/effort.

### DDR (Dynamic Dispute Reserve)

The DDR is a 5% deposit required from both parties when a dispute is raised:

- **Purpose**: Skin in the game for dispute parties
- **Rate**: 5% of mission reward
- **Return**: Returned to winner (minus fees)
- **Distribution**: Resolver (20%), Protocol (10%), Winner (70%)

### LPP (Loser-Pays Penalty)

Additional 2% penalty on the losing party:

- **Purpose**: Discourage frivolous disputes
- **Rate**: 2% of mission reward
- **Distribution**: Added to winner's payout

## Security Invariants

The following must **never** be violated:

1. **Reward Immutability**: `rewardAmount` cannot change after creation
2. **DDR Immutability**: `ddrAmount` cannot change after creation
3. **Performer Lock**: `performer` cannot change after acceptance
4. **Non-Custodial**: Horizon Service cannot modify on-chain state
5. **Location Privacy**: Location data purged after 30 days
6. **Consent Required**: Live tracking requires explicit opt-in

## Deployment

Horizon Protocol is deployed on **Base L2** (EVM-compatible).

### What's On-Chain
- Mission escrow and settlement
- Guild DAOs and membership
- Reputation attestations (EAS)
- Dispute resolution
- Payment routing
- Achievement NFTs

### What's Off-Chain
- User interface and mobile app
- Real-time notifications
- Location processing
- Mission metadata (IPFS)

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| v2.1 | Dec 2025 | Map Layer, DDR/LPP, Geofencing |
| v2.0 | Nov 2025 | Guild DAOs, PaymentRouter |
| v1.0 | Oct 2025 | Initial escrow, basic missions |
