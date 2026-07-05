## 2024-10-24 - Global will-change Risk
**Learning:** Applying `will-change: transform` to a generic class like `.card` can cause layer explosion if used extensively (e.g. in lists), leading to memory issues.
**Action:** Only apply `will-change` to specific, limited-count elements or component-scoped classes.

## 2024-11-05 - Array Indices as React Keys
**Learning:** Using array indices as `key` props in React lists (like `FeatureList.map`) can cause unnecessary re-renders or state bugs if the list ever changes order. Using unique properties (like `title`) stabilizes component identity.
**Action:** Always prefer unique, stable properties over array indices for `key` props in React `.map()` iterations to optimize diffing.

## 2025-02-23 - Avoid Render-Blocking Font Loading
**Learning:** In Docusaurus, loading fonts directly via CSS `@import` or synchronously within the application can block the critical rendering path.
**Action:** Always inject font loading through `headTags` in `docusaurus.config.ts`, utilizing `<link rel="preconnect">` for the font domains and `<link rel="preload" as="style">` for the font CSS to ensure early connection establishment and optimized rendering.

## 2024-05-18 - Unnecessary React.memo usage
**Learning:** Wrapping static or stateless components (like layout headers or simple lists) in `React.memo()` is a premature micro-optimization if the parent components do not have local state that triggers frequent re-renders. It adds overhead without measurable benefit.
**Action:** Only apply `React.memo()` to components that are demonstrably re-rendering unnecessarily due to parent state changes, and where those re-renders cause actual performance bottlenecks.
