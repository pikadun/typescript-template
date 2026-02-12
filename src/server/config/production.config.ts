import { type AppEnv, getAppEnv } from "../utils/env";

export interface Config {
    basePath: string;
    port: number;
    appEnv: AppEnv;
}

export const ProductionConfig: Config = {
    /**
     * The base path for the server
     */
    basePath: "/",
    /**
     * The port the server listens on
     */
    port: 8888,
    /**
     * The environment the application is running in
     */
    appEnv: getAppEnv(),
};
