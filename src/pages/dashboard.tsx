import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";

export default function Dashboard() {
  return (   <div>
    This is the dashboard.
  </div>);
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};