import { defineConfig, type EnvironmentConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import pkg from "../package.json" with { type: "json" };
import {
    CLIENT_ENTRY_NAME,
    CLIENT_ENTRY_PATH,
    CLIENT_ENVIRONMENT_NAME,
    DIST_DIR,
    HTML_TEMPLATE_PATH,
    ROOT_DIR,
    SERVER_ENTRY_NAME,
    SERVER_ENTRY_PATH,
    SERVER_ENVIRONMENT_NAME,
} from "./constant.ts";

const isDev = process.env.BUILD_ENV === "production" ? false : true;

const serverConfig: EnvironmentConfig = {
    source: {
        entry: {
            [SERVER_ENTRY_NAME]: SERVER_ENTRY_PATH,
        },
        decorators: {
            version: "legacy",
        },
    },
    output: {
        target: "node",
        module: true,
        externals: Object.keys(pkg.dependencies).map(dep => new RegExp(`^${dep}($|/.*)`)),
        minify: {
            jsOptions: {
                minimizerOptions: {
                    mangle: false,
                },
            },
        },
        sourceMap: {
            js: isDev ? "inline-cheap-source-map" : "cheap-source-map",
        },
    },
};

const clientConfig: EnvironmentConfig = {
    source: {
        entry: {
            [CLIENT_ENTRY_NAME]: CLIENT_ENTRY_PATH,
        },
    },
    output: {
        target: "web",
        sourceMap: {
            js: isDev ? "inline-cheap-source-map" : false,
        },
    },
    html: {
        template: HTML_TEMPLATE_PATH,
    },
};

export default defineConfig({
    root: ROOT_DIR,
    mode: isDev ? "development" : "production",
    server: {
        printUrls: false,
        middlewareMode: true,
    },
    environments: {
        [SERVER_ENVIRONMENT_NAME]: serverConfig,
        [CLIENT_ENVIRONMENT_NAME]: clientConfig,
    },
    output: {
        distPath: DIST_DIR,
        legalComments: "none",
    },
    plugins: [pluginVue()],
});
