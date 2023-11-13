import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, getPostFormattedDate} from "@/src/utils/game-helpers";

type Props = {
    user: any
    gameData: any
}

export default function GameFeed({
    user,
    gameData
}: Props) {
    return (
        gameData.posts.sort((a: any, b: any) => {return b.createdAt - a.createdAt}).map((post: any) => (
            <div key={post.id} className="flex flex-col items-start bg-white p-2 rounded-[14px] w-[400px] pt-[5px] h-fit min-h-[200px] animate-fade">
              <div className="flex space-x-[15px] items-center items-start bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
                <img
                  src="/create-background.png"
                  alt="AAPL"
                  className="w-[40px] h-[40px] rounded-full"
                />
                <p className="text-[#1D1D1D] text-[16px] font-semibold">
                  {getNameForPlayer(post.creator)}
                </p>
                <p className="text-[#666666] text-[14px] font-regular flex-grow text-right">
                  {getPostFormattedDate(post.createdAt)}
                </p>
              </div>
              <p className="pl-4 font-medium text-[#666666] text-[16px]">
                {post.content}
              </p>
            </div>
          ))
    );
}