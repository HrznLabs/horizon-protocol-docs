---
sidebar_position: 9
---

# Notifications API

Push notifications and in-app notification management.

## Endpoints

### Get Notifications

<span class="api-method api-method-get">GET</span> `/notifications`

Get user's notifications with pagination.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `unreadOnly` | boolean | Only return unread notifications |
| `type` | string | Filter by notification type |
| `skip` | number | Pagination offset |
| `take` | number | Results per page (default: 50) |

**Response**

```json
{
  "notifications": [
    {
      "id": "notif123",
      "type": "MISSION_ACCEPTED",
      "title": "Mission Accepted!",
      "body": "João has accepted your delivery mission",
      "data": {
        "missionId": "mission123",
        "performerId": "user456"
      },
      "read": false,
      "createdAt": "2025-12-01T10:00:00Z"
    }
  ],
  "unreadCount": 5,
  "total": 150
}
```

---

### Mark as Read

<span class="api-method api-method-post">POST</span> `/notifications/:id/read`

Mark a single notification as read.

---

### Mark All as Read

<span class="api-method api-method-post">POST</span> `/notifications/read-all`

Mark all notifications as read.

---

### Get Unread Count

<span class="api-method api-method-get">GET</span> `/notifications/unread-count`

**Response**

```json
{
  "count": 5
}
```

---

### Update Preferences

<span class="api-method api-method-patch">PATCH</span> `/notifications/preferences`

**Request Body**

```json
{
  "pushEnabled": true,
  "emailEnabled": false,
  "missionUpdates": true,
  "guildUpdates": true,
  "xpUpdates": false,
  "marketingUpdates": false
}
```

---

## Notification Types

| Type | Description | Default |
|------|-------------|---------|
| `MISSION_ACCEPTED` | Someone accepted your mission | ✅ On |
| `MISSION_SUBMITTED` | Performer submitted proof | ✅ On |
| `MISSION_COMPLETED` | Mission completed successfully | ✅ On |
| `MISSION_DISPUTED` | Dispute raised on mission | ✅ On |
| `GUILD_INVITE` | Invited to join a guild | ✅ On |
| `GUILD_PROMOTED` | Promoted to curator/officer | ✅ On |
| `XP_LEVEL_UP` | Reached new XP level | ✅ On |
| `ACHIEVEMENT_EARNED` | New achievement unlocked | ✅ On |
| `RATING_RECEIVED` | Someone rated you | ⚠️ Optional |
| `DISPUTE_RESOLVED` | Dispute outcome announced | ✅ On |

---

## Push Notification Setup

### Mobile (React Native)

```typescript
import * as Notifications from 'expo-notifications';

// Register for push notifications
const token = await Notifications.getExpoPushTokenAsync();

// Send token to backend
await api.post('/notifications/register-device', {
  token: token.data,
  platform: Platform.OS,
});
```

### Web (Service Worker)

```typescript
const registration = await navigator.serviceWorker.ready;
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: VAPID_PUBLIC_KEY,
});

await api.post('/notifications/register-device', {
  subscription,
  platform: 'web',
});
```



