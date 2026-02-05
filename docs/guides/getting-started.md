---
sidebar_position: 1
---

# Getting Started

This guide will help you start building on Horizon Protocol. You'll learn how to set up your development environment, connect to the testnet, and create your first mission.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v18 or higher)
- **Package manager** (npm, yarn, or pnpm)
- **Code editor** (VS Code recommended)
- **Base Sepolia ETH** (for gas fees)
- **Test USDC** (for mission rewards)

## Installation

### 1. Install the SDK

```bash
# Using yarn (recommended)
yarn add @horizon-protocol/sdk viem

# Using npm
npm install @horizon-protocol/sdk viem

# Using pnpm
pnpm add @horizon-protocol/sdk viem
```

### 2. Set Up Your Project

Create a new project and configure it:

```typescript
// horizon-config.ts
import { createPublicClient, createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { BASE_SEPOLIA } from '@horizon-protocol/sdk';

// Public client for reading
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA.rpcUrl),
});

// Wallet client for writing (use your test private key)
const account = privateKeyToAccount('0x...');
export const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(BASE_SEPOLIA.rpcUrl),
});

// Contract addresses
export const contracts = BASE_SEPOLIA.contracts;
```

## Get Testnet Assets

### 1. Base Sepolia ETH

Get testnet ETH for gas:
- [Coinbase Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- [Alchemy Faucet](https://www.alchemy.com/faucets/base-sepolia)

### 2. Testnet USDC

Mint test USDC from the testnet faucet:

```typescript
import { ERC20ABI, BASE_SEPOLIA } from '@horizon-protocol/sdk';

// Check USDC balance
const balance = await publicClient.readContract({
  address: BASE_SEPOLIA.contracts.usdc,
  abi: ERC20ABI,
  functionName: 'balanceOf',
  args: [walletClient.account.address],
});

console.log(`USDC Balance: ${balance / 10n ** 6n}`);
```

## Your First Mission

### 1. Approve USDC Spending

Before creating a mission, approve the MissionFactory to spend your USDC:

```typescript
import { ERC20ABI, parseUSDC } from '@horizon-protocol/sdk';

const amount = parseUSDC('10'); // 10 USDC

const hash = await walletClient.writeContract({
  address: contracts.usdc,
  abi: ERC20ABI,
  functionName: 'approve',
  args: [contracts.missionFactory, amount],
});

await publicClient.waitForTransactionReceipt({ hash });
console.log('USDC approved!');
```

### 2. Create a Mission

```typescript
import { MissionFactoryABI, parseUSDC, toBytes32 } from '@horizon-protocol/sdk';

const mission = {
  title: 'My First Mission',
  description: 'Pick up coffee from the corner shop',
  reward: parseUSDC('5'), // 5 USDC
  category: toBytes32('delivery'),
  expiresIn: 3600 * 24, // 24 hours
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
  },
};

const hash = await walletClient.writeContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'createMission',
  args: [
    mission.title,
    mission.description,
    mission.reward,
    mission.category,
    BigInt(Math.floor(Date.now() / 1000) + mission.expiresIn),
    // Additional parameters based on contract interface
  ],
});

const receipt = await publicClient.waitForTransactionReceipt({ hash });
console.log('Mission created!', receipt.transactionHash);
```

### 3. Read Mission Data

```typescript
import { MissionFactoryABI } from '@horizon-protocol/sdk';

// Get total missions
const missionCount = await publicClient.readContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'missionCount',
});

console.log(`Total missions: ${missionCount}`);

// Get mission details
const missionId = 1n; // Replace with your mission ID
const missionData = await publicClient.readContract({
  address: contracts.missionFactory,
  abi: MissionFactoryABI,
  functionName: 'getMission',
  args: [missionId],
});

console.log('Mission data:', missionData);
```

## Using the API

For most applications, you'll also want to use the Horizon REST API:

### API Base URLs

| Environment | URL |
|-------------|-----|
| **Testnet** | `https://api.horizon.dev` |
| **Mainnet** | Coming soon |

### Fetch Missions

```typescript
const response = await fetch('https://api.horizon.dev/missions?state=Open');
const missions = await response.json();

console.log('Available missions:', missions);
```

### Authentication

Most API endpoints require authentication:

```typescript
const response = await fetch('https://api.horizon.dev/missions', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});
```

## Project Structure

Here's a recommended structure for Horizon-based projects:

```
my-horizon-app/
├── src/
│   ├── config/
│   │   └── horizon.ts        # SDK configuration
│   ├── api/
│   │   ├── missions.ts       # Mission API calls
│   │   └── guilds.ts         # Guild API calls
│   ├── contracts/
│   │   └── index.ts          # Contract interactions
│   └── hooks/                 # React hooks (if using React)
├── package.json
└── tsconfig.json
```

## Next Steps

Now that you have the basics:

1. **Explore the SDK** - [SDK Reference](/docs/sdk/api-reference)
2. **Learn the API** - [API Documentation](/docs/api/overview)
3. **Understand missions** - [Mission Engine](/docs/protocol/mission-engine)
4. **Join guilds** - [Guild System](/docs/protocol/guilds)
5. **Build a vertical** - [Use Cases](/docs/use-cases/overview)

## Common Issues

### "Insufficient USDC allowance"

Make sure you've approved the MissionFactory to spend your USDC before creating missions.

### "User not found"

The API creates users automatically on first interaction. Make sure you're authenticated properly.

### "Transaction reverted"

Check that:
- You have enough ETH for gas
- You have enough USDC for the mission reward
- The mission parameters are valid

## Resources- [TypeScript SDK](https://github.com/HrznLabs/horizon-sdk)
- [Smart Contracts](https://github.com/HrznLabs/horizon-contracts)
- [API Documentation](/docs/api/overview)
- [Base Sepolia Explorer](https://sepolia.basescan.org)
