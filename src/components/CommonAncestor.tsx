import React, { useState } from 'react';
import Header from './Header';
import TradingViewWidget from './TradingViewWidget';

const CommonAncestorComponent: React.FC = () => {
  const [symbol, setSymbol] = useState('NASDAQ:AAPL');

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <>
      <Header onSymbolChange={handleSymbolChange} />
      <TradingViewWidget symbol={symbol} />
    </>
  );
};

export default CommonAncestorComponent;