const { ts } = require("@camaro/eslint-config");
const globals = require("globals");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    ...ts,
    { ignores: ["lib/**", "out/**"] },
    {
        files: ["eng/**/*.js"],
        languageOptions: { globals: { ...globals.node } },
    },
    {
        files: ["test/**/*.ts"],
        rules: {
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/no-floating-promises": "off",
        },
    },
];
