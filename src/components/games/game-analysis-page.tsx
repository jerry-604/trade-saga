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
import { useState } from "react";
import { mergeStocks } from "./game-portfolio-page"
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
    return (Math.round((value / netWorth) * 100) / 100).toFixed(2);
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
        </div>
      </div>
    </div>
  );
}
