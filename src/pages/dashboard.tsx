import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React, { ReactElement, useState, useEffect} from 'react';
import { Button, Grid, Alert } from '@mui/material';
import Header from '../components/Header';
import StockSummary from '../components/StockSummary';
import sampleStocks from '../utils/sampleStocks';
import RecentlyViewedStocks from '../components/RecentlyViewedStocks';
import TradingViewWidget from '../components/TradingViewWidget';
import Layout from '../components/layout';
import withAuth from "../utils/with-auth";
import TradeModal from "../components/TradeModal";
import Snackbar from '@mui/material/Snackbar';
import { MultiQueryLoadingBoundary } from "../components/multi-query-loading-boundary";


// import getTrendingStocks from "./api/getTrendingStocks";


export default function Dashboard() {
  const [symbol, setSymbol] = useState('AAPL');
  const [trendingStocks, setTrendingStocks] = useState([]);
  const [recentluViewedStocks, setRecentlyViewedStocks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success'); // Can be 'success' or 'error'
  const [openModal, setOpenModal] = useState(false);


  // console.log(trendingStocks);

const handleSymbolChange = (newSymbol: string) => {
  setSymbol(newSymbol);
  // addToWatchList("DUOL");
  // console.log(watchlist);
  
};


const watchlistData = trpc.userRouter.getWatchListForUser.useQuery().data;


const utils = trpc.useContext();
const addToWatchList = (symbol: string) => {
  const symbolExists = watchlistData?.some(item => item.symbol === symbol);

  if (symbolExists) {
    setAlertMessage(`${symbol} is already in your watchlist`);
    setAlertType('error');
    setShowAlert(true);
  } else {
    addWLMutation.mutate({ symbol });
    setAlertMessage(`$${symbol} added to your watchlist`);
    setAlertType('success');
    setShowAlert(true);
  }
};


const addWLMutation = trpc.userRouter.addToWatchList.useMutation({
  onSuccess: () => {
    utils.gameRouter.fetchGameWithId.invalidate();
    utils.userRouter.getWatchListForUser.invalidate();
  },
});

const removeFromWatchList = (
  symbol: string
) => {
  removeWLMutation.mutate({symbol})
  setAlertMessage(`$${symbol} removed from your watchlist`);
  setAlertType('success');
  setShowAlert(true);
}

const removeWLMutation = trpc.userRouter.removeFromWatchList.useMutation({
  onSuccess: () => {
    utils.gameRouter.fetchGameWithId.invalidate();
    utils.userRouter.getWatchListForUser.invalidate();
  },
});

const handleTrade = (gameData) => {
  if (gameData && gameData.length > 0) {
    setOpenModal(true);
  } else {
    setAlertType('error');
    setAlertMessage('You need to create or join a game to place a trade');
    setShowAlert(true);
  }
};

useEffect(() => {
  let timer;
  if (showAlert) {
    timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Alert disappears after 3 seconds
  }

  return () => clearTimeout(timer); // Cleanup the timer
}, [showAlert]);


useEffect(() => {
  // Fetch the trending stocks when the component mounts
  console.log(watchlistData );
  const watchlist = watchlistData || [];
  const watchlistSymbols = watchlist.length==0? []: watchlist.map((item: any) => item.symbol);
  fetch('/api/trendingStocks')
    .then((res) => res.json())
    .then((data) => {
      setTrendingStocks(data);
    })
    .catch((error) => {
      console.error('Failed to fetch trending stocks:', error);
    });
    fetch('/api/recentlyViewedStocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({watchlistSymbols }) 
    })
    .then((res) => res.json())
    .then((data) => {
      setRecentlyViewedStocks(data);
    })
    .catch((error) => {
      console.log('Failed to fetch recently viewed stocks:', error);
    });
}, [watchlistData]);


  return (
    <MultiQueryLoadingBoundary queries={trpc.useQueries((t) => [
      t.userRouter.getGamesForUser(),
      t.userRouter.getUserFromContext(),
    ])}>
      {([gameData, user]) => (
    <>
    <Header onSymbolChange={handleSymbolChange} />
    {showAlert && (
      <Alert
        severity={alertType}
        onClose={() => setShowAlert(false)}
        sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}
      >
        {alertMessage}
      </Alert>
    )}
    <div className="flex-grow p-5 pt-0">
      <div className="mb-4">
        <h2 className="ml-4 my-5 font-extrabold text-xl">Stock Dashboard</h2>
        <StockSummary onSymbolChange={handleSymbolChange} stocks={trendingStocks} />
      </div>

  <Grid container spacing={5}>
    <Grid item md={8} className="min-h-[500px]">
      <TradingViewWidget symbol={symbol} />
      <Button color="primary" variant="contained" onClick={()=>handleTrade(gameData)} sx={{ borderRadius: 20 }} className="m-3 mr-[290px] bg-purple-800" >
        {`Trade $${symbol}`}
      </Button>

    <TradeModal
      open={openModal}
      handleClose={() => setOpenModal(false)}
      games={gameData}
      symbol={symbol}
    />
      <Button color="primary" variant="contained" sx={{ borderRadius: 20 }} className="m-3 bg-blue-500" onClick={() => addToWatchList(symbol)}>
        {`Add $${symbol} to Watchlist`}
      </Button>    
    </Grid>
    <Grid item md={4} className="min-h-[500px]">
      <RecentlyViewedStocks onSymbolChange={handleSymbolChange} stocks={recentluViewedStocks} removeFromWatchlist={removeFromWatchList} />
    </Grid>
  </Grid>

    </div>
    </>
          )}
          </MultiQueryLoadingBoundary>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = withAuth({
  redirectTo: "/"
})
