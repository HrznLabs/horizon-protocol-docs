---
sidebar_position: 3
---

# Map Layer

The Map Layer enables location-based mission discovery and geofence verification.

## Features

### Mission Discovery
- Browse missions on an interactive map
- Filter by category, reward, distance
- Real-time updates when new missions are created
- Clustering for dense areas

### Geofence Verification
- Verify performer presence at mission location
- Configurable geofence radius per mission
- GPS accuracy tolerance built-in

### Location Privacy

Horizon prioritizes user privacy in location handling:

**Before Mission Acceptance:**
- Neighborhood-level precision shown
- Exact address hidden
- Approximate location for browsing

**After Performer Accepts:**
- Full coordinates revealed to performer only
- Real-time tracking available (opt-in)
- Location shared only between poster and performer

**Data Minimization:**
- Location data purged after 30 days
- No background tracking
- Explicit consent required for live updates

## API Endpoints

### Get Nearby Missions

```
GET /missions/nearby?latitude=38.72&longitude=-9.14&radius=5000
```

Returns missions within radius (meters) of the given coordinates.

### Verify Presence

```
POST /missions/:id/verify-presence
{
  "latitude": 38.7225,
  "longitude": -9.1395,
  "accuracy": 10
}
```

Checks if the performer is within the mission's geofence.

## WebSocket Events

### Subscribe to Area

```javascript
socket.emit('subscribe:area', { 
  latitude: 38.72, 
  longitude: -9.14, 
  radius: 5000 
});
```

### New Mission in Area

```javascript
socket.on('mission:created', (data) => {
  // { missionId, category, rewardAmount, location }
});
```

### Mission Status Update

```javascript
socket.on('mission:updated', (data) => {
  // { missionId, state, performerId }
});
```
