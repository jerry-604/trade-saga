import React from 'react';
import { Avatar, List, ListItem, Typography, Divider } from '@mui/material';

interface Stock {
  stockName: string;
  sharePrice: string;
  movement: string;
  logo: string; // URL or path to the stock logo
}

interface RecentlyViewedStocksProps {
  stocks: Stock[];
}

const RecentlyViewedStocks: React.FC<RecentlyViewedStocksProps> = ({ stocks }) => {
  return (
    <div className="bg-white p-8 shadow-lg rounded-xl">
      <Typography variant="h6" gutterBottom>
        Recently Viewed Stocks
      </Typography>
      <Divider className="mb-4"/>  {/* Horizontal line */}
      <List>
        {stocks.map((stock, idx) => (
          <React.Fragment key={idx}>
            <ListItem className="w-full flex justify-between items-center py-2">
              <div className="flex items-center">
                <Avatar src={stock.logo} />
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
                  {stock.movement}
                </Typography>
              </div>
            </ListItem>
            {idx < stocks.length - 1 && <Divider className="mb-4" />} {/* Horizontal line after every stock, except the last one */}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default RecentlyViewedStocks;
