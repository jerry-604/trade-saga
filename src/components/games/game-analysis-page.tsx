import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, computeNumericalTotalReturn, computeNumericalWorthForPlayer } from "@/src/utils/game-helpers";
import { GeneratedStockData } from "@/src/server/routers/game-router";
import { LoadingBoundary } from "../loading-boundary";
import { trpc } from "../../utils/trpc";
import GameUserInfo from "./game-user-info";
import TickerTapeWidget from "./ticker-tape-widget";
import { PieChart } from 'react-minimal-pie-chart';

type Props = {
    user: any
    gameData: any
    stockData: any
}

export default function GameAnalysis({
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
                <GameUserInfo user={user} gameData={gameData} stockData={stockData} />
                <div className="w-[50%] space-y-[20px]">

                    <div className="h-[400px] w-full bg-[#131313] rounded-[14px] p-6 content-start">
                        <p className="text-[20px] font-semibold mb-1 text-[#FBFBFB]">Portolio Makeup</p>
                        <PieChart
                            data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                            style={{ height: '100px', width: "100px" }}
                            paddingAngle={5}
                            lineWidth={15} 
                        />
                    </div>
                    {/* <div className="h-[400px]  w-full bg-black">HELOO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div>
                <div className="h-[400px]  w-full bg-black">HELLO</div> */}

                </div>
            </div>
        </div>
    );
}
