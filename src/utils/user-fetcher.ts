import { createServerClient, type CookieOptions } from '@supabase/ssr'
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import prisma from './prisma';
import { getSession } from './supabase'
import { trpc } from "./trpc";
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export async function getUserProps(
  supabaseParams:
    | {
        req: NextApiRequest;
        res: NextApiResponse;
      }
    | GetServerSidePropsContext,
) {
    let user = undefined;
 const supabase = createPagesServerClient<any>(supabaseParams);
  const supabaseUser = await supabase.auth.getUser();
  const cookies = supabaseParams.req.cookies;
  // Check if we have a session

  /**
   * This logic is necessary to support non-authed procedures
   */
  if (supabaseUser?.data.user?.email) {

  
    user = await prisma.user.findUnique({
        where: {
          email: supabaseUser.data.user.email,
        }
      })

  console.log(user, "ZK5");
  }

  return {
    supabase,
    user,
  };
}