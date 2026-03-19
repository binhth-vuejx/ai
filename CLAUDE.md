# Project Conventions

## Runtime
- Use Bun as package manager and runtime
- Use `bun install`, `bun run`, `bun build`

## Backend (apps/backend/service1)
- Bun.serve() for TRPC API
- TRPC v11 with fetch adapter
- Port: 3001

## Frontend (apps/frontend/app)
- Vite for dev server (browser environment required)
- Vue 3 for UI
- Port: 3000 (proxies /trpc to backend)

## Commands
- `bun run dev:all` - Start all services
- `bun run dev:backend` - Start TRPC server (port 3001)
- `bun run dev:app` - Start frontend (port 3000)
- `bun run build:service1` - Build backend
- `bun run build:app` - Build frontend

## TRPC
- Router defined in `packages/trpc-types/service1/src/router.ts`
- Backend imports from `@vibe-kanban/trpc-service1`
- Frontend uses type-safe client with proxy
