import { Injectable } from "@nestjs/common";
import { renderToString } from "vue/server-renderer";
import { config } from "../../config";
import { createApp } from "@client/ssr";
import { RouteName } from "@shared/constant";
import path from "node:path";
import { HTML_BASE_PLACEHOLDER, HTML_CONTENT_PLACEHOLDER } from "../../constant";

@Injectable()
export class SsrService {
    async render(template: string, url: string) {
        const { app, router } = createApp({ basePath: config.basePath });
        const location = router.resolve(url);

        if (location.name === RouteName.CatchAll) {
            return null;
        }

        await router.push(url);
        await router.isReady();

        const renderData: Record<string, string> = {
            [HTML_BASE_PLACEHOLDER]: `<base href="${path.join(config.basePath, "/")}">`,
            [HTML_CONTENT_PLACEHOLDER]: await renderToString(app),
        };

        return template.replace(/<!--(\w+)-->/g, (_, key: string) => renderData[key] ?? "");
    }
}
