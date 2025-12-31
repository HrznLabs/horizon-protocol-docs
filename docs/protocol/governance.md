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

The main governance body for core protocol decisions.

### Responsibilities
- Fee parameter changes
- Contract upgrades
- Treasury allocation
- Emergency actions

### Voting Power

Based on:
- Protocol participation (mission activity, reputation)
- Stake duration (future)
- Community contribution

### Proposal Types

| Type | Quorum | Voting Period | Timelock |
|------|--------|---------------|----------|
| Parameter Change | 10% | 7 days | 2 days |
| Contract Upgrade | 20% | 14 days | 7 days |
| Treasury (>$100k) | 30% | 14 days | 7 days |
| Emergency | 51% | 24 hours | 0 |

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

- On-chain submission
- Voting period begins
- Participation-weighted votes

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

