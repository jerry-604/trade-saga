import React from 'react';
import { Card, Avatar } from '@mui/material';

interface StockCardProps {
  stockName: string;
  sharePrice: string;
  movement: string;
  logo: string;  // URL or path to the stock logo
  movementData: number[];
}

const StockCard: React.FC<StockCardProps> = ({ stockName, sharePrice, movement, logo, movementData }) => {
  const isNegativeMovement = movement.startsWith("-");

  return (
    <Card className="w-full shadow-lg rounded-lg overflow-hidden p-4">
      <div className="flex justify-between items-center">

        {/* Left Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar src={logo} />
            <span className="text-lg font-bold">{stockName}</span>
          </div>
          <span className="text-base">Share Price</span>
          <span className="text-base">Movement</span>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-5 bg-gray-200 flex items-center justify-center">Graph</div>
          <span className="text-base">{sharePrice}</span> {/* Actual share price */}
          <span className={isNegativeMovement ? 'text-red-500' : 'text-green-500'}>
            {movement}
          </span>
        </div>

      </div>
    </Card>
  );
}

export default StockCard;
