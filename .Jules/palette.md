## 2024-10-18 - Clickable Cards with Nested Actions
**Learning:** To make a card fully clickable while supporting nested interactive buttons (like Copy), use the "Stretched Link" pattern (`::before { content:''; position: absolute; inset: 0; z-index: 1 }` on the primary link) with `position: relative` on the container. Ensure nested buttons have `position: relative; z-index: 2` to sit above the overlay.
**Action:** Use this pattern instead of wrapping everything in an `<a>` tag, which is invalid HTML if it contains buttons.

## 2024-10-18 - Selectable Text on Stretched Links
**Learning:** Stretched link overlays capture all clicks, making text selection impossible. To keep text selectable (e.g. addresses, code), the text element MUST have `position: relative` and `z-index: 2` (or higher) to sit above the overlay.
**Action:** Always verify text selectability when implementing clickable cards, especially for copyable data.

## 2024-10-24 - Neon Focus States
**Learning:** For dark/cyberpunk themes, standard browser focus outlines (often blue) clash visually and may have poor contrast. Using `:focus-visible` with a custom neon border/outline (`#00FF88`) maintains the aesthetic while significantly improving keyboard navigation visibility.
**Action:** Apply `outline: 2px solid #00FF88` (or border/box-shadow) on `:focus-visible` for all interactive elements to ensure accessibility without compromising style.

## 2024-10-25 - Tooltips Synced with ARIA Labels
**Learning:** Using `content: attr(aria-label)` in CSS `::after` pseudo-elements ensures tooltips always match the screen reader text (e.g., "Copy address" -> "Copied!"). This prevents desynchronization bugs and reduces React state complexity for visual feedback.
**Action:** Use this pattern for icon-only buttons where visual state changes (like success feedback) need to be communicated clearly to all users.

## 2024-10-25 - Semantic Headings for Visual Sections
**Learning:** Visual-only sections (like card grids) often break heading hierarchy (e.g. jumping from H1 to H3). Adding visually hidden H2 headings (`<h2 className="sr-only">...\</h2>`) restores the document outline for screen reader users without affecting the visual design.
**Action:** Always check the document outline of landing pages and insert hidden structural headings where visual sections are implied but not titled.

## 2025-01-20 - Decorative Emojis and Screen Readers
**Learning:** Decorative emojis (like icons next to headings) are read aloud by screen readers, which can disrupt the flow and confuse users (e.g., reading "Scroll, Smart Contracts" instead of just "Smart Contracts").
**Action:** Always wrap purely decorative emojis in an element like `<span aria-hidden="true">` to hide them from screen readers while keeping them visible.

## 2025-03-03 - Accessible Hover Feedback for Composite Cards
**Learning:** Card components with nested links often only visually react to `:hover` on the card container. Keyboard users tabbing into a nested link within the card completely miss this visual elevation/glow feedback.
**Action:** Always pair `:hover` with `:focus-within` on card containers so keyboard users experience the same visual hierarchy and feedback as mouse users when interacting with the card's contents.

## 2025-03-03 - Tactile Click Feedback for Icon Buttons
**Learning:** Icon buttons that change state visually (e.g., Copy button changing icon) feel unresponsive during the physical click interaction without a pressed state.
**Action:** Add a slight `:active { transform: scale(0.92); }` effect to icon buttons to provide immediate tactile feedback confirming the click, before the async action or visual state update occurs.

## 2025-03-04 - Tactile Click Feedback for Main Buttons and Navbar Logo
**Learning:** Main interactive elements like primary/secondary buttons and the navbar logo feel unresponsive during physical click interactions without a pressed state.
**Action:** Always add a slight `:active { transform: scale(0.98); }` effect (or `0.92` for smaller elements like logos) to primary/secondary buttons and other major interactive elements to provide immediate tactile feedback confirming the click.

## 2024-05-18 - Directional Micro-Interactions for Link Affordance
**Learning:** Animated icons inside links (e.g., arrows moving right for forward navigation, external icons moving top-right for new tabs) significantly improve interaction clarity. However, they are often implemented using only `:hover`, leaving keyboard users (navigating via `Tab`) without this valuable visual feedback when elements receive `:focus-visible`.
**Action:** Always pair `:hover` with `:focus-visible` when animating directional icons inside links or buttons (e.g., `a:hover svg, a:focus-visible svg { transform: translateX(4px); }`). Ensure `className` props can be passed to reusable SVG components so they can be targeted effectively via CSS modules.

## 2025-03-05 - Announcing Dynamic Button States with ARIA Live
**Learning:** Dynamically changing the `aria-label` attribute on a button (e.g., from "Copy address" to "Copied!") is not reliably announced by all screen readers because the focus remains on the button and the content hasn't triggered a new read event.
**Action:** Always include a visually hidden `aria-live="polite"` region alongside or inside the button to explicitly communicate dynamic state changes to screen readers (e.g., `<span aria-live="polite" className="sr-only">{copied ? "Copied!" : ""}</span>`).

## 2025-03-06 - Accessible External Links in Docusaurus Config
**Learning:** External links defined in `docusaurus.config.ts` (such as those in the navbar, footer, or announcement bar) lack context for screen reader users that they open in a new tab, potentially causing confusion or disorientation.
**Action:** Always include an `aria-label` attribute on external links in Docusaurus configurations specifying that the link opens in a new tab (e.g., `'aria-label': 'GitHub (opens in a new tab)'`).

## 2025-03-07 - Screen Reader Context for Generic Links
**Learning:** Generic links inside cards (e.g., "View Contracts" or "Browse API") lack context for screen reader users when navigated out of context (e.g., via a list of links). Linking the surrounding descriptive text using `aria-describedby` provides immediate clarity.
**Action:** Always link contextual paragraph descriptions to generic links within cards using `aria-describedby`.

## 2026-04-02 - Accessible Error States for Async UI Actions
**Learning:** UI interactions that rely on browser permissions or async APIs (like clipboard copy) can fail. Failing silently or only logging to the console creates a confusing UX, especially for screen reader users who expect feedback after triggering an action.
**Action:** Always implement a visual and screen-reader announced error state (e.g., using an `aria-live` region and updating the `aria-label`) for interactive elements that can fail, rather than relying on silent catches.
