---
sidebar_position: 7
---

# Feed API

Personalized mission discovery with intelligent ranking.

## Endpoints

### Get Personalized Feed

<span class="api-method api-method-get">GET</span> `/feed`

Returns missions ranked by relevance for the authenticated user.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `latitude` | number | User's current latitude |
| `longitude` | number | User's current longitude |
| `category` | string | Filter by category |
| `guildId` | string | Filter by guild |
| `searchQuery` | string | Full-text search |
| `sortBy` | string | `relevance`, `reward`, `distance`, `urgency` |
| `skip` | number | Pagination offset |
| `take` | number | Results per page (default: 20) |

**Response**

```json
{
  "missions": [
    {
      "mission": {
        "id": "clx123...",
        "title": "Package Delivery",
        "category": "Delivery",
        "rewardAmount": "15000000",
        "expiresAt": "2025-12-31T23:59:59Z",
        "poster": { ... },
        "guild": { ... }
      },
      "factors": {
        "eligibility": true,
        "rewardScore": 75,
        "urgencyScore": 80,
        "distanceScore": 90,
        "xpMatchScore": 65,
        "guildBoost": 1.5,
        "posterReputationScore": 85,
        "categoryPreferenceScore": 70,
        "finalScore": 82.5
      },
      "rank": 1
    }
  ],
  "total": 42
}
```

---

### Search Missions

<span class="api-method api-method-get">GET</span> `/feed/search`

Full-text search across mission titles, descriptions, and tags.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query |
| `state` | string | Filter by state |
| `category` | string | Filter by category |
| `guildId` | string | Filter by guild |
| `limit` | number | Max results (default: 50) |

**Response**

```json
{
  "results": [
    {
      "id": "clx123...",
      "title": "Package Delivery",
      "description": "Deliver package from A to B",
      "relevanceScore": 0.95,
      "highlightedTitle": "<em>Package</em> Delivery"
    }
  ],
  "query": "package",
  "total": 15
}
```

---

## Ranking Algorithm

The feed uses a weighted scoring system to personalize results:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Reward** | 25% | Higher rewards score better |
| **Urgency** | 20% | Closer deadlines score higher |
| **Distance** | 20% | Closer missions preferred |
| **XP Match** | 15% | Matches user's XP level |
| **Poster Reputation** | 10% | Higher reputation preferred |
| **Category Preference** | 10% | Based on user's history |

### Guild Boost

Missions from user's guilds receive a **1.5x multiplier** on the final score.

### Eligibility Filter

Ineligible missions (insufficient XP, not in guild, etc.) are filtered out or ranked lower.

---

## Category Preferences

The system learns user preferences based on:

- Completed mission categories
- Time spent viewing missions
- Search history
- Rating patterns

Categories with higher engagement receive higher `categoryPreferenceScore`.

