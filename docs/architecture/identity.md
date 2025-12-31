---
sidebar_position: 5
---

# Identity System

Horizon uses an EVM-first identity system with multi-wallet support and name resolution.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Identity                            │
├─────────────────────────────────────────────────────────────┤
│  Primary: EVM Address (Base L2)                             │
│  └── Missions, guilds, reputation, XP                       │
├─────────────────────────────────────────────────────────────┤
│  Linked Wallets: Additional EVM addresses                   │
│  └── Multi-wallet support with labels                       │
├─────────────────────────────────────────────────────────────┤
│  Name Resolution: Basename / ENS                            │
│  └── Human-readable names and avatars                       │
├─────────────────────────────────────────────────────────────┤
│  Off-chain: Display name, avatar, bio                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Wallet Integration

### CDP Embedded Wallets (Primary)

Coinbase Developer Platform embedded wallets for seamless onboarding:

- **Email OTP** - Sign up with email verification
- **Social Login** - Google, Apple authentication
- **Non-custodial** - Users own their keys
- **No seed phrase** - Simplified UX

### External Wallets

Also supported via WalletConnect:

- **Coinbase Wallet** - Native Base integration
- **MetaMask** - Popular browser wallet
- **Rainbow** - Mobile-first wallet
- **Other WalletConnect-compatible wallets**

---

## Authentication (SIWE)

Horizon uses **Sign-In With Ethereum (EIP-4361)** for authentication:

```typescript
// SIWE message format
const message = `
horizon.app wants you to sign in with your Ethereum account:
${address}

Sign in to Horizon

URI: https://horizon.app
Version: 1
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}
`;
```

### Flow

1. User connects wallet
2. Backend generates SIWE challenge with nonce
3. User signs message with wallet
4. Backend verifies signature
5. JWT token issued for session

---

## Name Resolution

### Basenames (.base.eth)

Native Base name resolution:

```typescript
// Reverse resolution: address → name
const result = await basenameService.resolveAddress('0x...');
// { name: 'alice.base.eth', avatar: 'https://...' }

// Forward resolution: name → address  
const address = await basenameService.resolveName('alice.base.eth');
// '0x...'
```

### ENS (.eth)

Fallback to Ethereum Name Service:

```typescript
const result = await ensService.resolveAddress('0x...');
// { name: 'vitalik.eth', avatar: 'https://...' }
```

### Priority

1. Check Basename first (Base-native)
2. Fall back to ENS if no Basename
3. Display address if neither found

---

## Multi-Wallet Support

Users can link multiple wallets to their account:

### Link Wallet

```typescript
// Generate link message
const message = generateLinkMessage(userId, address);
// "Link wallet to Horizon\nUser: ...\nWallet: ...\nTimestamp: ..."

// User signs message
const signature = await wallet.signMessage(message);

// Backend verifies and links
await identityService.linkWallet(userId, 'evm', address, signature, message);
```

### Wallet Management

| Feature | Description |
|---------|-------------|
| **Primary wallet** | Main address for missions |
| **Labels** | Custom names for wallets |
| **Unlink** | Remove linked wallets (except primary) |

---

## User Data

### On-chain (Immutable)

- Wallet addresses
- Reputation attestations (EAS)
- Achievement NFTs
- Guild memberships

### Off-chain (Mutable)

- Display name
- Avatar URL
- Bio
- Notification preferences
- Location history (30-day retention)

---

## Privacy Controls

Users can:

- **Export all data** (GDPR compliance)
- **Delete off-chain data**
- **Control location sharing**
- **Manage notification preferences**
- **Revoke linked wallets**

---

## Future: Device Attestation

Planned for high-security operations:

| Platform | Technology |
|----------|------------|
| Android | Play Integrity API |
| iOS | DeviceCheck |
| Web | WebAuthn/Passkeys |

This will enable:
- Anti-fraud protection
- Bot prevention
- Location verification enhancement
