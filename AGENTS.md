# Agents Guide

## Project Structure

```
my_coding_career/
├── front/           # Vue 3 + Vite frontend (nginx served)
├── back/             # Node.js + Express backend (ESM)
├── docker-data/      # MariaDB/MongoDB data (NOT committed)
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json      # Workspace root
```

## Docker Dev Environment

**Backend runs in Docker, NOT locally.** All `node index.js` and database commands execute inside containers.

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f back

# Restart a service
docker compose restart back

# Rebuild after code changes
docker compose build back && docker compose up -d back
```

**Exposed ports:** front=5000, back=3000, mongo-express=5100. MongoDB and MariaDB are internal only.

## Backend ESM Rules

- All `.js` files use ESM (`import`/`export`, no `require()`)
- `package.json` has `"type": "module"`
- **Critical:** Relative imports MUST use explicit file extensions:
  - ✅ `from "../index.js"` 
  - ❌ `from ".."` (causes `ERR_UNSUPPORTED_DIR_IMPORT`)
- This applies to all sibling directories: `mariadb/`, `mongodb/`, `router/`

## Dependency Management

- **Workspace:** `pnpm` with `pnpm-workspace.yaml`
- **Docker builds:** Use `npm install --legacy-peer-deps` (NOT pnpm - pnpm 10+ has bin linking bugs in Docker)
- **Node version:** 20 (Node 24 breaks vite bin resolution)

## Frontend Build Notes

- Element Plus locale import: `element-plus/es/locale/lang/zh-cn` (NOT `element-plus/locale/lang/zh-cn`)
- Vite config: `css.preprocessorOptions.scss.api = 'modern-compiler'` to avoid Sass legacy API warning
- Vite proxy targets `localhost:3000` (backend must be running)
- **Vite 8**: vue-devtools 需要 v7.7.9+ 才支持 Vite 8

## Database Config

- MariaDB sequelize: requires `allowPublicKeyRetrieval: true`
- MongoDB: mongoose connection to `mongo:27017`
- ENV vars in docker-compose: `mariadb`, `mongodb`, `dbName`

## Git Workflow

- node_modules/, docker-data/, front/dist/, `*.log` are gitignored
- Commit message: Chinese descriptive messages
- Branch: `main`
