---
sidebar_position: 4
---

# Economics

Horizon Protocol's economic model incentivizes honest participation through fee distribution, staking, and dispute resolution.

## Fee Structure

### Mission Completion (5-Way Split)

When a mission completes successfully:

| Recipient | Percentage | Type | Purpose |
|-----------|------------|------|---------|
| **Performer** | 90% - Guild Fee | Base | Reward for completion |
| **Protocol** | 4% | Fixed | Platform sustainability |
| **Labs** | 4% | Fixed | R&D and development |
| **Resolver** | 2% | Fixed | Dispute resolution pool |
| **Guild** | 0-10%+ | Variable | Guild treasury (if curated) |

### Fixed vs Variable Fees

**Fixed Fees (10% total):**
- Protocol (4%) and Labs (4%) are equal - ensures sustainable development
- Resolver (2%) is lower - funds dispute resolution pool

**Variable Guild Fee:**
- Set by each guild when they curate/accept a mission
- Guilds can define fee tiers based on mission difficulty/effort
- No guild = no guild fee (performer keeps full 90%)
- High-value guilds may charge 5-10% for premium curation

### Example: No Guild

For a $100 USDC mission without guild:

```
Performer:    $90.00 (90%)
Protocol:     $4.00  (4%)
Labs:         $4.00  (4%)
Resolver:     $2.00  (2%)
Guild:        $0.00  (0%)
```

### Example: With Guild (3% fee)

For a $100 USDC mission curated by a guild with 3% fee:

```
Performer:    $87.00 (90% - 3% guild)
Protocol:     $4.00  (4%)
Labs:         $4.00  (4%)
Resolver:     $2.00  (2%)
Guild:        $3.00  (3%)
```

### Example: Premium Guild (7% fee)

For a $100 USDC mission curated by a premium guild with 7% fee:

```
Performer:    $83.00 (90% - 7% guild)
Protocol:     $4.00  (4%)
Labs:         $4.00  (4%)
Resolver:     $2.00  (2%)
Guild:        $7.00  (7%)
```

### Guild Fee Tiers

Guilds can configure different fee rates based on mission characteristics:

| Tier | Fee Range | Use Case |
|------|-----------|----------|
| **Basic** | 1-2% | Simple tasks, quick turnaround |
| **Standard** | 3-5% | Regular missions, moderate effort |
| **Premium** | 5-8% | Complex tasks, specialized skills |
| **Elite** | 8-10%+ | High-value, verified performers only |

Guilds define these tiers in their DAO governance and apply them when curating missions to their board.

## DDR (Dynamic Dispute Reserve)

The DDR is a 5% deposit required when raising a dispute.

### Purpose
- Creates "skin in the game" for dispute parties
- Discourages frivolous disputes
- Funds resolver compensation

### Mechanism

1. Party raises dispute → Deposits 5% of reward
2. Other party responds → Also deposits 5%
3. Resolution reached → Winner receives DDR back
4. Fees deducted → Resolver (20%), Protocol (10%)

### Example ($100 mission)

```
DDR per party:           $5.00
Total DDR pool:          $10.00

After resolution:
Resolver fee (20%):      $2.00
Protocol fee (10%):      $1.00
Winner receives:         $7.00
```

## LPP (Loser-Pays Penalty)

An additional 2% penalty on the losing party.

### Purpose
- Further discourages bad-faith disputes
- Compensates winner for time/stress
- Supplements resolver incentives

### Example ($100 mission, Performer wins)

```
Poster loses:
- Loses DDR deposit:     $5.00
- LPP penalty:           $2.00
- Original reward:       $0.00 (goes to performer)

Performer wins:
- Receives reward:       $100.00
- Receives DDR:          $7.00 (after fees)
- Receives LPP:          $2.00

Total performer payout:  $109.00
```

## Dispute Outcomes

### Poster Wins
- Performer failed to complete task
- Full reward returned to poster
- Performer loses DDR + pays LPP

### Performer Wins  
- Poster wrongly rejected completion
- Performer receives full reward
- Poster loses DDR + pays LPP

### Split Decision
- Partial fault on both sides
- Reward split according to fault %
- DDR returned proportionally (minus fees)
- No LPP applied

### Cancelled
- Dispute withdrawn or voided
- DDR returned to both (minus fees)
- Original reward returned to poster

## Future Token Economics

Token-based governance and staking mechanisms may be introduced in future protocol versions. Current governance is based on protocol participation and reputation.

## XP Economy

### XP Sources

| Action | XP Reward |
|--------|-----------|
| Complete mission | 10-50 XP |
| First mission | +25 bonus |
| Perfect rating (5/5) | +10 bonus |
| Mission streak (5+) | +15% multiplier |
| Guild board completion | +10% bonus |

### Level Progression

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 1 | Novice | 0 | Basic access |
| 2 | Apprentice | 100 | Access priority missions |
| 3 | Explorer | 300 | Guild creation |
| 4 | Pathfinder | 600 | Curator eligibility |
| 5 | Voyager | 1,000 | Premium features |
| 6+ | Master+ | 2,000+ | Achievement NFTs |

## Treasury Management

### Protocol Treasury

Receives 3% of all mission completions.

**Allocation:**
- 50% Development
- 30% Security audits
- 20% Reserve

### Guild Treasuries

Managed by guild governance.

**Common uses:**
- Member bonuses
- Marketing
- Equipment/tools
- Events

