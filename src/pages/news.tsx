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
export default function News() {
  return (
    <div>
      <NewsTickerWidget />
      <div className="grid grid-cols-2 w-full">
        <div className="p-6 h-screen min-h-[1000px]">
          <TimelineWidget />
        </div>
        <div className="p-6 h-screen min-h-[1000px]">
          <NewsMarketOverviewWidget />
        </div>
      </div>
    </div>
  );
}

News.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
