import lichtblick from "@lichtblick/eslint-plugin";

const typescriptConfigs = lichtblick.configs.typescript.map((config) => ({
  ...config,
  files: ["**/*.ts", "**/*.tsx"],
}));

export default [
  {
    ignores: ["dist/**", "examples/**", "template/**"],
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
      },
    },
  },
  ...lichtblick.configs.base,
  ...lichtblick.configs.jest,
  ...typescriptConfigs,
];
