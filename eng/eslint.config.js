import { ts } from "@camaro/eslint-config/typescript";

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...ts,
    {
        ignores: ["lib/**"],
    },
    {
        files: ["src/**/*.module.ts"],
        rules: { "@typescript-eslint/no-extraneous-class": "off" },
    },
];
