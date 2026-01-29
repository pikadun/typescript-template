import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordRaw, Router, RouterHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("./views/HomePage.vue"),
    },
];

export const createAppRouter = (initialUrl?: string): Router => {
    const isServer = typeof window === "undefined";
    const history: RouterHistory = isServer
        ? createMemoryHistory(initialUrl)
        : createWebHistory();

    return createRouter({
        history,
        routes,
    });
};
