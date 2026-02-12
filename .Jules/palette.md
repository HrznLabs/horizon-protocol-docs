## 2024-10-18 - Clickable Cards with Nested Actions
**Learning:** To make a card fully clickable while supporting nested interactive buttons (like Copy), use the "Stretched Link" pattern (`::before { content:''; position: absolute; inset: 0; z-index: 1 }` on the primary link) with `position: relative` on the container. Ensure nested buttons have `position: relative; z-index: 2` to sit above the overlay.
**Action:** Use this pattern instead of wrapping everything in an `<a>` tag, which is invalid HTML if it contains buttons.

## 2024-10-18 - Selectable Text on Stretched Links
**Learning:** Stretched link overlays capture all clicks, making text selection impossible. To keep text selectable (e.g. addresses, code), the text element MUST have `position: relative` and `z-index: 2` (or higher) to sit above the overlay.
**Action:** Always verify text selectability when implementing clickable cards, especially for copyable data.
