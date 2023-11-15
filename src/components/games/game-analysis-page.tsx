import {
    getNameForPlayer,
    computeWorthForPlayer,
    computeTotalReturn,
    computeNumericalTotalReturn,
    computeNumericalWorthForPlayer,
} from "@/src/utils/game-helpers";
import { GeneratedStockData } from "@/src/server/routers/game-router";
import { LoadingBoundary } from "../loading-boundary";
import { trpc } from "../../utils/trpc";
import GameUserInfo from "./game-user-info";
import TickerTapeWidget from "./ticker-tape-widget";
import { PieChart, Data, PieChartProps } from "react-minimal-pie-chart";
import { useState, useEffect } from "react";
import { mergeStocks } from "./game-portfolio-page"
import TechnicalAnalysisWidget from "./technical-analysis-widget";
type Props = {
    user: any;
    gameData: any;
    stockData: any;
};

export default function GameAnalysis({ user, gameData, stockData }: Props) {
    const [chartData, setChartData] = useState<any[]>([
        ...mergeStocks(gameData.playerData
            .find((item: any) => item.userId === user.id)
            .stocksHeld).map((stock: any) => {
                const obj = {
                    title: stock.symbol,
                    value:
                        stock.numShares *
                        (stockData.find((item: any) => item.symbol == stock.symbol)
                            ?.price ?? 1),
                    color: `#${((Math.random() * 0xffffff) << 0)
                        .toString(16)
                        .padStart(6, "0")}`,
                } as Data;
                return obj;
            }),
        {
            title: "Cash",
            value: gameData.playerData.find((item: any) => item.userId === user.id)
                .cashBalance,
            color: `#${((Math.random() * 0xffffff) << 0)
                .toString(16)
                .padStart(6, "0")}`,
        } as Data,
    ]);

    const [netWorth, setNetWorth] = useState(
        computeNumericalWorthForPlayer(
            gameData.playerData.find((item: any) => item.userId === user.id),
            stockData
        )
    );

    const computePercentage = (value: number) => {
        return (Math.round((value / netWorth) * 10000) / 100).toFixed(1);
    };
    return (
        <div>
            <TickerTapeWidget
                symbols={gameData.playerData
                    .find((item: any) => item.userId === user.id)
                    .stocksHeld.map((stock: any) => {
                        return stock.symbol;
                    })}
            />
            <div className="flex justify-between p-8">
                <GameUserInfo user={user} gameData={gameData} stockData={stockData} />
                <div className="w-[50%] space-y-[20px]">
                    <div className="h-[330px] w-full bg-[#131313] rounded-[14px] p-8 content-start">
                        <p className="text-[20px] font-semibold mb-1 text-[#FBFBFB] pb-[20px]">
                            Portfolio Makeup
                        </p>
                        <div className="flex flex-row space-x-[20px]">
                            <PieChart
                                data={chartData}
                                style={{ height: "200px", width: "200px" }}
                                paddingAngle={5}
                                lineWidth={20}
                            />
                            <div className="grid grid-rows-4 grid-flow-col gap-2">
                                {(chartData as Data[]).map((item) => (
                                    <div className="flex flex-row justify-center items-center flex-grow">
                                        <div
                                            className={`h-[10px] w-[10px]`}
                                            style={{
                                                backgroundColor: item.color.toLocaleUpperCase(),
                                            }}
                                        ></div>
                                        <p className="text-[12px] font-semibold text-[#FBFBFB] pl-[5px] flex flex-grow">
                                            {item.title} {computePercentage(item.value)}%
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="h-[460px] w-full bg-[#131313] rounded-[14px] p-8 content-start">
                        <p className="text-[20px] font-semibold text-[#FBFBFB]">
                            Portfolio Risk
                        </p>
                        <PortfolioRisk user={user} gameData={gameData} stockData={stockData} chartData={chartData} />
                    </div>
                    <div className="h-[460px] w-full bg-[#131313] rounded-[14px] p-8 content-start">
                        <p className="text-[20px] font-semibold text-[#FBFBFB]">
                            Buy/Sell Indicators
                        </p>
                        <div className="flex flex-row space-x-[40px] overflow-scroll">
                            {
                                // <div className="w-[400px]">
                                stockData.map((stock: any) => (
                                    <div className="flex flex-grow w-[300px] shrink-0">
                                        <TechnicalAnalysisWidget symbol={stock.symbol} />
                                    </div>
                                ))
                                // </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type PRProps = {
    user: any;
    gameData: any;
    stockData: any;
    chartData: any;
};

function PortfolioRisk({ user, gameData, stockData, chartData }: PRProps) {

    const computePortfolioBeta = (data: any[]) => {
        let beta = 0;
        for (let i = 0; i < data.length; i++) {
            beta += data[i].beta;
        }
        return beta / data.length;
    }

    return (
        <LoadingBoundary query={
            trpc.gameRouter.getBetaDataForPlayer.useQuery({ shareId: gameData.shareId })
        }>
            {(betaData) => (
                <div>
                    <div className="text-white">{computePortfolioBeta(mergeStocks(betaData))}</div>
                    <div className="flex flex-row h-full items-end">
                        {
                            mergeStocks(betaData.sort((a, b) => {
                                return (b.beta - 1) - (a.beta - 1)
                            })).map((data) => (
                                <div className={`bg-red-200 w-[40px]`} style={{
                                    height: `${240 * (Math.abs(data.beta - 1))}px`, backgroundColor: chartData.find(
                                        (item: any) => item.title === data.symbol
                                    ).color.toLocaleUpperCase(),
                                    transform: data.beta - 1 < 0 ? `translateY(${240 * (Math.abs(data.beta - 1))}px)` : "translateY(0px)"
                                }}>
                                    {data.symbol}
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </LoadingBoundary>
    )
}