## 2025-02-23 - Avoid Render-Blocking Font Loading
**Learning:** In Docusaurus, loading fonts directly via CSS `@import` or synchronously within the application can block the critical rendering path.
**Action:** Always inject font loading through `headTags` in `docusaurus.config.ts`, utilizing `<link rel="preconnect">` for the font domains and `<link rel="preload" as="style">` for the font CSS to ensure early connection establishment and optimized rendering.
