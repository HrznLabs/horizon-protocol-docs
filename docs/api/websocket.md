---
sidebar_position: 7
---

# WebSocket API

Real-time events for mission updates and location tracking.

## Connection

```javascript
import { io } from 'socket.io-client';

const socket = io('wss://api.horizon.xyz', {
  transports: ['websocket'],
  auth: {
    token: 'Bearer <jwt>'
  }
});

socket.on('connect', () => {
  console.log('Connected');
});
```

---

## Subscriptions

### Subscribe to Geohash

Receive mission events in a geographic area.

```javascript
// Subscribe
socket.emit('subscribe:geohash', { geohash: 'eyckp5' });

// Unsubscribe
socket.emit('unsubscribe:geohash', { geohash: 'eyckp5' });
```

### Subscribe to Mission

Receive updates for a specific mission.

```javascript
// Subscribe
socket.emit('subscribe:mission', { missionId: 'mission123' });

// Unsubscribe
socket.emit('unsubscribe:mission', { missionId: 'mission123' });
```

---

## Events

### mission:created

New mission in subscribed area.

```json
{
  "missionId": "mission123",
  "geohash": "eyckp5",
  "category": "Delivery",
  "rewardAmount": "15000000",
  "guildId": "guild123"
}
```

### mission:accepted

Mission was accepted by a performer.

```json
{
  "missionId": "mission123",
  "performerAddress": "0x..."
}
```

### mission:submitted

Proof submitted for mission.

```json
{
  "missionId": "mission123"
}
```

### mission:completed

Mission successfully completed.

```json
{
  "missionId": "mission123",
  "performerAddress": "0x...",
  "completedAt": "2025-12-01T10:00:00Z"
}
```

### mission:cancelled

Mission was cancelled.

```json
{
  "missionId": "mission123"
}
```

### mission:disputed

Dispute raised on mission.

```json
{
  "missionId": "mission123"
}
```

---

## Live Tracking

### Enable Tracking (Performer)

Opt-in to share location with poster.

```javascript
socket.emit('tracking:enable', { missionId: 'mission123' });
```

### Disable Tracking

```javascript
socket.emit('tracking:disable', { missionId: 'mission123' });
```

### Send Location

```javascript
socket.emit('performer:location', {
  missionId: 'mission123',
  latitude: 38.7225,
  longitude: -9.1395,
  accuracy: 10
});
```

### Receive Location (Poster)

```javascript
socket.on('performer:location', (data) => {
  // { missionId, latitude, longitude, accuracy, timestamp }
  updatePerformerMarker(data);
});
```

---

## Error Events

```javascript
socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
```

---

## Reconnection

```javascript
const socket = io('wss://api.horizon.xyz', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
  // Re-subscribe to channels
  socket.emit('subscribe:geohash', { geohash: currentGeohash });
});
```

