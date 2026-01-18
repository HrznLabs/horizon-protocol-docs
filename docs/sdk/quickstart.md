---
sidebar_position: 2
---

# SDK Quickstart

Create and manage Horizon missions using the TypeScript SDK with viem.

## Prerequisites

- Node.js 18+
- A viem-compatible wallet (for write operations)
- Base Sepolia ETH (for gas) and USDC (for mission rewards)

## Setup

### 1. Install Dependencies

```bash
npm install @horizon-protocol/sdk viem
```

### 2. Initialize Client

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { BASE_SEPOLIA } from '@horizon-protocol/sdk';

// Public client (read-only)
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA.rpcUrl),
});

// Wallet client (for transactions)
const account = privateKeyToAccount('0x...');
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});
```

## Creating a Mission

### Step 1: Approve USDC

```typescript
import { 
  BASE_SEPOLIA, 
  ERC20ABI, 
  parseUSDC 
} from '@horizon-protocol/sdk';

const rewardAmount = parseUSDC(50); // 50 USDC

// Approve MissionFactory to spend USDC
const approveHash = await walletClient.writeContract({
  address: BASE_SEPOLIA.contracts.usdc,
  abi: ERC20ABI,
  functionName: 'approve',
  args: [BASE_SEPOLIA.contracts.missionFactory, rewardAmount],
});

console.log('Approval tx:', approveHash);
```

### Step 2: Create Mission

```typescript
import { 
  MissionFactoryABI, 
  calculateExpiresAt,
  toBytes32,
  ZERO_ADDRESS 
} from '@horizon-protocol/sdk';

// Upload metadata to IPFS first (not covered here)
const metadataHash = toBytes32('QmYourMetadataHash...');
const locationHash = toBytes32('QmYourLocationHash...');

const createHash = await walletClient.writeContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    rewardAmount,                    // USDC reward (6 decimals)
    calculateExpiresAt(24 * 3600),   // 24 hours from now
    ZERO_ADDRESS,                    // No guild (or guild address)
    metadataHash,                    // IPFS hash of metadata
    locationHash,                    // IPFS hash of location
  ],
});

console.log('Mission created:', createHash);
```

## Reading Mission Data

```typescript
import { MissionFactoryABI, MissionEscrowABI } from '@horizon-protocol/sdk';

// Get mission count
const missionCount = await publicClient.readContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'missionCount',
});

// Get escrow address for mission #1
const escrowAddress = await publicClient.readContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'getMission',
  args: [1n],
});

// Read mission details from escrow
const missionDetails = await publicClient.readContract({
  address: escrowAddress,
  abi: MissionEscrowABI,
  functionName: 'getMissionDetails',
});

console.log('Mission:', missionDetails);
```

## Accepting a Mission

```typescript
import { MissionEscrowABI } from '@horizon-protocol/sdk';

// Accept mission (performer)
const acceptHash = await walletClient.writeContract({
  address: escrowAddress,
  abi: MissionEscrowABI,
  functionName: 'acceptMission',
});
```

## Completing a Mission

```typescript
import { toBytes32 } from '@horizon-protocol/sdk';

// Submit proof (performer)
const proofHash = toBytes32('QmProofHash...');
await walletClient.writeContract({
  address: escrowAddress,
  abi: MissionEscrowABI,
  functionName: 'submitProof',
  args: [proofHash],
});

// Approve completion (poster) - releases payment
await walletClient.writeContract({
  address: escrowAddress,
  abi: MissionEscrowABI,
  functionName: 'approveCompletion',
});
```

## Calculating Fees

```typescript
import { calculateFeeSplit, parseUSDC, formatUSDC } from '@horizon-protocol/sdk';

const reward = parseUSDC(100);
const guildFeeBps = 300; // 3%

const fees = calculateFeeSplit(reward, guildFeeBps);

console.log('Fee breakdown:');
console.log(`  Performer: ${formatUSDC(fees.performerAmount)} USDC`);
console.log(`  Protocol:  ${formatUSDC(fees.protocolAmount)} USDC`);
console.log(`  Labs:      ${formatUSDC(fees.labsAmount)} USDC`);
console.log(`  Resolver:  ${formatUSDC(fees.resolverAmount)} USDC`);
console.log(`  Guild:     ${formatUSDC(fees.guildAmount)} USDC`);
```

**Output:**
```
Fee breakdown:
  Performer: 90.000000 USDC
  Protocol:  2.500000 USDC
  Labs:      2.500000 USDC
  Resolver:  2.000000 USDC
  Guild:     3.000000 USDC
```

## Next Steps

- [API Reference](/docs/sdk/api-reference) - Complete function documentation
- [Smart Contracts](/docs/architecture/smart-contracts) - Understand the protocol
- [Creating Missions Guide](/docs/guides/creating-missions) - In-depth tutorial
