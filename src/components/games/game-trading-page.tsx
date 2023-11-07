import {
  getNameForPlayer,
  computeWorthForPlayer,
  computeTotalReturn,
  getPostFormattedDate,
  getPriceForStock,
} from "@/src/utils/game-helpers";
import GameTradingHeader from "./game-trading-header";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import TradingWidget from "./trading-widget";
import GameUserInfoTrading from "./game-trading-user-info";
import Modal from './trading-modal'
import GameStockNews from "./trading-stock-news-widget";
import GameStockInfo from "./games-stock-info";

type Props = {
  user: any;
  gameData: any;
};

export default function GameTradingPage({ user, gameData }: Props) {
  const [symbol, setSymbol] = useState("AAPL");

  const [open, setOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };


  const [stockPrice, setStockPrice] = useState(0);

  useEffect( () => { 
    const fetchData = async () => {
      const price = await getPriceForStock(symbol)
      setStockPrice(price);
    }
    fetchData();
}, [symbol, isModalOpen]);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col h-[700px]">
        <div className="flex flex-row h-[700px]">
          <div className="px-[100px]">
          <h2 className="text-2xl font-bold">Stock Title</h2>
          <p>Trading Content</p>
          <p>{stockPrice}</p>
          </div>
          <div className="flex flex-col h-[650px]">
          <GameStockNews user={user} gameData={gameData} symbol={symbol}/>
          <GameStockInfo user={user} gameData={gameData} symbol={symbol}/>
          </div>
          </div>
          <button
            className="bg-black text-white font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-2 mt-2"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>

      <GameTradingHeader
        user={user}
        gameData={gameData}
        onSymbolChange={handleSymbolChange}
      />
      <div className="flex justify-between p-8 h-[530px] space-x-[30px]">
        <TradingWidget symbol={symbol} />
        <div className="flex flex-col space-y-[15px]">
          <GameUserInfoTrading user={user} gameData={gameData} />
          <button
            className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
            onClick={() => openModal()}
          >
            Trade
          </button>
        </div>
      </div>
    </div>
  );
}