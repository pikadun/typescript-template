import { createTypescriptLintConfig } from "@camaro/eslint-config/typescript";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { defineConfig } from "eslint/config";

const nodeFiles = ["src/server/**/*.ts", "src/shared/**/*.ts", "scripts/**/*.ts"];

export default defineConfig(
    {
        ignores: ["lib/**", "node_modules/**"],
    },
    createTypescriptLintConfig({
        files: nodeFiles,
    }),
    defineConfigWithVueTs({
        files: ["src/client/**/*.ts", "src/client/**/*.vue"],
        languageOptions: {
            globals: globals.browser,
        },
        extends: [
            createTypescriptLintConfig({}),
            pluginVue.configs["flat/essential"],
            vueTsConfigs.recommended,
        ],
    }),
    {
        files: nodeFiles,
        languageOptions: {
            globals: globals.node,
        },
    },
    {
        files: ["src/server/**/*.module.ts"],
        rules: { "@typescript-eslint/no-extraneous-class": "off" },
    },
);
