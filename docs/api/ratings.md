---
sidebar_position: 8
---

# Ratings API

On-chain reputation attestations using EAS (Ethereum Attestation Service).

## Overview

All ratings in Horizon are attested on-chain via **EAS on Base L2**. This provides:

- **Permanent record** of reputation
- **Verifiable** on any block explorer
- **Portable** across dApps
- **Gasless** via CDP Paymaster sponsorship

## Endpoints

### Submit Rating

<span class="api-method api-method-post">POST</span> `/ratings/mission/:missionId`

Submit a rating after mission completion. Creates an on-chain EAS attestation.

**Request Body**

```json
{
  "score": 5,
  "comment": "Excellent work, delivered on time!"
}
```

**Response**

```json
{
  "id": "rating123",
  "missionId": "mission123",
  "raterId": "user456",
  "rateeId": "user789",
  "score": 5,
  "comment": "Excellent work, delivered on time!",
  "signature": "0x...",
  "easUid": "0x1234567890abcdef...",
  "onChainTxHash": "0xabc123...",
  "isOnChain": true,
  "explorerUrl": "https://base-sepolia.easscan.org/attestation/view/0x...",
  "createdAt": "2025-12-01T10:00:00Z"
}
```

---

### Get Mission Ratings

<span class="api-method api-method-get">GET</span> `/ratings/mission/:missionId`

Get all ratings for a specific mission.

**Response**

```json
[
  {
    "id": "rating123",
    "rater": {
      "id": "user456",
      "displayName": "João",
      "evmAddress": "0x..."
    },
    "ratee": {
      "id": "user789",
      "displayName": "Maria",
      "evmAddress": "0x..."
    },
    "score": 5,
    "comment": "Excellent!",
    "easUid": "0x...",
    "isOnChain": true,
    "createdAt": "2025-12-01T10:00:00Z"
  }
]
```

---

### Get User Rating Stats

<span class="api-method api-method-get">GET</span> `/ratings/user/:userId/stats`

Get aggregated rating statistics for a user.

**Response**

```json
{
  "userId": "user789",
  "averageScore": 4.8,
  "totalRatings": 156,
  "ratingDistribution": {
    "5": 120,
    "4": 28,
    "3": 6,
    "2": 1,
    "1": 1
  },
  "asPerformer": {
    "average": 4.9,
    "count": 134
  },
  "asPoster": {
    "average": 4.6,
    "count": 22
  }
}
```

---

### Verify Rating On-Chain

<span class="api-method api-method-get">GET</span> `/ratings/:id/verify`

Verify a rating's on-chain attestation status.

**Response**

```json
{
  "id": "rating123",
  "easUid": "0x1234567890abcdef...",
  "isOnChain": true,
  "verified": true,
  "attestation": {
    "schemaId": "0x...",
    "recipient": "0x...",
    "attester": "0x...",
    "time": 1704067200,
    "revocable": false
  },
  "explorerUrl": "https://base-sepolia.easscan.org/attestation/view/0x..."
}
```

---

## EAS Schema

Ratings use a custom EAS schema on Base:

```solidity
bytes32 missionId,
address rater,
address ratee,
uint8 score,
string comment,
uint256 timestamp
```

### Schema UID

| Network | Schema UID |
|---------|------------|
| Base Sepolia | `0x...` (see deployment docs) |
| Base Mainnet | Coming soon |

---

## Gasless Attestations

Rating attestations are **gas-sponsored** via Coinbase Developer Platform:

1. User submits rating via API
2. Backend signs EAS attestation request
3. CDP Paymaster sponsors the transaction gas
4. Attestation recorded on Base L2
5. User pays $0 in gas fees

This enables seamless UX where users can rate without holding ETH for gas.

---

## Reputation Impact

Ratings affect user reputation score:

| Rating | Reputation Impact |
|--------|-------------------|
| 5 stars | +5 reputation |
| 4 stars | +2 reputation |
| 3 stars | 0 (neutral) |
| 2 stars | -3 reputation |
| 1 star | -5 reputation |

Reputation is used for:
- Mission eligibility requirements
- Guild membership criteria
- Feed ranking algorithm
- Trust indicators in UI



