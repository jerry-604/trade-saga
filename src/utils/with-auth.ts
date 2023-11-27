import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
    GetServerSideProps
  } from 'next';
  import prisma from './prisma';
  import { getSession } from './supabase'
  import { trpc } from "./trpc";
  import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
  import { CookieOptions } from "@supabase/auth-helpers-shared"
  import { getUserProps } from './user-fetcher';

  export default function withAuth<
  ResponseType extends Record<string, any> = any,
>(
  props: {
    authRequired?: boolean;
    redirectTo?: string;
    getServerSideProps?: GetServerSideProps<ResponseType>;
    cookieOptions?: CookieOptions;
  } = {},
) {
  return async (context: GetServerSidePropsContext) => {
    const {
      req: {
        headers: { host },
      },
    } = context;
      const { supabase, user } = await getUserProps(
        context,
      );

      if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  
      return {
        props: {
        },
      }
  };
}

//To use:
/*
Add funciton to page as follows:

export const getServerSideProps = withAuth({
  redirectTo: "/login"
})

*/