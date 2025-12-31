---
sidebar_position: 3
---

# Guilds API

Manage guilds, membership, and mission boards.

## Endpoints

### List Guilds

<span class="api-method api-method-get">GET</span> `/guilds`

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `skip` | number | Pagination offset |
| `take` | number | Results per page |
| `category` | string | Filter by category |

**Response**

```json
[
  {
    "id": "guild123",
    "onChainId": "1",
    "contractAddress": "0x...",
    "name": "lisbon-couriers",
    "displayName": "Lisbon Couriers",
    "description": "Premier delivery guild",
    "category": "Delivery",
    "memberCount": 234,
    "totalCompleted": 4521,
    "totalEarned": "45670000000",
    "guildReputation": 92,
    "guildFeeBps": 300
  }
]
```

---

### Get Guild

<span class="api-method api-method-get">GET</span> `/guilds/:id`

---

### Get Guild Members

<span class="api-method api-method-get">GET</span> `/guilds/:id/members`

**Response**

```json
[
  {
    "id": "member123",
    "user": {
      "id": "user123",
      "displayName": "João",
      "evmAddress": "0x..."
    },
    "isCurator": true,
    "isOfficer": false,
    "isAdmin": false,
    "guildXP": 1250,
    "joinedAt": "2025-01-01T00:00:00Z"
  }
]
```

---

### Get Guild Board

<span class="api-method api-method-get">GET</span> `/guilds/:id/board`

**Response**

```json
[
  {
    "id": "entry123",
    "missionId": "mission123",
    "mission": { ... },
    "curatorId": "curator123",
    "minGuildXP": 100,
    "notes": "Priority client",
    "featured": true,
    "createdAt": "2025-12-01T00:00:00Z"
  }
]
```

---

### Join Guild

<span class="api-method api-method-post">POST</span> `/guilds/:id/join`

Requires authentication.

---

### Leave Guild

<span class="api-method api-method-post">POST</span> `/guilds/:id/leave`

Requires authentication.

---

### Publish to Board

<span class="api-method api-method-post">POST</span> `/guilds/:id/board/publish`

Requires curator role.

**Request Body**

```json
{
  "missionId": "mission123",
  "notes": "High priority",
  "minGuildXP": 100,
  "featured": true
}
```

