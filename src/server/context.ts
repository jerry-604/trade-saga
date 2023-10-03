import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { TRPCError } from '@trpc/server';

interface CreateContextOptions {
  req: NextApiRequest;
  res: NextApiResponse;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
interface CreateInnerContextOptions extends Partial<CreateContextOptions> {
  }
  /**
   * Inner context. Will always be available in your procedures, in contrast to the outer context.
   *
   * Also useful for:
   * - testing, so you don't have to mock Next.js' `req`/`res`
   * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
   *
   * @see https://trpc.io/docs/context#inner-and-outer-context
   */
  export async function createContextInner(opts?: CreateInnerContextOptions) {
    return {
    };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  const { req, res } = opts;
  return await createContextInner({ req, res });
}
