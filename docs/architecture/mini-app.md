---
sidebar_position: 2
---

# Horizon Mini App

A lightweight companion app that runs inside **Coinbase Wallet (Base App)** and Farcaster clients.

## Overview

The Horizon Mini App is a **web-based companion application** designed to run embedded within the Base App (Coinbase Wallet) and Farcaster frames. It serves as the discovery and onboarding funnel for the full Horizon Protocol.

```
┌─────────────────────────────────────────────────────────────┐
│                     Coinbase Wallet                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 Horizon Mini App                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐               │  │
│  │  │ Missions│  │ Guilds  │  │  Stats  │               │  │
│  │  └─────────┘  └─────────┘  └─────────┘               │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  Mission Feed (Quick Claim)                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

### Mission Discovery
- Infinite scroll mission feed
- Filter by location: All, Remote, Nearby
- Sort by: Trending, Newest, Highest Reward
- Quick-claim with gasless transactions

### Guild Discovery
- Browse guilds by category
- View guild stats and top performers
- One-tap guild joining
- Exclusive mission access

### Stats Dashboard
- XP progress and level tracking
- Builder Score display (Talent Protocol)
- Achievement badges
- Guild memberships
- Download full app CTA

### Social Proof
- Friend activity feed
- Recent completions from network
- Share missions to Farcaster

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | App Router, React Server Components |
| **OnchainKit** | Coinbase wallet integration |
| **MiniKit** | Base App/Farcaster frame support |
| **Wagmi** | Ethereum hooks |
| **Tailwind CSS** | Styling with Solarpunk theme |
| **Framer Motion** | Animations |

## Base Ecosystem Integration

### OnchainKit

Full integration with `@coinbase/onchainkit`:

```typescript
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';

export function Providers({ children }) {
  return (
    <OnchainKitProvider chain={baseSepolia}>
      {children}
    </OnchainKitProvider>
  );
}
```

### Gasless Transactions

Mission claims use **CDP Paymaster** for zero-gas UX:

```typescript
// User pays $0 in gas
await claimMission(missionId, {
  paymaster: process.env.NEXT_PUBLIC_PAYMASTER_URL,
});
```

### Coinbase Smart Wallet

Native support for Coinbase Smart Wallet:
- Passkey authentication
- Account abstraction
- Session keys for smooth UX

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│  1. DISCOVER                                                  │
│  User opens Mini App in Coinbase Wallet                      │
│                          ↓                                    │
├─────────────────────────────────────────────────────────────┤
│  2. BROWSE                                                    │
│  Scroll through missions, filter by location/category        │
│                          ↓                                    │
├─────────────────────────────────────────────────────────────┤
│  3. CLAIM                                                     │
│  Quick-claim mission with one tap (gasless)                  │
│                          ↓                                    │
├─────────────────────────────────────────────────────────────┤
│  4. COMPLETE                                                  │
│  Download full app for GPS tracking and submission           │
│                          ↓                                    │
├─────────────────────────────────────────────────────────────┤
│  5. EARN                                                      │
│  Receive USDC, XP, and achievements                          │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Status

| Network | Status | URL |
|---------|--------|-----|
| Base Sepolia (Testnet) | ✅ Active | Coming soon |
| Base Mainnet | 🔜 Planned | - |

### Testnet Features
- Full mission discovery
- Guild browsing
- Stats dashboard
- Gasless claims via Paymaster

### Mainnet Roadmap
- Production smart contracts
- Real USDC escrow
- App Store/Play Store integration
- Farcaster frame support

## Frame Support

### Coinbase Wallet
Embedded as a Mini App within the wallet's dApp browser.

### Farcaster Frames
Share missions as interactive frames:

```
┌─────────────────────────────────────────┐
│  🚀 New Mission Available!              │
│                                         │
│  📦 Package Delivery                    │
│  💰 $15 USDC                           │
│  📍 2.3 km away                         │
│                                         │
│  [Claim Mission]  [View Details]        │
└─────────────────────────────────────────┘
```

## Why a Mini App?

### Lower Friction
Users discover Horizon without leaving Coinbase Wallet.

### Wallet-Native UX
Seamless transactions with connected wallet.

### Social Distribution
Share via Farcaster frames for viral growth.

### Quick Onboarding
Browse and claim before downloading full app.

## Comparison: Mini App vs Full App

| Feature | Mini App | Full App |
|---------|----------|----------|
| Mission Discovery | ✅ | ✅ |
| Mission Claiming | ✅ | ✅ |
| GPS Tracking | ❌ | ✅ |
| Photo Submission | ❌ | ✅ |
| Live Location | ❌ | ✅ |
| Push Notifications | ❌ | ✅ |
| Offline Support | ❌ | ✅ |
| Guild Management | Limited | Full |
| Dispute Handling | ❌ | ✅ |

The Mini App is designed for discovery and simple claims. Complex missions requiring GPS verification or photo proof direct users to the full mobile app.



