## 2024-05-21 - Loose Content Security Policy Configuration
**Vulnerability:** The `vercel.json` configuration included `script-src https:` and `style-src https:`, effectively bypassing CSP protections by allowing scripts and styles from any HTTPS domain.
**Learning:** Default or copy-pasted CSP configurations often include broad wildcards like `https:` that undermine the policy's purpose. In Vercel deployments, this is defined in `vercel.json` headers.
**Prevention:** Always start with a strict `default-src 'self'` policy and whitelist specific external domains only as needed. Avoid `https:` wildcards.

## 2024-05-22 - Incomplete Permissions-Policy
**Vulnerability:** The `Permissions-Policy` header was present but only disabled `geolocation`, `microphone`, and `camera`, leaving other sensitive features like `payment` and `usb` enabled by default.
**Learning:** Partially configuring security headers can create a false sense of security. It's important to comprehensively list all features that should be disabled, not just the most common ones.
**Prevention:** Regularly audit `Permissions-Policy` against the full list of available directives and disable everything not explicitly needed.
