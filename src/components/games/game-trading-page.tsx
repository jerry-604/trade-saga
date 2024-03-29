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
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { LoadingBoundary } from "../loading-boundary";
import { useSearchParams } from 'next/navigation'

type Props = {
  user: any;
  gameData: any;
  stockData: any;
  setIsTrading: any;
};

export default function GameTradingPage({ user, gameData, stockData, setIsTrading }: Props) {
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

  const computeMaxShares = (cash: number, price: number) => {
    const max = Math.floor(cash / price);
    return max;
  };

  const handleChange = (e: any) => {
    setNumShares(Number(e.target.value));
  };

  const { mutate, isLoading } = trpc.gameRouter.executeTrade.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
      utils.gameRouter.getStockDataForPlayer.invalidate();
      closeModal();
      setNumShares(0);
    },
  });

  const searchParams = useSearchParams();
  const search_symbol = searchParams.get('symbol')

  useEffect(() => {
    if(search_symbol) {
      handleSymbolChange(search_symbol);
    }
  }, [searchParams])

  const createTrade = (
    gamePlayerId: number,
    symbol: string,
    price: number,
    quantity: number,
    gameID: number
  ) => {
    mutate({
      gamePlayerId,
      symbol,
      price,
      quantity,
      gameID
    });
  };

  const addToWatchList = (
    symbol: string
  ) => {
    addWLMutation.mutate({symbol})
  }

  const addWLMutation = trpc.userRouter.addToWatchList.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
      utils.userRouter.getWatchListForUser.invalidate();
    },
  });

  const removeFromWatchList = (
    symbol: string
  ) => {
    removeWLMutation.mutate({symbol})
  }

  const removeWLMutation = trpc.userRouter.removeFromWatchList.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
      utils.userRouter.getWatchListForUser.invalidate();
    },
  });

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
                <p className="font-bold text-gray-300 text-[16px] pt-3">
                  Shares of {symbol}: {numShares}
                </p>
                <p className="font-bold text-gray-300 text-[16px] pt-3">
                  Estimated Total: ${Math.round(numShares * stockPrice * 100) / 100}
                </p>
                <p className="font-bold text-gray-300 text-[16px] pt-3 pb-5">
                  Remaining Cash: ${Math.round((gameData.playerData.find(
                    (item: any) => item.userId === user.id
                  ).cashBalance - numShares * stockPrice) * 100) / 100}
                </p>
                <input
                  type="range"
                  className="flex flex-col w-[345px] appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#3c3c3c] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300 border-[1.75px] border-[#6f6f6f] rounded-full"
                  min={0}
                  max={computeMaxShares(
                    gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    ).cashBalance,
                    stockPrice
                  )}
                  value={numShares}
                  onChange={handleChange}
                />
                <button
                  className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm mt-[70px]"
                  onClick={() =>
                    numShares > 0 ?
                      createTrade(
                        gameData.playerData.find(
                          (item: any) => item.userId === user.id
                        ).id,
                        symbol,
                        stockPrice,
                        numShares,
                        gameData.id
                      )
                      :
                      null
                  }
                >
                  Execute Buy
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
        setIsTrading={setIsTrading}
      />
      <div className="flex justify-between p-8 h-[530px] space-x-[30px]">
        <TradingWidget symbol={symbol} />
        <div className="flex flex-col space-y-[15px]">
          <GameUserInfoTrading user={user} gameData={gameData} stockData={stockData} />
          <div className="flex flex-row w-[345px] space-x-[10px]">
            <button
              className="w-[279px] items-center h-[56px] bg-indigo-600 text-white rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
              onClick={() => openModal()}
            >
              Trade {symbol}
            </button>
            <div className="w-[56px] h-[56px]">
            <LoadingBoundary loadingScreen={<div className="w-[56px] h-[56px] bg-gray-200 border-gray-300 border-[1.5px] text-black p-3 rounded-[14px] items-center justify-content-center"></div>} query={trpc.userRouter.getWatchListForUser.useQuery()}>
              {(watchlist) => (

            <button
              className="w-[56px] h-[56px] bg-gray-200 border-gray-300 border-[1.5px] text-black p-3 rounded-[14px] items-center justify-content-center"
              onClick={() => watchlist.find((e: any) => e.symbol === symbol) ? removeFromWatchList(symbol) : addToWatchList(symbol)}
            >
              {(watchlist ?? []).find((e: any) => e.symbol === symbol) ?  <BsEyeSlash size="20px" className="ml-[4.5px]" /> : <BsEyeFill size="20px" className="ml-[4.5px]" />}
            </button>
               )}
            </LoadingBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
