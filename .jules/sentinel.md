## 2024-04-02 - Transitive Dependency Vulnerability Resolutions
**Vulnerability:** Deeply nested transitive dependencies (`node-forge` and `brace-expansion`) in Docusaurus plugins contained multiple HIGH vulnerabilities.
**Learning:** Yarn resolutions provide a way to patch vulnerabilities in dependencies of dependencies. However, blindly overriding versions (e.g., forcing a 5.x resolution on a 1.x dependency tree) is highly risky and can cause subtle regressions or break builds.
**Prevention:** Always use targeted resolution paths based on `yarn why` output (e.g., `"**/minimatch/brace-expansion": "^1.1.13"`) and ensure the patched version is strictly backward compatible within the required major version.
