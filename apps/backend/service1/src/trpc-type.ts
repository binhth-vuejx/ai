import { initTRPC } from '@trpc/server';
import { appRouter as service1Router } from '@vibe-kanban/trpc-service1';

const t = initTRPC.create();

export const appRouter = t.router({
    s1: service1Router
});

export type AppRouter = typeof appRouter;