import { Controller, Get, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";

@Controller()
export class SpaDevController {
    @Get("*")
    serve(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        console.log(1);
        if (global.devServer) {
            global.devServer.middlewares(req.raw, res.raw, () => {
                res.status(404).send("Not Found");
            });
        }
    }
}
