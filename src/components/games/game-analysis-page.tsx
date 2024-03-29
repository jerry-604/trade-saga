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
import { PieChart, PieChartProps } from "react-minimal-pie-chart";
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
                };
                return obj;
            }),
        {
            title: "Cash",
            value: gameData.playerData.find((item: any) => item.userId === user.id)
                .cashBalance,
            color: `#${((Math.random() * 0xffffff) << 0)
                .toString(16)
                .padStart(6, "0")}`,
        },
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
                            <div className="grid grid-rows-4 grid-flow-col gap-2 overflow-scroll">
                                {(chartData).map((item) => (
                                    <div key={item.value} className="flex flex-row justify-center items-center flex-grow shrink-0">
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
                    <div className="min-h-[460px] h-fit w-full bg-[#131313] rounded-[14px] p-8 content-start">
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
                                    <div key={stock.symbol} className="flex flex-grow w-[300px] shrink-0">
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
        return data.length == 0 ? 1 : beta / data.length;
    }

   const computeRiskPercentage = (data: any[]) => {
       return Math.round((computePortfolioBeta(data)-1)*10000)/100
   }

    return (
        <LoadingBoundary query={
            trpc.gameRouter.getBetaDataForPlayer.useQuery({ shareId: gameData.shareId })
        }>
            {(betaData) => (
                <div>
                    <div className="text-white pt-2"> Your portfolio is <b>{Math.abs(computeRiskPercentage(mergeStocks(betaData)))}%</b> {computeRiskPercentage(mergeStocks(betaData)) < 0 ? "less" : "more"} volatile than the overall market.</div>
                    <p className="text-[15px] font-semibold text-[#FBFBFB] pt-4 pb-4">
                            Contribution to risk
                    </p>
                    <div className="overflow-scroll">
                    <div className="flex flex-row h-full items-end space-x-[8px]">
                        {
                            mergeStocks(betaData.sort((a, b) => {
                                return (b.beta - 1) - (a.beta - 1)
                            })).map((data) => (
                                <div key={data.symbol} className={`bg-red-200 w-[50px] text-[#E3E3E3] text-center content-center shrink-0`} style={{
                                    height: `${240 * (Math.abs(data.beta - 1))}px`, backgroundColor: chartData.find(
                                        (item: any) => item.title === data.symbol
                                    )?.color.toLocaleUpperCase(),
                                     marginBottom: data.beta - 1 < 0 ? `-${240 * (Math.abs(data.beta - 1))}px` : "0px",
                                     paddingTop: data.beta - 1 < 0 ? `${240 * (Math.abs(data.beta - 1))}px` : "0px",
                                     borderBottom:  data.beta - 1 < 0 ? undefined : "solid",
                                     borderTop:  data.beta - 1 >= 0 ? undefined : "solid"

                                }}>
                                    {/* {Math.round(data.beta*100)/100} */}
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-row h-full items-end space-x-[8px]">
                        {
                            mergeStocks(betaData.sort((a, b) => {
                                return (b.beta - 1) - (a.beta - 1)
                            })).map((data) => (
                            <p key={data.symbol} className={`pt-[40px] w-[50px] text-[#E3E3E3] text-center content-center font-bold shrink-0`}>{data.symbol}</p>
                            ))
                        }
                    </div>
                    </div>
                </div>
            )}
        </LoadingBoundary>
    )
}