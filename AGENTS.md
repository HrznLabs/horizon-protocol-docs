# AGENTS.md — horizon-protocol-docs

PUBLIC developer documentation for Horizon Protocol (Docusaurus 3, React).

## Stack & commands
- Package manager: **yarn classic** (`yarn.lock`). CI runs `yarn install --frozen-lockfile && yarn build` on Node 20.
- Local dev-dep engines may require Node ≥22.13 (`@eslint/js`) — use `--ignore-engines` if needed.

## Content rules
- This repo is public — no internal URLs, secrets, or unreleased plans.
- v2.2 facts: fees 2.5% protocol / 2.5% labs / 2% resolver. HRZN token is testnet-only/deferred — keep the deferred-launch notice on token pages.
- Base Sepolia addresses come from the monorepo `packages/shared/src/constants/index.ts` — sync from there, never invent.

## Git rules
- Branch FROM `staging`, PR against `staging`; promotion to `main` is a manual PR. Never push branches directly.
- Conventional commits. `.jules/` lowercase only — a `.Jules/` case-collision was purged 2026-08; never recreate it.
