---
sidebar_position: 4
---

# Users API

Manage user profiles, ratings, and reputation.

## Endpoints

### Get Current User

<span class="api-method api-method-get">GET</span> `/users/me`

**Response**

```json
{
  "id": "user123",
  "evmAddress": "0x...",
  "solanaAddress": "...",
  "displayName": "João",
  "avatar": "https://...",
  "bio": "Delivery expert",
  "globalXP": 1250,
  "reputation": 92,
  "totalEarned": "5670000000",
  "totalSpent": "1230000000",
  "createdAt": "2025-01-01T00:00:00Z",
  "lastActiveAt": "2025-12-01T00:00:00Z"
}
```

---

### Update Profile

<span class="api-method api-method-put">PATCH</span> `/users/me`

**Request Body**

```json
{
  "displayName": "João Silva",
  "bio": "Expert courier",
  "avatar": "https://..."
}
```

---

### Get User Stats

<span class="api-method api-method-get">GET</span> `/users/:id/stats`

**Response**

```json
{
  "missionsPosted": 45,
  "missionsCompleted": 234,
  "averageRating": 4.8,
  "ratingCount": 189,
  "disputesWon": 2,
  "disputesLost": 0
}
```

---

### Get User Ratings

<span class="api-method api-method-get">GET</span> `/users/:id/ratings`

**Response**

```json
[
  {
    "id": "rating123",
    "missionId": "mission123",
    "rater": { "id": "...", "displayName": "..." },
    "ratee": { "id": "...", "displayName": "..." },
    "score": 5,
    "comment": "Excellent service!",
    "createdAt": "2025-12-01T00:00:00Z"
  }
]
```

---

### Submit Rating

<span class="api-method api-method-post">POST</span> `/ratings`

**Request Body**

```json
{
  "missionId": "mission123",
  "score": 5,
  "comment": "Great work!"
}
```

---

### Link Solana Address

<span class="api-method api-method-post">POST</span> `/users/me/link-solana`

**Request Body**

```json
{
  "solanaAddress": "...",
  "signature": "..."
}
```

