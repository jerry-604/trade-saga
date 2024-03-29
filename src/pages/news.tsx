import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import TimelineWidget from "../components/timeline-widget";
import NewsTickerWidget from "../components/news-ticker-widget"
import NewsHeatmapWidget from "../components/news-heatmap-widget";
import NewsMarketOverviewWidget from "../components/news-marketoverview-widget";
import Header from "../components/Header"
import { useState } from "react";
import withAuth from "../utils/with-auth";

export default function News() {
  const [symbol, setSymbol] = useState('AAPL');

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div>
    <Header onSymbolChange={handleSymbolChange} />
      <NewsTickerWidget />
      <div className="grid grid-cols-2 w-full">
        <div className="p-8 h-screen min-h-[1000px]">
          <TimelineWidget />
        </div>
        <div className="p-8 h-screen min-h-[1000px]">
          <NewsMarketOverviewWidget />
        </div>
      </div>
    </div>
  );
}

News.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = withAuth({
  redirectTo: "/"
})
