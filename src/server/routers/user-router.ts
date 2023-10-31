import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import { signUp } from '@/src/utils/supabase';
import { signIn } from '@/src/utils/supabase';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  getUser: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
  createUser: publicProcedure.input(z.object({ name: z.string(), Fname: z.string(), Lname: z.string(), email: z.string(), password: z.string(), confirmPassword: z.string() })).mutation(async (opts) => {
    const input = opts.input;

    for (const field of Object.values(input)) {
      if (!field) {
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: "All fields are required",
        });
      }
    }

    if (input.password !== input.confirmPassword) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: "Passwords do not match, please reconfirm your password",
      });
    }

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
    });

    if (user) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: "Username and/or email is already taken",
      });
    }

    const result = await prisma.user.create({
      data: {
        name: input.name,
        Fname: input.Fname,
        Lname: input.Lname,
        email: input.email,
        role: 'user',
        dollars: 0,
      }
    });

    if (!result) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Encountered an error while trying to save new user",
      });
    }

    // console.log(result);

    const { data, error } = await signUp(input.email, input.password);
    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    } else {
      console.log('Sign-up successful:', data);
    }

    return data;
  }),
});
