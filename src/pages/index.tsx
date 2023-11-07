import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React, { ReactElement, useState} from 'react';
import { Grid } from '@mui/material';
import Header from '../components/Header';
import StockSummary from '../components/StockSummary';
import sampleStocks from '../utils/sampleStocks';
import RecentlyViewedStocks from '../components/RecentlyViewedStocks';
import TradingViewWidget from '../components/TradingViewWidget';
import Layout from '../components/layout';


export default function HomePage() {
  const [symbol, setSymbol] = useState('AAPL');

const handleSymbolChange = (newSymbol: string) => {
  setSymbol(newSymbol);
};

  return (
    <>
    <Header onSymbolChange={handleSymbolChange} />
    <div className="flex-grow p-5 pt-0">
      <div className="mb-4">
        <h2 className="ml-4 my-5 font-extrabold text-xl">Stock Dashboard</h2>
        <StockSummary stocks={sampleStocks} />
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
