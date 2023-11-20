import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';
import { getSession, signUp } from '@/src/utils/supabase';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  getUser: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
  uploadImage: publicProcedure.input(z.object({ imageUrl: z.string() })).mutation(async (opts) => {
    const input = opts.input;

    const imageUrl = input.imageUrl;

    const result = await prisma.user.update({
      where: {
        email: opts.ctx.user.email
      },
      data: {
        imageUrl: imageUrl,
      },
    });

    return result;
  }),
  createUser: publicProcedure.input(z.object({ Fname: z.string(), Lname: z.string(), email: z.string(), password: z.string(), confirmPassword: z.string() })).mutation(async (opts) => {
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
        email: input.email
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
      const deletion = await prisma.user.delete({
        where: {
          email: result.email
        }
      });
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    } else {
      console.log('Sign-up successful:', data);
    }

    return data;
  }),
  validateOAuthUser: publicProcedure.input(z.string()).mutation(async (opts) => {
    console.log(opts);
    if (!opts.input) {
      return;
    }
    const existing = await prisma.user.findUnique({
      where: {
        email: opts.input
      }
    });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: opts.input,
          Fname: opts.input.split("@")[0],
          Lname: opts.input.split("@")[0],
          role: "user",
          dollars: 0,
        }
      });
    }
    console.log(existing);
    return {};
  }),
  getUserFromContext: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
});
