# Web Template

A full-stack web template project with Vue 3 SSR (Server-Side Rendering), powered by NestJS + Fastify on the backend and Rsbuild + Vuetify on the frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Vue 3, Vue Router 5, Vuetify 3 |
| Backend Framework | NestJS 11, Fastify |
| Build Tool | Rsbuild 2 |
| Database | Sequelize 7 (SQLite in-memory) |
| Language | TypeScript 5.9 |
| Linting | ESLint 9, cspell, commitlint |
| Git Hooks | Husky 9, lint-staged |

## Project Structure

```
├── eng/                    # Engineering configs (ESLint, TSConfig, cspell, commitlint)
├── lib/                    # Build output (gitignored)
├── public/                 # Public static assets
├── scripts/                # Build & dev scripts
│   ├── constant.ts         #   Path constants
│   ├── rsbuild.config.ts   #   Rsbuild configuration
│   └── start.ts            #   Dev server bootstrap
├── src/
│   ├── client/             # Vue 3 frontend
│   │   ├── App.vue         #   Root component
│   │   ├── index.ts        #   Client entry (browser hydration)
│   │   ├── ssr.ts          #   SSR app factory
│   │   ├── router.ts       #   Vue Router config
│   │   ├── index.html      #   HTML template
│   │   └── views/          #   Page components
│   ├── server/             # NestJS backend
│   │   ├── main.ts         #   Server entry
│   │   ├── app.module.ts   #   Root module
│   │   ├── config/         #   Environment configs
│   │   ├── core/database/  #   Sequelize database module
│   │   ├── modules/ssr/    #   SSR rendering module
│   │   ├── modules/todo/   #   Todo CRUD example module
│   │   └── utils/          #   Server utilities
│   └── shared/             # Shared code between client & server
│       └── constant.ts     #   Route names, etc.
└── tsconfig.json           # Root TypeScript project references
```

## Prerequisites

- Node.js >= 22.6.0 (requires `--experimental-strip-types` support)
- npm

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Rsbuild dev server with HMR. The NestJS server is bundled and hot-reloaded automatically via `scripts/start.ts`. The app will be available at `http://localhost:8888/development`.

### Build

```bash
npm run build
```

Builds both client and server bundles into the `lib/` directory using Rsbuild.

### Preview

```bash
npm run preview
```

Builds the project first, then starts the production server from `lib/main.js`. The app will be available at `http://localhost:8888`.

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

Runs both cspell (spell checking) and ESLint.

## Git Hooks

Configured via Husky:

| Hook | Action |
|---|---|
| `pre-commit` | Runs lint-staged (cspell + ESLint fix) |
| `commit-msg` | Validates commit message format (Conventional Commits) |
| `pre-push` | Runs full lint + type-check |

## Adding a New Module

1. Create a new folder under `src/server/modules/your-module/`.
2. Create the model, service, controller, and module files following the Todo module pattern.
3. Import the new module in `src/server/app.module.ts`.

## Adding a New Page

1. Create a new `.vue` component under `src/client/views/`.
2. Add a route entry in `src/client/router.ts`.
3. If needed, add the route name to `src/shared/constant.ts`.

## License

MIT
