import handler from './trpc-server';
export type { AppRouter } from './trpc-type';

const PORT = parseInt(process.env.PORT || '3001');

Bun.serve({
  port: PORT,
  routes: {
    "/health": {
      GET: async (req) => {
        return Response.json({ status: "ok" });
      },
    },
    "/trpc/:path": {
      GET: async (req) => handler(req),
      POST: async (req) => handler(req),
    },
  }
});

console.log(`Service1 running at http://localhost:${PORT}`);
