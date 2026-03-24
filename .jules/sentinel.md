## 2024-05-20 - RCE vulnerability in serialize-javascript
**Vulnerability:** Found a High severity Remote Code Execution (RCE) vulnerability in `serialize-javascript` < 7.0.3 via `RegExp.flags` and `Date.prototype.toISOString()`. The vulnerable package was present in the dependency tree of `@docusaurus/preset-classic` (`webpack` -> `terser-webpack-plugin` -> `serialize-javascript`).
**Learning:** The project relies heavily on a standard Docusaurus classic preset, which brought in an outdated transitive dependency. Docusaurus versions might pin specific versions of webpack tools which can carry vulnerabilities over time, requiring manual intervention in resolutions if the Docusaurus version itself is not updated.
**Prevention:** Check `yarn audit` output carefully for vulnerabilities in deep dependencies (like `terser-webpack-plugin` in build tools) and force resolution of vulnerable transitive dependencies (using `resolutions` in `package.json`) if a direct dependency upgrade is not immediately feasible. Ensure `serialize-javascript` is kept above `7.0.3`.

## 2024-03-03 - Added Dependabot Configuration for Automated Security Updates
**Vulnerability:** The project lacked a `.github/dependabot.yml` configuration, leaving the repository vulnerable to stale dependencies with known security vulnerabilities (such as the ReDoS vulnerability in `ajv` inside the `schema-utils` dependency path).
**Learning:** Even static documentation sites (like Docusaurus) can be susceptible to security vulnerabilities within their dependency trees during build-time.
**Prevention:** Always enable Dependabot or an equivalent automated dependency scanning tool in CI/CD pipelines to ensure timely identification and pull requests for patching critical and high-severity CVEs in upstream libraries.

## 2024-10-27 - ReDoS vulnerability in minimatch via serve-handler
**Vulnerability:** Found multiple High severity Regular Expression Denial of Service (ReDoS) vulnerabilities in `minimatch` <=3.1.3. This package was brought in as a transitive dependency of `@docusaurus/core` via `serve-handler`.
**Learning:** Using a global wildcard resolution (like `"**/minimatch": "^3.1.4"`) is dangerous and can destructively downgrade newer, safe versions of the package (e.g., `minimatch@10`) used elsewhere in the dependency tree. This can cause build or runtime regressions by breaking APIs expected by those modern tools.
**Prevention:** When applying `resolutions` to fix transitive dependency vulnerabilities, use targeted paths (e.g., `"**/serve-handler/minimatch": "^3.1.4"`) instead of global wildcards to safely upgrade only the vulnerable instances without affecting modern dependencies.

## 2025-03-10 - Information leakage in clipboard copy
**Vulnerability:** A `console.error` log within the `handleCopy` catch block (`src/pages/index.tsx`) previously output the raw `err` object to the browser console. This could potentially leak detailed stack traces or client-environment specifics when the clipboard API fails (e.g., due to permissions).
**Learning:** Client-side error handling must also follow secure fail patterns. Even standard DOM exceptions can sometimes reveal unexpected implementation details when logged directly.
**Prevention:** Always sanitize client-side error logging by outputting generic string messages instead of raw error objects. Use `// eslint-disable-next-line no-console` to explicitly allow and document intended, sanitized logging when strict `no-console` rules are in place.

## 2025-03-24 - Prototype pollution and DoS via flat-cache/flatted
**Vulnerability:** Found High severity prototype pollution and unbounded recursion DoS vulnerabilities in `flatted` < 3.4.2. This package was brought in as a deeply nested transitive dependency of `eslint` via `file-entry-cache > flat-cache`.
**Learning:** Dependabot does not always update deeply nested transitive dependencies, so manual intervention is required. Using targeted resolution paths is essential when fixing vulnerabilities deep in the dependency tree to avoid unintended consequences on other parts of the application.
**Prevention:** Use targeted `resolutions` paths in `package.json` (e.g., `"**/flat-cache/flatted": "^3.4.2"`) rather than global wildcards when mitigating vulnerabilities in specific transitive dependency paths.
