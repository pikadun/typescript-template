import { ts } from "@camaro/eslint-config/typescript";
import globals from "globals";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...ts,
    {
        ignores: ["lib/**"],
    },
    {
        files: ["src/server/**/*.module.ts"],
        rules: { "@typescript-eslint/no-extraneous-class": "off" },
    },

    ...defineConfigWithVueTs(
        {
            files: ["src/client/**/*.ts", "src/client/**/*.vue"],
            languageOptions: {
                globals: globals.browser,
            },
        },
        pluginVue.configs["flat/essential"],
        vueTsConfigs.recommended,
    ),
];
