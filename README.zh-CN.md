# Web Template

一个全栈 Web 模板项目，使用 Vue 3 SSR（服务端渲染），后端基于 NestJS + Fastify，前端基于 Rsbuild + Vuetify。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | Vue 3, Vue Router 5, Vuetify 3 |
| 后端框架 | NestJS 11, Fastify |
| 构建工具 | Rsbuild 2 |
| 数据库 | Sequelize 7 (SQLite 内存模式) |
| 语言 | TypeScript 5.9 |
| 代码检查 | ESLint 9, cspell, commitlint |
| Git Hooks | Husky 9, lint-staged |

## 项目结构

```
├── eng/                    # 工程化配置（ESLint、TSConfig、cspell、commitlint）
├── lib/                    # 构建产物（已 gitignore）
├── public/                 # 公共静态资源
├── scripts/                # 构建与开发脚本
│   ├── constant.ts         #   路径常量
│   ├── rsbuild.config.ts   #   Rsbuild 配置
│   └── start.ts            #   开发服务器启动脚本
├── src/
│   ├── client/             # Vue 3 前端
│   │   ├── App.vue         #   根组件
│   │   ├── index.ts        #   客户端入口（浏览器 hydration）
│   │   ├── ssr.ts          #   SSR 应用工厂
│   │   ├── router.ts       #   路由配置
│   │   ├── index.html      #   HTML 模板
│   │   └── views/          #   页面组件
│   ├── server/             # NestJS 后端
│   │   ├── main.ts         #   服务端入口
│   │   ├── app.module.ts   #   根模块
│   │   ├── config/         #   环境配置
│   │   ├── core/database/  #   Sequelize 数据库模块
│   │   ├── modules/ssr/    #   SSR 渲染模块
│   │   ├── modules/todo/   #   Todo CRUD 示例模块
│   │   └── utils/          #   服务端工具函数
│   └── shared/             # 前后端共享代码
│       └── constant.ts     #   路由名称等
└── tsconfig.json           # 根 TypeScript 项目引用
```

## 前置要求

- Node.js >= 22.6.0（需要支持 `--experimental-strip-types`）
- npm

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动 Rsbuild 开发服务器，支持 HMR 热更新。NestJS 服务端通过 `scripts/start.ts` 自动打包并热重载。应用地址为 `http://localhost:8888/development`。

### 构建

```bash
npm run build
```

使用 Rsbuild 将客户端和服务端同时构建到 `lib/` 目录。

### 预览

```bash
npm run preview
```

先构建项目，然后从 `lib/main.js` 启动生产服务器。应用地址为 `http://localhost:8888`。

### 类型检查

```bash
npm run type-check
```

### 代码检查

```bash
npm run lint
```

同时运行 cspell（拼写检查）和 ESLint。

## Git 钩子

通过 Husky 配置：

| 钩子 | 动作 |
|---|---|
| `pre-commit` | 运行 lint-staged（cspell + ESLint 修复） |
| `commit-msg` | 校验提交信息格式（Conventional Commits） |
| `pre-push` | 运行完整 lint + 类型检查 |

## 添加新模块

1. 在 `src/server/modules/your-module/` 下创建新文件夹。
2. 参照 Todo 模块的模式创建 model、service、controller 和 module 文件。
3. 在 `src/server/app.module.ts` 中导入新模块。

## 添加新页面

1. 在 `src/client/views/` 下创建新的 `.vue` 组件。
2. 在 `src/client/router.ts` 中添加路由条目。
3. 如需要，在 `src/shared/constant.ts` 中添加路由名称。

## 许可证

MIT
