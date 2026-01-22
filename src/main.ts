import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";

const logger = new Logger("Main");
let app: NestFastifyApplication;

const bootstrap = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        // TODO: enable this only in development mode
        forceCloseConnections: true,
    });

    const server = await app.listen(3000);
    const appUrl = await app.getUrl();

    logger.log(`Application is running on: ${appUrl}`);

    return server;
};

const stop = async () => {
    await app.close();
};

export { bootstrap, stop };
