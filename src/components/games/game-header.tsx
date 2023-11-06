import { getFormattedDate } from "@/src/utils/game-helpers";

type Props = {
    user: any
    gameData: any
}

export default function GameHeader({
    user,
    gameData
}: Props) {
    return (
        <div className="bg-[url('/game-background-1.png')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px] border-b-[2px] border-[#CDCDCD]">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              className="bg-[#F5F7F9] p-2 pl-10 rounded-[8px] focus:outline-none w-[360px] text-medium border-[1px] border-[#E2E2E2]"
              type="text"
              placeholder="Search for a stock..."
            />
            <svg
              className="absolute left-3 top-3 w-5 h-5 text-gray-500"
              fill="none"
              stroke="#949494"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <header className="flex items-center">
            <img
              src="/create-background.png"
              alt="User"
              className="rounded-full w-10 h-10 mr-4"
            />
            <span className="font-semibold">
              {user.Fname} {user.Lname}
            </span>
          </header>
        </div>
        <div className="mb-4 mt-14">
          <h1 className="text-[28px] font-semibold">
            {gameData?.name ?? ""}
          </h1>
          <p className="text-gray-600 text-[20px]">
            Hosted by {gameData?.creator?.name ?? ""} |{" "}
            {getFormattedDate(gameData?.dateStart ?? new Date())} -{" "}
            {getFormattedDate(gameData?.dateEnd ?? new Date())}
          </p>
        </div>
      </div>
    );
}