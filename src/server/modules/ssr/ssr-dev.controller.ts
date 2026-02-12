import { All, Controller, NotFoundException, Req, Res } from "@nestjs/common";
import type { FastifyRequest, FastifyReply } from "fastify";
import { SsrService } from "./ssr.service";
import { CLIENT_ENTRY_NAME, CLIENT_ENVIRONMENT_NAME } from "../../constant";
import { stripBasePath } from "../../utils/url";

@Controller()
export class SsrDevController {
    constructor(private readonly service: SsrService) { }

    @All("*")
    async serve(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const url = stripBasePath(req.url);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { environments, middlewares } = devServer!;
        const template = await environments[CLIENT_ENVIRONMENT_NAME]?.getTransformedHtml(CLIENT_ENTRY_NAME);
        const html = await this.service.render(template ?? "", url);

        if (html) {
            res.type("text/html").send(html);
        }
        else {
            Object.assign(req.raw, { body: req.body, url });

            await new Promise<void>((_resolve, reject) => {
                middlewares(req.raw, res.raw, () => {
                    reject(new NotFoundException());
                });
            });
        }
    }
}
