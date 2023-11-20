import { getFormattedDate } from "@/src/utils/game-helpers";

type Props = {
  isSticky: boolean
  isTrading: boolean
  setIsTrading: any
  selectedTab: number,
  setSelectedTab: any

}

export default function GameNavBar({
  isSticky,
  isTrading,
  setIsTrading,
  selectedTab,
  setSelectedTab,
}: Props) {
  return (
    <div
      id="navbar"
      className={`sticky top-0 flex space-x-[30px] mb-4 bg-white p-5 pl-[30px] ${isSticky ? "border-b-[2px] border-[#CDCDCD]" : null
        }`}
    >
      <ActionButton
        onClick={() => setSelectedTab(0)}
        action={"Activity"}
        selected={selectedTab == 0}
      />
      <ActionButton
        onClick={() => setSelectedTab(1)}
        action={"Leaderboard"}
        selected={selectedTab == 1}
      />
      <ActionButton
        onClick={() => setSelectedTab(2)}
        action={"Analysis"}
        selected={selectedTab == 2}
      />
      <ActionButton
        onClick={() => setSelectedTab(3)}
        action={"Portfolio"}
        selected={selectedTab == 3}
      />
      <TradeButton onClick={() => setIsTrading(true)} />
    </div>
  );
}

interface ActionProps {
  onClick: any;
  action: any;
  selected: boolean;
}

function ActionButton({ onClick, action, selected }: ActionProps) {
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

interface TBProps {
  onClick: any;
}

function TradeButton({ onClick }: TBProps) {
  return (
    <button
      onClick={onClick}
      className="font-bold w-[140px] h-[34px] bg-indigo-600 text-white rounded-[14px] focus:outline-none hover:bg-indigo-500 transition duration-200 text-align-center absolute right-[30px]"
    >
      Trade
    </button>
  );
}