import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
import Homepage from "./views/Homepage.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Homepage,
    },
];

export interface CreateAppRouterOptions {
    isBrowser?: boolean;
    basePath?: string;
}

export const createAppRouter = (options: CreateAppRouterOptions): Router => {
    const history = options.isBrowser
        ? createWebHistory(options.basePath)
        : createMemoryHistory(options.basePath);

    return createRouter({
        history,
        routes,
    });
};
