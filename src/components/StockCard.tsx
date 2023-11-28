import React from 'react';
import { Card, Avatar,CardActionArea } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import Graph from './Graph';

interface StockCardProps {
  stockName: string;
  sharePrice: string;
  movement: string;
  logo: string;  // URL or path to the stock logo
  movementData: number[];
  onSymbolChange: any;
}

const StockCard: React.FC<StockCardProps> = ({ stockName, sharePrice, movement, logo, movementData, onSymbolChange }) => {
  const isNegativeMovement = movement.startsWith("-");


  return (
    
    <Card 

    className="w-full shadow-lg rounded-lg overflow-hidden p-4"
    >
      <CardActionArea    onClick={() => 
      {onSymbolChange(stockName.slice(1))}}>

      <div className="flex justify-between items-center">

        {/* Left Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 z-auto">
            <Avatar className="p-1" src={logo} alt={stockName}>{stockName[1]}</Avatar>
            <span className="text-lg font-bold">{stockName}</span>
          </div>
          <span className="text-base">Share Price</span>
          <span className="text-base">Movement</span>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-7 bg-gray-200 flex items-center justify-center p-5"><Graph data={movementData.slice(0,1400)} /></div> 
          <span className="text-base">{sharePrice}</span> {/* Actual share price */}
          <span className={isNegativeMovement ? 'text-red-500' : 'text-green-500'}>
          {isNegativeMovement ? movement : `+${movement}`}
          </span>
        </div>

      </div>
      </CardActionArea>
    </Card>
  );
}

export default StockCard;
