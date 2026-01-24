import { Controller, Get, NotFoundException, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";

@Controller()
export class FallbackController {
    @Get("*")
    handleFallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (global.devServer) {
            global.devServer.middlewares(req.raw, res.raw);
        }
        else {
            throw new NotFoundException();
        }
    }
}
