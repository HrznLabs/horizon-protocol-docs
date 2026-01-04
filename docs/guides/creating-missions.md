---
sidebar_position: 4
---

# Creating Missions

A complete guide to creating missions on Horizon Protocol using the SDK.

## Overview

Missions are the core unit of work on Horizon. Creating a mission involves:
1. Preparing mission metadata
2. Approving USDC spending
3. Calling the MissionFactory contract
4. Monitoring mission status

## Prerequisites

- Node.js 18+
- Horizon SDK installed
- Base Sepolia ETH (for gas)
- Base Sepolia USDC (for rewards)

## Step-by-Step Guide

### 1. Initialize Your Client

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { BASE_SEPOLIA } from '@horizon-protocol/sdk';

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA.rpcUrl),
});

const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});
```

### 2. Prepare Mission Metadata

Missions store metadata on IPFS. Structure your metadata:

```typescript
interface MissionMetadata {
  title: string;
  description: string;
  category: string;
  requirements: string[];
  images?: string[];
}

const metadata: MissionMetadata = {
  title: 'Deliver Package Downtown',
  description: 'Pick up a package from 123 Main St and deliver to 456 Broadway',
  category: 'DELIVERY',
  requirements: [
    'Must have vehicle',
    'Complete within 2 hours',
    'Photo confirmation required'
  ],
};

// Upload to IPFS (use your preferred IPFS service)
const metadataHash = await uploadToIPFS(metadata);
```

### 3. Prepare Location Data

For location-based missions:

```typescript
interface LocationData {
  type: 'POINT' | 'AREA';
  pickup?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
  radius?: number; // meters
  precision: 'EXACT' | 'CITY' | 'REGION';
}

const location: LocationData = {
  type: 'POINT',
  pickup: { lat: 40.7128, lng: -74.0060 },
  destination: { lat: 40.7580, lng: -73.9855 },
  precision: 'EXACT',
};

const locationHash = await uploadToIPFS(location);
```

### 4. Approve USDC Spending

Before creating a mission, approve the MissionFactory to spend your USDC:

```typescript
import { ERC20ABI, parseUSDC } from '@horizon-protocol/sdk';

const rewardAmount = parseUSDC(25); // 25 USDC

const approvalHash = await walletClient.writeContract({
  address: BASE_SEPOLIA.contracts.usdc,
  abi: ERC20ABI,
  functionName: 'approve',
  args: [BASE_SEPOLIA.contracts.missionFactory, rewardAmount],
});

// Wait for confirmation
await publicClient.waitForTransactionReceipt({ hash: approvalHash });
console.log('USDC approved:', approvalHash);
```

### 5. Create the Mission

```typescript
import { 
  MissionFactoryABI, 
  calculateExpiresAt,
  toBytes32,
  ZERO_ADDRESS 
} from '@horizon-protocol/sdk';

const createMissionHash = await walletClient.writeContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    rewardAmount,                        // USDC amount (6 decimals)
    calculateExpiresAt(24 * 60 * 60),    // 24 hours from now
    ZERO_ADDRESS,                         // Guild address (or ZERO_ADDRESS for public)
    toBytes32(metadataHash),              // IPFS metadata hash
    toBytes32(locationHash),              // IPFS location hash
  ],
});

const receipt = await publicClient.waitForTransactionReceipt({ 
  hash: createMissionHash 
});

console.log('Mission created:', createMissionHash);
```

### 6. Get Mission ID from Event

Parse the `MissionCreated` event to get the mission ID:

```typescript
import { parseEventLogs } from 'viem';

const logs = parseEventLogs({
  abi: MissionFactoryABI,
  logs: receipt.logs,
  eventName: 'MissionCreated',
});

const missionId = logs[0].args.missionId;
const escrowAddress = logs[0].args.escrow;

console.log('Mission ID:', missionId);
console.log('Escrow Address:', escrowAddress);
```

## Guild Missions

To create a mission for a specific guild:

```typescript
const guildAddress = '0x...'; // Your guild's address

await walletClient.writeContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    rewardAmount,
    calculateExpiresAt(24 * 60 * 60),
    guildAddress,                      // Guild-exclusive mission
    toBytes32(metadataHash),
    toBytes32(locationHash),
  ],
});
```

Guild missions are only visible/claimable by guild members.

## Mission Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rewardAmount` | bigint | USDC reward (6 decimals) |
| `expiresAt` | bigint | Unix timestamp for expiration |
| `guild` | address | Guild address or ZERO_ADDRESS for public |
| `metadataHash` | bytes32 | IPFS hash of mission metadata |
| `locationHash` | bytes32 | IPFS hash of location data |

## Best Practices

### 1. Set Appropriate Expiration

```typescript
// Short tasks: 1-4 hours
calculateExpiresAt(4 * 60 * 60);

// Day tasks: 24 hours
calculateExpiresAt(24 * 60 * 60);

// Longer projects: 7 days
calculateExpiresAt(7 * 24 * 60 * 60);
```

### 2. Be Clear in Metadata

Include:
- Specific deliverables
- Time expectations
- Required equipment
- Proof requirements

### 3. Set Fair Rewards

Consider:
- Time required
- Skill level needed
- Travel distance
- Market rates

## Monitoring Mission Status

Check mission state:

```typescript
import { MissionEscrowABI, MissionState } from '@horizon-protocol/sdk';

const state = await publicClient.readContract({
  address: escrowAddress,
  abi: MissionEscrowABI,
  functionName: 'state',
});

switch (state) {
  case MissionState.Open:
    console.log('Waiting for performer');
    break;
  case MissionState.Accepted:
    console.log('Performer working on it');
    break;
  case MissionState.Submitted:
    console.log('Ready for your approval');
    break;
  case MissionState.Completed:
    console.log('Mission complete!');
    break;
}
```

## Next Steps

- [SDK API Reference](/docs/sdk/api-reference) - Full function documentation
- [Achievements Guide](/docs/guides/achievements) - Earn XP for posting missions
- [Dispute Resolution](/docs/api/disputes) - Handle contested missions
