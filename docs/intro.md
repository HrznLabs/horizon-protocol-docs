---
sidebar_position: 1
slug: /
---

# Welcome to Horizon Protocol

Horizon is a **decentralized, gamified coordination platform** for real-world missions built natively on **Base L2**. It bridges digital incentives with physical-world tasks through blockchain-backed escrow, location verification, and guild-based coordination.

## Built on Base

Horizon leverages the Coinbase/Base ecosystem:

- **Base L2** - Low-cost, fast EVM transactions
- **USDC** - Native stablecoin for mission payments
- **Basenames** - .base.eth identity integration
- **EAS** - On-chain reputation attestations
- **CDP Paymaster** - Gasless operations for ratings & achievements
- **OnchainKit + MiniKit** - Coinbase Wallet Mini App
- **Talent Protocol** - Builder Score XP multipliers

### Horizon Mini App

A lightweight companion app that runs inside **Coinbase Wallet** and Farcaster clients:

- 🔍 **Discover** - Browse missions without leaving the wallet
- ⚡ **Quick Claim** - Gasless mission claims with one tap
- 🏆 **Track Progress** - View XP, achievements, and guild memberships
- 📱 **Full App Link** - Seamless handoff for GPS-verified missions

[Learn more about the Mini App →](/docs/architecture/mini-app)

## What is Horizon?

Horizon Protocol enables:

- **Mission Posting & Execution**: Post tasks with escrowed rewards, accept missions based on location
- **Guild Coordination**: Form teams, curate mission boards, share reputation
- **On-chain Escrow**: Secure USDC payments with automated settlement
- **Location Verification**: Geofenced missions with privacy-preserving location proofs
- **XP & NFT Rewards**: Level up, earn achievements, collect tradable items

## Quick Links

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>🚀 Getting Started</h3>
      </div>
      <div className="card__body">
        <p>Set up your development environment and integrate with Horizon.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/guides/getting-started">
          Start Building
        </a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>📖 Protocol Overview</h3>
      </div>
      <div className="card__body">
        <p>Understand how Horizon's mission engine, guilds, and economics work.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/docs/protocol/overview">
          Learn More
        </a>
      </div>
    </div>
  </div>
</div>

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>🔧 Smart Contracts</h3>
      </div>
      <div className="card__body">
        <p>Explore the on-chain architecture: MissionEscrow, PaymentRouter, GuildDAO.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/docs/architecture/smart-contracts">
          View Contracts
        </a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>🗺️ API Reference</h3>
      </div>
      <div className="card__body">
        <p>Complete API documentation for missions, guilds, map, and WebSocket.</p>
      </div>
      <div className="card__footer">
        <a className="button button--secondary button--block" href="/docs/api/overview">
          Browse API
        </a>
      </div>
    </div>
  </div>
</div>

## Core Concepts

### Mission Lifecycle

1. **Poster** creates mission → Funds deposited in escrow
2. **Performer** accepts mission → Begins execution
3. **Performer** submits proof → Photos, signatures, etc.
4. **Poster** approves → Escrow settles, funds distributed
5. Or dispute raised → DDR/LPP resolution process

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│                   Mobile App · Web App                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      Horizon API                             │
│          REST Endpoints · WebSocket · Authentication         │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     Base L2 Blockchain                       │
│  MissionFactory · MissionEscrow · PaymentRouter · GuildDAO  │
│         ReputationAttestations · DisputeResolver            │
└─────────────────────────────────────────────────────────────┘
```

## Deployments

### Testnet (Base Sepolia)

| Contract | Address |
|----------|---------|
| MissionFactory | `0xee9234954b134c39c17a75482da78e46b16f466c` |
| PaymentRouter | `0x94fb7908257ec36f701d2605b51eefed4326ddf5` |
| GuildFactory | `0xfeae3538a4a1801e47b6d16104aa8586edb55f00` |
| ReputationAttestations | `0xedae9682a0fb6fb3c18d6865461f67db7d748002` |
| DisputeResolver | `0xb00ac4278129928aecc72541b0bcd69d94c1691e` |
| HorizonAchievements | `0x568e0e3102bfa1f4045d3f62559c0f9823b469bc` |

## Open Source

Horizon Protocol is open source and available on GitHub:

- **Smart Contracts**: [github.com/HrznLabs/horizon-contracts](https://github.com/HrznLabs/horizon-contracts)
- **TypeScript SDK**: [github.com/HrznLabs/horizon-sdk](https://github.com/HrznLabs/horizon-sdk)
- **Documentation**: [github.com/HrznLabs/horizon-protocol-docs](https://github.com/HrznLabs/horizon-protocol-docs)

## Contributing

We welcome contributions! See our repositories for details on how to get started.
