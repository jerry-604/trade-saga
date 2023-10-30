import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../../components/layout";
import type { ReactElement } from "react";
import { useRouter } from 'next/router';

export default function GamePage() {
    const { query } = useRouter();
    const id = query.id as string;
  return (   <div>
    This is the a other page page. {id}
  </div>);
}

// GamePage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };
