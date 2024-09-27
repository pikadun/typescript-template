import { run } from "node:test";
import { spec } from "node:test/reporters";

const stream = run({
    concurrency: true,
    // @ts-expect-error - This is a valid option
    globPatterns: ["test/**/*.test.ts"],
});

stream.on("test:fail", () => {
    process.exitCode = 1;
});

stream.compose(spec).pipe(process.stdout);
