import { trpc } from "../../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../../components/layout";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MultiQueryLoadingBoundary } from "@/src/components/multi-query-loading-boundary";
import { compareAsc, format } from "date-fns";
import { LoadingBoundary } from "@/src/components/loading-boundary";

export default function GamePage() {
  const { query } = useRouter();
  const id = query.id as string;
  const [postText, setPostText] = useState("");
  const utils = trpc.useContext();
  const getFormattedDate = (input: Date) => {
    return format(input, "MMMM dd");
  };
  //we should acutally use user object in the future, but any is ok for now.
  const getNameForPlayer = (input: any) => {
    return input.Fname + " " + input.Lname;
  };

  function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const computeTotalReturn = (input: any) => {
    const cash = input.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < input.stocksHeld.length; i++) {
      securitiesTotal += input.stocksHeld[i].numShares * 123;
    }
    const percent_return = (securitiesTotal + cash - 100000)/100000
    const rounded = Math.round(percent_return * 100) / 100
    return rounded > 0 ? `+${rounded}` : `${rounded}`
  };

  const computeWorthForPlayer = (input: any) => {
    console.log(input);
    const cash = input.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < input.stocksHeld.length; i++) {
      securitiesTotal += input.stocksHeld[i].numShares * 123;
    }
    return "$" + `${numberWithCommas(securitiesTotal + cash)}`;
  };

  const { mutate, isLoading } = trpc.gameRouter.createPost.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
    },
  });

  const createPost = (gameID: number, content: string) => {
    mutate({
      gameID,
      content,
    });
  };

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    // Assuming you have a ref to your navbar element
    const navbar = document.getElementById("navbar");
    // Get the top position of the navbar
    const topPosition = navbar.getBoundingClientRect().top;

    // Check if the navbar is at the top of the viewport
    setIsSticky(topPosition <= 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MultiQueryLoadingBoundary
      queries={trpc.useQueries((t) => [
        t.gameRouter.fetchGameWithId({ shareId: id }),
        t.userRouter.getUserFromContext(),
      ])}
    >
      {([gameData, user]) => (
        <div className="flex flex-col space-y-0">
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
          <div className="flex justify-between p-8">
            <div className="flex flex-col items-center bg-[#131313] p-4 rounded-[14px] w-[250px] h-[330px] sticky top-[100px]">
              <img
                src="/create-background.png"
                className="w-[64px] h-[64px] rounded-full mb-4"
              />
              <p className="text-[14px] font-semibold mb-1 text-[#FBFBFB]">
                {getNameForPlayer(
                  gameData.users.find((item: any) => item.id === user.id)
                )}
              </p>
              <div className="text-center mt-[32px]">
                <p className="text-[22px] text-[#FBFBFB] font-bold mb-1">
                  {computeWorthForPlayer(
                    gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    )
                  )}
                </p>
                <p className="text-[#C8C8C8] text-[14px] font-bold">
                  Net Worth
                </p>
              </div>
              <div className="flex justify-between w-full mt-[32px] pl-[5px] pr-[5px]">
                <div className="text-center">
                  <p className="font-bold text-[#FBFBFB] text-[22px]">+0%</p>
                  <p className="text-[#C8C8C8] text-[14px] font-semibold">
                    Today's Return
                  </p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-[#FBFBFB] text-[22px]">{computeTotalReturn(    
                      gameData.playerData.find(
                      (item: any) => item.userId === user.id
                    )
                    )}%</p>
                  <p className="text-[#C8C8C8] text-[14px] font-semibold">
                    Total Return
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-[25px]">
              <div className="flex flex-col items-center bg-white p-2 rounded-[14px] w-[400px] pt-[5px] h-[200px]">
                <div className="flex space-x-[15px] items-center items-start bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
                  <img
                    src="/create-background.png"
                    alt="AAPL"
                    className="w-[40px] h-[40px] rounded-full"
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
                    onClick={() => createPost(gameData.id, postText)}
                    className="mr-[20px] w-[82px] h-[30px] bg-indigo-600 text-white rounded-full focus:outline-none hover:bg-indigo-500 transition duration-200 text-align-center font-bold text-[14px]"
                  >
                    Post
                  </button>
                </div>
              </div>
              <div className="font-bold text-[20px] text-[#1D1D1D] mr-[350px]">
                Feed
              </div>
              {gameData.posts.map((post) => (
                <div className="flex flex-col items-start bg-white p-2 rounded-[14px] w-[400px] pt-[5px] h-fit min-h-[200px] animate-fade">
                  <div className="flex space-x-[15px] items-center items-start bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
                    <img
                      src="/create-background.png"
                      alt="AAPL"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <p className="text-[#1D1D1D] text-[16px] font-semibold">
                      {getNameForPlayer(post.creator)}
                    </p>
                  </div>
                  <p className="pl-4 font-medium text-[#666666] text-[16px]">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col bg-white p-4 rounded-[14px] w-[320px] h-fit min-h-[400px] sticky top-[100px]">
              <p className="text-[18px] font-bold mb-4 text-[#1D1D1D] mt-[15px] ml-[15px]">
                Market Movers
              </p>
              <div className="flex justify-between items-center bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
                <img
                  src="/create-background.png"
                  alt="AAPL"
                  className="w-[35px] h-[35px] rounded-full"
                />
                <p className="text-[#1D1D1D] text-[18px] font-bold mr-[90px]">
                  AAPL
                </p>
                <div>
                  <p className="text-[14px] font-bold text-[#161616]">$170</p>
                  <p className="text-[14px] font-bold text-red-500">-1.27%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiQueryLoadingBoundary>
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

GamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
