import { Injectable } from "@nestjs/common";
import { renderToString } from "@vue/server-renderer";
import { createApp } from "../../../client/ssr";

@Injectable()
export class RenderService {
    async renderApp(): Promise<string> {
        const { app } = createApp();
        const html = await renderToString(app);
        return html;
    }

    /**
     * 生成完整的 HTML 页面
     */
    renderFullPage(appHtml: string) {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue SSR with NestJS</title>
    <link rel="stylesheet" href="/static/css/index.css">
</head>
<body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/static/js/index.js"></script>
</body>
</html>
        `.trim();
    }
}
