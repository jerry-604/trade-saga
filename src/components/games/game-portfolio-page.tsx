import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn } from "@/src/utils/game-helpers";
import Modal from "./trading-modal";
import GameStockNews from "./trading-stock-news-widget";
import GameStockInfo from "./games-stock-info";
import GameSmallChart from "./small-chart-widget";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import { trpc } from "../../utils/trpc";
import {
    getPriceForStock,
} from "@/src/utils/game-helpers";

type Props = {
    user: any
    gameData: any
    stockData: any,
}

export default function GamePortfolio({
    user,
    gameData,
    stockData,
}: Props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [symbol, setSymbol] = useState("AAPL");
    const [max, setMax] = useState(0);

    const utils = trpc.useContext();

    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [numShares, setNumShares] = useState(0);

    const handleChange = (e: any) => {
        setNumShares(Number(e.target.value));
    };

    const [stockPrice, setStockPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const price = await getPriceForStock(symbol);
            setStockPrice(price);
        };
        fetchData();
    }, [symbol, isModalOpen]);

    const { mutate, isLoading } = trpc.gameRouter.executeSell.useMutation({
        onSuccess: () => {
            utils.gameRouter.fetchGameWithId.invalidate();
            utils.gameRouter.getStockDataForPlayer.invalidate();
            closeModal();
            setNumShares(0);
        },
    });

    const createSell = (
        gamePlayerId: number,
        symbol: string,
        price: number,
        quantity: number,
        max: number
    ) => {
        mutate({
            gamePlayerId,
            symbol,
            price,
            quantity,
            max
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
                                <p className="font-bold text-gray-300 text-[16px] pt-3">
                                    Shares to Sell of {symbol}: {numShares}
                                </p>
                                <p className="font-bold text-gray-300 text-[16px] pt-3">
                                    Estimated Return: ${Math.round(numShares * stockPrice * 100) / 100}
                                </p>
                                <p className="font-bold text-gray-300 text-[16px] pt-3 pb-5">
                                    Cash Post Trade: ${Math.round((gameData.playerData.find(
                                        (item: any) => item.userId === user.id
                                    ).cashBalance + numShares * stockPrice) * 100) / 100}
                                </p>
                                <input
                                    type="range"
                                    className="flex flex-col w-[345px] appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#3c3c3c] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-300 border-[1.75px] border-[#6f6f6f] rounded-full"
                                    min={0}
                                    max={max}
                                    value={numShares}
                                    onChange={handleChange}
                                />
                                <button
                                    className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm mt-[70px]"
                                    onClick={() =>
                                        numShares > 0 ?
                                            createSell(
                                                gameData.playerData.find(
                                                    (item: any) => item.userId === user.id
                                                ).id,
                                                symbol,
                                                stockPrice,
                                                numShares,
                                                max
                                            )
                                            :
                                            null
                                    }
                                >
                                    Execute Sell
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
            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 p-6 justify-between">
                {
                    mergeStocks((gameData.playerData.find(
                        (item: any) => item.userId === user.id
                    ).stocksHeld ?? [])).map((stock: any) => {
                        return (
                            <div key={stock.symbol} className="flex flex-grow flex-row items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4">
                                <div className="flex flex-grow flex-col pl-4 h-full pt-2" >
                                    <div className="flex flex-grow flex-col pl-4 h-full pt-2">
                                        <p className="text-[18px] font-bold mb-1 text-[#FBFBFB]" >{stock.symbol}</p>
                                        <p className="text-[18px] font-semibold mb-1 text-[#ABABAB]" >{stock.numShares} Shares Held</p>
                                    </div>
                                    <button
                                        className="h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold mr-[20px] min-w-[130px]"
                                        onClick={() => {
                                            setMax(stock.numShares);
                                            setSymbol(stock.symbol);
                                            openModal();
                                        }}
                                    >
                                        Sell {stock.symbol}
                                    </button>
                                </div>
                                <GameSmallChart user={user} gameData={gameData} symbol={stock.symbol} />
                            </div>

                        );
                    })
                }
            </div>
        </div>
    );
}

export function mergeStocks(stocks: any[]): any[] {
    const merged: Record<string, any> = {};

    stocks.forEach(stock => {
        if (merged[stock.symbol]) {
            merged[stock.symbol].numShares += stock.numShares;
        } else {
            merged[stock.symbol] = { ...stock };
        }
    });

    return Object.values(merged);
}


{/* <div className="flex row">
{stock.symbol}
{stock.numShares}
{stock.id}
</div> */}