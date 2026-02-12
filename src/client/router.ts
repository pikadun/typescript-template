import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
import Homepage from "./views/Homepage.vue";
import { RouteName } from "@shared/constant";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: RouteName.Home,
        component: Homepage,
    },
    {
        path: "/:catchAll(.*)",
        name: RouteName.CatchAll,
        redirect: { name: RouteName.Home },
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
