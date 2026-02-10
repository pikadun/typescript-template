import path from "node:path";
export const ROOT_DIR = path.resolve(import.meta.dirname, "..");
export const DIST_DIR = path.resolve(ROOT_DIR, "./lib");
export const SERVER_ENVIRONMENT_NAME = "ssr";
export const SERVER_ENTRY_NAME = "main";
export const SERVER_ENTRY_PATH = path.resolve(ROOT_DIR, `./src/server/${SERVER_ENTRY_NAME}.ts`);
