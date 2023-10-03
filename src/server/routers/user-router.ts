import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma'
export const userRouter = router({
  getUser: publicProcedure
    .query(async ({ ctx }) => {
      return await prisma.user.findMany();
    }),
});
