import { defineConfig, type ViteDevServer, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { SERVER_ENTRY_PATH } from "./constant.ts";
import crypto from "node:crypto";

const hotReload = (): Plugin => {
    const cache = new Map<string, string>();
    let nestApp: Application | undefined;

    const startOrReloadServer = async (devServer: ViteDevServer) => {
        global.devServer = devServer;

        await nestApp?.stop();
        nestApp = await devServer.ssrLoadModule(SERVER_ENTRY_PATH) as Application;
        await nestApp.bootstrap();
    };

    return {
        name: "server-hot-reload",
        apply: "serve",

        configureServer: async (devServer) => {
            await startOrReloadServer(devServer);
        },

        handleHotUpdate: async (ctx) => {
            const content = await ctx.read();
            const hash = crypto.createHash("md5").update(content).digest("hex");

            if (cache.get(ctx.file) === hash) {
                await startOrReloadServer(ctx.server);
                cache.set(ctx.file, hash);
            }
        },
    };
};

export default defineConfig({
    appType: "custom",
    server: {
        middlewareMode: true,
    },
    plugins: [vue(), hotReload()],
});
