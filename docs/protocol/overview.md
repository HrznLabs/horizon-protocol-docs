---
sidebar_position: 1
---

# Protocol Overview

Horizon Protocol is a decentralized coordination system that connects task posters with performers through blockchain-backed escrow, location verification, and guild-based coordination. Built natively on Base L2, it provides trustless, gasless coordination for real-world tasks.

## Core Actors

### Posters

Users who create missions by:
- Defining task requirements and deadlines
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
- Provide community and support

### Resolvers

Trusted arbitrators who:
- Handle mission disputes
- Review evidence from both parties
- Make binding decisions on fund distribution
- Earn fees from the dispute resolution pool

## Mission Lifecycle

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

## Fee Structure

When a mission completes successfully, fees are distributed to support the protocol ecosystem:

### Platform Fees

| Recipient | Description |
|-----------|-------------|
| **Protocol Treasury** | Platform sustainability |
| **Labs Treasury** | R&D and development |
| **Resolver Pool** | Dispute resolution fund |

### Guild Fees (Variable)

Guilds can earn a fee share on missions curated to their board. The fee is set by guild governance.

### Performer Earnings

Performers receive the majority of the mission reward (minimum 90%), minus any applicable guild fees.

## Dispute Resolution

### DDR (Dynamic Dispute Reserve)

A deposit required from both parties when a dispute is raised:
- Ensures commitment from both disputing parties
- Returned to the winning party
- Partial distribution to resolver

### LPP (Loser-Pays Penalty)

Additional penalty on the losing party to discourage frivolous disputes.

## Security & Privacy

### On-Chain Guarantees

- **Reward Immutability**: Mission rewards cannot change after creation
- **Performer Lock**: Performer address cannot change after acceptance
- **Non-Custodial**: Protocol cannot unilaterally modify escrow state

### Privacy Features

- Location data purged after 30 days
- Live tracking requires explicit opt-in
- Encrypted data vault for user data

## Technical Stack

| Component | Technology |
|-----------|------------|
| **Blockchain** | Base L2 (EVM-compatible) |
| **Smart Contracts** | Solidity + Foundry |
| **Stablecoin** | USDC |
| **Identity** | ENS, Basenames |
| **Reputation** | EAS Attestations |

## Deployments

### Testnet (Base Sepolia)

| Contract | Address |
|----------|---------|
| MissionFactory | `0x6d97964E9BE016A8AABA2f99F0bA419464Fb88D9` |
| PaymentRouter | `0x3013db6C92EF956f86EBC0aDFECe70b80FA73600` |
| GuildFactory | `0x7349Cd1A4f7C1a74Db730743d873de98A2f3a32F` |
| ReputationAttestations | `0xedae9682a0fb6fb3c18d6865461f67db7d748002` |
| DisputeResolver | `0xdE37Ff10A487c852941DC842987dd8d5d8b9E855` |
| HorizonAchievements | `0xfCC5971C3704C7a1F1c9E4acFdC7eEd60D4e4949` |
| USDC (testnet) | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

## Next Steps

- [Mission Engine](/docs/protocol/mission-engine) - Deep dive into mission mechanics
- [Guild System](/docs/protocol/guilds) - Learn about guild coordination
- [Economics](/docs/protocol/economics) - Understand tokenomics
- [Getting Started](/docs/guides/getting-started) - Build your first integration
