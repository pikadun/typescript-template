import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";
import { config } from "./config";
import path from "node:path";

const logger = new Logger("Main");
let app: NestFastifyApplication;

export const bootstrap: Application["bootstrap"] = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    if (!global.devServer) {
        const staticName = "static";
        const staticPath = path.join(import.meta.dirname, staticName);
        const staticPrefix = path.join(config.basePath, staticName);
        app.useStaticAssets({ root: staticPath, prefix: staticPrefix });
    }

    const server = await app.listen(config.port);
    const appUrl = await app.getUrl();

    logger.log(`Application (${config.appEnv}) is running on: ${appUrl}`);

    return server;
};

export const stop: Application["stop"] = async () => {
    await app.close();
};

if (!global.devServer) {
    await bootstrap();
}
