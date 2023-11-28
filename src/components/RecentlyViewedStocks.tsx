import React, { useState } from 'react';
import { Avatar, List, ListItem, Typography, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface Stock {
  stockName: string;
  sharePrice: string;
  movement: string;
  logo: string; // URL or path to the stock logo
}

interface RecentlyViewedStocksProps {
  stocks: Stock[];
  error?: string; // Optional error message
}

// const RecentlyViewedStocks: React.FC<RecentlyViewedStocksProps> = ({ stocks, error, onSymbolChange }) => {
  // Check if there's an error or if stocks array is empty
  const RecentlyViewedStocks: React.FC<RecentlyViewedStocksProps> = ({ stocks, error, onSymbolChange, removeFromWatchlist, addToWatchList }) => {
    const [selectedStock, setSelectedStock] = useState<string | null>(null);
  
    const handleListItemClick = (stockName: string) => {
      // setSelectedStock(stockName);
      onSymbolChange(stockName.slice(1));
    };
  const unavailable= stocks.length === 0 || Array.isArray(stocks) === false;
  if (unavailable) {
    // console.log(stocks.length);
    return (
      <div className="bg-white p-8 shadow-lg rounded-xl max-w-sm">
        <Typography variant="h6" gutterBottom align="center" className='font-bold'>
          Your Watchlist
        </Typography>
        <Divider className="mb-4"/>
        <Typography align="center" className='text-lg font-medium'>
          {error || "Your watchlist is empty"}
        </Typography>
        <Typography align="center"  className='font-thin text-gray-600 text-[11px]'>
          Assets you add to your watchlist will appear here.
        </Typography>

      </div>
    );
  }

  // Normal rendering if there are stocks and no error
  return (
    <div className="bg-white p-8 pt-0 shadow-lg rounded-xl max-w-sm overflow-auto" style={{ maxHeight: '400px', minHeight: '400px' }}>
     <div className="sticky top-0 bg-white z-40 pt-7">

      <Typography variant="h6" gutterBottom align="center" className="font-bold">
        Your Watchlist
      </Typography>
      <Divider className="mb-4"/>
      </div>
      <List>
        {stocks.map((stock, idx) => (
          <React.Fragment key={idx}>
            <ListItem 
            button
              onClick={() => handleListItemClick(stock.stockName)}
              className={`w-full flex justify-between items-center py-2 ${selectedStock === stock.stockName ? 'bg-gray-200' : ''}`}
            >
              
              <div className="flex items-center">
                <Avatar src={stock.logo} className="p-1" />
                <Typography variant="body1" className="ml-2 font-bold">
                  {stock.stockName}
                </Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {stock.sharePrice}
                </Typography>
                <Typography 
                  variant="body2" 
                  className={stock.movement.startsWith('-') ? 'text-red-500' : 'text-green-500'}
                >
                  {stock.movement.startsWith('-') ? stock.movement : `+${stock.movement}`}
                </Typography>
              </div>
            
              <IconButton               
                onClick={(event) => {
                event.stopPropagation(); // Prevents triggering the ListItem's onClick
                removeFromWatchlist(stock.stockName.slice(1));
                }}  
                aria-label="remove from watchlist"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            {idx < stocks.length - 1 && <Divider className="mb-4" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default RecentlyViewedStocks;
