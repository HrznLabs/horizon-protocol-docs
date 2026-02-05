# Horizon Docs (Public)

Public documentation site for Horizon Protocol. This repo mirrors the core docs with public-facing content and a trimmed navigation.

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
