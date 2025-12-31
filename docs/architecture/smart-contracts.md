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
uint16 public constant PROTOCOL_FEE_BPS = 400;   // 4%
uint16 public constant LABS_FEE_BPS = 400;       // 4%
uint16 public constant RESOLVER_FEE_BPS = 200;   // 2%

// Base performer percentage before guild fee
uint16 public constant BASE_PERFORMER_BPS = 9000; // 90%
```

**Variable Guild Fee:**
```solidity
// Maximum guild fee (set per-guild)
uint16 public constant MAX_GUILD_FEE_BPS = 1500; // 15%

// Guild fee is determined when mission is curated to board
// Performer receives: 90% - guildFee
```

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
protocolAmount = (rewardAmount * 400) / 10000;  // 4%
labsAmount = (rewardAmount * 400) / 10000;      // 4%
resolverAmount = (rewardAmount * 200) / 10000;  // 2%

// Variable guild fee (0-15%)
guildAmount = (rewardAmount * guildFeeBps) / 10000;

// Performer gets remainder
performerAmount = rewardAmount - protocolAmount - labsAmount 
                  - resolverAmount - guildAmount;
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

## Deployment

### Base Sepolia Addresses

```
MissionFactory:         0x...
MissionEscrow (impl):   0x...
PaymentRouter:          0x...
GuildFactory:           0x...
GuildDAO (impl):        0x...
ReputationAttestations: 0x...
DisputeResolver:        0x...
HorizonAchievements:    0x...
USDC (testnet):         0x...
```

### Verification

All contracts are verified on BaseScan with full source code and constructor arguments.

