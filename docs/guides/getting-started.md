---
sidebar_position: 1
---

# Getting Started

This guide will help you integrate with Horizon Protocol using our TypeScript SDK.

## Prerequisites

- Node.js 18+
- A Base Sepolia RPC URL (e.g., from [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com/))
- Test USDC from the [Circle faucet](https://faucet.circle.com/)

## Installation

### Using the SDK

Install the Horizon SDK in your project:

```bash
# npm
npm install @horizon-protocol/sdk viem

# yarn
yarn add @horizon-protocol/sdk viem

# pnpm
pnpm add @horizon-protocol/sdk viem
```

### Contract Addresses

The SDK includes all deployed contract addresses:

```typescript
import { BASE_SEPOLIA_CONTRACTS, BASE_SEPOLIA } from '@horizon-protocol/sdk';

console.log(BASE_SEPOLIA_CONTRACTS.missionFactory);
// 0xee9234954b134c39c17a75482da78e46b16f466c

console.log(BASE_SEPOLIA.rpcUrl);
// https://sepolia.base.org
```

## Quick Start

### 1. Read Mission Data

```typescript
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { 
  MissionFactoryABI, 
  BASE_SEPOLIA_CONTRACTS 
} from '@horizon-protocol/sdk';

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// Get total mission count
const missionCount = await client.readContract({
  address: BASE_SEPOLIA_CONTRACTS.missionFactory as `0x${string}`,
  abi: MissionFactoryABI,
  functionName: 'missionCount',
});

console.log(`Total missions: ${missionCount}`);
```

### 2. Create a Mission

```typescript
import { createWalletClient, http, parseUnits } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { 
  MissionFactoryABI, 
  ERC20ABI,
  BASE_SEPOLIA_CONTRACTS,
  parseUSDC 
} from '@horizon-protocol/sdk';

// Set up wallet
const account = privateKeyToAccount('0x...');
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(),
});

// First approve USDC spend
const rewardAmount = parseUSDC('50'); // 50 USDC

await walletClient.writeContract({
  address: BASE_SEPOLIA_CONTRACTS.usdc as `0x${string}`,
  abi: ERC20ABI,
  functionName: 'approve',
  args: [BASE_SEPOLIA_CONTRACTS.missionFactory, rewardAmount],
});

// Create mission
const expiresAt = BigInt(Math.floor(Date.now() / 1000) + 86400); // 24 hours
const metadataHash = '0x...'; // IPFS hash of mission details
const locationHash = '0x...'; // IPFS hash of encrypted location

const tx = await walletClient.writeContract({
  address: BASE_SEPOLIA_CONTRACTS.missionFactory as `0x${string}`,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    rewardAmount,
    expiresAt,
    '0x0000000000000000000000000000000000000000', // No guild
    metadataHash,
    locationHash,
  ],
});
```

### 3. Accept and Complete Mission

```typescript
import { MissionEscrowABI } from '@horizon-protocol/sdk';

// Accept mission (as performer)
await walletClient.writeContract({
  address: escrowAddress as `0x${string}`,
  abi: MissionEscrowABI,
  functionName: 'acceptMission',
});

// Submit proof
const proofHash = '0x...'; // IPFS hash of completion proof

await walletClient.writeContract({
  address: escrowAddress as `0x${string}`,
  abi: MissionEscrowABI,
  functionName: 'submitProof',
  args: [proofHash],
});

// Approve completion (as poster)
await walletClient.writeContract({
  address: escrowAddress as `0x${string}`,
  abi: MissionEscrowABI,
  functionName: 'approveCompletion',
});
```

## SDK Features

### ABIs Included

All contract ABIs are exported for direct use with viem:

```typescript
import {
  MissionFactoryABI,
  MissionEscrowABI,
  PaymentRouterABI,
  GuildFactoryABI,
  GuildDAOABI,
  ReputationAttestationsABI,
  HorizonAchievementsABI,
  ERC20ABI,
} from '@horizon-protocol/sdk';
```

### Utility Functions

```typescript
import { parseUSDC, formatUSDC } from '@horizon-protocol/sdk';

// Parse human-readable to BigInt
const amount = parseUSDC('100.50'); // => 100500000n

// Format BigInt to human-readable
const display = formatUSDC(100500000n); // => '100.500000'
```

### Constants

```typescript
import { 
  FEES, 
  USDC_DECIMALS,
  MIN_REWARD,
  MAX_REWARD 
} from '@horizon-protocol/sdk';

console.log(FEES.PROTOCOL_BPS); // 400 (4%)
console.log(FEES.MAX_GUILD_BPS); // 1500 (15%)
```

## Smart Contract Interaction

For direct smart contract integration without the SDK, see our [contracts repository](https://github.com/HrznLabs/horizon-contracts).

### Key Contracts

| Contract | Purpose |
|----------|---------|
| **MissionFactory** | Creates mission escrow contracts |
| **MissionEscrow** | Individual mission state machine |
| **PaymentRouter** | 5-way fee distribution |
| **GuildFactory** | Creates guild DAOs |
| **GuildDAO** | Guild membership & governance |
| **DisputeResolver** | DDR/LPP dispute handling |
| **HorizonAchievements** | NFT achievements |

## API Integration

The Horizon REST API provides:

- Mission CRUD operations
- Guild management
- User profiles and XP
- Geospatial queries
- WebSocket real-time updates

See the [API Reference](/docs/api/overview) for full documentation.

## Next Steps

- Read the [Protocol Overview](/docs/protocol/overview) to understand mission mechanics
- Explore the [Smart Contracts](/docs/architecture/smart-contracts) architecture
- Browse the [API Reference](/docs/api/overview) for backend integration
- Check out the [SDK repository](https://github.com/HrznLabs/horizon-sdk) for examples

## Need Help?

- **GitHub Issues**: [Report bugs or request features](https://github.com/HrznLabs/horizon-contracts/issues)
