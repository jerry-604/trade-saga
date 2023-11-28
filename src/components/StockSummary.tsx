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
  error?: string; // Optional error message
  onSymbolChange: any;
}

const StockSummary: React.FC<StockSummaryProps> = ({ stocks, onSymbolChange, error }) => {
  // Check if there's an error or if stocks array is empty
  const unavailable= stocks.length === 0 || Array.isArray(stocks) === false;
  if (unavailable) {
    return (
      <div className="p-2 bg-gray-300 rounded-lg">
        <p className="m-1 ml-6 font-bold">Trending stocks</p>
        <div className="p-5 pt-2 bg-gray-100 rounded-lg">
          <div className="text-center">
            <p>{error || "No trending stocks available."}</p>
          </div>
        </div>
      </div>
    );
  }
  else{

    return (
      <div className="p-2 bg-gray-300 rounded-lg">
        <p className="m-1 ml-6 font-bold">Trending stocks</p>
        <div className="p-2 bg-gray-200 rounded-lg overflow-x-auto">
          <div className="flex space-x-5">
            {!unavailable && stocks.map((stock, idx) => (
              <div key={idx} className="flex-none" style={{ width: '290px' }}>
                <StockCard onSymbolChange={onSymbolChange} {...stock} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Normal rendering if there are stocks and no error
}

export default StockSummary;
