import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, computeNumericalTotalReturn, computeNumericalWorthForPlayer } from "@/src/utils/game-helpers";
import { GeneratedStockData } from "@/src/server/routers/game-router";
import { LoadingBoundary } from "../loading-boundary";
import { trpc } from "../../utils/trpc";
import GameUserInfo from "./game-user-info";
import TickerTapeWidget from "./ticker-tape-widget";

type Props = {
    user: any
    gameData: any
    stockData: any
}

export default function GamePerformance({
    user,
    gameData,
    stockData,
}: Props) {

    return (

        <div>
            <TickerTapeWidget symbols={gameData.playerData.find(
                (item: any) => item.userId === user.id
            ).stocksHeld.map((stock: any) => {
                return stock.symbol;
            })} />
            <div className="flex justify-between p-8">
                <div className="sticky top-[400px]">
                <GameUserInfo user={user} gameData={gameData} stockData={stockData} />
                </div>
                <div className="w-[50%] space-y-[20px]">

                <div className="h-[400px] w-full bg-black">HELLO</div>
                <div className="h-[400px]  w-full bg-black">HELOO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div>

                </div>
            </div>
        </div>
    );
}
