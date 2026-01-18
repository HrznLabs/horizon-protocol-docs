---
sidebar_position: 3
---

# Guilds

Guilds are coordination groups that curate missions, maintain reputation, and share rewards.

## Overview

A Guild provides:
- **Mission Board**: Curated list of quality missions
- **Reputation**: Collective trust score
- **Fee Share**: Portion of member earnings
- **Governance**: Member voting on proposals

## Guild Structure

### Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full control, can add/remove members, manage treasury |
| **Curator** | Can add missions to board, review applications |
| **Officer** | Can moderate, manage member XP |
| **Member** | Can view board, participate in votes |

### On-chain Components

```solidity
struct Guild {
    uint256 guildId;
    address contractAddress;
    string name;
    string category;
    address treasury;
    uint256 guildFeeBps;    // Fee from member earnings
    uint256 memberCount;
    uint256 guildReputation;
}
```

## Guild Board

The Guild Board is a curated list of missions recommended by curators.

### Publishing to Board

Curators can publish missions:

```
POST /guilds/:id/board/publish
{
  "missionId": "mission123",
  "notes": "High priority client",
  "minGuildXP": 100,
  "minGlobalXP": 50,
  "featured": true
}
```

### Board Entry

```json
{
  "id": "entry123",
  "missionId": "mission123",
  "mission": { ... },
  "curatorId": "curator123",
  "minGuildXP": 100,
  "minGlobalXP": 50,
  "notes": "High priority client",
  "priority": 1,
  "featured": true,
  "createdAt": "2025-12-01T10:00:00Z"
}
```

## Fee Distribution

When a guild member completes a mission, fees are split between fixed platform fees and variable guild fees:

**Fixed Fees (7% total):**

| Recipient | Percentage | Purpose |
|-----------|------------|---------|
| Protocol | 2.5% | Platform sustainability |
| Labs | 2.5% | R&D and development |
| Resolver | 2% | Dispute resolution pool |

**Variable Fees (up to 3%):**

| Recipient | Percentage | Purpose |
|-----------|------------|---------|
| MetaDAO | 0-1% | Platform fee (e.g., iTake) |
| SubDAO | 0-2% | Business fee (e.g., Restaurant) |

**Variable Guild Fee:**

| Guild Tier | Fee Range | Performer Receives |
|------------|-----------|-------------------|
| No guild | 0% | 90% |
| Basic | 1-2% | 88-89% |
| Standard | 3-5% | 85-87% |
| Premium | 5-8% | 82-85% |
| Elite | 8-10%+ | 80-82% |

Example: $100 mission with 2% SubDAO fee:
```
Performer:    $91.00 (100% - 7% fixed fees - 2% SubDAO)
Protocol:     $2.50  (2.5%)
Labs:         $2.50  (2.5%)
Resolver:     $2.00  (2%)
SubDAO:       $2.00  (2%)
```

## Guild Fee Configuration

Guilds can define multiple fee tiers to apply to different mission types.

### Fee Tier Structure

```solidity
struct FeeTier {
    string name;          // "Basic", "Standard", "Premium", "Elite"
    uint16 feeBps;        // Fee in basis points (100 = 1%)
    uint256 minReward;    // Minimum mission reward for this tier
    bool requiresApproval; // Curator must approve mission
}
```

### Example Fee Tiers

| Tier | Fee | Min Reward | Use Case |
|------|-----|------------|----------|
| Basic | 1% | $0 | Simple pickups, quick tasks |
| Standard | 3% | $20 | Regular deliveries, errands |
| Premium | 5% | $50 | Complex tasks, specialized skills |
| Elite | 8% | $100 | High-value, verified performers |

### Setting Fee Tiers

Curators apply fee tiers when adding missions to the guild board:

```
POST /guilds/:id/board/publish
{
  "missionId": "mission123",
  "feeTier": "Premium",  // Apply 5% guild fee
  "notes": "Requires vehicle"
}
```

The applied `guildFeeBps` is stored with the mission and used at settlement.

## Membership

### Joining a Guild

1. User submits application
2. Curator reviews qualifications
3. Approval or rejection
4. Membership starts

### Requirements

Guilds can set requirements:
- Minimum Global XP
- Minimum Reputation %
- Required Achievements
- Verification status

### Guild XP

Members earn Guild XP for:
- Completing guild board missions
- Referring new members
- Participating in governance
- Maintaining high ratings

## Governance

Guild DAOs enable member voting on:
- Fee changes
- Treasury allocation
- Curator elections
- Rule modifications

### Proposal Flow

```
1. Member creates proposal
2. Voting period (7 days default)
3. Quorum check
4. If passed, execute on-chain
```

## Creating a Guild

To create a new guild:

1. Call `GuildFactory.createGuild()`
2. Deploy guild DAO contract
3. Configure treasury and fees
4. Add initial members/curators

```solidity
function createGuild(
    string memory name,
    string memory category,
    address treasury,
    uint256 guildFeeBps
) external returns (address guildAddress, uint256 guildId);
```

