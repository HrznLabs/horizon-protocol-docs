## 2024-04-11 - Adding Focus-Visible States to Interactive Elements
**Learning:** Found multiple interactive elements (`.navbar__link`, `a`, `.menu__link`, etc.) that possessed clear `:hover` states but lacked equivalent visual cues for keyboard navigation. Applying `:focus-visible` alongside `:hover` ensures seamless keyboard accessibility. Playwright verification required manually simulating `Tab` presses to assert focus state presence.
**Action:** When auditing custom CSS rules involving `:hover`, explicitly check for and mirror those styles using `:focus-visible` where appropriate, avoiding applying generic focus rings everywhere if the hover state styling provides better context.

## 2024-07-06 - Adding Tooltips to Truncated On-Chain Addresses
**Learning:** Found that truncated on-chain addresses were being displayed to save space, but users had no way to view the full address before copying or clicking away.
**Action:** When truncating on-chain addresses (e.g. `0x1234...abcd`), always add the full address as a `title` attribute to the container element and apply `cursor: help` to visually indicate that more information is available on hover. This improves transparency and trust without cluttering the UI.
