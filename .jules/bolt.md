## 2024-10-24 - Global will-change Risk
**Learning:** Applying `will-change: transform` to a generic class like `.card` can cause layer explosion if used extensively (e.g. in lists), leading to memory issues.
**Action:** Only apply `will-change` to specific, limited-count elements or component-scoped classes.

## 2024-11-05 - Array Indices as React Keys
**Learning:** Using array indices as `key` props in React lists (like `FeatureList.map`) can cause unnecessary re-renders or state bugs if the list ever changes order. Using unique properties (like `title`) stabilizes component identity.
**Action:** Always prefer unique, stable properties over array indices for `key` props in React `.map()` iterations to optimize diffing.

## 2025-02-23 - Avoid Render-Blocking Font Loading
**Learning:** In Docusaurus, loading fonts directly via CSS `@import` or synchronously within the application can block the critical rendering path.
**Action:** Always inject font loading through `headTags` in `docusaurus.config.ts`, utilizing `<link rel="preconnect">` for the font domains and `<link rel="preload" as="style">` for the font CSS to ensure early connection establishment and optimized rendering.

## 2024-06-24 - Batch Google Fonts Requests
**Learning:** Making separate CSS requests for different Google Fonts families (e.g., Inter and JetBrains Mono) adds unnecessary network roundtrips to the critical rendering path. Google Fonts API supports batching multiple families into a single request URL using the `&family=` parameter.
**Action:** Always combine multiple Google Fonts families into a single `<link>` request URL rather than using separate tags to optimize font loading performance.
## 2024-08-05 - Docusaurus SPA Link Optimization
**Learning:** In Docusaurus (and most React SPA static site generators), using raw HTML `<a>` tags for internal links in MDX files triggers a full page reload, breaking client-side routing. This was found on the homepage Quick Links section, causing unnecessary network requests and slower perceived navigation.
**Action:** Always use the `@docusaurus/Link` component (`<Link to="...">`) or standard Markdown links (`[text](/url)`) for internal routes in Docusaurus. When injecting JSX component imports into MDX files with frontmatter, ensure a blank line is left between the frontmatter block and the import statement to prevent Acorn parsing errors during the build.
