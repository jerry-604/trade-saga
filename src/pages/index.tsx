import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React, { ReactElement, useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import Header from '../components/Header';
import StockSummary from '../components/StockSummary';
import sampleStocks from '../utils/sampleStocks';
import RecentlyViewedStocks from '../components/RecentlyViewedStocks';
import TradingViewWidget from '../components/TradingViewWidget';
import Layout from '../components/layout';
// import getTrendingStocks from "./api/getTrendingStocks";


export default function HomePage() {
  const [symbol, setSymbol] = useState('AAPL');
  const [trendingStocks, setTrendingStocks] = useState([]);
  // console.log(getTrendingStocks());

const handleSymbolChange = (newSymbol: string) => {
  setSymbol(newSymbol);
  
};
useEffect(() => {
  // Fetch the trending stocks when the component mounts
  fetch('/api/trendingStocks')
    .then((res) => res.json())
    .then((data) => {
      setTrendingStocks(data);
    })
    .catch((error) => {
      console.error('Failed to fetch trending stocks:', error);
    });
}, []);


  return (
    <>
    <Header onSymbolChange={handleSymbolChange} />
    <div className="flex-grow p-5 pt-0">
      <div className="mb-4">
        <h2 className="ml-4 my-5 font-extrabold text-xl">Stock Dashboard</h2>
        <StockSummary stocks={trendingStocks} />
      </div>
      <Grid container spacing={5}>
        <Grid item md={8}>
    <TradingViewWidget symbol={symbol} />
        </Grid>
        <Grid item md={4}>
          <RecentlyViewedStocks stocks={sampleStocks} />
        </Grid>
      </Grid>
    </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
