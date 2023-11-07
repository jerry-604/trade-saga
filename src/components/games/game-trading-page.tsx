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
import Modal from "./trading-modal";
import GameStockNews from "./trading-stock-news-widget";
import GameStockInfo from "./games-stock-info";
import GameSmallChart from "./small-chart-widget";
import { Slider } from "@mui/material";
import { trpc } from "../../utils/trpc";

type Props = {
  user: any;
  gameData: any;
};

export default function GameTradingPage({ user, gameData }: Props) {

  const utils = trpc.useContext();

  const [symbol, setSymbol] = useState("AAPL");

  const [open, setOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  const [stockPrice, setStockPrice] = useState(0);

  const [numShares, setNumShares] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const price = await getPriceForStock(symbol);
      setStockPrice(price);
    };
    fetchData();
  }, [symbol, isModalOpen]);

  const computeMaxShares = (cash, price) => {
    const max = Math.floor(cash / price);
    return max;
  };

  const handleChange = (event: Event, newValue: number) => {
    setNumShares(newValue as number);
  };

  const { mutate, isLoading } = trpc.gameRouter.executeTrade.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
    },
  });

  const createTrade = (gamePlayerId: number, symbol: string, price: number, quantity: number) => {
    mutate({
      gamePlayerId,
      symbol,
      price,
      quantity,
    });
  };


  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col h-[700px] pt-6">
          <div className="flex flex-row h-[700px]">
            <div className="px-[20px]">
              <GameSmallChart user={user} gameData={gameData} symbol={symbol} />
              <div className="pt-6 pb-2">
                <p className="font-bold text-[20px] text-gray-300">
                  Trading Execution:
                </p>
                <p>
                  Max:{" "}
                  {computeMaxShares(
                    gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    ).cashBalance,
                    stockPrice
                  )}
                </p>
                <Slider
                  aria-label="Shares"
                  color="secondary"
                  // getAriaValueText={"Shares"}
                  valueLabelDisplay="auto"
                  value={numShares}
                  onChange={handleChange}
                  step={1}
                  marks={[{
                    value: 0,
                    label: '0 Shares',
                  },
                  {
                    value: computeMaxShares(
                      gameData.playerData.find(
                        (item: any) => item.userId === user.id
                      ).cashBalance,
                      stockPrice
                    ),
                    label: `${computeMaxShares(
                      gameData.playerData.find(
                        (item: any) => item.userId === user.id
                      ).cashBalance,
                      stockPrice
                    )} Shares`,
                  }]}
                  min={0}
                  max={computeMaxShares(
                    gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    ).cashBalance,
                    stockPrice
                  )}
                />
                <button
                  className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm mt-[100px]"
                  onClick={() => createTrade(
                    gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    ).id, symbol, stockPrice, numShares
                  )}
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="flex flex-col h-[650px] pr-[20px]">
              <GameStockNews user={user} gameData={gameData} symbol={symbol} />
              {/* <div className="h-[2px] bg-gray-600 w-full"></div> */}
              <GameStockInfo user={user} gameData={gameData} symbol={symbol} />
            </div>
          </div>
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
