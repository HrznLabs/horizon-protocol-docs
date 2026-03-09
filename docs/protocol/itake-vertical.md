---
sidebar_position: 8
---

# iTake Vertical

iTake is the first production vertical deployed on Horizon Protocol. It demonstrates the MetaDAO/SubDAO pattern for real-world logistics — specifically food delivery — and serves as the template for all future verticals.

## Overview

iTake targets Lisbon and Porto as its beachhead market, connecting restaurants, drivers, and customers through Horizon's mission-based escrow system. The goal is 50 couriers and 10 restaurants within 30 days of launch.

| Property | Value |
|----------|-------|
| **Type** | MetaDAO (Vertical Platform) |
| **Vertical** | Food Delivery |
| **Markets** | Lisbon, Porto (Portugal) |
| **Network** | Base Sepolia (testnet) |

## MetaDAO / SubDAO Hierarchy

iTake implements a two-layer DAO hierarchy that separates platform governance from individual business operations.

```
┌─────────────────────────────────────────────────────────────────┐
│                       iTake MetaDAO                               │
│                     (Platform Layer)                               │
│                                                                   │
│  • Platform-wide governance and policies                         │
│  • Cross-restaurant dispute escalation                           │
│  • Shared driver pool coordination                               │
│  • Collects 0.5% MetaDAO fee                                    │
├─────────────────────────────────────────────────────────────────┤
│                    Restaurant SubDAOs                              │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Restaurant  │  │  Restaurant  │  │  Restaurant  │   ...       │
│  │  A (SubDAO)  │  │  B (SubDAO)  │  │  C (SubDAO)  │              │
│  │              │  │              │  │              │              │
│  │  Menu mgmt   │  │  Menu mgmt   │  │  Menu mgmt   │              │
│  │  Staff roles  │  │  Staff roles  │  │  Staff roles  │              │
│  │  Analytics   │  │  Analytics   │  │  Analytics   │              │
│  │  Up to 2%    │  │  Up to 2%    │  │  Up to 2%    │              │
│  │  SubDAO fee  │  │  SubDAO fee  │  │  SubDAO fee  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### MetaDAO Responsibilities

| Function | Description |
|----------|-------------|
| **Governance** | Platform-wide policies, quality standards, onboarding rules |
| **Dispute Escalation** | Handles cross-restaurant and driver-customer disputes |
| **Driver Pool** | Coordinates the shared delivery network across all restaurants |
| **Onboarding** | Approves new restaurant SubDAOs |
| **Compliance** | Enforces food safety and delivery standards |

### SubDAO Responsibilities

Each restaurant operates as an independent SubDAO with full control over:

| Function | Description |
|----------|-------------|
| **Menu Management** | Create, update, and price menu items |
| **Order Handling** | Accept, prepare, mark orders as ready |
| **Staff Roles** | Manage kitchen staff permissions (owner, manager, kitchen, viewer) |
| **Analytics** | Track orders, revenue, ratings, popular items |
| **Delivery Zones** | Configure delivery radius and fee structure |

---

## Fee Hierarchy

iTake fees stack on top of the base protocol fees. The total fee is capped at 10%, guaranteeing performers (drivers) receive at least 90% of the delivery reward.

### Full Fee Breakdown

| Recipient | Percentage | Type |
|-----------|------------|------|
| **Driver (Performer)** | >=90% | Guaranteed minimum |
| **Protocol Treasury** | 2.5% | Fixed — platform sustainability |
| **Labs Treasury** | 2.5% | Fixed — R&D and development |
| **Resolver Pool** | 2% | Fixed — dispute resolution fund |
| **iTake MetaDAO** | 0.5% | Variable — platform operations |
| **Restaurant SubDAO** | Up to 2% | Variable — set by restaurant governance |

### Example: EUR 20 Delivery

```
Driver:            EUR 18.00  (90%)
Protocol:          EUR  0.50  (2.5%)
Labs:              EUR  0.50  (2.5%)
Resolver:          EUR  0.40  (2%)
iTake (MetaDAO):   EUR  0.10  (0.5%)
Restaurant:        EUR  0.40  (2%)
────────────────────────────────
Total Fees:        EUR  2.00  (10%)
```

### Fee Cap Enforcement

The PaymentRouter contract enforces a hard cap:
- **Base protocol fees**: 7% (protocol 2.5% + labs 2.5% + resolver 2%)
- **Hierarchy fees**: Up to 3% (MetaDAO + SubDAO combined)
- **Maximum total**: 10%
- If a SubDAO sets its fee above the remaining cap, the contract reverts

> **Note**: Food revenue goes directly to the restaurant. The fee breakdown above applies only to delivery fees processed through mission escrow.

---

## How New Verticals Work

iTake is a reference implementation. Any new vertical follows the same pattern:

### 1. Deploy a MetaDAO

A new vertical deploys its own MetaDAO contract, defining:
- Vertical-specific governance rules
- MetaDAO fee percentage (0-1%)
- Onboarding criteria for SubDAOs
- Dispute escalation procedures

### 2. Onboard SubDAOs

Individual businesses deploy SubDAO contracts under the MetaDAO:
- Each SubDAO sets its own fee (0-2%)
- Staff roles and permissions are configured per SubDAO
- SubDAOs inherit the MetaDAO's governance framework

### 3. Use the Shared Infrastructure

All verticals share Horizon's core infrastructure:
- **MissionFactory** — creates missions with vertical-specific metadata
- **MissionEscrow** — holds funds until completion
- **PaymentRouter** — distributes fees according to the hierarchy
- **ReputationAttestations** — EAS-based reputation portable across verticals
- **Geofencing** — location verification for physical tasks

### Planned Verticals

| Vertical | Type | Status |
|----------|------|--------|
| **iTake** | Food Delivery | Deployed (testnet) |
| **ridesDAO** | Ride-sharing | R&D |
| **BuildDAO** | Construction / Skilled Trades | R&D |

---

## Deployed Contracts (Base Sepolia)

| Contract | Address | Purpose |
|----------|---------|---------|
| **iTakeMetaDAO** | `0x1234567890abcdef1234567890abcdef12345678` | Platform governance |
| **SubDAO (Lisbon Demo)** | `0xabcdef1234567890abcdef1234567890abcdef12` | Demo restaurant A |
| **SubDAO (Porto Demo)** | `0x567890abcdef1234567890abcdef123456789012` | Demo restaurant B |

> **Network**: Base Sepolia (Chain ID 84532). These are testnet deployments for validation.

---

## Resources

- [Economics](/docs/protocol/economics) — Base fee structure and XP
- [Token Economics](/docs/protocol/token-economics) — HRZN token, staking, governance
- [Guilds](/docs/protocol/guilds) — Guild and DAO system
- [Geofencing](/docs/protocol/geofencing) — Location verification
- [iTake Use Case](/docs/use-cases/itake) — Full consumer/driver/restaurant documentation
