import { TRPCClientError, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { NextPageContext } from 'next';
import superjson from 'superjson';

import type { AppRouter } from '../server/routers';

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Extend `NextPageContext` with meta data that can be picked up by `responseMeta()` when server-side rendering
 */
export interface SSRContext extends NextPageContext {
  /**
   * Set HTTP Status code
   * @example
   * const utils = trpc.useContext();
   * if (utils.ssrContext) {
   *   utils.ssrContext.status = 404;
   * }
   */
  status?: number;
}

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */

export const trpc = createTRPCNext<AppRouter, SSRContext>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          console: {
            // eslint-disable-next-line no-console
            log: console.info,
            // eslint-disable-next-line no-console
            error: console.error,
          },
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' &&
              !process.env.DISABLE_TRPC_LOG) ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          /**
           * Set custom request headers on every request from tRPC
           * @link https://trpc.io/docs/ssr
           */
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering

              // If you're using Node 18, omit the "connection" header
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx.req.headers;
              return {
                ...headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
              };
            }
            return {};
          },
        }),
      ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: { staleTime: 60 },
          mutations: {
            retry: (_, error) => {
              if (
                typeof window === 'undefined' ||
                !(error instanceof TRPCClientError)
              ) {
                return false;
              }


              const { data, message } = error;

              return false;
            },
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
  /**
   * Set headers or status code when doing SSR
   */
  responseMeta(opts) {
    const ctx = opts.ctx as SSRContext;

    if (ctx.status) {
      // If HTTP status set, propagate that
      return {
        status: ctx.status,
      };
    }

    const error = opts.clientErrors[0];
    if (error) {
      // Propagate http first error from API calls
      return {
        status: error.data?.httpStatus ?? 500,
      };
    }

    // for app caching with SSR see https://trpc.io/docs/caching

    return {};
  },
});

export type AppRouterInputTypes = inferRouterInputs<AppRouter>;
export type AppRouterOutputTypes = inferRouterOutputs<AppRouter>;