import { config } from "../config";
import path from "node:path";

export function stripBasePath(url: string): string {
    return path.join(url, "/").replace(config.basePath, "/");
}
