---
sidebar_position: 3
---

# SDK API Reference

Complete API reference for the Horizon Protocol SDK.

## Network Configuration

### BASE_SEPOLIA

Pre-configured network for Base Sepolia testnet.

```typescript
import { BASE_SEPOLIA } from '@horizon-protocol/sdk';

BASE_SEPOLIA = {
  chainId: 84532,
  name: 'Base Sepolia',
  rpcUrl: 'https://sepolia.base.org',
  blockExplorer: 'https://sepolia.basescan.org',
  contracts: {
    missionFactory: '0x8D780F03206E6433c2e5F7E0aB40244Ee051a271',
    paymentRouter: '0x3a84718A90E03621526748A1721f10D32BEaf903',
    missionEscrowImpl: '0x9aBe058635D961191571140948774cD829847406',
    guildFactory: '0xB3720D5f3Ff1A6385aC0C1f54f88536F68a967F3',
    disputeResolver: '0x073A3674FB09177fcD6615bD920Ca1Fc52Fbd156',
    pauseRegistry: '0x05Ec569d16Ac6b7B5dEB8B815976512CED645A87',
    achievements: '0xfCC5971C3704C7a1F1c9E4acFdC7eEd60D4e4949',
    usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    eurc: '0x808456652fdb597867f38412077A9182bf77359F',
    // ...plus the HRZN token stack and iTake vertical contracts
  },
};
```

### getContracts(chainId)

Get contract addresses by chain ID.

```typescript
import { getContracts } from '@horizon-protocol/sdk';

const contracts = getContracts(84532);
console.log(contracts.missionFactory);
```

### getNetwork(chainId)

Get full network configuration by chain ID.

```typescript
import { getNetwork } from '@horizon-protocol/sdk';

const network = getNetwork(84532);
console.log(network.name); // 'Base Sepolia'
```

---

## Contract ABIs

All ABIs are typed for use with viem.

| Export | Description |
|--------|-------------|
| `MissionFactoryABI` | Mission creation and indexing |
| `MissionEscrowABI` | Individual mission escrow lifecycle |
| `GuildFactoryABI` | Guild creation |
| `GuildDAOABI` | Guild governance and membership |
| `PaymentRouterABI` | Fee distribution logic |
| `ReputationAttestationsABI` | On-chain rating attestations |
| `HorizonAchievementsABI` | Achievement NFT contract |
| `ERC20ABI` | Standard ERC20 (for USDC) |

---

## Utility Functions

### parseUSDC(amount)

Convert human-readable amount to USDC units (6 decimals).

```typescript
import { parseUSDC } from '@horizon-protocol/sdk';

parseUSDC('10.50'); // => 10500000n
parseUSDC(10.5);    // => 10500000n
parseUSDC(100);     // => 100000000n
```

### formatUSDC(amount)

Convert USDC units to human-readable string.

```typescript
import { formatUSDC } from '@horizon-protocol/sdk';

formatUSDC(10500000n); // => '10.500000'
formatUSDC(100000000n); // => '100.000000'
```

### calculateFeeSplit(rewardAmount, guildFeeBps)

Calculate payment distribution for a mission.

```typescript
import { calculateFeeSplit, parseUSDC } from '@horizon-protocol/sdk';

const fees = calculateFeeSplit(parseUSDC(100), 100); // 1% MetaDAO/SubDAO fee
// {
//   performerAmount: 92000000n,  // 92%
//   protocolAmount: 2500000n,    // 2.5%
//   labsAmount: 2500000n,        // 2.5%
//   resolverAmount: 2000000n,    // 2%
//   guildAmount: 1000000n,       // 1%
// }
```

### calculateDDR(rewardAmount)

Calculate Dynamic Dispute Reserve (5% of reward).

```typescript
import { calculateDDR, parseUSDC } from '@horizon-protocol/sdk';

calculateDDR(parseUSDC(100)); // => 5000000n (5 USDC)
```

### calculateLPP(rewardAmount)

Calculate Loser-Pays Penalty (2% of reward).

```typescript
import { calculateLPP, parseUSDC } from '@horizon-protocol/sdk';

calculateLPP(parseUSDC(100)); // => 2000000n (2 USDC)
```

### calculateExpiresAt(durationSeconds)

Calculate expiration timestamp from now.

```typescript
import { calculateExpiresAt } from '@horizon-protocol/sdk';

calculateExpiresAt(24 * 3600); // 24 hours from now
calculateExpiresAt(7 * 24 * 3600); // 7 days from now
```

### isMissionExpired(expiresAt)

Check if a mission has expired.

```typescript
import { isMissionExpired } from '@horizon-protocol/sdk';

isMissionExpired(1704326400n); // true/false
```

### toBytes32(value)

Convert string to bytes32 (for IPFS hashes).

```typescript
import { toBytes32 } from '@horizon-protocol/sdk';

toBytes32('QmXoypizjW3W...');
// => '0x516d586f7970697a6a...'
```

### randomBytes32()

Generate random bytes32 (for proofs).

```typescript
import { randomBytes32 } from '@horizon-protocol/sdk';

randomBytes32(); // => '0x7f4e8a2b...'
```

### formatAddress(address)

Truncate address for display.

```typescript
import { formatAddress } from '@horizon-protocol/sdk';

formatAddress('0x1234567890abcdef...'); // => '0x1234...cdef'
```

---

## Types

### MissionState

```typescript
enum MissionState {
  Open = 0,
  Accepted = 1,
  Submitted = 2,
  Completed = 3,
  Cancelled = 4,
  Disputed = 5,
  Expired = 6,
}
```

### DisputeState

```typescript
enum DisputeState {
  None = 0,
  AwaitingDDR = 1,
  UnderReview = 2,
  Resolved = 3,
  Appealed = 4,
  Finalized = 5,
}
```

### DisputeOutcome

```typescript
enum DisputeOutcome {
  None = 0,
  InitiatorWins = 1,
  RespondentWins = 2,
  Split = 3,
}
```

### AchievementCategory

```typescript
enum AchievementCategory {
  Milestone = 0,
  Performance = 1,
  Guild = 2,
  Seasonal = 3,
  Special = 4,
}
```

---

## Constants

```typescript
import {
  USDC_DECIMALS,      // 6
  MIN_REWARD,         // 1000000n (1 USDC)
  MAX_REWARD,         // 100000000000n (100,000 USDC)
  MIN_DURATION,       // 3600 (1 hour)
  MAX_DURATION,       // 2592000 (30 days)
  FEES,               // { PROTOCOL_BPS: 250, LABS_BPS: 250, RESOLVER_BPS: 200 }
  APPEAL_PERIOD,      // 172800 (48 hours)
  ZERO_ADDRESS,       // 0x0000000000000000000000000000000000000000
} from '@horizon-protocol/sdk';
```

---

## Contract Addresses

### Base Sepolia (Testnet)

| Contract | Address |
|----------|---------|
| PaymentRouter | `0x3a84718A90E03621526748A1721f10D32BEaf903` |
| MissionFactory | `0x8D780F03206E6433c2e5F7E0aB40244Ee051a271` |
| GuildFactory | `0xB3720D5f3Ff1A6385aC0C1f54f88536F68a967F3` |
| DisputeResolver | `0x073A3674FB09177fcD6615bD920Ca1Fc52Fbd156` |
| HorizonAchievements | `0xfCC5971C3704C7a1F1c9E4acFdC7eEd60D4e4949` |
| USDC | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
