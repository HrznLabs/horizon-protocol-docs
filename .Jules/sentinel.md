# 🛡️ Sentinel's Security Journal

## 2024-05-22 - [MEDIUM] Lodash Prototype Pollution
**Vulnerability:** Detected moderate severity prototype pollution vulnerabilities in `lodash` (< 4.17.23) via transitive dependencies.
**Learning:** Build tools and static site generators often lag in updating deep dependencies, requiring manual intervention via `resolutions`.
**Prevention:** Regularly audit dependencies and use `resolutions` (Yarn) or `overrides` (npm) to force security patches.
