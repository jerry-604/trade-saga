import { protectedProcedure, protectedOAuthProcedure, publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';
import { getSession, signUp } from '@/src/utils/supabase';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
  uploadImage: protectedProcedure.input(z.object({ imageUrl: z.string() })).mutation(async (opts) => {
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
  // can't do protectedProcedure here b/c user not exist on ctx yet since not on database
  validateOAuthUser: protectedOAuthProcedure.input(z.null()).mutation(async (opts) => {
    console.log('in validateOAuthUser');

    console.log(await opts.ctx.supabase.auth.getUser(opts.ctx.supabase.realtime.accessToken || undefined));
    // below accesstoken is always defined via middleware but vscode thinks it's not so that's why || undefined and || ""
    const user = await opts.ctx.supabase.auth.getUser(opts.ctx.supabase.realtime.accessToken || undefined);

    const existing = await prisma.user.findUnique({
      where: {
        email: user.data.user?.email || ""
      }
    });
    if (!existing) {
      await prisma.user.create({
        data: {
          email: user.data.user?.email || "",
          Fname: user.data.user?.email?.split("@")[0] || "",
          Lname: user.data.user?.email?.split("@")[0] || "",
          role: "user",
          dollars: 0,
        }
      });
    }
    return {};
  }),
  getUserFromContext: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.user;
    }),
  updateUserName: protectedProcedure.input(z.object({ FnameEdit: z.string(), LnameEdit: z.string() })).mutation(async (opts) => {
    if (!opts.input) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: "Invalid input",
      });
    }

    if (!opts.input.FnameEdit && !opts.input.LnameEdit) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: "Invalid input",
      });
    }

    await prisma.user.update({
      where: {
        email: opts.ctx.user.email
      },
      data: {
        Fname: opts.input.FnameEdit,
        Lname: opts.input.LnameEdit
      }
    });

    return {};
  }),
  getGamesForUser: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    const games = await prisma.game.findMany({
      where: {
        users: {
          some: {
            id: user.id,
          }
        }
      },
      include: {
        posts: {
          include: {
            creator: true,
          },
        },
      }
    });
    return games;
  }),
  addToWatchList: protectedProcedure.input(z.object({ symbol: z.string() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const updateList = await prisma.watchListItem.create({
      data: {
        userId: user.id,
        symbol: input.symbol,
      }
    });
    return updateList;
  }),
  removeFromWatchList: protectedProcedure.input(z.object({ symbol: z.string() })).mutation(async ({ ctx, input }) => {
    const user = ctx.user;
    const item = await prisma.watchListItem.findFirst({
      where: {
        userId: user.id,
        symbol: input.symbol,
      }
    });
    const updateList = await prisma.watchListItem.delete({
      where: {
        id: item?.id,
        userId: user.id,
        symbol: input.symbol,
      }
    });
    return updateList;
  }),
  getWatchListForUser: protectedProcedure.query(async ({ ctx }) => {
    const list = await prisma.watchListItem.findMany({
      where: {
        userId: ctx.user.id
      }
    });
    return list;
  }),
  getNotificationsForUser: protectedProcedure.query(async ({ ctx }) => {
    const notfications = prisma.notification.findMany({
      where: {
        userId: ctx.user.id,
      },
      include: {
        game: true,
        user: true,
      }
    });
    return notfications;
  }),
});
