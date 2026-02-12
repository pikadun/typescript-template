import { createSSRApp } from "vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";

import AppComponent from "./App.vue";
import { createAppRouter, type CreateAppRouterOptions } from "./router";

export type CreateAppOptions = CreateAppRouterOptions;

export const createApp = (options: CreateAppOptions) => {
    const app = createSSRApp(AppComponent);
    const router = createAppRouter(options);
    const vuetify = createVuetify({ ssr: true, theme: { defaultTheme: "light" } });

    app.use(vuetify);
    app.use(router);

    return { app, router };
};
