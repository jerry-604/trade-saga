import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn} from "@/src/utils/game-helpers";
import GameSmallChart from "./small-chart-widget";

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
    return (
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 p-6 justify-between">
        {
               mergeStocks((gameData.playerData.find(
                (item: any) => item.userId === user.id
              ).stocksHeld ?? [])).map((stock: any) => {
                return(
                    <div className="flex flex-grow flex-row items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4">
                        <div className="flex flex-grow flex-col pl-4 h-full pt-2" >
                        <div className="flex flex-grow flex-col pl-4 h-full pt-2">
                        <p className="text-[18px] font-bold mb-1 text-[#FBFBFB]" >{stock.symbol}</p>
                        <p className="text-[18px] font-semibold mb-1 text-[#ABABAB]" >{stock.numShares} Shares Held</p>
                        </div>
                        <button
                  className="h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm mr-[20px]"
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
    );
}

function mergeStocks(stocks: any[]): any[] {
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