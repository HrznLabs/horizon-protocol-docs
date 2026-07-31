## 2026-07-05 - Optimize Internal Navigation
**Learning:** Using raw HTML `<a>` tags for internal links in Docusaurus (or any React SPA) triggers full page reloads, bypassing the client-side router and degrading perceived performance.
**Action:** Always utilize the framework-provided router link component (e.g., `@docusaurus/Link`) for internal navigation to enable fast, seamless client-side routing.
