import {
  getNameForPlayer,
  computeWorthForPlayer,
  computeTotalReturn,
  getPostFormattedDate,
} from "@/src/utils/game-helpers";
import GameTradingHeader from "./game-trading-header";
import React, { ReactElement, useState, useEffect } from "react";
import TradingWidget from "./trading-widget";
import GameUserInfoTrading from "./game-trading-user-info";
import Modal from './trading-modal'

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
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-2xl font-bold">Stock Title</h2>
          <p>Trading Content</p>
          <button
            className="bg-black text-white font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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