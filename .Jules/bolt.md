## 2025-02-07 - [Branding vs Performance]
**Learning:** The default `logo.svg` in Docusaurus repositories is the generic mascot, while custom branding is often uploaded as `logo.jpg` or similar. Blindly switching to SVG for performance can cause branding regressions if the SVG wasn't updated.
**Action:** Always visually verify asset content (e.g. via screenshot) before swapping file formats, especially for branding assets.

## 2025-02-07 - [React.memo in Docusaurus]
**Learning:** Docusaurus pages often re-render due to context changes. Memoizing static sub-components (like `QuickLinks` or `Deployments` mapped from constants) effectively isolates them from these re-renders, even if the parent (`Home`) re-renders.
**Action:** Apply `React.memo` to static page sections in Docusaurus to reduce hydration/update cost.

## 2025-02-15 - [Configuration Validation]
**Learning:** Docusaurus configuration files (`docusaurus.config.ts`) are TypeScript files and are type-checked. Duplicate keys in objects (like `headTags`) are valid JavaScript syntax (last one wins) but are flagged as errors by TypeScript, blocking builds/checks.
**Action:** Ensure configuration files are valid TypeScript and contain no duplicate keys. Run `yarn typecheck` after modifying config files.

## 2025-02-15 - [Image Format Optimization]
**Learning:** High-resolution JPG logos (e.g., 1024x1024, 350KB) can be mistakenly used for small UI elements like navbars. Resizing to 256x256 and converting to WebP can yield massive savings (>98%) with no perceptible quality loss.
**Action:** Audit asset sizes regularly and resize/convert images appropriate for their display size.
