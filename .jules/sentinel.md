## 2024-05-20 - RCE vulnerability in serialize-javascript
**Vulnerability:** Found a High severity Remote Code Execution (RCE) vulnerability in `serialize-javascript` < 7.0.3 via `RegExp.flags` and `Date.prototype.toISOString()`. The vulnerable package was present in the dependency tree of `@docusaurus/preset-classic` (`webpack` -> `terser-webpack-plugin` -> `serialize-javascript`).
**Learning:** The project relies heavily on a standard Docusaurus classic preset, which brought in an outdated transitive dependency. Docusaurus versions might pin specific versions of webpack tools which can carry vulnerabilities over time, requiring manual intervention in resolutions if the Docusaurus version itself is not updated.
**Prevention:** Check `yarn audit` output carefully for vulnerabilities in deep dependencies (like `terser-webpack-plugin` in build tools) and force resolution of vulnerable transitive dependencies (using `resolutions` in `package.json`) if a direct dependency upgrade is not immediately feasible. Ensure `serialize-javascript` is kept above `7.0.3`.

## 2026-04-03 - [Targeted Dependency Overrides]
**Vulnerability:** Blanket dependency overrides in `package.json` (e.g., `"**/path-to-regexp": "^0.1.13"`) can break semantic versioning by downgrading unrelated packages that depend on newer major versions (like `v1.x` or `v3.x`).
**Learning:** `yarn audit` identifies vulnerable paths, and these paths must be specifically targeted in overrides to prevent breaking other dependencies.
**Prevention:** Use targeted `resolutions` paths in `package.json` (e.g., `"**/express/path-to-regexp": "^0.1.13"`) based on `yarn audit` and `yarn why` findings to surgically patch vulnerabilities without forcing incompatible major version downgrades on other packages.

## 2026-06-25 - [Targeted Dependency Overrides for js-yaml]
**Vulnerability:** Found multiple vulnerabilities in `js-yaml` involving DoS due to merge keys, impacting both the 3.x and 4.x major versions.
**Learning:** Forcing a major version upgrade of a package like `js-yaml` (from 3.x to 4.x) using `resolutions` to fix vulnerabilities can cause unavoidable build failures if the dependent module (like `gray-matter`) relies on removed functions (e.g., `yaml.safeLoad`).
**Prevention:** Always verify if a dependency patch crosses a major SemVer boundary. If it does, determine which package paths use which major version and use highly targeted `resolutions` to patch each path with its respective secure major version (e.g., patching `gray-matter/js-yaml` to `^3.15.0` while patching other instances to `^4.2.0`).
