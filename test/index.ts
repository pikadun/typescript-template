import fs from "node:fs";
import path from "node:path";
import { run } from "node:test";
import { spec } from "node:test/reporters";

const getTestFiles = (dir = __dirname, files: string[] = []) => {
  const list = fs.readdirSync(dir);
  for (const name of list) {
    const fileOrDirPath = path.resolve(dir, name);
    if (fs.statSync(fileOrDirPath).isDirectory()) {
      getTestFiles(fileOrDirPath, files);
    }
    if (fileOrDirPath.endsWith(".test.ts")) {
      files.push(fileOrDirPath);
    }
  }
  return files;
};

run({
  files: getTestFiles(),
  concurrency: true,
})
  .once("test:fail", () => {
    process.exitCode = 1;
  })
  .pipe(new spec())
  .pipe(process.stderr);
