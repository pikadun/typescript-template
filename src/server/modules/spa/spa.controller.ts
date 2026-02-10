import { Controller, Get, NotFoundException, OnModuleInit, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";

@Controller()
export class SpaController implements OnModuleInit {
    #template?: string;

    async onModuleInit() {
        const templatePath = path.join(import.meta.dirname, "index.html");
        this.#template = await fs.readFile(templatePath, "utf-8");
    }

    @Get("*")
    async serve(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (req.headers.accept?.includes("text/html") && this.#template) {
            return res.type("text/html").send(this.#template);
        }
        throw new NotFoundException();
    }
}
