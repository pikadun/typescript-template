import { Controller, Get, NotFoundException, OnModuleInit, Post, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";
import path from "node:path";
import fs from "node:fs/promises";
import { createApp } from "@client/ssr";
import { renderToString } from "vue/server-renderer";
import { CLIENT_ENTRY_NAME, CLIENT_ENVIRONMENT_NAME, TEMPLATE_NAME, APP_PLACEHOLDER } from "@shared/constant";

@Controller()
export class RenderController implements OnModuleInit {
    #template!: string;

    async onModuleInit() {
        if (!global.devServer) {
            const templatePath = path.resolve(import.meta.dirname, TEMPLATE_NAME);
            this.#template = await fs.readFile(templatePath, "utf-8");
        }
    }

    /**
     * dev only - handle lazy compilation requests
     */
    @Post("lazy-compilation-using-*")
    handleLazyCompilation(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (global.devServer) {
            if (req.body) {
                // @ts-expect-error setting raw body
                req.raw.body = req.body;
            }
            global.devServer.middlewares(req.raw, res.raw);
        }
        else {
            throw new NotFoundException();
        }
    }

    @Get("*")
    async render(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const { app, router } = createApp(req.url);
        let template = this.#template;

        if (global.devServer) {
            if (!req.headers.accept?.includes("text/html")) {
                global.devServer.middlewares(req.raw, res.raw);
                return;
            }

            template = await global.devServer.environments[CLIENT_ENVIRONMENT_NAME]
                ?.getTransformedHtml(CLIENT_ENTRY_NAME) ?? "";
        }

        await router.push(req.url);
        await router.isReady();

        const content = await renderToString(app);
        const html = template.replace(APP_PLACEHOLDER, content);

        res.type("text/html").send(html);
    }
}
