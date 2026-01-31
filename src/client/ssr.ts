import { createSSRApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import AppComponent from "./App.vue";
import { createAppRouter } from "./router";

export const createApp = (isBrowser = false) => {
    const app = createSSRApp(AppComponent);
    const router = createAppRouter(isBrowser);
    const vuetify = createVuetify({ ssr: true });

    app.use(vuetify);
    app.use(router);

    return { app, router };
};
