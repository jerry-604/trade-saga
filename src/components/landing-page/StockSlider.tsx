// components/StockSlider.tsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import StockCard from './StockCard'; // Import your StockCard component
import sampleStocks from '../../utils/sampleStocks'; // Import your sample stocks
import { Button } from '@mui/material';



const StockSlider: React.FC = () => {
  const titleText = "The Global Markets at Your Fingertips";
  const subtitleText = "Go beyond boundaries. Invest in top-performing stocks and ETFs from around the globe";


  const getRandomGraphImage = () => {
    const randomNumber = Math.floor(Math.random() * 5) + 1; 
    return `/movement${randomNumber}.png`; 
  };

  return (
    <div className={`my-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl min-h-[300px]`}>
        <h2 className="text-3xl font-bold text-center py-10">{titleText}</h2>
        <h2 className="text-xl font-medium text-center py-1">{subtitleText}</h2>
      </div>
      <div className={`-mt-20 pb-14`}>
        <Marquee direction="left" speed={50} gradient={false} className='my-4'>
          {sampleStocks.slice(0,14).map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.stockName}
              image={stock.logo}
              graph={getRandomGraphImage()} 
            />
          ))}
        </Marquee>
        <Marquee direction="right" speed={50} gradient={false}>
          {sampleStocks.slice(15,undefined).map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.stockName}
              image={stock.logo}
              graph={getRandomGraphImage()} // Assign a random graph image to each stock
            />
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center mt-6">
        <Button  style={{textTransform: 'none'}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
          Trade Now
        </Button>
      </div>
    </div>
  );
};

export default StockSlider;
