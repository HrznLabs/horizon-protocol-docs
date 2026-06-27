## 2024-10-24 - Global will-change Risk
**Learning:** Applying `will-change: transform` to a generic class like `.card` can cause layer explosion if used extensively (e.g. in lists), leading to memory issues.
**Action:** Only apply `will-change` to specific, limited-count elements or component-scoped classes.

## 2024-11-05 - Array Indices as React Keys
**Learning:** Using array indices as `key` props in React lists (like `FeatureList.map`) can cause unnecessary re-renders or state bugs if the list ever changes order. Using unique properties (like `title`) stabilizes component identity.
**Action:** Always prefer unique, stable properties over array indices for `key` props in React `.map()` iterations to optimize diffing.

## 2025-02-23 - Avoid Render-Blocking Font Loading
**Learning:** In Docusaurus, loading fonts directly via CSS `@import` or synchronously within the application can block the critical rendering path.
**Action:** Always inject font loading through `headTags` in `docusaurus.config.ts`, utilizing `<link rel="preconnect">` for the font domains and `<link rel="preload" as="style">` for the font CSS to ensure early connection establishment and optimized rendering.

## 2024-05-18 - Google Fonts Request Batching
**Learning:** Making separate HTTP requests for multiple Google Fonts families (e.g., Inter and JetBrains Mono) increases network roundtrips and parsing overhead. Even when using HTTP/2, reducing the total number of domains and distinct requests improves the critical rendering path.
**Action:** Always batch multiple font families into a single Google Fonts request URL using the `&family=` parameter (e.g., `family=Inter...&family=JetBrains+Mono...`) rather than declaring separate `<link>` tags. Always ensure to update both the `preload` and `stylesheet` links correspondingly, and remove any orphaned links.
