import fs from "node:fs/promises";
import path from "node:path";

const dir = process.argv[2];

if (!dir) {
    console.error("Usage: npm run rmdir -- <dir>");
    process.exit(1);
}

const dirPath = path.resolve(__dirname, "..", dir);

fs.rm(dirPath, { force: true, recursive: true }).catch((e: unknown) => {
    console.error(e);
    process.exit(1);
});
