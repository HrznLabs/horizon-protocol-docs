# Horizon Docs (Public)

**Public developer documentation** for Horizon Protocol. This site provides guides, API references, and integration tutorials for developers building on Horizon.

## What Is This?

The public docs serve developers and integrators wanting to:
- Understand the Horizon Protocol architecture
- Integrate Horizon into their applications
- Learn about available APIs (204 endpoints)
- Deploy and interact with smart contracts
- Build custom verticals on Horizon

**Use this if:** You're updating developer-facing documentation or guides.

## Documentation Structure

| Section | Content |
|---------|---------|
| **Getting Started** | Quick start guide, prerequisites, setup |
| **Architecture** | Protocol overview, on-chain/off-chain split |
| **Smart Contracts** | Contract ABIs, deployment addresses, interfaces |
| **API Reference** | REST endpoints, WebSocket events, authentication |
| **SDK Guide** | TypeScript SDK usage and examples |
| **Verticals** | Building industry-specific implementations |
| **Guides** | Step-by-step tutorials and examples |

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Docusaurus | 3.9 | Documentation framework |
| React | 19 | Component rendering |
| TypeScript | 5.x | Type safety |
| MDX | 3.x | Enhanced markdown |

## Setup

```bash
cd horizon-docs-public

yarn install
yarn start
```

Local site: `http://localhost:3000`

## Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Development server with hot reload |
| `yarn build` | Production build |
| `yarn serve` | Serve production build |
| `yarn typecheck` | TypeScript checks |
| `yarn clear` | Clear Docusaurus cache |

## Project Structure

```
docs/
├── intro.md                    # Getting started
├── architecture/               # Protocol architecture
│   ├── overview.md
│   ├── on-chain.md
│   └── off-chain.md
├── contracts/                  # Smart contract docs
│   ├── addresses.md
│   ├── mission-escrow.md
│   ├── payment-router.md
│   └── guild-dao.md
├── api/                        # API reference
│   ├── authentication.md
│   ├── missions.md
│   ├── guilds.md
│   └── xp.md
├── sdk/                        # SDK documentation
│   ├── installation.md
│   ├── abis.md
│   └── utilities.md
└── guides/                     # Tutorials
    ├── create-mission.md
    ├── join-guild.md
    └── build-vertical.md

src/
├── components/                 # Custom React components
├── css/                        # Custom styles
└── pages/                      # Custom pages

static/
├── img/                        # Images and diagrams
└── files/                      # Downloadable files

docusaurus.config.ts            # Site configuration
sidebars.ts                     # Navigation structure
```

## Key Documentation Topics

### Smart Contracts
- Contract addresses (Base Sepolia & Mainnet)
- ABI references for all 8 contracts
- Interface documentation
- Deployment guides

### API Reference
- 204 REST endpoints documented
- Authentication with JWT + SIWE
- WebSocket events for real-time updates
- Error codes and handling

### SDK Usage
- Installation and setup
- Code examples with TypeScript
- Fee calculation utilities
- Network configuration

## Configuration

Site configuration in `docusaurus.config.ts`:
- Domain: `docs.horizonprotocol.xyz`
- Blog: Disabled
- Search: Algolia (configured)
- Analytics: Enabled

## Notes

- API documentation auto-generated from OpenAPI spec
- Contract docs synced from `horizon-contracts` repo
- SDK docs synced from `horizon-sdk` repo

## Deployment

Deployed via Vercel on push to `main`.

### Manual Deploy

```bash
yarn build
vercel --prod
```

## Related Repositories

- [`horizon-contracts`](../horizon-contracts) - Smart contract source
- [`horizon-sdk`](../horizon-sdk) - TypeScript SDK
- [`horizon`](../horizon) - Full protocol monorepo
- [`horizon-website`](../horizon-website) - Marketing site

## Contributing

1. Create a feature branch
2. Update documentation in `docs/`
3. Preview with `yarn start`
4. Submit PR with clear description

## License

MIT
