# TRPC API Documentation

## Overview

This project uses tRPC for type-safe APIs. Agents can interact with the API using either:

1. **OpenAPI/Swagger UI** - Visual documentation
2. **Direct HTTP calls** - Using tRPC protocol

## Endpoints

### Server URL
```
http://localhost:3000
```

### OpenAPI Specification

**Get OpenAPI JSON:**
```
GET /openapi.json
```

**View Swagger UI:**
```
GET /docs
```

## Available APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Check server health status |
| `/hello` | GET | Get greeting message |

## Usage Examples

### Using OpenAPI (Recommended for Agents)

1. Fetch the OpenAPI spec:
```bash
curl http://localhost:3000/openapi.json
```

2. Use the spec to generate clients or understand the API

### Using Swagger UI

Visit `http://localhost:3000/docs` in a browser to see interactive API documentation.

### Direct TRPC Calls

#### Health Check
```bash
curl "http://localhost:3000/trpc/health?input=%7B%7D"
```

Response:
```json
{
  "result": {
    "data": {
      "status": "ok",
      "timestamp": "2026-03-16T12:00:00.000Z"
    }
  }
}
```

#### Hello World
```bash
# With name
curl "http://localhost:3000/trpc/hello?input=%7B%22name%22%3A%22Binh%22%7D"

# Without name (default to World)
curl "http://localhost:3000/trpc/hello?input=%7B%7D"
```

Response:
```json
{
  "result": {
    "data": {
      "message": "Hello, Binh!"
    }
  }
}
```

## TRPC Protocol Format

### Query Format
```
GET /trpc/{procedure}?input={json_encoded_input}
```

- `{procedure}` - Procedure name (e.g., `health`, `hello`)
- `{json_encoded_input}` - URL-encoded JSON object

### JSON Encoding

Input must be URL-encoded JSON. Examples:

| JSON | URL Encoded |
|------|-------------|
| `{}` | `%7B%7D` |
| `{"name":"Binh"}` | `%7B%22name%22%3A%22Binh%22%7D` |

### Response Format

```json
{
  "result": {
    "data": { ... }
  }
}
```

## Adding New APIs

1. Add procedure to `router.ts`:
```typescript
export const appRouter = router({
  // Add new procedure here
  myProcedure: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/my-procedure' } })
    .input(z.object({ ... }))
    .query(({ input }) => { ... }),
});
```

2. Update `openapi.json` with the new endpoint

3. Update this documentation

## Notes

- All procedures are currently public (no authentication)
- Use `zod` for input validation
- TypeScript types are exported as `AppRouter` for client generation

---

## Using @vibe-kanban/api Package (Type-Safe Client)

### Install Package

```bash
# Using npm
npm install @vibe-kanban/api

# Using bun
bun add @vibe-kanban/api
```

### Usage in TypeScript

```typescript
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@vibe-kanban/api';

// Create type-safe client
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

// Type-safe calls - IDE will autocomplete!
const health = await client.health.query();
const hello = await client.hello.query({ name: 'Binh' });

console.log(health);    // { status: 'ok', timestamp: '...' }
console.log(hello);     // { message: 'Hello, Binh!' }
```

### Package Structure

```
packages/api/
├── src/
│   ├── router.ts    # Router definitions
│   └── index.ts     # Exports
└── package.json
```

### Publishing Package

```bash
# Build (if needed)
bun build ./src/index.ts --outdir ./dist --format esm

# Publish to npm
bun pm publish
# or
npm publish
```
