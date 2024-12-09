// @ts-check

const lichtblick = require("@lichtblick/eslint-plugin");
const globals = require("globals");
const tseslint = require("typescript-eslint");

lichtblick.configs.base

module.exports = tseslint.config({
  files: ["src/**/*.ts", "src/**/*.tsx"],
  extends: [lichtblick.configs.base, lichtblick.configs.react, lichtblick.configs.typescript],
  languageOptions: {
    globals: {
      ...globals.es2020,
      ...globals.browser,
    },
    parserOptions: {
      project: "tsconfig.json",
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "error",
  },
});
