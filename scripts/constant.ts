import path from "node:path";

export const ROOT_DIR = path.resolve(import.meta.dirname, "..");
export const DIST_DIR = path.resolve(ROOT_DIR, "./lib");
export const SERVER_ENTRY_NAME = "main";
export const CLIENT_ENTRY_NAME = "index";
export const SERVER_ENTRY_PATH = path.resolve(ROOT_DIR, `./src/server/${SERVER_ENTRY_NAME}.ts`);
export const CLIENT_ENTRY_PATH = path.resolve(ROOT_DIR, `./src/client/${CLIENT_ENTRY_NAME}.ts`);
export const HTML_TEMPLATE_PATH = path.resolve(ROOT_DIR, "./src/public/index.html");
