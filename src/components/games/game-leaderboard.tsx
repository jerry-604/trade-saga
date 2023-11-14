import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, computeNumericalTotalReturn, computeNumericalWorthForPlayer } from "@/src/utils/game-helpers";
import { GeneratedStockData } from "@/src/server/routers/game-router";
import { LoadingBoundary } from "../loading-boundary";
import { trpc } from "../../utils/trpc";

type Props = {
    user: any
    gameData: any
    shareId: string
}

export default function GameLeaderboard({
    user,
    gameData,
    shareId,
}: Props) {

    return (
        <LoadingBoundary query={trpc.gameRouter.getStockDataForGame.useQuery({ shareId: shareId })}>
            {(stockData) => (


                <div className="flex flex-col justify-center items-center space-y-[20px] pt-[20px]">
                    {
                        gameData.playerData.sort((a: any, b: any) => {
                            return computeNumericalWorthForPlayer(
                                b, stockData
                            ) - computeNumericalWorthForPlayer(
                                a, stockData
                            )
                        }).map((player: any, index: number) => {
                            return (<div className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[75%] max-w-[800px]">
                                <div className="flex flex-row items-center">
                                    <p className={`text-[22px] font-bold mb-1 ${index == 0 ? "text-[#CEB04E]" : index == 1 ? "text-[#C0C0C0]" : index == 2 ? "text-[#91754B]" : "text-[#ABABAB]"} pl-4`} >#{index + 1}</p>
                                    <div className="flex flex-grow flex-row pl-4 h-full items-center">
                                        <img
                                            src={gameData.users.find(
                                                (item: any) => item.id === player.userId
                                            ).imageUrl}
                                            className="w-[30px] h-[30px] rounded-full object-cover"
                                        />
                                        <p className="text-[18px] font-bold text-[#FBFBFB] pl-2" >{getNameForPlayer(gameData.users.find((item: any) => item.id === player.userId))}</p>
                                    </div>
                                    <p className={`text-[18px] font-semibold ${computeNumericalTotalReturn(player, stockData) >= 0 ? "text-green-400" : "text-red-400"} pl-2`} >{computeTotalReturn(player, stockData)}%</p>
                                    <p className="text-[18px] font-bold text-[#A2A2A2] pl-2" >|</p>
                                    <p className="text-[18px] font-bold text-[#FBFBFB] pl-2" >{computeWorthForPlayer(player, stockData)}</p>
                                </div>
                            </div>);
                        })
                    }
                </div>
            )}
        </LoadingBoundary>
    );
}
