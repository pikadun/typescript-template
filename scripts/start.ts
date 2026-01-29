import { createRsbuild, type Rspack, type OnAfterDevCompileFn } from "@rsbuild/core";
import rsbuildConfig from "./rsbuild.config.ts";
import { SERVER_ENTRY_NAME, SERVER_ENVIRONMENT_NAME } from "./constant.ts";
import crypto from "node:crypto";
import { type Socket } from "node:net";

const rsbuild = await createRsbuild({ rsbuildConfig });
const devServer = await rsbuild.createDevServer();
const sockets = new Set<Socket>();

let nestApp: Application | undefined;
let legacyHash = "";

const onAfterDevCompile: OnAfterDevCompileFn = async (info) => {
    const stats = (info.stats as Rspack.MultiStats).stats;
    const serverStats = stats.find(s => s.compilation.name === SERVER_ENVIRONMENT_NAME);
    const assets = serverStats?.compilation.assets[`${SERVER_ENTRY_NAME}.js`];

    if (!assets) {
        throw new Error("Server assets not found");
    }

    const source = assets.source().toString();
    const hash = crypto.createHash("md5").update(source).digest("hex");

    if (legacyHash !== hash) {
        legacyHash = hash;

        for (const socket of sockets) {
            socket.destroy();
            sockets.delete(socket);
        }

        await nestApp?.stop();
        nestApp = await devServer.environments[SERVER_ENVIRONMENT_NAME]?.loadBundle(SERVER_ENTRY_NAME);

        if (!nestApp) {
            throw new Error("Nest application failed to load");
        }

        const httpServer = await nestApp.bootstrap();

        httpServer.on("upgrade", (req) => {
            sockets.add(req.socket);
        });

        devServer.connectWebSocket({ server: httpServer });
    }
};

global.devServer = devServer;
rsbuild.onAfterDevCompile(onAfterDevCompile);
