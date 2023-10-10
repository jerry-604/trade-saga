import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";

export default function HomePage() {
  const { data: users } = trpc.userRouter.getUser.useQuery();
  return <div>Welcome to Trade Saga</div>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
