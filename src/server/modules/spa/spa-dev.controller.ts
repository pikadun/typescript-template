import { All, Controller, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";

@Controller()
export class SpaDevController {
    @All("*")
    serve(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        if (global.devServer) {
            if (req.body) {
                // @ts-expect-error Forward body to Rsbuild's dev server
                req.raw.body = req.body;
            }

            global.devServer.middlewares(req.raw, res.raw);
        }
    }
}
