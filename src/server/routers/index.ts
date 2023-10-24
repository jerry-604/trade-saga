import { router } from '../trpc';
import { userRouter } from './user-router';
import { gameRouter } from './game-router';
export const appRouter = router({
    userRouter: userRouter,
    gameRouter: gameRouter,
});
  
export type AppRouter = typeof appRouter;