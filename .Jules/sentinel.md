## 2024-05-21 - Loose Content Security Policy Configuration
**Vulnerability:** The `vercel.json` configuration included `script-src https:` and `style-src https:`, effectively bypassing CSP protections by allowing scripts and styles from any HTTPS domain.
**Learning:** Default or copy-pasted CSP configurations often include broad wildcards like `https:` that undermine the policy's purpose. In Vercel deployments, this is defined in `vercel.json` headers.
**Prevention:** Always start with a strict `default-src 'self'` policy and whitelist specific external domains only as needed. Avoid `https:` wildcards.
