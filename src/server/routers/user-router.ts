import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';

export const userRouter = router({
  getUser: publicProcedure
    .query(async ({ ctx }) => {
      return await prisma.user.findMany();
    }),
  createUser: publicProcedure.input(z.object({ name: z.string(), Fname: z.string(), Lname: z.string(), email: z.string(), password: z.string() })).mutation(async (opts) => {
    const input = opts.input;

    // Check if user already exists

    // encrypt password

    const result = await prisma.user.create({
      data: {
        name: input.name,
        Fname: input.Fname,
        Lname: input.Lname,
        email: input.email,
        password: input.password,
        role: 'user',
        dollars: 0,
      }
    });

    console.log(result);

    return result;
  })
});
