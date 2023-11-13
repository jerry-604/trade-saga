import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma'
import { TRPCError } from '@trpc/server';
import { User } from '@prisma/client';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const gameRouter = router({
    createGame: publicProcedure.input(z.object({ gameTitle: z.string(), backgroundImage: z.string(), startDate: z.date(), endDate: z.date(), shareId: z.string() })).mutation(async ({ ctx, input }) => {

        for (const field of Object.values(input)) {
            if (!field) {
                throw new TRPCError({
                    code: 'UNPROCESSABLE_CONTENT',
                    message: "All fields are required",
                });
            }
        }

        const user = ctx.user
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
    fetchGameWithId: publicProcedure.input(z.object({ shareId: z.string() })).query(async ({ ctx, input }) => {
        const game = await prisma.game.findFirst({
            where: {
                shareId: input.shareId,
            },
            include: {
                playerData: {
                    include: {
                        stocksHeld: true,
                    }
                },
                users: true,
                creator: true,
                posts: {
                    include: {
                        creator: true,
                    }
                },
            }
        })
        console.log(game);
        return game;
    }),
    createPost: publicProcedure.input(z.object({ gameID: z.number(), content: z.string() })).mutation(async ({ ctx, input }) => {
        const user = ctx.user;
        const userId = user.id;
        const post = await prisma.gamePost.create({
            data: {
                userId,
                gameID: input.gameID,
                content: input.content,
            }
        });
        return post;
    }),
    executeTrade: publicProcedure.input(z.object({ gamePlayerId: z.number(), symbol: z.string(), price: z.number(), quantity: z.number() })).mutation(async ({ ctx, input }) => {
        const user = ctx.user;
        const userId = user.id;
        const trade = await prisma.stockHolding.create({
            data: {
                gamePlayerId: input.gamePlayerId,
                numShares: input.quantity,
                symbol: input.symbol,
            }
        })
        const total = input.price * input.quantity;
        const updatePlayer = await prisma.gamePlayer.update({
            where: {
                id: input.gamePlayerId,
            },
            data: {
                cashBalance: {
                    increment: -total,
                },
            },
        })
        return trade;
    }),
    executeSell: publicProcedure.input(z.object({ gamePlayerId: z.number(), symbol: z.string(), price: z.number(), quantity: z.number(), max: z.number() })).mutation(async ({ ctx, input }) => {
        const user = ctx.user;
        const userId = user.id;
        const total = input.price * input.quantity;
        const txn = await prisma.$transaction(
            [
                prisma.gamePlayer.update({
                    where: {
                        id: input.gamePlayerId,
                    },
                    data: {
                        cashBalance: {
                            increment: total,
                        },
                    },
                }),
                prisma.stockHolding.deleteMany({
                    where: {
                        gamePlayerId: input.gamePlayerId,
                        symbol: input.symbol,
                    },
                }),
            ],
        );
        if (input.quantity < input.max) {
            const newNumShares = input.max - input.quantity;
            await prisma.stockHolding.create({
                data: {
                    gamePlayerId: input.gamePlayerId,
                    numShares: newNumShares,
                    symbol: input.symbol,
                }
            })
        }
        return txn;
    }),
    getStockDataForPlayer: publicProcedure.input(z.object({ shareId: z.string() })).query(async ({ ctx, input }) => {
        const user = ctx.user
        const gamePlayer = await prisma.gamePlayer.findFirst({
            where: {
                userId: user.id,
                game: {
                    shareId: input.shareId,
                },
            },
            include: {
                stocksHeld: true,
            }
        }
        )
        const stockData = await Promise.all(
            (gamePlayer?.stocksHeld ?? []).map(async p => {
                const response = await fetch(`https://www.wealthbase.com/investments/${p.symbol}/details`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                const genData: GeneratedStockData = { symbol: p.symbol, price: data.current_price }
                return genData;
            })
        );
        return stockData;
    }),
    isGameMember: publicProcedure.input(z.object({ shareId: z.string() })).query(async ({ ctx, input }) => {
        const user = ctx.user;
        const exists = !!await prisma.gamePlayer.findFirst({
            where: {
                userId: user.id,
                game: {
                    shareId: input.shareId,
                },
            },
            include: {
                stocksHeld: true,
            }
        }
        );
        return exists;
    }),
    joinGame: publicProcedure.input(z.object({ shareId: z.string() })).mutation(async ({ ctx, input }) => {
        const user = ctx.user;

        const gamePlayerObject = {
            userId: user?.id ?? 1,
            cashBalance: 100000
        }

        const game = await prisma.game.findFirst({
            where: {
                shareId: input.shareId,
            },
        })

        if (game) {

            const update = await prisma.game.update({
                where: {
                    id: game?.id,
                    shareId: input.shareId,
                },
                data: {
                    users: {
                        connect: [
                            {
                                id: user.id,
                            },
                        ],
                    },
                    playerData: {
                        create: [
                            gamePlayerObject,
                        ],
                    }
                }
            });

            return update;
        }
        return null;
    }),
});

export type GeneratedStockData = {
    symbol: string;
    price: number;
};