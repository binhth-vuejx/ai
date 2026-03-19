import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  health: publicProcedure.query(() => {
    return {
      status: 'ok' as const,
      timestamp: new Date().toISOString(),
      service: 'service1',
    };
  }),
  getServerTime: publicProcedure.query(() => {
    return {
      iso: new Date().toISOString(),
      unix: Date.now(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }),
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return { message: `Hello from service1, ${input.name || 'World'}!` };
    }),
  greet: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Welcome to Service1, ${input.name}!` };
    }),

  // Users (from service2)
  getUsers: publicProcedure.query(() => {
    return {
      users: [
        { id: '1', name: 'Alice', email: 'alice@example.com' },
        { id: '2', name: 'Bob', email: 'bob@example.com' },
      ]
    };
  }),
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return { id: input.id, name: `User ${input.id}`, email: `user${input.id}@example.com` };
    }),

  // Kanban (from service3)
  getBoards: publicProcedure.query(() => {
    return {
      boards: [
        { id: '1', title: 'Project Alpha', columns: [] },
        { id: '2', title: 'Project Beta', columns: [] },
      ]
    };
  }),
  getBoard: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return {
        id: input.id,
        title: `Board ${input.id}`,
        columns: [
          { id: 'c1', title: 'To Do', tasks: [] },
          { id: 'c2', title: 'In Progress', tasks: [] },
          { id: 'c3', title: 'Done', tasks: [] },
        ]
      };
    }),
  createTask: publicProcedure
    .input(z.object({
      title: z.string(),
      columnId: z.string(),
      description: z.string().optional()
    }))
    .mutation(({ input }) => {
      return {
        id: `task-${Date.now()}`,
        title: input.title,
        description: input.description,
        columnId: input.columnId
      };
    }),
});

export type AppRouter = typeof appRouter;
