## 2024-10-24 - Global will-change Risk
**Learning:** Applying `will-change: transform` to a generic class like `.card` can cause layer explosion if used extensively (e.g. in lists), leading to memory issues.
**Action:** Only apply `will-change` to specific, limited-count elements or component-scoped classes.

## 2024-11-05 - Array Indices as React Keys
**Learning:** Using array indices as `key` props in React lists (like `FeatureList.map`) can cause unnecessary re-renders or state bugs if the list ever changes order. Using unique properties (like `title`) stabilizes component identity.
**Action:** Always prefer unique, stable properties over array indices for `key` props in React `.map()` iterations to optimize diffing.

## 2024-11-20 - Unused Preconnect Resource Hints
**Learning:** Adding `preconnect` and `dns-prefetch` to external URLs (like `https://github.com` and `https://sepolia.basescan.org`) that are only used as standard outbound `<a>` links (and don't load critical subresources like images, fonts, or scripts) is a performance anti-pattern. It causes the browser to perform unnecessary DNS lookups, TCP handshakes, and TLS negotiations, wasting resources and bandwidth during the critical initial load phase.
**Action:** Only use `preconnect` or `dns-prefetch` for origins that serve critical subresources needed for the initial render. Do not use them for standard outbound navigational links.

## 2024-12-14 - Isolated Layouts via CSS Containment
**Learning:** Applying `contain: content` to self-contained UI components (like individual feature cards) and `content-visibility: auto` with `contain-intrinsic-size` to large sections (like `.features`) cleanly isolates layout and paint calculations, significantly improving rendering performance without JavaScript overhead.
**Action:** Proactively apply CSS containment properties to repetitive grid/flex items and off-screen sections.

## 2024-12-19 - Duplicate Intensive CSS Backgrounds
**Learning:** Duplicating complex CSS properties (like multiple radial gradients and pseudo-element patterns) across both global (`.hero`) and module-scoped (`.heroBanner`) classes inflates the CSS bundle size and wastes browser styling computation, as both rules target the same element and override each other identically.
**Action:** Extract shared, intensive background styles to global utility classes or base component styles, and keep module styles restricted to layout and spacing concerns (like padding and text-alignment).

## 2025-03-11 - Non-critical image preload anti-pattern
**Learning:** Preloading non-critical, small images like a 32x32px navbar logo is a performance anti-pattern. It wastes high-priority network bandwidth during the initial load, delaying actual render-blocking resources (like critical CSS/JS) and negatively impacting First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
**Action:** Never use `<link rel="preload">` for small UI graphics or images outside the critical rendering path. Reserve preloads strictly for late-discovered, critical resources (like hero images or essential web fonts).
