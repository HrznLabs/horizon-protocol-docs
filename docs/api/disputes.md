---
sidebar_position: 8
---

# Disputes API

Dispute resolution endpoints for the DDR/LPP system.

## Endpoints

### List Disputes

<span class="api-method api-method-get">GET</span> `/resolver/disputes`

Query disputes with filters.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `state` | string | No | Filter by state: `Pending`, `Investigating`, `Resolved`, `Appealed`, `Finalized` |
| `outcome` | string | No | Filter by outcome: `None`, `PosterWins`, `PerformerWins`, `Split`, `Cancelled` |
| `role` | string | No | Filter by user role: `poster`, `performer`, `resolver`, `initiator` |

**Response**

```json
{
  "disputes": [
    {
      "id": "dispute123",
      "missionId": "mission123",
      "mission": {
        "title": "Package Delivery",
        "category": "Delivery",
        "rewardAmount": "15000000"
      },
      "state": "Investigating",
      "outcome": "None",
      "poster": {
        "id": "user1",
        "evmAddress": "0x...",
        "displayName": "Alice"
      },
      "performer": {
        "id": "user2",
        "evmAddress": "0x...",
        "displayName": "Bob"
      },
      "initiator": { ... },
      "resolver": { ... },
      "ddrAmount": 750000,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get Dispute Details

<span class="api-method api-method-get">GET</span> `/resolver/disputes/:id`

Get full details of a specific dispute.

**Response**

```json
{
  "id": "dispute123",
  "onChainId": "42",
  "escrowAddress": "0x...",
  "missionId": "mission123",
  "state": "Investigating",
  "outcome": "None",
  "ddrAmount": 750000,
  "lppAmount": 0,
  "poster": { ... },
  "performer": { ... },
  "initiator": { ... },
  "resolver": { ... },
  "posterEvidenceHash": "0x...",
  "performerEvidenceHash": null,
  "resolutionHash": null,
  "createdAt": "2025-01-15T10:00:00Z",
  "resolvedAt": null,
  "appealDeadline": null,
  "finalizedAt": null,
  "splitPercentage": null
}
```

---

### Get Disputes by Mission

<span class="api-method api-method-get">GET</span> `/resolver/disputes/mission/:missionId`

Get all disputes for a specific mission.

---

### Get User's Disputes

<span class="api-method api-method-get">GET</span> `/resolver/disputes/user/:userId`

Get all disputes involving a user.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | No | Filter by role: `poster`, `performer`, `resolver`, `initiator` |

---

### Submit Evidence

<span class="api-method api-method-post">POST</span> `/resolver/disputes/:id/evidence`

Submit evidence for a dispute. Requires authentication.

**Request Body** (multipart/form-data)

| Field | Type | Description |
|-------|------|-------------|
| `evidence` | file | Evidence file (images, documents) |
| `type` | string | `poster` or `performer` |

**Response**

```json
{
  "success": true,
  "evidenceHash": "0x...",
  "message": "Evidence submitted successfully"
}
```

---

### Get Evidence

<span class="api-method api-method-get">GET</span> `/resolver/disputes/:id/evidence`

Retrieve submitted evidence.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `poster` or `performer` |

---

### Get Resolver Queue

<span class="api-method api-method-get">GET</span> `/resolver/queue`

Get pending disputes awaiting resolver assignment.

---

### Get Resolver's Assigned Disputes

<span class="api-method api-method-get">GET</span> `/resolver/queue/resolver/:resolverId`

Get disputes assigned to a specific resolver.

---

### Get User Dispute Statistics

<span class="api-method api-method-get">GET</span> `/resolver/stats/:userId`

Get dispute statistics for a user.

**Response**

```json
{
  "totalAsPoster": 5,
  "totalAsPerformer": 12,
  "totalAsResolver": 0,
  "totalAsInitiator": 2,
  "wins": 8,
  "losses": 3,
  "splits": 1,
  "winRate": 66.67
}
```

---

## Dispute States

| State | Description |
|-------|-------------|
| `Pending` | Awaiting resolver assignment |
| `Investigating` | Resolver reviewing evidence |
| `Resolved` | Resolver made decision |
| `Appealed` | Decision appealed (LPP) |
| `Finalized` | Final outcome, funds distributed |

## Dispute Outcomes

| Outcome | Description |
|---------|-------------|
| `None` | Not yet resolved |
| `PosterWins` | Full refund to poster |
| `PerformerWins` | Full payment to performer |
| `Split` | Proportional split (splitPercentage) |
| `Cancelled` | Dispute voided |

## DDR/LPP Economics

### DDR (Dynamic Dispute Reserve)

- **Amount**: 5% of mission reward
- **Required from**: Dispute initiator
- **Purpose**: Skin in the game, discourages frivolous disputes

### LPP (Late Penalty Pool)

- **Amount**: 5% of mission reward (optional)
- **Required for**: Appeals
- **Purpose**: Discourages bad-faith appeals

### Distribution on Resolution

| Outcome | Winner Gets | Loser Forfeits |
|---------|-------------|----------------|
| PosterWins | Reward + DDR refund | Performer loses DDR |
| PerformerWins | Reward + DDR refund | Poster loses DDR |
| Split | Proportional share | Both keep DDR |



