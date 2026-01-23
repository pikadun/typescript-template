import { defineConfig, type EnvironmentConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import pkg from "../package.json" with { type: "json" };
import {
    CLIENT_ENTRY_NAME,
    CLIENT_ENTRY_PATH,
    DIST_DIR,
    HTML_TEMPLATE_PATH,
    ROOT_DIR,
    SERVER_ENTRY_NAME,
    SERVER_ENTRY_PATH,
} from "./constant.ts";

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
        module: false, // some sourcemap issues with esm in node
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
    },
    html: {
        template: HTML_TEMPLATE_PATH,
    },
    plugins: [pluginVue()],
};

export default defineConfig({
    root: ROOT_DIR,
    server: {
        printUrls: false,
        middlewareMode: true,
    },
    dev: {
        /**
         * Rsbuild's dev server cannot automatically detect changes in build output.
         * Writing to disk on every build allows us to check file mtime to determine
         * if the server needs to restart.
         */
        writeToDisk: true,
    },
    tools: {
        rspack: {
            devtool: "inline-cheap-module-source-map",
        },
    },
    environments: {
        server: serverConfig,
        client: clientConfig,
    },
    output: {
        distPath: DIST_DIR,
    },
});
