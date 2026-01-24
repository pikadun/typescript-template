import { Controller, Get, Req, Res } from "@nestjs/common";
import { RenderService } from "./render.service";
import type { FastifyRequest, FastifyReply } from "fastify";

@Controller()
export class RenderController {
    constructor(private readonly renderService: RenderService) { }

    @Get("*")
    async renderHome(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (global.devServer) {
            global.devServer.middlewares(req.raw, res.raw);
        }
        else {
            const appHtml = await this.renderService.renderApp();
            const page = this.renderService.renderFullPage(appHtml);
            res.status(200).send(page).header("Content-Type", "text/html; charset=utf-8");
        }
    }
}
