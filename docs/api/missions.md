---
sidebar_position: 2
---

# Missions API

Create, query, and manage missions.

## Endpoints

### List Missions

<span class="api-method api-method-get">GET</span> `/missions`

Query missions with filters and pagination.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `skip` | number | Offset for pagination |
| `take` | number | Number of results (max 100) |
| `state` | string | Filter by state: `Open`, `Accepted`, `Submitted`, `Completed`, `Cancelled`, `Disputed` |
| `category` | string | Filter by category |
| `guildId` | string | Filter by guild |

**Response**

```json
{
  "missions": [
    {
      "id": "clx123...",
      "onChainId": "1",
      "escrowAddress": "0x...",
      "state": "Open",
      "title": "Package Delivery",
      "description": "Deliver package from A to B",
      "category": "Delivery",
      "rewardAmount": "15000000",
      "poster": {
        "id": "user123",
        "evmAddress": "0x...",
        "displayName": "TechStore"
      },
      "expiresAt": "2025-12-31T23:59:59Z",
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ],
  "total": 150,
  "hasMore": true
}
```

---

### Get Mission

<span class="api-method api-method-get">GET</span> `/missions/:id`

Get a single mission by ID.

**Response**

```json
{
  "id": "clx123...",
  "onChainId": "1",
  "escrowAddress": "0x...",
  "state": "Accepted",
  "title": "Package Delivery",
  "description": "Deliver package from A to B",
  "category": "Delivery",
  "rewardAmount": "15000000",
  "poster": { ... },
  "performer": { ... },
  "guild": { ... },
  "location": {
    "latitude": 38.7223,
    "longitude": -9.1393,
    "geohash": "eyckp",
    "precision": 2
  },
  "geofenceRadius": 100,
  "requirePresence": true,
  "expiresAt": "2025-12-31T23:59:59Z",
  "acceptedAt": "2025-12-10T15:00:00Z",
  "createdAt": "2025-12-01T10:00:00Z"
}
```

---

### Get Nearby Missions

<span class="api-method api-method-get">GET</span> `/missions/nearby`

Find missions near a location (for map).

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `latitude` | number | Required. Center latitude |
| `longitude` | number | Required. Center longitude |
| `radius` | number | Search radius in meters (default: 5000) |
| `limit` | number | Max results (default: 50) |
| `category` | string | Filter by category |
| `guildId` | string | Filter by guild |

**Response**

```json
{
  "missions": [
    {
      "id": "clx123...",
      "title": "Package Delivery",
      "category": "Delivery",
      "rewardAmount": "15000000",
      "distance": 850,
      "location": {
        "latitude": 38.7230,
        "longitude": -9.1400,
        "geohash": "eyckp",
        "precision": 2
      },
      "isEligible": true,
      "guildId": "guild123",
      "guildName": "Lisbon Couriers",
      "expiresAt": "2025-12-31T23:59:59Z"
    }
  ],
  "clusters": [
    {
      "latitude": 38.7200,
      "longitude": -9.1350,
      "count": 5,
      "bounds": { ... },
      "expansionZoom": 15
    }
  ],
  "totalCount": 42,
  "bounds": {
    "north": 38.77,
    "south": 38.67,
    "east": -9.08,
    "west": -9.20
  }
}
```

---

### Verify Presence

<span class="api-method api-method-post">POST</span> `/missions/:id/verify-presence`

Verify performer is within mission geofence.

**Request Body**

```json
{
  "latitude": 38.7225,
  "longitude": -9.1395,
  "accuracy": 10
}
```

**Response**

```json
{
  "verified": true,
  "distanceFromMission": 25,
  "withinGeofence": true,
  "geofenceRadius": 100,
  "graceApplied": false
}
```

---

### Get Mission Counts

<span class="api-method api-method-get">GET</span> `/missions/counts`

Get mission counts by state.

**Response**

```json
{
  "Open": 42,
  "Accepted": 15,
  "Submitted": 3,
  "Completed": 1250,
  "Cancelled": 23,
  "Disputed": 2
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid parameters |
| 401 | Not authenticated |
| 403 | Not authorized (not poster/performer) |
| 404 | Mission not found |
| 409 | Invalid state transition |

