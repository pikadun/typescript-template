// Polyfill Symbol.metadata
(Symbol as { metadata?: symbol }).metadata ??= Symbol("Symbol.metadata");

import { run } from "node:test";
import { spec } from "node:test/reporters";

const coverage = true;

const stream = run({
    concurrency: true,
    execArgv: ["--enable-source-maps"],
    globPatterns: ["test/**/*.test.ts"],

    coverage,
    coverageExcludeGlobs: ["test/**/*.test.ts"],

    branchCoverage: 0,
    functionCoverage: 0,
    lineCoverage: 0,

    setup(reporter) {
        reporter.on("test:fail", () => {
            process.exitCode = 1;
        });
    },
});

stream.compose(spec).pipe(process.stdout);
