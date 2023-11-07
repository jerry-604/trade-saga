import React from 'react';
import StockCard from './StockCard';

interface Stock {
  stockName: string;
  sharePrice: string;
  movement: string;
  logo: string;
  movementData: number[];
}

interface StockSummaryProps {
  stocks: Stock[];
}

const StockSummary: React.FC<StockSummaryProps> = ({ stocks }) => {
  return (
    <div className=" p-2 bg-gray-100 rounded-lg">
      <p className="  m-1 ml-6 font-bold">Trending stocks</p>
    <div className=" p-5 pt-2 bg-gray-100 rounded-lg overflow-x-auto">
      <div className="flex space-x-5">
        {stocks.map((stock, idx) => (
          <div key={idx} className="flex-none" style={{ width: '290px' }}>
            <StockCard {...stock} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default StockSummary;
