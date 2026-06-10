---
sidebar_position: 5
---

# Governance

Horizon Protocol uses a multi-DAO governance structure.

## 4-DAO Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                      Protocol DAO                            │
│              Core protocol parameters & upgrades             │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼───────┐  ┌───────▼───────┐  ┌───────▼───────┐
│  Resolvers    │  │    Labs       │  │    Guild      │
│     DAO       │  │     DAO       │  │     DAOs      │
│ Dispute       │  │ R&D &         │  │ Individual    │
│ resolution    │  │ development   │  │ guilds        │
└───────────────┘  └───────────────┘  └───────────────┘
```

## Protocol DAO

The main governance body for core protocol decisions, powered by the deployed **HorizonGovernor** contract backed by **GovernorTimelock**.

### Responsibilities
- Fee parameter changes
- Contract upgrades
- Treasury allocation
- Emergency actions

### Voting Power

Voting power is determined by **HRZN token holdings and sHRZN (staked HRZN) balances** at the proposal snapshot block. Staking HRZN into the sHRZNVault grants both yield and governance weight.

### On-Chain Parameters (HorizonGovernor — deployed Base Sepolia)

| Parameter | Value |
|-----------|-------|
| **Quorum** | 4% of total HRZN supply |
| **Voting Period** | 5 days |
| **Proposal Threshold** | Configurable via governance |
| **Timelock Delay** | Configurable (GovernorTimelock) |
| **Execution** | GovernorTimelock enforces delay before any action executes |

All passed proposals are queued in the **GovernorTimelock** contract before execution, ensuring a safety window for the community to react.

### Deployed Contracts

| Contract | Address (Base Sepolia) |
|----------|----------------------|
| HorizonGovernor | `0xE52CCaa9980f0aD00F48BebCbB7294c3c5F644A7` |
| GovernorTimelock | `0xD0112d484B3261b26D8721e074dC82866A85977C` |
| HRZN Token | `0xe4f29a413c24B6020FE344C412D9f82Df15809aF` |
| sHRZN Vault | `0xf3D693616d6b185b36D4a2e36663E5932d351758` |

## Resolvers DAO

Governs the dispute resolution system.

### Responsibilities
- Resolver qualification
- Slashing decisions
- Appeal review
- Guideline updates

### Resolver Requirements

To become a resolver:
1. Pass technical assessment
2. Approved by DAO vote
3. Maintain performance metrics
4. Meet reputation requirements

### Performance Metrics

| Metric | Requirement |
|--------|-------------|
| Resolution time | < 72 hours avg |
| Appeal rate | < 10% |
| Overturned rate | < 5% |

## Labs DAO

Manages R&D funding and development.

### Responsibilities
- Research priorities
- Partnership decisions
- Technical roadmap
- Development funding allocation
- Infrastructure maintenance

## Guild DAOs

Individual governance for each guild.

### Responsibilities
- Fee settings
- Curator elections
- Treasury management
- Membership rules

### Standard Voting

| Decision | Quorum | Majority |
|----------|--------|----------|
| Add curator | 20% | 51% |
| Fee change | 30% | 66% |
| Treasury spend | 20% | 51% |
| Rule change | 40% | 66% |

## Governance Process

### 1. Discussion

- Forum post with rationale
- Community feedback (min 3 days)
- Refinement based on input

### 2. Temperature Check

- Informal poll
- Gauge support level
- Identify concerns

### 3. Formal Proposal

- On-chain submission to HorizonGovernor
- 5-day voting period begins
- HRZN/sHRZN token-weighted votes (snapshot at proposal block)

### 4. Execution

- Passed proposals enter timelock
- Multi-sig executes after delay
- Changes go live

## Emergency Procedures

For critical security issues:

1. **Guardian Pause**: Multi-sig can pause contracts
2. **Emergency Vote**: 24-hour vote, 51% quorum
3. **Immediate Action**: No timelock
4. **Post-mortem**: Required report within 7 days

## Multi-sig Signers

Protocol operations require multi-sig approval:

- **Threshold**: 4 of 7 signers
- **Diversity**: Mix of team, investors, community
- **Rotation**: Annual elections

