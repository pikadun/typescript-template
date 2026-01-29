import { defineConfig, type EnvironmentConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import pkg from "../package.json" with { type: "json" };
import {
    CLIENT_ENTRY_NAME,
    CLIENT_ENTRY_PATH,
    CLIENT_ENVIRONMENT_NAME,
    DIST_DIR,
    FAVICON_PATH,
    HTML_TEMPLATE_PATH,
    ROOT_DIR,
    SERVER_ENTRY_NAME,
    SERVER_ENTRY_PATH,
    SERVER_ENVIRONMENT_NAME,
} from "./constant.ts";
import path from "node:path";
import { APP_PLACEHOLDER, STATIC_NAME } from "../src/shared/constant.ts";

const isDev = process.env.NODE_ENV === "production" ? false : true;

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
            js: isDev ? "inline-cheap-module-source-map" : false,
        },
    },
};

export default defineConfig({
    root: ROOT_DIR,
    mode: isDev ? "development" : "production",
    server: {
        printUrls: false,
        middlewareMode: true,
        base: path.join("/", process.env.BASE_URL ?? "", "/"),
        publicDir: false,
    },
    environments: {
        [SERVER_ENVIRONMENT_NAME]: serverConfig,
        [CLIENT_ENVIRONMENT_NAME]: clientConfig,
    },
    source: {
        define: {
            HTML_APP_PLACEHOLDER: JSON.stringify(APP_PLACEHOLDER),
        },
    },
    output: {
        distPath: {
            root: DIST_DIR,
            favicon: STATIC_NAME,
        },
        legalComments: "none",
        sourceMap: {
            js: isDev ? "inline-cheap-module-source-map" : "nosources-source-map",
        },
    },
    html: {
        template: HTML_TEMPLATE_PATH,
        favicon: FAVICON_PATH,
    },
    tools: {
        rspack: {
            experiments: {
                nativeWatcher: true,
            },
            watchOptions: {
                aggregateTimeout: 50,
            },
        },
    },
    plugins: [pluginVue()],
});
