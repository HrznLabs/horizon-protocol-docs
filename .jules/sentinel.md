## 2024-05-24 - Targeted Security Resolution for `joi`
**Vulnerability:** Moderate vulnerability in `joi` package versions `<17.13.4`
**Learning:** Using `**/` wildcard in yarn resolutions correctly enforces a patch bump for transitive dependencies without introducing breaking major bumps for unrelated paths.
**Prevention:** Always verify if a minor/patch version exists before executing broad resolutions, and ensure lockfile sync is applied cleanly via `yarn install`.
