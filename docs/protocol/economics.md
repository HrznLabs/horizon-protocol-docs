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
| **Performer** | ≥90% | Guaranteed | Reward for completion |
| **Protocol** | 2.5% | Fixed | Platform sustainability |
| **Labs** | 2.5% | Fixed | R&D and development |
| **Resolver** | 2% | Fixed | Dispute resolution pool |
| **MetaDAO** | 0-1% | Variable | Platform fee (e.g., iTake) |
| **SubDAO** | 0-2% | Variable | Business fee (e.g., Restaurant) |

### Inclusive 10% Fee Model

**Fixed Fees (7% base):**
- Protocol (2.5%) and Labs (2.5%) fund platform operations and development
- Resolver (2%) funds the dispute resolution pool

**Variable Hierarchy Fees (up to 3%):**
- MetaDAO fee (0-1%): For vertical platforms like iTake
- SubDAO fee (0-2%): For individual businesses like restaurants
- **Total fees never exceed 10%** - performer always receives ≥90%

**No Guild = No Hierarchy Fee:**
- For missions without a guild, performer receives full 90%

### Example: No Guild/Hierarchy

For a $100 USDC mission without guild:

```
Performer:    $93.00 (93%)
Protocol:     $2.50  (2.5%)
Labs:         $2.50  (2.5%)
Resolver:     $2.00  (2%)
MetaDAO:      $0.00  (0%)
SubDAO:       $0.00  (0%)
```

### Example: With Guild (3% fee)

For a $100 USDC mission curated by a guild with 3% fee:

```
Performer:    $90.00 (90%)
Protocol:     $2.50  (2.5%)
Labs:         $2.50  (2.5%)
Resolver:     $2.00  (2%)
Guild:        $3.00  (3%)
```

### Example: iTake Delivery (MetaDAO + SubDAO)

For a $100 USDC delivery mission with full hierarchy:

```
Performer:    $90.00 (90%)
Protocol:     $2.50  (2.5%)
Labs:         $2.50  (2.5%)
Resolver:     $2.00  (2%)
iTake (Meta): $1.00  (1%)
Restaurant:   $2.00  (2%)

Total Fees:   $10.00 (10%)
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

---

## XP Economy

### XP Sources

| Action | XP Reward |
|--------|-----------|
| Complete mission | 10-50 XP |
| First mission | +25 bonus |
| Perfect rating (5/5) | +10 bonus |
| Mission streak (5+) | +15% multiplier |
| Guild board completion | +10% bonus |
| Curation success | +20 XP |
| Dispute won | +100 XP |
| Dispute lost | -50 XP |

---

## Level Progression (25 Levels)

Horizon uses a 25-level progression system optimized for engagement:

### Onboarding (Levels 1-5)

Fast progression to hook new users (~8-10 missions to Level 5).

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 1 | Newcomer | 0 | Basic access |
| 2 | Rookie | 75 | Mission posting |
| 3 | Starter | 200 | - |
| 4 | Apprentice | 375 | - |
| 5 | Explorer | 625 | Guild joining |

### Early Game (Levels 6-10)

Building momentum and unlocking key features.

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 6 | Scout | 925 | - |
| 7 | Tracker | 1,325 | - |
| 8 | Pathfinder | 1,825 | Premium missions |
| 9 | Ranger | 2,475 | - |
| 10 | Adventurer | 3,275 | Guild creation |

### Mid Game (Levels 11-15)

Core engagement with governance unlocks.

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 11 | Voyager | 4,275 | - |
| 12 | Wayfarer | 5,525 | - |
| 13 | Navigator | 7,025 | Curator eligible |
| 14 | Trailblazer | 8,825 | - |
| 15 | Pioneer | 11,000 | Resolver eligible |

### Late Game (Levels 16-20)

Dedicated users with governance power.

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 16 | Captain | 13,575 | - |
| 17 | Commander | 16,650 | - |
| 18 | Elite | 20,325 | Governance voting |
| 19 | Master | 24,725 | - |
| 20 | Champion | 30,000 | Protocol proposals |

### Prestige (Levels 21-25)

Top-tier users with full access.

| Level | Title | XP Required | Perks |
|-------|-------|-------------|-------|
| 21 | Hero | 36,300 | - |
| 22 | Guardian | 43,850 | - |
| 23 | Sentinel | 52,850 | - |
| 24 | Titan | 63,525 | - |
| 25 | Legend | 76,200 | All perks unlocked |

---

## Feature Unlocks

| Feature | Level Required |
|---------|----------------|
| Mission Posting | 2 |
| Guild Joining | 5 |
| Premium Missions | 8 |
| Guild Creation | 10 |
| Curator Eligible | 13 |
| Resolver Eligible | 15 |
| Governance Voting | 18 |
| Protocol Proposals | 20 |

---

## Treasury Management

### Protocol Treasury

Receives 2.5% of all mission completions.

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
