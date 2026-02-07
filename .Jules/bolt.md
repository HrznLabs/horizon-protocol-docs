## 2025-02-07 - [Branding vs Performance]
**Learning:** The default `logo.svg` in Docusaurus repositories is the generic mascot, while custom branding is often uploaded as `logo.jpg` or similar. Blindly switching to SVG for performance can cause branding regressions if the SVG wasn't updated.
**Action:** Always visually verify asset content (e.g. via screenshot) before swapping file formats, especially for branding assets.

## 2025-02-07 - [React.memo in Docusaurus]
**Learning:** Docusaurus pages often re-render due to context changes. Memoizing static sub-components (like `QuickLinks` or `Deployments` mapped from constants) effectively isolates them from these re-renders, even if the parent (`Home`) re-renders.
**Action:** Apply `React.memo` to static page sections in Docusaurus to reduce hydration/update cost.
