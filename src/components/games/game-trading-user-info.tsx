import {
  getNameForPlayer,
  computeWorthForPlayer,
  computeTotalReturn,
  computeStockBalance,
  numberWithCommas,
} from "@/src/utils/game-helpers";


type Props = {
  user: any;
  gameData: any;
  stockData: any;
};

export default function GameUserInfoTrading({ user, gameData, stockData }: Props) {
  return (
    <div className="flex flex-col items-center bg-[#131313] p-4 rounded-[14px] h-[430px] w-[345px]">
      <img
        src={user.imageUrl}
        className="w-[64px] h-[64px] rounded-full mb-4 object-cover"
      />
      <p className="text-[14px] font-semibold mb-1 text-[#FBFBFB]">
        {getNameForPlayer(
          gameData.users.find((item: any) => item.id === user.id)
        )}
      </p>
      <div className="text-center mt-[32px]">
        <p className="text-[22px] text-[#FBFBFB] font-bold mb-1">
          {computeWorthForPlayer(
            gameData.playerData.find((item: any) => item.userId === user.id), stockData
          )}
        </p>
        <p className="text-[#C8C8C8] text-[14px] font-bold">Net Worth</p>
      </div>
      <div className="flex justify-between w-full mt-[32px] pl-[5px] pr-[5px]">
        <div className="text-center">
          <p className="font-bold text-[#FBFBFB] text-[22px]">
            $
            {numberWithCommas(
              Math.round(gameData.playerData.find((item: any) => item.userId === user.id)
                .cashBalance*100)/100)
            }
          </p>
          <p className="text-[#C8C8C8] text-[14px] font-semibold">Available</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#FBFBFB] text-[22px]">
            $
            {numberWithCommas(computeStockBalance(
              gameData.playerData.find((item: any) => item.userId === user.id),
              stockData
            ))}
          </p>
          <p className="text-[#C8C8C8] text-[14px] font-semibold">In Stock</p>
        </div>
      </div>
    </div>
  );
}
