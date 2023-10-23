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
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            name: {
              equals: input.name
            }
          },
          {
            email: {
              equals: input.email
            }
          }
        ]
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (user) {
      console.log("EMAIL OR USERNAME TAKEN");
      return { error: `That ${user.name === input.name ? "username" : "email"} is already taken` };
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const result = await prisma.user.create({
      data: {
        name: input.name,
        Fname: input.Fname,
        Lname: input.Lname,
        email: input.email,
        password: hashedPassword,
        role: 'user',
        dollars: 0,
      }
    });

    console.log(result);

    return result;
  })
});
