---
sidebar_position: 2
---

# Creating Missions

This guide covers everything you need to know about creating missions on Horizon Protocol. Missions are the core unit of work coordination in the ecosystem.

## Mission Anatomy

Every mission has these core components:

| Component | Description | Required |
|-----------|-------------|----------|
| **Title** | Brief description (max 100 chars) | Yes |
| **Description** | Detailed requirements | Yes |
| **Reward** | USDC amount held in escrow | Yes |
| **Category** | Mission type (delivery, task, etc.) | Yes |
| **Expiration** | When the mission expires | Yes |
| **Location** | Where the mission takes place | Optional |
| **Guild** | Associated guild (if any) | Optional |

## Creating a Basic Mission

### Using the SDK

```typescript
import { MissionFactoryABI, parseUSDC, toBytes32 } from '@horizon-protocol/sdk';

// 1. Approve USDC spending
await walletClient.writeContract({
  address: contracts.usdc,
  abi: ERC20ABI,
  functionName: 'approve',
  args: [contracts.missionFactory, parseUSDC('10')],
});

// 2. Create mission
const hash = await walletClient.writeContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    'Deliver package',                    // title
    'Pick up from store, deliver to park', // description
    parseUSDC('10'),                       // reward (10 USDC)
    toBytes32('delivery'),                 // category
    BigInt(Math.floor(Date.now() / 1000) + 86400), // expires in 24h
  ],
});

await publicClient.waitForTransactionReceipt({ hash });
```

### Using the API

```typescript
const mission = await fetch('https://api.horizon.dev/missions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Deliver package',
    description: 'Pick up from store, deliver to park',
    rewardAmount: '10.00',
    category: 'delivery',
    expiresIn: 86400, // seconds
  }),
});
```

## Mission Categories

Use standardized categories for better discovery:

| Category | Use Case |
|----------|----------|
| `delivery` | Physical item delivery |
| `errand` | General errands and tasks |
| `survey` | Data collection |
| `review` | Reviews and feedback |
| `photo` | Photography tasks |
| `social` | Social media tasks |
| `custom` | Other tasks |

## Adding Location

For location-based missions:

```typescript
const hash = await walletClient.writeContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMissionWithLocation',
  args: [
    'Deliver package',
    'Pick up from Central Park',
    parseUSDC('10'),
    toBytes32('delivery'),
    BigInt(Math.floor(Date.now() / 1000) + 86400),
    {
      latitude: 40.7829,  // Central Park
      longitude: -73.9654,
      radius: 100,        // meters
    },
  ],
});
```

## Guild Missions

Create missions associated with a guild:

```typescript
const hash = await walletClient.writeContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createGuildMission',
  args: [
    'Guild task',
    'Complete this task for the guild',
    parseUSDC('15'),
    toBytes32('task'),
    BigInt(Math.floor(Date.now() / 1000) + 86400),
    guildAddress, // Guild contract address
  ],
});
```

## Mission Requirements

Add eligibility requirements:

```typescript
// Via API - missions can have requirements
const mission = await fetch('https://api.horizon.dev/missions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Premium delivery',
    description: 'High-value item delivery',
    rewardAmount: '50.00',
    category: 'delivery',
    expiresIn: 86400,
    requirements: {
      minXP: 500,           // Minimum global XP
      minReputation: 80,    // Minimum reputation score
      guildId: 'guild-123', // Must be guild member
    },
  }),
});
```

## Best Practices

### Write Clear Descriptions

**Good:**
```
Pick up a medium-sized package from Joe's Coffee (123 Main St) 
and deliver to the park entrance at Central Park South.
The package is fragile - handle with care.
Estimated time: 30 minutes.
```

**Bad:**
```
deliver something
```

### Set Appropriate Rewards

Consider:
- Task complexity and time required
- Distance (for location-based missions)
- Skill requirements
- Market rates for similar work

### Use Realistic Expirations

| Task Type | Recommended Expiration |
|-----------|----------------------|
| Quick errands | 2-4 hours |
| Same-day delivery | 8-12 hours |
| Flexible tasks | 24-48 hours |
| Long-term projects | 1-7 days |

## Mission Lifecycle

After creation, your mission follows this lifecycle:

```
Created → Open → Accepted → Submitted → Completed
                    ↓
                 Disputed (if needed)
```

### Managing Your Mission

```typescript
// Cancel a mission (before acceptance)
await walletClient.writeContract({
  address: missionEscrowAddress,
  abi: MissionEscrowABI,
  functionName: 'cancelMission',
  args: [],
});

// Approve completion
await walletClient.writeContract({
  address: missionEscrowAddress,
  abi: MissionEscrowABI,
  functionName: 'approveCompletion',
  args: [],
});

// Raise dispute (if unsatisfied)
await walletClient.writeContract({
  address: missionEscrowAddress,
  abi: MissionEscrowABI,
  functionName: 'raiseDispute',
  args: [],
});
```

## Monitoring Missions

### Get Mission Status

```typescript
const status = await publicClient.readContract({
  address: missionEscrowAddress,
  abi: MissionEscrowABI,
  functionName: 'state',
});

console.log('Mission state:', status); // Open, Accepted, Submitted, etc.
```

### Listen for Events

```typescript
import { MissionEscrowABI } from '@horizon-protocol/sdk';

// Watch for mission acceptance
const unwatch = publicClient.watchContractEvent({
  address: missionEscrowAddress,
  abi: MissionEscrowABI,
  eventName: 'MissionAccepted',
  onLogs: (logs) => {
    console.log('Mission accepted by:', logs[0].args.performer);
  },
});
```

## Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `InsufficientAllowance` | USDC not approved | Approve USDC first |
| `InsufficientBalance` | Not enough USDC | Add USDC to wallet |
| `InvalidExpiration` | Expiration in past | Use future timestamp |
| `MissionAlreadyExists` | Duplicate creation | Check for existing mission |

## API Reference

### Create Mission

```http
POST /missions
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "rewardAmount": "string",
  "category": "string",
  "expiresIn": "number",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "radius": "number"
  },
  "guildId": "string",
  "requirements": {
    "minXP": "number",
    "minReputation": "number"
  }
}
```

### Get Mission

```http
GET /missions/:id
```

### Update Mission

```http
PATCH /missions/:id
```

### Cancel Mission

```http
POST /missions/:id/cancel
```

## Next Steps

- [Getting Started](/docs/guides/getting-started) - Setup and first steps
- [Becoming a Resolver](/docs/guides/becoming-resolver) - Handle disputes
- [API Reference](/docs/api/missions) - Full mission API docs
