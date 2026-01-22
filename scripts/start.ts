import fs from "node:fs/promises";
import type { Server } from "node:http";
import path from "node:path";
import { createRsbuild } from "@rsbuild/core";
import { rsbuildConfig } from "./rsbuild.config.ts";
import { DIST_DIR, SERVER_ENTRY_NAME } from "./constant.ts";

async function startDevServer() {
    const rsbuild = await createRsbuild({ rsbuildConfig });
    const devServer = await rsbuild.createDevServer();

    global.devServer = devServer;

    let nestApp: { bootstrap: () => Promise<Server>; stop: () => Promise<void> } | undefined;
    let mtime: number | undefined;

    rsbuild.onAfterDevCompile(async () => {
        const serverBundlePath = path.resolve(DIST_DIR, `${SERVER_ENTRY_NAME}.js`);
        const stats = await fs.stat(serverBundlePath);
        if (mtime === stats.mtimeMs) {
            return;
        }

        mtime = stats.mtimeMs;
        await nestApp?.stop();
        nestApp = await devServer.environments.server?.loadBundle(SERVER_ENTRY_NAME);
        if (nestApp) {
            const httpServer = await nestApp.bootstrap();
            devServer.connectWebSocket({ server: httpServer });
        }
    });
}

startDevServer().catch((error: unknown) => {
    console.error("Failed to start development server:", error);
    process.exit(1);
});
