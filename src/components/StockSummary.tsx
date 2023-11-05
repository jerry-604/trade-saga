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
    <div className="m-5 p-5 bg-gray-100 rounded-lg overflow-x-auto">
      <div className="flex space-x-2">
        {stocks.map((stock, idx) => (
          <div key={idx} className="flex-none" style={{ width: '290px' }}>
            <StockCard {...stock} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockSummary;
