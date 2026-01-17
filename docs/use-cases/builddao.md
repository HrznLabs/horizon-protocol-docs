---
sidebar_position: 4
---

# BuildDAO - Construction

BuildDAO is a conceptual platform for connecting skilled tradespeople with construction projects, built on Horizon Protocol. It demonstrates how complex, multi-milestone projects can be coordinated through guild-based organization.

## Overview

BuildDAO addresses challenges in the construction industry:

- **Payment security** - Milestone-based escrow protects both parties
- **Skill verification** - On-chain attestations for trade certifications
- **Project coordination** - Guilds organize trades for large projects
- **Transparent reputation** - Verified work history

## How It Works

### Project Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Project    │────▶│  Milestones  │────▶│   Workers    │
│   Posted     │     │   Defined    │     │   Assigned   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Project    │◀────│ Inspection   │◀────│    Work      │
│  Completed   │     │  & Approval  │     │  Executed    │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Step-by-Step

1. **Project owner** posts construction project
2. **Milestones defined** with scope and payment
3. **Trade guilds** are invited to bid
4. **Workers assigned** from qualified guilds
5. **Work executed** according to specifications
6. **Inspection completed** by project owner or inspector
7. **Milestone payment** released upon approval
8. **Project completes** when all milestones done

## Guild Structure

BuildDAO organizes workers by trade:

```
┌─────────────────────────────────────────────────────────┐
│                  BuildDAO Protocol                       │
│             (Platform & Standards)                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Electricians│  │  Plumbers   │  │  Carpenters │     │
│  │   Guild     │  │   Guild     │  │    Guild    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   HVAC      │  │   Roofers   │  │  Painters   │     │
│  │   Guild     │  │   Guild     │  │   Guild     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Trade Guilds

- **Skill standards** - Define certification requirements
- **Quality assurance** - Maintain member standards
- **Dispute resolution** - Handle trade-specific issues
- **Training coordination** - Support skill development

## Key Features

### For Project Owners

- **Verified workers** - On-chain skill attestations
- **Payment protection** - Milestone escrow
- **Progress tracking** - Real-time project status
- **Quality assurance** - Inspection workflows

### For Workers

- **Fair payments** - Escrow-protected earnings
- **Skill recognition** - Portable certifications
- **Project discovery** - Find relevant work
- **Career growth** - Build verified reputation

## Skill Attestations

BuildDAO uses Horizon's EAS integration for verifiable credentials:

### Attestation Types

| Type | Description | Issuer |
|------|-------------|--------|
| **Trade License** | Professional certification | Licensing body |
| **Guild Certification** | Guild-verified skills | Trade guild |
| **Project Completion** | Verified completed work | Project owner |
| **Safety Certification** | OSHA/safety training | Training provider |

### Attestation Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Worker     │────▶│    Guild     │────▶│ Attestation  │
│   Applies    │     │  Verifies    │     │   Issued     │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Milestone System

Complex projects use multiple missions:

### Example: Kitchen Renovation

| Milestone | Trade | Payment | Duration |
|-----------|-------|---------|----------|
| **Demo** | General | $500 | 1 day |
| **Electrical** | Electrician | $2,000 | 2 days |
| **Plumbing** | Plumber | $1,500 | 1 day |
| **Cabinets** | Carpenter | $3,000 | 3 days |
| **Finishing** | General | $1,000 | 2 days |

### Milestone Dependencies

```typescript
interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  payment: bigint;
  requiredGuild: string;
  requiredAttestation?: string;
  dependsOn?: string[];  // Previous milestones
  estimatedDuration: number;
}
```

## Inspection Workflow

### Inspection Types

| Type | When | Who |
|------|------|-----|
| **Self-inspection** | Small jobs | Project owner |
| **Guild inspection** | Standard work | Guild inspector |
| **Third-party** | High-value/complex | Licensed inspector |

### Inspection Process

1. **Worker submits** completion with photos/documentation
2. **Inspector assigned** based on project type
3. **Site visit** (if required) or documentation review
4. **Approval/rejection** with feedback
5. **Payment released** upon approval

## Economic Concepts

### Payment Distribution

When a milestone completes:

| Recipient | Description |
|-----------|-------------|
| **Worker** | Majority of milestone payment |
| **Trade Guild** | Small guild contribution |
| **Inspector** | Inspection fee (if applicable) |
| **Protocol** | Platform fees |

### Escrow Protection

- Funds locked at project start
- Released per milestone
- Dispute resolution for conflicts
- Partial release for partial completion

## Governance

### Guild Governance

Trade guilds govern:
- Membership requirements
- Skill certification standards
- Fee structures
- Quality standards

### Platform Governance

BuildDAO protocol governs:
- Cross-guild coordination
- Inspector standards
- Dispute escalation
- Platform policies

## Technical Concepts

### Project as Mission Collection

```typescript
interface BuildProject {
  id: string;
  title: string;
  description: string;
  location: Location;
  totalBudget: bigint;
  milestones: ProjectMilestone[];
  status: 'planning' | 'active' | 'completed';
}
```

### Worker Discovery

```typescript
// Find qualified workers
const qualifiedWorkers = await horizonClient.searchUsers({
  guild: 'electricians-guild',
  attestations: ['licensed-electrician', 'safety-certified'],
  reputation: { min: 80 },
  location: { near: project.location, radius: 50 },
});
```

## Roadmap Concepts

### Phase 1: Basic Projects
- Single-milestone jobs
- Trade guild organization
- Basic attestations

### Phase 2: Complex Projects
- Multi-milestone coordination
- Inspection workflows
- Guild collaboration

### Phase 3: Enterprise Features
- Multi-party projects
- Material procurement
- Permit integration

## Use Cases

### Residential Projects
- Home renovations
- Repairs and maintenance
- New construction

### Commercial Projects
- Office buildouts
- Retail construction
- Facility maintenance

### Municipal Projects
- Public works
- Infrastructure
- Community projects

## Resources

- [Protocol Overview](/docs/protocol/overview)
- [Guild System](/docs/protocol/guilds)
- [Achievements](/docs/guides/achievements)
- [SDK Documentation](/docs/sdk/overview)
