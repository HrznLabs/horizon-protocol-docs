---
sidebar_position: 5
---

# Map API

Geospatial queries and location verification.

## Endpoints

### Get Nearby Missions

<span class="api-method api-method-get">GET</span> `/missions/nearby`

Find missions near a location.

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | number | Yes | Center latitude |
| `longitude` | number | Yes | Center longitude |
| `radius` | number | No | Search radius in meters (default: 5000) |
| `limit` | number | No | Max results (default: 50, max: 100) |
| `category` | string | No | Filter by category |
| `guildId` | string | No | Filter by guild |
| `minReward` | number | No | Minimum reward in USDC |
| `maxReward` | number | No | Maximum reward in USDC |

**Response**

```json
{
  "missions": [
    {
      "id": "mission123",
      "title": "Package Delivery",
      "category": "Delivery",
      "rewardAmount": "15000000",
      "distance": 850,
      "location": {
        "latitude": 38.7230,
        "longitude": -9.1400,
        "geohash": "eyckp5",
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
      "bounds": {
        "north": 38.725,
        "south": 38.715,
        "east": -9.130,
        "west": -9.140
      },
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

Verify performer is within geofence.

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

## Location Privacy

### Precision Levels

| Precision | Revealed | When |
|-----------|----------|------|
| 0 (Exact) | Full coordinates | After acceptance |
| 1 (Block) | Street block | After acceptance |
| 2 (Neighborhood) | Area only | Before acceptance |

### Geohash Channels

WebSocket subscriptions by geohash:

```javascript
// Subscribe to area
socket.emit('subscribe:geohash', { geohash: 'eyckp5' });

// Receive new missions
socket.on('mission:created', (data) => {
  // Add marker to map
});
```

---

## GPS Grace Period

100m grace period for GPS inaccuracy:

```
Effective radius = geofenceRadius + 100m

Example:
- Geofence: 50m
- Distance: 120m
- Within geofence: false
- Within grace: true
- Verified: true (with graceApplied: true)
```

