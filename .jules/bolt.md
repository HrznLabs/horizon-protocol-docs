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
## 2024-05-18 - Replacing Markdown <a> with Docusaurus <Link>
**Learning:** When adding React component imports (e.g., `import Link from '@docusaurus/Link';`) to Docusaurus Markdown (`.md` or `.mdx`) files, the import statement must be placed strictly *after* the YAML frontmatter block, and it is better to leave a blank line before inserting JSX comments to prevent breaking metadata parsing or causing routing errors during the build.
**Action:** Use specific regular expressions when injecting imports to ensure they fall after the entire `--- ... ---` block and respect spacing.
