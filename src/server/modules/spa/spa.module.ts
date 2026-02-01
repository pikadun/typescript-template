import { Module } from "@nestjs/common";
import { SpaController } from "./spa.controller";
import { SpaDevController } from "./spa-dev.controller";

@Module({
    controllers: [global.devServer ? SpaDevController : SpaController],
})
export class SpaModule {}
