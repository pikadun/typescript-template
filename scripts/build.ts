import { BuildOptions, build as esbuild } from "esbuild";

async function build() {
    const options: BuildOptions = {
        bundle: true,
        entryPoints: ["src/index.ts"],
        outfile: "lib/index.js",
        packages: "external",
        platform: "node",
        target: "node22",
    };

    await esbuild(options);
}

build().catch((e: unknown) => {
    console.error(e);
    process.exit(1);
});
