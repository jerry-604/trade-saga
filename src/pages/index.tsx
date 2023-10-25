import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import Header from "../components/Header";
import StockSummary from "../components/StockSummary";
import sampleStocks from "../utils/sampleStocks";
// import React from 'react';




export default function HomePage() {
  return (   <div>
    <Header/>
    <StockSummary  stocks={sampleStocks}/>
  </div>);
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
