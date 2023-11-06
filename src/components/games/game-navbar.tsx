import { getFormattedDate } from "@/src/utils/game-helpers";

type Props = {
    isSticky: boolean
}

export default function GameNavBar({
    isSticky,
}: Props) {
    return (
        <div
        id="navbar"
        className={`sticky top-0 flex space-x-[30px] mb-4 bg-white p-5 pl-[30px] ${
          isSticky ? "border-b-[2px] border-[#CDCDCD]" : null
        }`}
      >
        <ActionButton
          onClick={() => console.log()}
          action={"Activity"}
          selected={true}
        />
        <ActionButton
          onClick={() => console.log()}
          action={"Leaderboard"}
          selected={false}
        />
        <ActionButton
          onClick={() => console.log()}
          action={"Performance"}
          selected={false}
        />
        <ActionButton
          onClick={() => console.log()}
          action={"Portfolio"}
          selected={false}
        />
        <TradeButton onClick={() => console.log()} />
      </div>
    );
}

function ActionButton({ onClick, action, selected }) {
    return (
      <button
        onClick={onClick}
        className={
          selected
            ? "w-[140px] h-[34px] bg-[#242424] text-white rounded-[14px] focus:outline-none hover:bg-gray-800 transition duration-200 text-align-center"
            : "w-[140px] h-[34px] bg-[#EEEEEE] text-[#242424] rounded-[14px] focus:outline-none hover:bg-gray-100 transition duration-200 text-align-center border-[#ABABAB] border-[1px]"
        }
      >
        {action}
      </button>
    );
  }
  
  function TradeButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="font-bold w-[140px] h-[34px] bg-indigo-600 text-white rounded-[14px] focus:outline-none hover:bg-indigo-500 transition duration-200 text-align-center absolute right-[30px]"
      >
        Trade
      </button>
    );
  }