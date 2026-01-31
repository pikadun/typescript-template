import "./index.css";
import { createApp } from "./ssr";

const { app, router } = createApp(true);

await router.isReady();

app.mount("#root");
