import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";
import path from "node:path";
import { STATIC_NAME } from "@shared/constant";
import { config } from "./config";

const logger = new Logger("Main");
let app: NestFastifyApplication;

const bootstrap: Application["bootstrap"] = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    if (!global.devServer) {
        app.useStaticAssets({
            root: path.join(import.meta.dirname, STATIC_NAME),
            prefix: path.join(config.basePath, STATIC_NAME, "/"),
        });
    }

    const server = await app.listen(config.port);
    const appUrl = await app.getUrl();

    logger.log(`Application is running on: ${appUrl}`);

    return server;
};

const stop: Application["stop"] = async () => {
    await app.close();
};

if (!global.devServer) {
    await bootstrap();
}

export { bootstrap, stop };
