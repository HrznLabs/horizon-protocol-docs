---
sidebar_position: 1
---

# Base Ecosystem Integration

Horizon Protocol is built natively on **Base L2** with deep integrations across the Coinbase/Base ecosystem.

## Why Base?

We chose Base as our primary chain for:

- **Low transaction costs** - Affordable mission escrow operations
- **Fast finality** - Quick settlement for real-world coordination
- **Coinbase ecosystem** - Access to CDP, Paymaster, OnchainKit
- **Growing user base** - Established L2 with strong adoption
- **EVM compatibility** - Standard Solidity tooling

## Coinbase Developer Platform (CDP)

### Embedded Wallets

Users can create wallets via:

- **Email signup** - No seed phrase required
- **Social login** - Google, Apple, etc.
- **Phone verification** - SMS-based recovery

```typescript
// CDP-powered wallet creation
const wallet = await cdpClient.evm.createAccount({
  name: `horizon-${userId}`,
});
```

### Transaction Sponsorship (Paymaster)

Gas fees are **sponsored for key operations**:

| Operation | Sponsored | User Pays |
|-----------|-----------|-----------|
| Rating attestations (EAS) | ✅ Yes | $0 |
| Achievement NFT minting | ✅ Yes | $0 |
| Mission creation | ❌ No | Gas fee |
| Mission acceptance | ❌ No | Gas fee |

This enables seamless UX where users can rate and earn achievements without holding ETH.

### Webhooks

Real-time event streaming from CDP:

- `erc20_transfer` - USDC payments
- `transaction` - Mission state changes
- `wallet_activity` - User wallet events
- `onramp_transaction_completed` - Fiat onboarding
- `offramp_transaction_completed` - Fiat offramp

```typescript
// CDP webhook handler
async processEvent(event: CdpWebhookEvent) {
  switch (event.type) {
    case 'erc20_transfer':
      await this.handleErc20Transfer(event);
      break;
    case 'onramp_transaction_completed':
      // User successfully bought crypto
      break;
  }
}
```

---

## Basenames Integration

Native support for **.base.eth** names:

### Reverse Resolution

```typescript
// Resolve address to Basename
const result = await basenameService.resolveAddress('0x...');
// Returns: { name: 'alice.base.eth', avatar: '...' }
```

### Forward Resolution

```typescript
// Resolve Basename to address
const address = await basenameService.resolveName('alice.base.eth');
// Returns: '0x...'
```

### Identity Display

Users with Basenames get:
- Name displayed instead of 0x address
- Avatar from Basename profile
- ENS fallback if no Basename

---

## EAS (Ethereum Attestation Service)

On-chain attestations on Base for:

### Reputation Ratings

Every rating creates an immutable EAS attestation:

```solidity
// Rating schema
bytes32 missionId,
address rater,
address ratee,
uint8 score,        // 1-5
string comment,
uint256 timestamp
```

**Explorer**: [EAS Scan Base](https://base.easscan.org)

### Benefits

- **Portable reputation** - Works across any dApp reading EAS
- **Verifiable** - Anyone can check attestation validity
- **Permanent** - Cannot be deleted or modified
- **Gasless** - Sponsored via CDP Paymaster

---

## USDC Payments

All mission escrow uses **native USDC on Base**:

| Network | USDC Address |
|---------|--------------|
| Base Mainnet | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Base Sepolia | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

### Why USDC?

- **Stable value** - No volatility during mission execution
- **Familiar** - Users understand dollar amounts
- **Liquid** - Easy onramp/offramp via Coinbase
- **Trustworthy** - Circle-issued, regulated

---

## Talent Protocol Integration

Builder reputation via [Talent Protocol](https://talentprotocol.com):

### Builder Score

Users with Talent profiles get:

| Level | Score Range | XP Multiplier |
|-------|-------------|---------------|
| Novice | 0-24 | 1.0x (no bonus) |
| Apprentice | 25-49 | 1.05x (+5%) |
| Practitioner | 50-74 | 1.10x (+10%) |
| Advanced | 75-89 | 1.20x (+20%) |
| Expert | 90-99 | 1.35x (+35%) |
| Master | 100 | 1.50x (+50%) |

### Developer Leaderboard

Separate leaderboard for builders ranked by:
- Builder Score
- Completed missions
- Earned achievements
- Guild contributions

### Mission Eligibility

Posters can require minimum Builder Score:

```json
{
  "requirements": {
    "minBuilderScore": 50,
    "minBuilderLevel": "practitioner"
  }
}
```

---

## Contract Deployments

### Base Sepolia (Testnet)

| Contract | Address |
|----------|---------|
| MissionFactory | `0xee9234954b134c39c17a75482da78e46b16f466c` |
| PaymentRouter | `0x94fb7908257ec36f701d2605b51eefed4326ddf5` |
| GuildFactory | `0xfeae3538a4a1801e47b6d16104aa8586edb55f00` |
| ReputationAttestations | `0xedae9682a0fb6fb3c18d6865461f67db7d748002` |
| DisputeResolver | `0xb00ac4278129928aecc72541b0bcd69d94c1691e` |
| HorizonAchievements | `0x568e0e3102bfa1f4045d3f62559c0f9823b469bc` |

### Base Mainnet

Mainnet deployment in progress. See [Protocol Overview](/docs/protocol/overview) for updates.

---

## Future Integrations

Planned Base ecosystem integrations:

- **OnchainKit** - React components for wallet connection
- **Smart Wallet** - Passkey-based account abstraction
- **Base Bridge** - Cross-chain asset support
- **Farcaster Frames** - Social sharing of missions

