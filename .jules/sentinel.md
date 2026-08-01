## 2024-05-20 - RCE vulnerability in serialize-javascript
**Vulnerability:** Found a High severity Remote Code Execution (RCE) vulnerability in `serialize-javascript` < 7.0.3 via `RegExp.flags` and `Date.prototype.toISOString()`. The vulnerable package was present in the dependency tree of `@docusaurus/preset-classic` (`webpack` -> `terser-webpack-plugin` -> `serialize-javascript`).
**Learning:** The project relies heavily on a standard Docusaurus classic preset, which brought in an outdated transitive dependency. Docusaurus versions might pin specific versions of webpack tools which can carry vulnerabilities over time, requiring manual intervention in resolutions if the Docusaurus version itself is not updated.
**Prevention:** Check `yarn audit` output carefully for vulnerabilities in deep dependencies (like `terser-webpack-plugin` in build tools) and force resolution of vulnerable transitive dependencies (using `resolutions` in `package.json`) if a direct dependency upgrade is not immediately feasible. Ensure `serialize-javascript` is kept above `7.0.3`.

## 2026-04-03 - [Targeted Dependency Overrides]
**Vulnerability:** Blanket dependency overrides in `package.json` (e.g., `"**/path-to-regexp": "^0.1.13"`) can break semantic versioning by downgrading unrelated packages that depend on newer major versions (like `v1.x` or `v3.x`).
**Learning:** `yarn audit` identifies vulnerable paths, and these paths must be specifically targeted in overrides to prevent breaking other dependencies.
**Prevention:** Use targeted `resolutions` paths in `package.json` (e.g., `"**/express/path-to-regexp": "^0.1.13"`) based on `yarn audit` and `yarn why` findings to surgically patch vulnerabilities without forcing incompatible major version downgrades on other packages.

## 2024-06-13 - shell-quote Command Injection
**Vulnerability:** Found a Critical severity vulnerability in `shell-quote` < 1.8.4 where the `quote()` function failed to escape newlines in object `.op` values, allowing command injection. The vulnerable package was present in `@docusaurus/core`'s `webpack-dev-server` via `launch-editor`.
**Learning:** `shell-quote` is heavily used in build tools and development servers to safely escape arguments for shell execution. Bypasses in its escaping logic, especially around metacharacters or newlines in structured inputs (like object tokens), can directly lead to arbitrary command execution during the build or development process.
**Prevention:** Always ensure core CLI utility libraries like `shell-quote` are kept up to date. Use `yarn audit` to identify vulnerabilities and apply targeted `resolutions` in `package.json` to force upgrades in transitive paths when direct parent packages haven't bumped their dependencies.
