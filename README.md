# Horizon Docs (Public)

**Public developer documentation** for Horizon Protocol. This site provides guides, API references, and integration tutorials for developers building on Horizon.

## What Is This?

The public docs serve developers and integrators wanting to:
- Understand the Horizon Protocol
- Integrate Horizon into their applications
- Learn about available APIs and contracts
- Deploy to different chains

**Use this if:** You're updating developer-facing documentation or guides.

## Tech

- Docusaurus 3.9
- React 19
- TypeScript

## Setup

```bash
cd horizon-docs-public

yarn install
yarn start
```

Local site: `http://localhost:3000`

## Scripts

- `yarn start` - dev server
- `yarn build` - production build
- `yarn serve` - serve build
- `yarn typecheck` - TS checks

## Notes

- Public domain config: `docusaurus.config.ts`
- Blog is disabled in this repo

## Deployment

Deployed via Vercel on push to `main`.
