const stylistic = require("@stylistic/eslint-plugin");
const eslint = require("@eslint/js");
const globals = require("globals");
const tsEslint = require("typescript-eslint");

const customized = stylistic.configs.customize({
  jsx: false,
  semi: true,
  quotes: "double",
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    ignores: ["lib/**"],
  },
  {
    rules: {
      ...eslint.configs.recommended.rules,
      ...customized.rules,
    },
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        BufferEncoding: true,
        TestFail: true,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // ...tsEslint.configs.recommendedTypeChecked,
      // ...tsEslint.configs.strictTypeChecked,
      // ...tsEslint.configs.stylisticTypeChecked,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        EXPERIMENTAL_useProjectService: true,
      },
    },
  },
];

module.exports = config;
