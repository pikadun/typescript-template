import "./index.css";
import { createApp } from "./ssr";

const { app, router } = createApp();

await router.isReady();

app.mount("#root");
