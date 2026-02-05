---
sidebar_position: 2
---

# Missions API

The Missions API allows you to create, manage, and discover missions on Horizon Protocol.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/missions` | List missions |
| GET | `/missions/:id` | Get mission details |
| POST | `/missions` | Create mission |
| PATCH | `/missions/:id` | Update mission |
| POST | `/missions/:id/accept` | Accept mission |
| POST | `/missions/:id/submit` | Submit proof |
| POST | `/missions/:id/approve` | Approve completion |
| POST | `/missions/:id/cancel` | Cancel mission |
| POST | `/missions/:id/dispute` | Raise dispute |

## List Missions

```http
GET /missions
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | string | Filter by state: `Open`, `Accepted`, `Submitted`, `Completed`, `Cancelled`, `Disputed` |
| `category` | string | Filter by category |
| `guildId` | string | Filter by guild |
| `posterId` | string | Filter by poster |
| `performerId` | string | Filter by performer |
| `minReward` | string | Minimum reward amount |
| `maxReward` | string | Maximum reward amount |
| `skip` | number | Pagination offset |
| `take` | number | Results per page (max 100) |
| `sortBy` | string | Sort field: `createdAt`, `rewardAmount`, `expiresAt` |
| `sortOrder` | string | `asc` or `desc` |

### Response

```json
{
  "data": [
    {
      "id": "mission-uuid",
      "onChainId": "123",
      "title": "Deliver package",
      "description": "Pick up from store...",
      "state": "Open",
      "category": "delivery",
      "rewardAmount": "10.000000",
      "poster": {
        "id": "user-uuid",
        "evmAddress": "0x...",
        "resolvedName": "alice.eth"
      },
      "performer": null,
      "guild": {
        "id": "guild-uuid",
        "name": "Delivery Guild"
      },
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "radius": 100
      },
      "expiresAt": "2026-01-18T12:00:00Z",
      "createdAt": "2026-01-17T12:00:00Z"
    }
  ],
  "meta": {
    "skip": 0,
    "take": 20,
    "total": 150
  }
}
```

## Get Mission

```http
GET /missions/:id
```

### Response

```json
{
  "data": {
    "id": "mission-uuid",
    "onChainId": "123",
    "escrowAddress": "0x...",
    "title": "Deliver package",
    "description": "Full description...",
    "state": "Open",
    "category": "delivery",
    "rewardAmount": "10.000000",
    "ddrAmount": "0.500000",
    "poster": { ... },
    "performer": null,
    "guild": { ... },
    "location": { ... },
    "proofHash": null,
    "metadata": { ... },
    "expiresAt": "2026-01-18T12:00:00Z",
    "createdAt": "2026-01-17T12:00:00Z",
    "acceptedAt": null,
    "completedAt": null
  }
}
```

## Create Mission

```http
POST /missions
```

### Request Body

```json
{
  "title": "Deliver package",
  "description": "Pick up from Joe's Coffee (123 Main St) and deliver to Central Park entrance",
  "rewardAmount": "10.00",
  "category": "delivery",
  "expiresIn": 86400,
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "radius": 100
  },
  "guildId": "guild-uuid",
  "metadata": {
    "pickupAddress": "123 Main St",
    "dropoffAddress": "Central Park South"
  }
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Mission title (max 100 chars) |
| `description` | string | Yes | Detailed description |
| `rewardAmount` | string | Yes | USDC amount (e.g., "10.00") |
| `category` | string | Yes | Mission category |
| `expiresIn` | number | Yes | Seconds until expiration |
| `location` | object | No | Location requirements |
| `guildId` | string | No | Associated guild |
| `metadata` | object | No | Additional data |

### Response

```json
{
  "data": {
    "id": "mission-uuid",
    "onChainId": "123",
    "escrowAddress": "0x...",
    "transactionHash": "0x...",
    ...
  }
}
```

## Accept Mission

```http
POST /missions/:id/accept
```

### Response

```json
{
  "data": {
    "success": true,
    "transactionHash": "0x...",
    "mission": { ... }
  }
}
```

## Submit Proof

```http
POST /missions/:id/submit
```

### Request Body

```json
{
  "proofType": "photo",
  "proofData": "ipfs://...",
  "notes": "Delivered to front desk"
}
```

### Response

```json
{
  "data": {
    "success": true,
    "transactionHash": "0x...",
    "proofHash": "ipfs://..."
  }
}
```

## Approve Completion

```http
POST /missions/:id/approve
```

Poster approves that the mission was completed successfully.

### Request Body

```json
{
  "rating": 5,
  "feedback": "Great job!"
}
```

### Response

```json
{
  "data": {
    "success": true,
    "transactionHash": "0x...",
    "settlement": {
      "performerAmount": "9.000000",
      "protocolAmount": "0.250000",
      "guildAmount": "0.300000",
      "labsAmount": "0.250000",
      "resolverAmount": "0.200000"
    }
  }
}
```

## Cancel Mission

```http
POST /missions/:id/cancel
```

Only the poster can cancel, and only before acceptance.

### Response

```json
{
  "data": {
    "success": true,
    "transactionHash": "0x...",
    "refundAmount": "10.000000"
  }
}
```

## Raise Dispute

```http
POST /missions/:id/dispute
```

Either party can raise a dispute after submission.

### Request Body

```json
{
  "reason": "Work not completed as specified",
  "evidence": "ipfs://..."
}
```

### Response

```json
{
  "data": {
    "success": true,
    "disputeId": "dispute-uuid",
    "onChainDisputeId": "456"
  }
}
```

## Mission States

| State | Description |
|-------|-------------|
| `Open` | Available for acceptance |
| `Accepted` | Claimed by performer |
| `Submitted` | Proof submitted, awaiting approval |
| `Completed` | Approved and settled |
| `Cancelled` | Cancelled by poster |
| `Expired` | Expired without acceptance |
| `Disputed` | In dispute resolution |

## Error Responses

| Code | Description |
|------|-------------|
| `MISSION_NOT_FOUND` | Mission doesn't exist |
| `MISSION_NOT_OPEN` | Cannot accept - wrong state |
| `ALREADY_ACCEPTED` | Mission already has performer |
| `NOT_POSTER` | Only poster can perform action |
| `NOT_PERFORMER` | Only performer can perform action |
| `INSUFFICIENT_BALANCE` | Not enough USDC |
| `INELIGIBLE` | User doesn't meet requirements |

## Webhooks (Coming Soon)

Subscribe to mission events:

```json
{
  "event": "mission.accepted",
  "data": {
    "missionId": "mission-uuid",
    "performerId": "user-uuid",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

## SDK Example

```typescript
import { parseUSDC } from '@horizon-protocol/sdk';

// Create mission via API
const response = await fetch('https://api.horizon.dev/missions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Deliver package',
    description: 'Pick up and deliver',
    rewardAmount: '10.00',
    category: 'delivery',
    expiresIn: 86400,
  }),
});const { data } = await response.json();
console.log('Mission created:', data.id);
```
