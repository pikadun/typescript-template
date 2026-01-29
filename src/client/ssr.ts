import { createSSRApp } from "vue";
import type { App } from "vue";
import type { Router } from "vue-router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import AppComponent from "./App.vue";
import { createAppRouter } from "./router";

export const createApp = (url?: string): { app: App; router: Router } => {
    const app = createSSRApp(AppComponent);
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true,
    });
    const router = createAppRouter(url);

    app.use(vuetify);
    app.use(router);

    return { app, router };
};
