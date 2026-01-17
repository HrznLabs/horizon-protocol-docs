---
sidebar_position: 9
---

# Data Vault API

Privacy-focused data management with GDPR compliance features.

## Overview

The Data Vault provides:

- **Encrypted Storage** - User data encrypted at rest
- **Data Export** - Full GDPR-compliant data export
- **Data Deletion** - Right to be forgotten
- **Permission Control** - Granular data access settings

---

## Endpoints

### Initialize Vault

<span class="api-method api-method-post">POST</span> `/vault/initialize`

Initialize a data vault for the authenticated user. Called automatically on account creation.

**Response**

```json
{
  "success": true,
  "message": "Vault initialized"
}
```

---

### Sync Vault

<span class="api-method api-method-post">POST</span> `/vault/sync`

Rebuild vault data from current database state.

**Response**

```json
{
  "success": true,
  "lastSyncedAt": "2025-01-15T10:00:00Z"
}
```

---

### Export All Data

<span class="api-method api-method-get">GET</span> `/vault/export`

Export all user data in JSON format. GDPR Article 20 compliant.

**Response**

```json
{
  "exportedAt": "2025-01-15T10:00:00Z",
  "user": {
    "id": "user123",
    "evmAddress": "0x...",
    "displayName": "Alice",
    "bio": "Courier in Lisbon",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "missions": {
    "posted": [...],
    "performed": [...]
  },
  "xp": {
    "total": 1250,
    "level": 5,
    "history": [...]
  },
  "guilds": [...],
  "achievements": [...],
  "ratings": {
    "given": [...],
    "received": [...]
  },
  "disputes": [...],
  "notifications": {
    "preferences": {...}
  }
}
```

---

### Delete All Data

<span class="api-method api-method-delete">DELETE</span> `/vault/delete`

Delete all off-chain user data. GDPR Article 17 (right to be forgotten).

**⚠️ Warning**: This action is irreversible. On-chain data cannot be deleted.

**Request Body**

```json
{
  "confirmation": "DELETE_ALL_MY_DATA"
}
```

**Response**

```json
{
  "success": true,
  "message": "All off-chain data deleted",
  "deletedAt": "2025-01-15T10:00:00Z",
  "note": "On-chain data (wallet address, transactions) cannot be deleted"
}
```

---

## Data Categories

### Deletable (Off-chain)

| Category | Description |
|----------|-------------|
| Profile | Display name, bio, avatar |
| Location History | GPS data (auto-purged after 30 days anyway) |
| Notification Preferences | Push settings |
| Device Tokens | Push notification tokens |
| Session Data | Login sessions |

### Non-Deletable (On-chain)

| Category | Description |
|----------|-------------|
| Wallet Address | Primary EVM address |
| Mission Contracts | Escrow addresses |
| Reputation Attestations | EAS attestations |
| Achievement NFTs | Soulbound tokens |
| Guild Memberships | On-chain guild records |

---

## Permission Settings

### Get Permissions

<span class="api-method api-method-get">GET</span> `/vault/permissions`

**Response**

```json
{
  "locationSharing": {
    "enabled": true,
    "precision": "neighborhood",
    "liveTrackingConsent": false
  },
  "profileVisibility": {
    "displayName": "public",
    "bio": "public",
    "stats": "public",
    "missionHistory": "guilds_only"
  },
  "notifications": {
    "push": true,
    "email": false,
    "marketing": false
  }
}
```

### Update Permissions

<span class="api-method api-method-patch">PATCH</span> `/vault/permissions`

**Request Body**

```json
{
  "locationSharing": {
    "liveTrackingConsent": true
  },
  "profileVisibility": {
    "missionHistory": "private"
  }
}
```

---

## Privacy Principles

### Data Minimization

- Location data purged after **30 days**
- No background tracking
- Approximate locations until mission acceptance

### Consent-Based

- Live tracking requires **explicit opt-in** per mission
- Consent is **revocable** at any time
- Clear disclosure of data usage

### Encryption

- Vault data encrypted with user-specific keys
- TLS 1.3 for all API communications
- No plaintext storage of sensitive data

---

## Retention Policy

| Data Type | Retention |
|-----------|-----------|
| Profile data | Until deletion |
| Location history | 30 days |
| Mission data | Permanent (linked to on-chain) |
| Session tokens | 24 hours |
| Notification tokens | Until revoked |
| Export logs | 90 days |



