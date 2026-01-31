import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("./views/HomePage.vue"),
    },
];

export const createAppRouter = (isBrowser: boolean): Router => {
    const baseUrl = import.meta.env.BASE_URL;

    const history = isBrowser
        ? createWebHistory(baseUrl)
        : createMemoryHistory(baseUrl);

    return createRouter({
        history,
        routes,
    });
};
