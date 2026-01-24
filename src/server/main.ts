import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";

const logger = new Logger("Main");
let app: NestFastifyApplication;

const bootstrap: Application["bootstrap"] = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({
        forceCloseConnections: true,
    }));

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

export interface NestApp {
    bootstrap: typeof bootstrap;
    stop: typeof stop;
}

export { bootstrap, stop };
