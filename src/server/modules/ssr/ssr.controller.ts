import { Controller, Get, NotFoundException, type OnModuleInit, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";
import { SsrService } from "./ssr.service";
import { stripBasePath } from "../../utils/url";

@Controller()
export class SsrController implements OnModuleInit {
    #template!: string;
    constructor(private readonly service: SsrService) { }

    async onModuleInit() {
        const templatePath = path.join(import.meta.dirname, "index.html");
        this.#template = await fs.readFile(templatePath, "utf-8");
    }

    @Get("*")
    async serve(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const url = stripBasePath(req.url);
        const html = await this.service.render(this.#template, url);

        if (html) {
            res.type("text/html").send(html);
        }
        else {
            throw new NotFoundException();
        }
    }
}
