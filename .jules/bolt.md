## 2023-10-27 - Docusaurus SPA Navigation

**Learning:** In Docusaurus and similar React SPA static site generators, using raw HTML `<a>` tags for internal links triggers full page reloads and significantly degrades performance.

**Action:** Always use the `@docusaurus/Link` component (`<Link to="...">`) or standard Markdown links to preserve client-side routing and optimize navigation speed.
