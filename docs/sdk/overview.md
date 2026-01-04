---
sidebar_position: 1
---

# Horizon SDK

Official TypeScript SDK for integrating with Horizon Protocol - decentralized mission coordination on Base L2.

## Features

| Feature | Description |
|---------|-------------|
| 📦 **Contract ABIs** | Type-safe ABIs for all 8 protocol contracts |
| 🔧 **Utilities** | USDC parsing, fee calculations, address formatting |
| 🌐 **Networks** | Pre-configured for Base Sepolia and Base Mainnet |
| 📝 **Types** | Full TypeScript definitions for all entities |
| 🪶 **Lightweight** | Zero dependencies (peer dependency on viem) |

## Installation

```bash
# Using npm
npm install @horizon-protocol/sdk viem

# Using yarn
yarn add @horizon-protocol/sdk viem

# Using pnpm
pnpm add @horizon-protocol/sdk viem
```

## Quick Start

```typescript
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import {
  BASE_SEPOLIA,
  MissionFactoryABI,
  parseUSDC,
  formatUSDC,
} from '@horizon-protocol/sdk';

// Create viem client
const client = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA.rpcUrl),
});

// Read total mission count
const missionCount = await client.readContract({
  address: BASE_SEPOLIA.contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'missionCount',
});

console.log(`Total missions: ${missionCount}`);
```

## What's Included

### Contract ABIs

```typescript
import {
  MissionFactoryABI,         // Mission creation and lookup
  MissionEscrowABI,          // Mission lifecycle management
  GuildFactoryABI,           // Guild creation
  GuildDAOABI,               // Guild governance
  PaymentRouterABI,          // Fee distribution
  ReputationAttestationsABI, // On-chain ratings
  HorizonAchievementsABI,    // Achievement NFTs
  ERC20ABI,                  // USDC interactions
} from '@horizon-protocol/sdk';
```

### Network Configs

```typescript
import { BASE_SEPOLIA, BASE_MAINNET, getContracts } from '@horizon-protocol/sdk';

// Pre-configured addresses
console.log(BASE_SEPOLIA.contracts.missionFactory);
// => '0xee9234954b134c39c17a75482da78e46b16f466c'

// Get contracts by chain ID
const contracts = getContracts(84532); // Base Sepolia
```

### Utility Functions

```typescript
import {
  parseUSDC,          // '10.50' => 10500000n
  formatUSDC,         // 10500000n => '10.500000'
  calculateFeeSplit,  // Calculate payment distribution
  calculateDDR,       // Dispute reserve calculation
  calculateExpiresAt, // Expiration timestamp
  toBytes32,          // String to bytes32
  formatAddress,      // Truncate address
} from '@horizon-protocol/sdk';
```

### TypeScript Types

```typescript
import {
  MissionState,
  DisputeState,
  DisputeOutcome,
  type Mission,
  type Guild,
  type FeeSplit,
} from '@horizon-protocol/sdk';
```

## Next Steps

- [Quickstart Tutorial](/docs/sdk/quickstart) - Create your first mission
- [API Reference](/docs/sdk/api-reference) - Full SDK documentation
- [GitHub Repository](https://github.com/HrznLabs/horizon-sdk) - Source code

## Resources

- [Smart Contracts](/docs/architecture/smart-contracts) - Contract documentation
- [Base Sepolia Explorer](https://sepolia.basescan.org) - View transactions
