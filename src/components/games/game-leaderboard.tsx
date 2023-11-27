import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, computeNumericalTotalReturn, computeNumericalWorthForPlayer, computeDailyChangeForPlayer, computePercentDailyChangeForPlayer, computeNumericalTotalReturnNoRound } from "@/src/utils/game-helpers";
import { GeneratedStockData } from "@/src/server/routers/game-router";
import { LoadingBoundary } from "../loading-boundary";
import { trpc } from "../../utils/trpc";
import { mergeStocks } from "./game-portfolio-page"

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

    const computePortfolioBeta = (stocksHeld: any[], betaData: any[]) => {
        let beta = 0;
        for (let i = 0; i < stocksHeld.length; i++) {
            beta += betaData.find((item) => item.symbol == stocksHeld[i].symbol).beta;
        }
        return stocksHeld.length == 0 ? 2 : beta / stocksHeld.length;
    }

   const computeRiskPercentage = (stocksHeld: any[], betaData: any[]) => {
       return Math.round((computePortfolioBeta(stocksHeld, betaData)-1)*10000)/100
   }

   const computeRiskToReward = (playerData: any[], stocksHeld: any[], betaData: any[], stockData: any[]) => {
       console.log(computeNumericalTotalReturn(playerData, stockData), computeRiskPercentage(stocksHeld, betaData));
    return computeRiskPercentage(stocksHeld, betaData) == 100 ? 0 : Math.round((computeNumericalTotalReturnNoRound(playerData, stockData)*100)/computeRiskPercentage(stocksHeld, betaData)*10000)/100
   }

    return (
        <LoadingBoundary query={trpc.gameRouter.getStockDataForGame.useQuery({ shareId: shareId })}>
            {(stockData) => (


                <div className="flex flex-col justify-center items-center space-y-[20px] pt-[20px]">
                    <div className="items-center bg-[#131313] rounded-[14px] h-auto pt-5 pb-4 pr-4 w-[75%] max-w-[800px] pl-[20px]">
                        <p className="text-[20px] font-semibold mb-1 text-[#FBFBFB] pb-[20px]">My Achievements</p>
                        <Achievement title={"Read about a stock."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksViewed > 0} />
                        <Achievement title={"Bought a stock."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksBought > 0} />
                        <Achievement title={"Sold a stock."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksSold > 0} />
                        <Achievement title={"Read about 5 stocks."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksViewed > 4} />
                        <Achievement title={"Portfolio up 1%."} isMet={computeNumericalTotalReturn(gameData.playerData.find((item: any) => item.userId === user.id), stockData) >= 0.01} />
                        <Achievement title={"Portfolio up 5%."} isMet={computeNumericalTotalReturn(gameData.playerData.find((item: any) => item.userId === user.id), stockData) >= 0.05} />
                        <Achievement title={"Bought 5 stocks."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksBought > 4} />
                        <Achievement title={"Sold 5 stocks."} isMet={gameData.playerData.find((item: any) => item.userId === user.id).stocksSold > 4} isLast={true} />
                    </div>
                    <p className="font-semibold text-[20px] text-[#2D2D2D] w-[75%] max-w-[800px]">Today&apos;s Leaderboard</p>
                    {
                        gameData.playerData.sort((a: any, b: any) => {
                            return computeDailyChangeForPlayer(
                                b, stockData
                            ) - computeDailyChangeForPlayer(
                                a, stockData
                            )
                        }).map((player: any, index: number) => {
                            return (<div key={index} className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[75%] max-w-[800px]">
                                <div className="flex flex-row items-center ">
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
                                    <p className={`text-[18px] font-semibold ${computeDailyChangeForPlayer(player, stockData) >= 0 ? "text-green-400" : "text-red-400"} pl-2`} >{computePercentDailyChangeForPlayer(player, stockData)}%</p>
                                    <p className="text-[18px] font-bold text-[#A2A2A2] pl-2" >|</p>
                                    <p className="text-[18px] font-bold text-[#FBFBFB] pl-2" > {computeDailyChangeForPlayer(player, stockData) < 0 ? "-" : null}${Math.abs(computeDailyChangeForPlayer(player, stockData))}</p>
                                </div>
                            </div>);
                        })
                    }
                    <p className="font-semibold text-[20px] text-[#2D2D2D] w-[75%] max-w-[800px]">Overall Leaderboard</p>
                    {
                        gameData.playerData.sort((a: any, b: any) => {
                            return computeNumericalWorthForPlayer(
                                b, stockData
                            ) - computeNumericalWorthForPlayer(
                                a, stockData
                            )
                        }).map((player: any, index: number) => {
                            return (<div key={index} className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[75%] max-w-[800px]">
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
                    <p className="font-semibold text-[20px] text-[#2D2D2D] w-[75%] max-w-[800px]">Risk to Reward Leaderboard</p>
                    <p className="font-regular text-[16px] text-[#7D7D7D] w-[75%] max-w-[800px]">Part of trading is balancing risk with reward. This leaderboard showcases who in your game has been able to get the most return whilst taking on the least amount of risk. The higher the number the better.</p>
                    <LoadingBoundary query={trpc.gameRouter.getBetaDataForGame.useQuery({ shareId: shareId })}>
                        {(betaData) => (
                            gameData.playerData.sort((a: any, b: any) => {
                                return computeRiskToReward(
                                    b, mergeStocks(b.stocksHeld ?? []), mergeStocks(betaData), stockData
                                ) - computeRiskToReward(
                                    a, mergeStocks(a.stocksHeld ?? []), mergeStocks(betaData), stockData
                                )
                            }).map((player: any, index: number) => {
                                return (<div key={index} className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[75%] max-w-[800px]">
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
                                        <p className={`text-[18px] font-semibold text-[#FBFBFB] pl-2`} >{computeRiskToReward(
                                    player, mergeStocks(player.stocksHeld ?? []), mergeStocks(betaData), stockData)}</p>
                                    </div>
                                </div>);
                            })
                        )}
                    </LoadingBoundary>
                    <div className="h-[20px]"></div>
                </div>
            )}
        </LoadingBoundary>
    );
}

type AchievementProps = {
    title: string;
    isMet: boolean;
    isLast?: boolean;
}
const Achievement = ({ title, isMet, isLast = false }: AchievementProps) => {
    return (
        <>
            <div className="flex flex-row items-center mt-2">
                <div className="flex">
                    <div className={`w-[22px] h-[22px] rounded-full border-2 border-gray-500 ${isMet ? "bg-indigo-500" : null}`}></div>
                    {isMet ? <p className="mt-[2.5px] ml-[-16.5px] text-white font-bold text-[12px]">✓</p> : <p className="mt-[2.5px] ml-[-16.5px] text-clear font-bold text-[12px]">✓</p>}
                </div>
                <p className="text-[16px] font-semibold text-[#DBDBDB] pl-[15px] flex flex-grow">{title}</p>
            </div>
            <div className={`flex h-[2px] mt-4 mb-4 mr-[20px] ml-[31.5px] ${!isLast ? "bg-gray-800" : null}`}></div>
        </>
    );
}