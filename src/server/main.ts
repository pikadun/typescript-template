import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";
import { Logger } from "@nestjs/common";
import { join } from "node:path";
import fastifyStatic from "@fastify/static";

const logger = new Logger("Main");
let app: NestFastifyApplication;

const bootstrap: Application["bootstrap"] = async () => {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({
        forceCloseConnections: true,
    }));

    // 配置静态文件服务
    await app.register(fastifyStatic, {
        root: join(process.cwd(), "lib"),
        prefix: "/static/",
    });

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
