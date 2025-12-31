---
sidebar_position: 6
---

# XP & NFT API

Experience points, levels, and achievement NFTs.

## XP Endpoints

### Get User XP

<span class="api-method api-method-get">GET</span> `/xp/:userId`

**Response**

```json
{
  "userId": "user123",
  "totalXP": 1250,
  "level": 5,
  "levelTitle": "Voyager",
  "xpToNextLevel": 750,
  "progress": 62.5,
  "builderScore": 75,
  "builderLevel": "advanced",
  "xpMultiplier": 1.20
}
```

---

### Get My XP

<span class="api-method api-method-get">GET</span> `/xp/me`

---

### Get XP Ledger

<span class="api-method api-method-get">GET</span> `/xp/:userId/ledger`

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Results per page (default: 50) |

**Response**

```json
[
  {
    "id": "entry123",
    "xpDelta": 25,
    "source": "mission_complete",
    "missionId": "mission123",
    "reason": "Mission completed successfully",
    "balanceAfter": 1250,
    "createdAt": "2025-12-01T10:00:00Z"
  }
]
```

---

### Get Leaderboard

<span class="api-method api-method-get">GET</span> `/xp/leaderboard`

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Top N users (default: 100) |
| `type` | string | `global` or `builders` |

**Response**

```json
[
  {
    "user": {
      "id": "user123",
      "displayName": "TopPerformer",
      "evmAddress": "0x..."
    },
    "xp": 5000,
    "rank": 1,
    "builderScore": 85
  }
]
```

---

### Get Builder Leaderboard

<span class="api-method api-method-get">GET</span> `/xp/leaderboard/builders`

Leaderboard filtered to users with Talent Protocol Builder Score.

---

## NFT Endpoints

### Get User NFTs

<span class="api-method api-method-get">GET</span> `/nft/:userId`

**Response**

```json
[
  {
    "id": "nft123",
    "tokenId": "1",
    "contractAddress": "0x...",
    "type": "Milestone",
    "name": "First Mission",
    "description": "Completed your first mission",
    "image": "ipfs://...",
    "isSoulbound": true,
    "attributes": {
      "missionId": "mission123",
      "completedAt": "2025-12-01T10:00:00Z"
    },
    "mintedAt": "2025-12-01T10:05:00Z"
  }
]
```

---

### Get Achievements

<span class="api-method api-method-get">GET</span> `/nft/:userId/achievements`

Soulbound NFTs only.

---

### Get Collectibles

<span class="api-method api-method-get">GET</span> `/nft/:userId/collectibles`

Tradable NFTs only.

---

### Get Available Achievements

<span class="api-method api-method-get">GET</span> `/nft/achievements`

All possible achievements.

**Response**

```json
[
  {
    "id": "first_mission",
    "name": "First Mission",
    "description": "Complete your first mission",
    "image": "ipfs://...",
    "requirements": "Complete 1 mission",
    "xpReward": 25
  },
  {
    "id": "speed_runner",
    "name": "Speed Runner",
    "description": "Complete a mission in under 30 minutes",
    "image": "ipfs://...",
    "requirements": "Complete mission with <30 min duration",
    "xpReward": 50
  }
]
```

---

## XP Sources

| Source | XP | Notes |
|--------|-----|-------|
| `mission_complete` | 10-50 | Based on reward |
| `first_mission` | 25 | One-time bonus |
| `perfect_rating` | 10 | 5/5 rating |
| `mission_streak` | +15% | 5+ consecutive |
| `guild_board` | +10% | From guild board |
| `referral` | 20 | Per referred user |
| `curation_success` | 20 | Mission you curated completed |
| `dispute_won` | 100 | Won a dispute |
| `dispute_lost` | -50 | Lost a dispute |

---

## Builder Score Multipliers

Users with [Talent Protocol](https://talentprotocol.com) Builder Score get XP bonuses:

| Builder Level | Score Range | XP Multiplier |
|---------------|-------------|---------------|
| Novice | 0-24 | 1.0x (no bonus) |
| Apprentice | 25-49 | 1.05x (+5%) |
| Practitioner | 50-74 | 1.10x (+10%) |
| Advanced | 75-89 | 1.20x (+20%) |
| Expert | 90-99 | 1.35x (+35%) |
| Master | 100 | 1.50x (+50%) |

**Example**: A Master-level builder completing a 50 XP mission earns 75 XP (50 × 1.5).

---

## Streak System

Consecutive mission completions earn bonus XP:

| Streak | Bonus | Total Multiplier |
|--------|-------|------------------|
| 1-4 missions | 0% | 1.0x |
| 5-9 missions | +15% | 1.15x |
| 10-19 missions | +25% | 1.25x |
| 20+ missions | +35% | 1.35x |

**Note**: Streaks reset after 7 days of inactivity.

---

## Level Progression

| Level | Title | XP Required |
|-------|-------|-------------|
| 1 | Novice | 0 |
| 2 | Apprentice | 100 |
| 3 | Explorer | 300 |
| 4 | Pathfinder | 600 |
| 5 | Voyager | 1,000 |
| 6 | Navigator | 2,000 |
| 7 | Pioneer | 3,500 |
| 8 | Trailblazer | 5,500 |
| 9 | Legend | 8,000 |
| 10 | Master | 12,000 |
