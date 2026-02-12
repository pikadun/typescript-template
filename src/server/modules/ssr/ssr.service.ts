import { Injectable } from "@nestjs/common";
import { renderToString } from "vue/server-renderer";
import { config } from "../../config";
import { createApp } from "@client/ssr";
import { createRouterMatcher } from "vue-router";

@Injectable()
export class SsrService {
    async render(template: string, url: string) {
        const { app, router } = createApp({ basePath: config.basePath });
        const matcher = createRouterMatcher(router.getRoutes(), router.options);
        const location = matcher.resolve({ path: url }, router.currentRoute.value);

        if (!location.matched.length) {
            return null;
        }

        await router.push(url);
        await router.isReady();

        const renderData: Record<string, string> = {
            base: `<base href="${config.basePath}">`,
            content: await renderToString(app),
        };

        return template.replace(/<!--(\w+)-->/g, (_, key: string) => renderData[key] ?? "");
    }
}
