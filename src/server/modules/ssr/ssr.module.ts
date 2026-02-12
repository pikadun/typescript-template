import { Module } from "@nestjs/common";
import { SsrController } from "./ssr.controller";
import { SsrDevController } from "./ssr-dev.controller";
import { SsrService } from "./ssr.service";

// Note: You must access devServer via global here, otherwise it will throw 'devServer is not defined' in production.
@Module({
    controllers: [global.devServer ? SsrDevController : SsrController],
    providers: [SsrService],
})
export class SsrModule {}
