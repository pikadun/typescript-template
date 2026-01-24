import { Controller, Get, OnModuleInit, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";
import path from "node:path";
import fs from "node:fs/promises";
import { app } from "../../../client/ssr";
import { renderToString } from "@vue/server-renderer";

@Controller()
export class RenderController implements OnModuleInit {
    #template!: string;

    async onModuleInit() {
        if (!global.devServer) {
            const templatePath = path.resolve(import.meta.dirname, "index.html");
            this.#template = await fs.readFile(templatePath, "utf-8");
        }
    }

    @Get("*")
    async render(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (global.devServer) {
            global.devServer.middlewares(req.raw, res.raw);
        }
        else {
            const htmlContent = await renderToString(app);
            const html = this.#template.replace("<!--app-->", htmlContent);
            res.type("text/html").send(html);
        }
    }
}
