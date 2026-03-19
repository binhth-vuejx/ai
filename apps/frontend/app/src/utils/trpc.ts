import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@vibe-kanban/service1';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});
