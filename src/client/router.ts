import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("./views/HomePage.vue"),
    },
];

export const createAppRouter = () => {
    return createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
    });
};
