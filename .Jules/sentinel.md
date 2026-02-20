## 2024-05-21 - Loose Content Security Policy Configuration
**Vulnerability:** The `vercel.json` configuration included `script-src https:` and `style-src https:`, effectively bypassing CSP protections by allowing scripts and styles from any HTTPS domain.
**Learning:** Default or copy-pasted CSP configurations often include broad wildcards like `https:` that undermine the policy's purpose. In Vercel deployments, this is defined in `vercel.json` headers.
**Prevention:** Always start with a strict `default-src 'self'` policy and whitelist specific external domains only as needed. Avoid `https:` wildcards.

## 2024-05-22 - Incomplete Permissions-Policy
**Vulnerability:** The `Permissions-Policy` header was present but only disabled `geolocation`, `microphone`, and `camera`, leaving other sensitive features like `payment` and `usb` enabled by default.
**Learning:** Partially configuring security headers can create a false sense of security. It's important to comprehensively list all features that should be disabled, not just the most common ones.
**Prevention:** Regularly audit `Permissions-Policy` against the full list of available directives and disable everything not explicitly needed.

## 2024-05-23 - Clipboard Access Controls Missing
**Vulnerability:** The `Permissions-Policy` header did not restrict `clipboard-read` or `clipboard-write`, potentially allowing cross-origin iframes (if embedded) to hijack the user's clipboard.
**Learning:** Modern `Permissions-Policy` directives like `clipboard-read` and `clipboard-write` offer granular control over hardware/privacy APIs and should be explicitly configured, especially for static sites where third-party content might be embedded.
**Prevention:** Explicitly set `clipboard-read=()` (disable) and `clipboard-write=(self)` (same-origin only) in deployment headers to enforce least privilege.

## 2024-05-24 - Outdated Permissions-Policy and Deprecated Headers
**Vulnerability:** The `vercel.json` configuration contained the deprecated `X-XSS-Protection` header and the obsolete `interest-cohort` directive in `Permissions-Policy`, while missing restrictions for modern tracking APIs like `browsing-topics` and `attribution-reporting`.
**Learning:** Security standards evolve rapidly. Headers like `X-XSS-Protection` can become counter-productive, and new browser features (like Privacy Sandbox APIs) often default to "allow" unless explicitly disabled.
**Prevention:** Regularly audit security headers against current browser standards (e.g., MDN, OWASP) and use the Principle of Least Privilege to disable all unneeded browser features in `Permissions-Policy`.
