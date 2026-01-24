/// <reference types="@rsbuild/core/types" />

import type { RsbuildDevServer } from "@rsbuild/core";
import { type Server } from "http";

declare global {
    var devServer: RsbuildDevServer | undefined;

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
