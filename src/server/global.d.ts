/// <reference types="@rsbuild/core/types" />

import { type Server } from "http";
import { type ViteDevServer } from "vite";

declare global {
    var devServer: ViteDevServer | undefined;

    interface Application {
        bootstrap: () => Promise<Server>;
        stop: () => Promise<void>;
    }
}

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    const component: DefineComponent<object, object, unknown>;
    export default component;
}
