import path from "node:path";

import {
    SERVER_ENVIRONMENT_NAME,
    CLIENT_ENVIRONMENT_NAME,
    SERVER_ENTRY_NAME,
    CLIENT_ENTRY_NAME,
    TEMPLATE_NAME,
} from "../src/shared/constant.ts";

export const ROOT_DIR = path.resolve(import.meta.dirname, "..");
export const DIST_DIR = path.resolve(ROOT_DIR, "./lib");
export const SERVER_ENTRY_PATH = path.resolve(ROOT_DIR, `./src/server/${SERVER_ENTRY_NAME}.ts`);
export const CLIENT_ENTRY_PATH = path.resolve(ROOT_DIR, `./src/client/${CLIENT_ENTRY_NAME}.ts`);
export const HTML_TEMPLATE_PATH = path.resolve(ROOT_DIR, `./public/${TEMPLATE_NAME}`);
export const FAVICON_PATH = path.resolve(ROOT_DIR, "./public/favicon.ico");

export {
    SERVER_ENVIRONMENT_NAME,
    CLIENT_ENVIRONMENT_NAME,
    SERVER_ENTRY_NAME,
    CLIENT_ENTRY_NAME,
};
