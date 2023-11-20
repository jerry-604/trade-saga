import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn} from "@/src/utils/game-helpers";

type Props = {
    user: any
    gameData: any
    postText: any
    setPostText: any
    createPost: any
}

export default function GameCreatePost({
    user,
    gameData,
    postText,
    setPostText,
    createPost,
}: Props) {
    return (
      <div className="flex flex-col items-center bg-white p-2 rounded-[14px] w-[400px] pt-[5px] h-[200px]">
      <div className="flex space-x-[15px] items-center items-start bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
        <img
          src={user.imageUrl}
          alt="AAPL"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <p className="text-[#1D1D1D] text-[16px] font-semibold">
          {getNameForPlayer(
            gameData.users.find((item: any) => item.id === user.id)
          )}
        </p>
      </div>
      <input
        type="text"
        placeholder="Share an update..."
        className="p-2 w-full rounded-md mb-4"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <div className="flex flex-row w-[400px] justify-end">
        <button
          onClick={createPost}
          className="mr-[20px] w-[82px] h-[30px] bg-indigo-600 text-white rounded-full focus:outline-none hover:bg-indigo-500 transition duration-200 text-align-center font-bold text-[14px]"
        >
          Post
        </button>
      </div>
    </div>
    );
}
