import { createSSRApp } from "vue";
import App from "./App.vue";
import "./index.css";

const app = createSSRApp(App);

app.mount("#root");
