## 2024-05-20 - RCE vulnerability in serialize-javascript
**Vulnerability:** Found a High severity Remote Code Execution (RCE) vulnerability in `serialize-javascript` < 7.0.3 via `RegExp.flags` and `Date.prototype.toISOString()`. The vulnerable package was present in the dependency tree of `@docusaurus/preset-classic` (`webpack` -> `terser-webpack-plugin` -> `serialize-javascript`).
**Learning:** The project relies heavily on a standard Docusaurus classic preset, which brought in an outdated transitive dependency. Docusaurus versions might pin specific versions of webpack tools which can carry vulnerabilities over time, requiring manual intervention in resolutions if the Docusaurus version itself is not updated.
**Prevention:** Check `yarn audit` output carefully for vulnerabilities in deep dependencies (like `terser-webpack-plugin` in build tools) and force resolution of vulnerable transitive dependencies (using `resolutions` in `package.json`) if a direct dependency upgrade is not immediately feasible. Ensure `serialize-javascript` is kept above `7.0.3`.

## 2024-03-03 - Added Dependabot Configuration for Automated Security Updates
**Vulnerability:** The project lacked a `.github/dependabot.yml` configuration, leaving the repository vulnerable to stale dependencies with known security vulnerabilities (such as the ReDoS vulnerability in `ajv` inside the `schema-utils` dependency path).
**Learning:** Even static documentation sites (like Docusaurus) can be susceptible to security vulnerabilities within their dependency trees during build-time.
**Prevention:** Always enable Dependabot or an equivalent automated dependency scanning tool in CI/CD pipelines to ensure timely identification and pull requests for patching critical and high-severity CVEs in upstream libraries.
