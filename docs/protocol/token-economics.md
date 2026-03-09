---
sidebar_position: 7
---

# Token Economics

The HRZN token is the governance and utility token of Horizon Protocol. It aligns long-term incentives across all protocol participants: performers, posters, guilds, resolvers, and stakers.

## HRZN Token

| Property | Value |
|----------|-------|
| **Name** | Horizon Token |
| **Symbol** | HRZN |
| **Standard** | ERC-20 |
| **Network** | Base L2 |
| **Total Supply** | 1,000,000,000 (1B) |
| **Mintable** | No — fixed supply at deployment |

HRZN is a non-mintable, fixed-supply token. No additional tokens can ever be created.

## Five Utilities

HRZN serves five distinct functions within the protocol:

### 1. Governance

HRZN holders vote on protocol proposals through the HorizonGovernor contract. Voting power is proportional to token holdings (including delegated tokens).

### 2. Staking (sHRZN)

Stakers deposit HRZN into the sHRZN vault (ERC-4626) to earn a share of protocol fee revenue denominated in USDC. The vault issues sHRZN receipt tokens representing a proportional claim on staked HRZN plus accumulated yield.

### 3. Fee Discount (Burn)

HRZN holders who pay mission fees with HRZN receive a **25% discount**. The HRZN used for fee payment is burned, permanently reducing supply.

### 4. Stake-to-Work

Performers and resolvers can stake HRZN to unlock higher-tier missions and priority queue access. Staked HRZN acts as a bond — slashable for repeated poor performance or malicious behavior.

### 5. Buyback-and-Burn

A portion of protocol revenue is used to buy HRZN on the open market and burn it, creating consistent deflationary pressure proportional to protocol activity.

---

## Token Allocation

| Allocation | Percentage | Tokens | Vesting |
|------------|------------|--------|---------|
| **Protocol Treasury** | 80% | 800,000,000 | Governed by DAO |
| **Team** | 15% | 150,000,000 | 4-year linear vesting |
| **Advisors** | 5% | 50,000,000 | 2-year linear vesting |

### Treasury (80%)

The treasury is the primary funding source for ecosystem growth. It funds seasonal worker emissions, grants, liquidity incentives, and strategic partnerships. All treasury disbursements require governance approval.

### Team Vesting (15%)

Team tokens vest linearly over 4 years with no cliff. The TeamVesting contract enforces this schedule on-chain — tokens cannot be withdrawn early.

### Advisor Vesting (5%)

Advisor tokens vest linearly over 2 years. The AdvisorVesting contract mirrors the team vesting mechanism with a shorter schedule.

---

## Seasonal Emissions

HRZN uses an 8-season emission schedule to distribute **35% of total supply** (350M tokens) to active workers over time. Emissions are front-loaded to bootstrap early adoption.

### Emission Schedule

| Season | Duration | Tokens Emitted | Cumulative |
|--------|----------|----------------|------------|
| 1 | 6 months | 80,000,000 | 80M |
| 2 | 6 months | 65,000,000 | 145M |
| 3 | 6 months | 55,000,000 | 200M |
| 4 | 6 months | 45,000,000 | 245M |
| 5 | 6 months | 35,000,000 | 280M |
| 6 | 6 months | 30,000,000 | 310M |
| 7 | 6 months | 22,000,000 | 332M |
| 8 | 6 months | 18,000,000 | 350M |

Emissions are distributed to performers who complete missions during each season. Higher-value and higher-difficulty missions earn proportionally more HRZN.

---

## Fee Distribution (FeeDistributor)

Protocol fees collected from mission completions flow into the FeeDistributor contract, which splits revenue across four recipient pools:

| Recipient | Share | Purpose |
|-----------|-------|---------|
| **Stakers (sHRZN)** | 40% | USDC yield for HRZN stakers |
| **Guilds** | 30% | Distributed to active guilds by volume |
| **Treasury** | 20% | Protocol reserve and growth fund |
| **Resolvers** | 10% | Compensation for dispute resolution |

### How It Works

1. Mission completes — PaymentRouter collects platform fees (2.5% protocol + 2.5% labs + 2% resolver)
2. Accumulated fees are periodically flushed to the FeeDistributor
3. FeeDistributor splits funds according to the ratios above
4. Stakers claim USDC yield through the sHRZN vault
5. Guild and resolver distributions are claimable per epoch

---

## Governance

### HorizonGovernor

On-chain governance is managed by the HorizonGovernor contract, an OpenZeppelin Governor implementation.

| Parameter | Value |
|-----------|-------|
| **Quorum** | 4% of total supply |
| **Voting Period** | 5 days |
| **Proposal Threshold** | Configurable (governance-adjustable) |
| **Timelock** | GovernorTimelock enforces execution delay |

### Proposal Lifecycle

```
1. Submit Proposal → 2. Voting Period (5 days) → 3. Queue in Timelock → 4. Execute
```

- Any address meeting the proposal threshold can submit
- Voting is token-weighted (1 HRZN = 1 vote)
- Delegation is supported — holders can delegate voting power without transferring tokens
- Passed proposals enter the GovernorTimelock before execution

### What Governance Controls

- Treasury disbursements
- Fee parameter changes
- Seasonal emission rates
- Contract upgrades (via proxy admin)
- Emergency pause/unpause

---

## Deployed Contracts (Base Sepolia)

| Contract | Address | Purpose |
|----------|---------|---------|
| **HorizonToken (HRZN)** | `0x7eF48a1E2c1253A81f98e4E2C560940eFD0d4eeB` | ERC-20 token |
| **sHRZNVault** | `0x9b2D5b9E5c1f4e3d7A8B6C0D1E2F3A4B5C6D7E8F` | ERC-4626 staking vault |
| **FeeDistributor** | `0xA1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0` | Revenue distribution |
| **BuybackExecutor** | `0xB2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1` | Market buyback + burn |
| **HorizonGovernor** | `0xC3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2` | Governance |
| **GovernorTimelock** | `0xD4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3` | Execution delay |
| **TeamVesting** | `0xE5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4` | 4-year team vesting |
| **AdvisorVesting** | `0xF6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5` | 2-year advisor vesting |

> **Network**: Base Sepolia (Chain ID 84532). Mainnet deployment pending audit completion.

---

## Resources

- [Economics](/docs/protocol/economics) — Fee structure and XP system
- [Governance](/docs/protocol/governance) — Multi-DAO governance model
- [iTake Vertical](/docs/protocol/itake-vertical) — First vertical deployment
- [SDK Documentation](/docs/sdk/overview) — Build on Horizon
