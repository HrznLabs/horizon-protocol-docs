---
sidebar_position: 4
---

# BuildDao - Construction

A decentralized construction and contracting platform built on Horizon Protocol.

## Overview

BuildDao brings blockchain-based coordination to construction projects:
- **Milestone-based escrow** for project payments
- **Contractor reputation** across projects
- **Multi-party coordination** for complex builds
- **Dispute resolution** for contractor conflicts

## Concept Design

> **Note**: BuildDao is currently in the planning phase. This document outlines the proposed architecture.

### Vision

Transform construction contracting by:
- Replacing trust-based payments with milestone escrow
- Creating portable contractor reputation
- Enabling guild-based contractor networks
- Providing transparent project tracking

## How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  BuildDao   │────▶│ Contractor  │
│  (Poster)   │     │    App      │     │   Guild     │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │   Horizon   │
                    │  Protocol   │
                    └──────┬──────┘
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
┌────────────┐      ┌────────────┐      ┌────────────┐
│ Milestone  │      │ Inspector  │      │ Materials  │
│  Escrow    │      │  Verify    │      │  Tracking  │
└────────────┘      └────────────┘      └────────────┘
```

### Project Flow

1. **Client creates project** → Budget deposited in escrow
2. **Milestones defined** → Each phase has specific deliverables
3. **Contractors bid** → Guild members submit proposals
4. **Work begins** → First milestone funded
5. **Inspector verifies** → Third-party confirms completion
6. **Payment released** → Milestone escrow settles
7. **Repeat for each phase** → Until project complete

## Project Structure

### Project Mission

```json
{
  "type": "CONSTRUCTION_PROJECT",
  "title": "Bathroom Renovation",
  "description": "Complete bathroom remodel including...",
  "location": { "lat": 40.7128, "lng": -74.0060 },
  "totalBudget": "15000.00",
  "milestones": [
    {
      "name": "Demolition",
      "budget": "2000.00",
      "duration": "3 days",
      "deliverables": ["Remove existing fixtures", "Dispose of debris"]
    },
    {
      "name": "Plumbing",
      "budget": "3500.00",
      "duration": "5 days",
      "deliverables": ["New pipes", "Fixtures installed"]
    },
    {
      "name": "Electrical",
      "budget": "2000.00",
      "duration": "3 days",
      "deliverables": ["New wiring", "Outlets installed"]
    },
    {
      "name": "Finishing",
      "budget": "7500.00",
      "duration": "10 days",
      "deliverables": ["Tiling", "Painting", "Final fixtures"]
    }
  ]
}
```

## Multi-Party Escrow

BuildDao extends Horizon's escrow for multi-milestone projects:

```
Project Budget: $15,000
         │
         ▼
┌─────────────────────────────────────────────────┐
│              Master Escrow                       │
│  Releases funds per milestone completion         │
└────────────────────┬────────────────────────────┘
         │
    ┌────┴────┬────────┬────────┐
    ▼         ▼        ▼        ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│$2,000 │ │$3,500 │ │$2,000 │ │$7,500 │
│Demo   │ │Plumb  │ │Elec   │ │Finish │
└───────┘ └───────┘ └───────┘ └───────┘
```

## Contractor Guilds

### Trade Specializations

| Guild Type | Specialization |
|------------|----------------|
| **General Contractors** | Project management, multi-trade |
| **Plumbers Guild** | Plumbing and pipe work |
| **Electricians Guild** | Electrical systems |
| **Carpenters Guild** | Framing, woodwork |
| **Finishers Guild** | Painting, flooring, detail work |

### Guild Reputation

Contractors build reputation through:
- **Completed projects** (on-time, on-budget)
- **Client ratings** (quality, communication)
- **Inspector verifications** (work quality)
- **Peer attestations** (from other contractors)

## Verification System

### Inspector Role

Third-party inspectors verify work quality:

```typescript
interface InspectionReport {
  milestoneId: string;
  inspector: Address;
  status: 'APPROVED' | 'NEEDS_WORK' | 'REJECTED';
  notes: string;
  photos: string[];
  timestamp: number;
}
```

### Verification Flow

1. Contractor marks milestone complete
2. Client requests inspection
3. Inspector visits site
4. Inspector submits report on-chain
5. If approved → Escrow releases payment
6. If needs work → Contractor revises
7. If rejected → Dispute process begins

## Fee Structure

| Recipient | Percentage |
|-----------|------------|
| Contractor | 90-93% |
| Protocol | 3% |
| Labs | 2% |
| Resolver | 1% |
| Guild | 0-4% |
| Inspector | 1% (from client) |

## Use Cases

### Residential

- Bathroom/kitchen remodels
- Roof repairs
- Landscaping projects
- Home additions

### Commercial

- Office buildouts
- Retail renovations
- Restaurant construction
- Warehouse modifications

### Specialty

- Historic restoration
- Accessibility retrofits
- Energy efficiency upgrades
- Emergency repairs

## Technical Integration

```typescript
// Create a construction project
const project = await buildDao.createProject({
  title: 'Bathroom Renovation',
  milestones: [
    { name: 'Demolition', budget: parseUSDC(2000), duration: 3 * 24 * 3600 },
    { name: 'Plumbing', budget: parseUSDC(3500), duration: 5 * 24 * 3600 },
    // ...
  ],
  totalBudget: parseUSDC(15000),
});

// Contractor bids on project
await buildDao.submitBid(project.id, {
  contractor: contractorAddress,
  proposedTimeline: '21 days',
  proposal: 'We specialize in bathroom renovations...',
});

// Complete milestone
await buildDao.completeMilestone(project.id, milestoneIndex, {
  photos: progressPhotos,
  notes: 'Demolition complete, area cleaned',
});

// Inspector approves
await buildDao.submitInspection(project.id, milestoneIndex, {
  status: 'APPROVED',
  notes: 'Work completed to specifications',
});
```

## Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| Concept | ✅ Complete | Use case validation |
| Design | 🔄 In Progress | Technical architecture |
| Contracts | Planned | Multi-milestone escrow |
| MVP | Planned | Basic project management |
| Guild Setup | Planned | Contractor onboarding |

## Get Involved

Interested in BuildDao development?

- [Discord Community](https://discord.gg/horizon)
- [GitHub Repository](https://github.com/HrznLabs/BuildDao)
