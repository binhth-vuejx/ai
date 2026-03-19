import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './trpc-type';

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/trpc',
        req,
        router: appRouter,
        createContext: () => ({}),
    });

export default handler;