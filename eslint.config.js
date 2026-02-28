const js = require("@eslint/js");
const docusaurus = require("@docusaurus/eslint-plugin");
const tseslint = require("typescript-eslint");

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@docusaurus": docusaurus,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      ...docusaurus.configs.recommended.rules,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
        es6: true,
      },
    },
  },
];
