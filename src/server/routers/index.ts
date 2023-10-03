import { router } from '../trpc';
import { userRouter } from './user-router';
export const appRouter = router({
    userRouter: userRouter,
});
  
export type AppRouter = typeof appRouter;