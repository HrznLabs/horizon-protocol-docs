---
sidebar_position: 1
---

# Smart Contracts

Horizon Protocol's on-chain components handle mission escrow, payment routing, guild management, and dispute resolution.

## Contract Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      MissionFactory                          │
│              Creates mission escrow proxies                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ deploy()
┌──────────────────────────▼──────────────────────────────────┐
│                     MissionEscrow                            │
│              Individual mission state machine                │
│                                                              │
│  ┌─────────┐    ┌──────────┐    ┌───────────┐    ┌────────┐│
│  │  Open   │───▶│ Accepted │───▶│ Submitted │───▶│Complete││
│  └─────────┘    └──────────┘    └───────────┘    └────────┘│
└──────────────────────────┬──────────────────────────────────┘
                           │ settlePayment()
┌──────────────────────────▼──────────────────────────────────┐
│                      PaymentRouter                           │
│              5-way fee split distribution                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      GuildFactory                            │
│              Creates guild DAO contracts                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ createGuild()
┌──────────────────────────▼──────────────────────────────────┐
│                        GuildDAO                              │
│              Membership, governance, treasury                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DisputeResolver                           │
│              DDR/LPP dispute handling                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  HorizonAchievements                         │
│            Soulbound + Tradable NFT achievements             │
└─────────────────────────────────────────────────────────────┘
```

## MissionFactory

The factory deploys individual escrow contracts using the minimal clone pattern (EIP-1167).

### Key Functions

```solidity
/// @notice Create a new mission with escrowed funds
function createMission(
    uint256 rewardAmount,
    uint256 expiresAt,
    address guild,
    bytes32 metadataHash,
    bytes32 locationHash
) external returns (address escrowAddress, uint256 missionId);
```

### Events

```solidity
event MissionCreated(
    uint256 indexed id,
    address indexed poster,
    address indexed escrowAddress,
    uint256 rewardAmount,
    uint256 expiresAt,
    address guild
);
```

## MissionEscrow

Each mission gets its own escrow contract holding funds until completion or cancellation.

### State Machine

| State | Description |
|-------|-------------|
| `Open` | Awaiting performer acceptance |
| `Accepted` | Performer assigned, in progress |
| `Submitted` | Proof submitted, awaiting approval |
| `Completed` | Approved, funds settled |
| `Cancelled` | Mission cancelled by poster |
| `Disputed` | Dispute raised, in resolution |

### Key Functions

```solidity
/// @notice Accept the mission (performer)
function acceptMission() external;

/// @notice Submit proof of completion (performer)
function submitProof(bytes32 proofHash) external;

/// @notice Approve completion and release funds (poster)
function approveCompletion() external;

/// @notice Cancel mission before acceptance (poster)
function cancelMission() external;

/// @notice Raise a dispute (poster or performer)
function raiseDispute(bytes32 disputeHash) external;

/// @notice Claim expired mission funds (anyone after expiry)
function claimExpired() external;
```

### Immutable Properties

These values **cannot change** after initialization:

- `rewardAmount` - USDC reward for completion
- `poster` - Mission creator address
- `expiresAt` - Expiration timestamp
- `guild` - Associated guild (if any)
- `metadataHash` - IPFS hash of mission details
- `locationHash` - IPFS hash of encrypted location

## PaymentRouter

Handles the 5-way fee split when missions complete.

### Fee Structure

**Fixed Fees (immutable):**
```solidity
// Fixed fees in basis points
uint16 public constant PROTOCOL_FEE_BPS = 250;   // 2.5%
uint16 public constant LABS_FEE_BPS = 250;       // 2.5%
uint16 public constant RESOLVER_FEE_BPS = 200;   // 2%

// Hierarchy fees (for verticals like iTake)
uint16 public constant MAX_METADAO_FEE_BPS = 100;  // 1%
uint16 public constant MAX_SUBDAO_FEE_BPS = 200;   // 2%

// Base performer percentage
uint16 public constant BASE_PERFORMER_BPS = 9000; // 90%
```

**Inclusive Fee Model:**
- Total fees never exceed 10%
- Performer always receives ≥90%
- MetaDAO + SubDAO fees are taken from the 3% variable portion

### Settlement Functions

```solidity
/// @notice Settle payment using default guild fee
function settlePayment(
    uint256 missionId,
    address performer,
    uint256 rewardAmount,
    address guild
) external onlyAuthorized;

/// @notice Settle payment with explicit guild fee (for curated missions)
function settlePaymentWithGuildFee(
    uint256 missionId,
    address performer,
    uint256 rewardAmount,
    address guild,
    uint16 guildFeeBps
) external onlyAuthorized;
```

### Fee Split Calculation

```solidity
// Fixed fees
protocolAmount = (rewardAmount * 250) / 10000;  // 2.5%
labsAmount = (rewardAmount * 250) / 10000;      // 2.5%
resolverAmount = (rewardAmount * 200) / 10000;  // 2%

// Variable hierarchy fees (0-3% total)
metaDAOAmount = (rewardAmount * metaDAOFeeBps) / 10000; // 0-1%
subDAOAmount = (rewardAmount * subDAOFeeBps) / 10000;   // 0-2%

// Performer gets remainder (≥90%)
performerAmount = rewardAmount - protocolAmount - labsAmount 
                  - resolverAmount - metaDAOAmount - subDAOAmount;
```

## DisputeResolver

Handles mission disputes with DDR/LPP economics.

### Dispute Flow

1. Either party calls `raiseDispute()` with DDR deposit
2. ResolversDAO assigns a resolver
3. Both parties submit evidence
4. Resolver makes decision
5. 48-hour appeal period
6. Finalize and distribute funds

### Key Constants

```solidity
uint256 public constant DDR_RATE_BPS = 500;      // 5% DDR
uint256 public constant LPP_RATE_BPS = 200;      // 2% LPP
uint256 public constant APPEAL_PERIOD = 48 hours; // Appeal window
uint256 public constant RESOLVER_FEE_BPS = 2000;  // 20% of DDR
uint256 public constant PROTOCOL_FEE_BPS = 1000;  // 10% of DDR
```

### Dispute Outcomes

| Outcome | Poster | Performer | Notes |
|---------|--------|-----------|-------|
| `PosterWins` | DDR + LPP | Nothing | Performer failed |
| `PerformerWins` | Nothing | DDR + LPP + Reward | Poster wrong |
| `Split` | Proportional | Proportional | Shared fault |
| `Cancelled` | DDR (minus fees) | DDR (minus fees) | Void |

## Delivery Vertical (v2)

Specialized contracts for physical delivery missions with insurance and geofence verification.

### DeliveryMissionFactory

Deploys `DeliveryEscrow` proxies with vertical-specific parameters.

```solidity
function createDeliveryMission(
    uint256 rewardAmount,
    uint256 expiresAt,
    address deliveriesDao,
    bytes32 metadataHash,
    uint256 insuranceCoverage
) external returns (address escrowAddress);
```

### DeliveryEscrow

Enhanced escrow that integrates with the physical world verification.

- **Geofence Check**: State transitions (Arrived at Pickup, Mark Picked Up, Complete) require presence hashes.
- **Insurance Policy**: Interacts with `DeliveriesDAO` to lock mission insurance during the delivery window.
- **Proof of Transit**: Stores encrypted location breadcrumbs from the driver mini-app.

### DeliveriesDAO

The management hub for the delivery vertical.

- **Performers**: Manage verified driver onboarding.
- **Insurance Pool**: Vault holding funds for coverage payouts.
- **Claims**: Automated (geofence-based) or manual (resolver-based) insurance settlement.

## HorizonAchievements

ERC-721 NFT contract for achievements and collectibles.

### Achievement Types

| Category | Transferable | Example |
|----------|--------------|---------|
| Milestone | No (Soulbound) | "First Mission", "100 Missions" |
| Performance | No (Soulbound) | "Speed Runner", "Perfect Rating" |
| Guild | No (Soulbound) | "Guild Master", "Top Curator" |
| Seasonal | No (Soulbound) | "Summer 2025 Legend" |
| Special | Yes (Tradable) | Collectible NFTs |

### Key Functions

```solidity
/// @notice Mint an achievement (minter role required)
function mintAchievement(
    address to,
    uint256 typeId,
    bytes32 proofHash
) external returns (uint256 tokenId);

/// @notice Check if user has achievement
function hasAchievement(
    address user,
    uint256 typeId
) external view returns (bool);
```

## Security Considerations

### Access Control

- **Owner**: Protocol governance
- **Authorized**: MissionFactory, PaymentRouter
- **ResolversDAO**: Can assign resolvers
- **ProtocolDAO**: Can override dispute resolutions

### Reentrancy Protection

All state-changing functions use `ReentrancyGuard` from OpenZeppelin.

### CEI Pattern

All contracts follow Checks-Effects-Interactions:

1. **Checks**: Validate inputs and state
2. **Effects**: Update storage
3. **Interactions**: External calls (last)

## Deployed Addresses

### Base Sepolia (Testnet)

| Contract | Address |
|----------|---------|
| MissionFactory | `0xee9234954b134c39c17a75482da78e46b16f466c` |
| PaymentRouter | `0x94fb7908257ec36f701d2605b51eefed4326ddf5` |
| GuildFactory | `0xfeae3538a4a1801e47b6d16104aa8586edb55f00` |
| ReputationAttestations | `0xedae9682a0fb6fb3c18d6865461f67db7d748002` |
| DisputeResolver | `0xb00ac4278129928aecc72541b0bcd69d94c1691e` |
| HorizonAchievements | `0x568e0e3102bfa1f4045d3f62559c0f9823b469bc` |
| USDC (testnet) | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

**Chain ID**: 84532  
**Block Explorer**: [sepolia.basescan.org](https://sepolia.basescan.org)

### Base Mainnet

Mainnet deployment pending.

### Verification

All contracts are verified on [BaseScan](https://sepolia.basescan.org) with full source code and constructor arguments.

