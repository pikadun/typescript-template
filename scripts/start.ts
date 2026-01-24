import { createRsbuild, type Rspack, type OnAfterDevCompileFn } from "@rsbuild/core";
import rsbuildConfig from "./rsbuild.config.ts";
import { SERVER_ENTRY_NAME, SERVER_ENVIRONMENT_NAME } from "./constant.ts";
import crypto from "node:crypto";
import type { NestApp } from "../src/server/main.ts";

// @ts-expect-error set to false if you want to use breakpoints in dev server
rsbuildConfig.environments.server.output.module = false;

const rsbuild = await createRsbuild({ rsbuildConfig });
const devServer = await rsbuild.createDevServer();
let nestApp: NestApp | undefined;
let legacyHash = "";

const onAfterDevCompile: OnAfterDevCompileFn = async (info) => {
    const stats = (info.stats as Rspack.MultiStats).stats;
    const serverStats = stats.find(s => s.compilation.name === SERVER_ENVIRONMENT_NAME);

    if (!serverStats) {
        throw new Error("Server stats not found");
    }

    const assets = serverStats.compilation.assets[`${SERVER_ENTRY_NAME}.js`];

    if (!assets) {
        throw new Error("Server assets not found");
    }

    const source = assets.source().toString();
    const hash = crypto.createHash("md5").update(source).digest("hex");

    if (legacyHash !== hash) {
        legacyHash = hash;

        await nestApp?.stop();
        nestApp = await devServer.environments.server?.loadBundle(SERVER_ENTRY_NAME);
        if (nestApp) {
            const httpServer = await nestApp.bootstrap();
            devServer.connectWebSocket({ server: httpServer });
        }
    }
};

global.devServer = devServer;
rsbuild.onAfterDevCompile(onAfterDevCompile);
