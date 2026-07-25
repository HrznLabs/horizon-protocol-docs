## 2024-10-24 - Global will-change Risk
**Learning:** Applying `will-change: transform` to a generic class like `.card` can cause layer explosion if used extensively (e.g. in lists), leading to memory issues.
**Action:** Only apply `will-change` to specific, limited-count elements or component-scoped classes.

## 2024-11-05 - Array Indices as React Keys
**Learning:** Using array indices as `key` props in React lists (like `FeatureList.map`) can cause unnecessary re-renders or state bugs if the list ever changes order. Using unique properties (like `title`) stabilizes component identity.
**Action:** Always prefer unique, stable properties over array indices for `key` props in React `.map()` iterations to optimize diffing.
## 2024-07-25 - SPA Navigation Bottleneck in Docusaurus\n**Learning:** In Docusaurus (and similar React-based SSGs), using standard HTML `<a>` tags for internal links forces a full page reload, entirely bypassing the client-side router and losing the SPA's state and speed benefits. This is a common performance pitfall when writing MDX content.\n**Action:** Always use Docusaurus's `@docusaurus/Link` component (or standard Markdown links, which Docusaurus parses correctly) for internal navigation to preserve client-side routing and ensure instant page transitions.
