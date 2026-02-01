import { createApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";

import App from "./App.vue";
import "./index.css";

import { createAppRouter } from "./router";

const app = createApp(App);
const router = createAppRouter();
const vuetify = createVuetify({
    theme: {
        defaultTheme: "system",
    },
});

app.use(router);
app.use(vuetify);

app.mount("#root");
