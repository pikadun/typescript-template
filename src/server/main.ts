import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";
import path from "node:path";
import { STATIC_NAME } from "@shared/constant";

const logger = new Logger("Main");
let app: NestFastifyApplication;

const bootstrap: Application["bootstrap"] = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    if (!global.devServer) {
        app.useStaticAssets({
            root: path.join(import.meta.dirname, STATIC_NAME),
            prefix: path.join("/", import.meta.env.BASE_URL, STATIC_NAME, "/"),
        });
    }

    const server = await app.listen(8888);
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
