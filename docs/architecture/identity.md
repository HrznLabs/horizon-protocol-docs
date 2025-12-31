---
sidebar_position: 4
---

# Identity System

Horizon uses a cross-chain identity system linking EVM and Solana addresses.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Identity                            │
├─────────────────────────────────────────────────────────────┤
│  Primary: EVM Address (Base L2)                             │
│  └── Missions, guilds, reputation                           │
├─────────────────────────────────────────────────────────────┤
│  Linked: Solana Address (optional)                          │
│  └── NFT minting, liquidity onboarding                      │
├─────────────────────────────────────────────────────────────┤
│  Off-chain: Display name, avatar, bio                       │
└─────────────────────────────────────────────────────────────┘
```

## Wallet Integration

### Privy (Primary)

Embedded wallet solution for mobile:
- Email/social login
- Automatic wallet creation
- Transaction signing
- Key recovery

### External Wallets

Also supported:
- MetaMask
- Coinbase Wallet
- WalletConnect

## Address Linking

### EVM → Solana

1. User connects EVM wallet
2. Signs message with EVM key
3. Connects Solana wallet
4. Signs verification message with Solana key
5. Backend verifies both signatures
6. Addresses linked in database

```typescript
// Message format
const message = `Link Solana address ${solanaAddress} to EVM address ${evmAddress}
Timestamp: ${timestamp}
Nonce: ${nonce}`;
```

### Verification

```typescript
async function verifyLink(
  evmAddress: string,
  solanaAddress: string,
  evmSignature: string,
  solanaSignature: string
): Promise<boolean> {
  // Verify EVM signature
  const recoveredEvm = recoverMessageAddress({
    message,
    signature: evmSignature,
  });
  
  // Verify Solana signature
  const isValidSolana = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(solanaSignature),
    bs58.decode(solanaAddress)
  );
  
  return recoveredEvm === evmAddress && isValidSolana;
}
```

## Device Attestation

For security-sensitive operations:

### Android (Play Integrity API)

```typescript
const token = await IntegrityManager.requestIntegrityToken({
  cloudProjectNumber: PROJECT_NUMBER,
  nonce: generateNonce(),
});
```

### iOS (DeviceCheck)

```typescript
const token = await DeviceCheck.generateToken();
```

### Web (WebAuthn)

```typescript
const credential = await navigator.credentials.create({
  publicKey: {
    challenge,
    rp: { name: 'Horizon Protocol' },
    user: { id: userId, name: username },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
  },
});
```

## User Data

### On-chain (Immutable)

- Wallet addresses
- Reputation attestations
- Achievement NFTs
- Guild memberships

### Off-chain (Mutable)

- Display name
- Avatar URL
- Bio
- Notification preferences
- Location history (30-day retention)

## Privacy Controls

Users can:
- Export all data (GDPR)
- Delete off-chain data
- Control location sharing
- Manage notification preferences

