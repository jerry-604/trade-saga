import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma'
import { TRPCError } from '@trpc/server';
import { User } from '@prisma/client';

export const gameRouter = router({
    createGame: publicProcedure.input(z.object({ gameTitle: z.string(), backgroundImage: z.string(), startDate: z.date(), endDate: z.date(), shareId: z.string() })).mutation(async (opts) => {
        const input = opts.input;

        for (const field of Object.values(input)) {
            if (!field) {
                throw new TRPCError({
                    code: 'UNPROCESSABLE_CONTENT',
                    message: "All fields are required",
                });
            }
        }

        const user = await prisma.user.findFirst({});
        const creatorID = user?.id ?? 1;
        const id = user?.id ?? 1;

        const gamePlayerObject = {
            userId: user?.id ?? 1,
            cashBalance: 100000
        }

        const createGameObject = {
            creatorID,
            name: input.gameTitle,
            coverImageId: input.backgroundImage,
            dateStart: input.startDate,
            dateEnd: input.endDate,
            shareId: input.shareId,
            users: {
                connect: [
                    {
                        id: creatorID,
                    },
                ],
            },
            playerData: {
                create: [
                    gamePlayerObject,
                ],
            }
        };

        const create = await prisma.game.create({ data: createGameObject });
        return create;
    }),
});
