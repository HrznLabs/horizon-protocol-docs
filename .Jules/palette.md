## 2024-10-18 - Clickable Cards with Nested Actions
**Learning:** To make a card fully clickable while supporting nested interactive buttons (like Copy), use the "Stretched Link" pattern (`::before { content:''; position: absolute; inset: 0; z-index: 1 }` on the primary link) with `position: relative` on the container. Ensure nested buttons have `position: relative; z-index: 2` to sit above the overlay.
**Action:** Use this pattern instead of wrapping everything in an `<a>` tag, which is invalid HTML if it contains buttons.
