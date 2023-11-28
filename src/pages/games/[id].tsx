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

import GameHeader from '../../components/games/game-header'
import GameNavBar from '../../components/games/game-navbar'
import GameUserInfo from '../../components/games/game-user-info'
import GameCreatePost from '../../components/games/game-create-post'
import GameFeed from "../../components/games/game-feed";
import GameTradingPage from "@/src/components/games/game-trading-page";
import MarketMoversWidget from "../../components/games/market-movers-widget"
import GameSearchModal from "../../components/games/game-search-modal"
import {
  computeTotalReturn,
} from "@/src/utils/game-helpers";
import GamePortfolio from "@/src/components/games/game-portfolio-page";
import GameLeaderboard from "@/src/components/games/game-leaderboard";
import TickerTapeWidget from "@/src/components/games/ticker-tape-widget";
import GameAnalysis from "@/src/components/games/game-analysis-page";
import withAuth from "@/src/utils/with-auth"
import GameNavBarNonOngoing from "@/src/components/games/game-navbar-nonongoing";
import { useSearchParams } from 'next/navigation'

export default function GamePage() {
  const { query } = useRouter();
  const id = query.id as string;
  const [postText, setPostText] = useState("");
  const [isTrading, setIsTrading] = useState(false);
  const utils = trpc.useContext();
  const getFormattedDate = (input: Date) => {
    return format(input, "MMMM dd");
  };
  //we should acutally use user object in the future, but any is ok for now.


  const { mutate, isLoading } = trpc.gameRouter.createPost.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
      setPostText("");
    },
  });

  const createPost = (gameID: number, content: string) => {
    mutate({
      gameID,
      content,
    });
  };

  const [isSticky, setIsSticky] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const openModal = () => setIsModalOpen(true);

  const handleScroll = () => {
    // Assuming you have a ref to your navbar element
    const navbar = document.getElementById("navbar");
    // Get the top position of the navbar
    if (navbar) {
      const topPosition = navbar.getBoundingClientRect().top;

      // Check if the navbar is at the top of the viewport
      setIsSticky(topPosition <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  const [symbol, setSymbol] = useState("AAPL");


  const joinMutation = trpc.gameRouter.joinGame.useMutation({
    onSuccess: () => {
      utils.gameRouter.fetchGameWithId.invalidate();
      utils.gameRouter.getStockDataForPlayer.invalidate();
      utils.gameRouter.getGameStatus.invalidate()
    },
  });

  const joinGame = (
    shareId: string,
  ) => {
    joinMutation.mutate({
      shareId: shareId,
    });
  };

  const searchParams = useSearchParams();
  const search_symbol = searchParams.get('symbol')

  useEffect(() => {
    if(search_symbol) {
      setIsTrading(true);
    }
  }, [searchParams])

  return (
    <LoadingBoundary query={
      trpc.gameRouter.getGameStatus.useQuery({ shareId: id })
    }>
      {([gameExists, userExists, isOngoing]) => (
        gameExists ? (
          userExists ? 
            isOngoing ? (
            <MultiQueryLoadingBoundary
              queries={trpc.useQueries((t) => [
                t.gameRouter.fetchGameWithId({ shareId: id }),
                t.gameRouter.getStockDataForPlayer({ shareId: id }),
                t.userRouter.getUserFromContext(),
              ])}
            >
              {([gameData, stockData, user]) => (
                <div>
                  <GameSearchModal symbol={symbol} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} gameData={gameData} user={user} />
                  <div className="flex flex-col space-y-0">
                    {
                      !isTrading ? (
                        <>
                          <GameHeader user={user} gameData={gameData} showStockModal={isModalOpen} setShowStockModal={setIsModalOpen} onSymbolChange={handleSymbolChange} />
                          <GameNavBar isSticky={isSticky} isTrading={isTrading} setIsTrading={setIsTrading} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                          <PageForTab input={selectedTab} user={user} gameData={gameData} stockData={stockData} createPost={createPost} postText={postText} setPostText={setPostText} shareId={id} />
                        </>
                      ) : (
                        <GameTradingPage user={user} gameData={gameData} stockData={stockData} setIsTrading={setIsTrading} />
                      )
                    }
                  </div>
                </div>
              )}
            </MultiQueryLoadingBoundary>
          ) : (
            <MultiQueryLoadingBoundary
            queries={trpc.useQueries((t) => [
              t.gameRouter.fetchGameWithId({ shareId: id }),
              t.gameRouter.getStockDataForPlayer({ shareId: id }),
              t.userRouter.getUserFromContext(),
            ])}
          >
            {([gameData, stockData, user]) => (
              <div>
                <GameSearchModal symbol={symbol} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} gameData={gameData} user={user} />
                <div className="flex flex-col space-y-0">
                        <GameHeader user={user} gameData={gameData} showStockModal={isModalOpen} setShowStockModal={setIsModalOpen} onSymbolChange={handleSymbolChange} />
                        <GameNavBarNonOngoing isSticky={isSticky} isTrading={isTrading} setIsTrading={setIsTrading} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                        <PageForTab input={selectedTab} user={user} gameData={gameData} stockData={stockData} createPost={createPost} postText={postText} setPostText={setPostText} shareId={id} />
                </div>
              </div>
            )}
          </MultiQueryLoadingBoundary>
          ) : (
            <div className="grid h-screen place-items-center">
              <div className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[800px]">

                <div className="flex flex-grow flex-col pl-4 h-full pt-5 pb-10]">
                  <p className="text-[18px] font-bold mb-1 text-[#FBFBFB]" >Not a Member</p>
                  <p className="text-[18px] font-semibold mb-1 text-[#ABABAB]" >You are not a member of this game, would you like to join?</p>
                  <button
                    className="h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold mt-5"
                    onClick={() => {
                      joinGame(id);
                    }}
                  >
                    Join Game
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="grid h-screen place-items-center">
            <div className="items-center bg-[#131313] rounded-[14px] h-auto pt-4 pb-4 pr-4 w-[800px]">
              <div className="flex flex-grow flex-col pl-4 h-full pt-2 pb-10]">
                <p className="text-[18px] font-bold mb-1 text-[#FBFBFB]"> <b className="text-red-500">Error: </b>Not Found</p>
                <p className="text-[18px] font-semibold mb-1 text-[#ABABAB]" >This game does not exist.</p>
              </div>
            </div>
          </div>
        )
      )}
    </LoadingBoundary>
  );
}


GamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = withAuth({
  redirectTo: "/"
})

interface PTProps {
  input: number;
  user: any;
  gameData: any;
  stockData: any;
  createPost: any;
  postText: any;
  setPostText: any;
  shareId: string;
}

const PageForTab = ({
  input,
  user,
  gameData,
  stockData,
  createPost,
  postText,
  setPostText,
  shareId
}: PTProps) => {
  switch (input) {
    case 0:
      return (
        <div className="flex justify-between p-8">
          <GameUserInfo user={user} gameData={gameData} stockData={stockData} />
          <div className="flex flex-col items-center space-y-[25px]">
            <GameCreatePost user={user} gameData={gameData} postText={postText} setPostText={setPostText} createPost={
              () => createPost(gameData.id, postText)} />
            <div className="font-bold text-[20px] text-[#1D1D1D] mr-[350px]">
              Feed
            </div>
            <GameFeed user={user} gameData={gameData} />
          </div>

          <div className="flex flex-col bg-white p-4 rounded-[14px] w-[320px] h-fit min-h-[400px] sticky top-[100px]">
            <p className="text-[18px] font-bold mb-2 text-[#1D1D1D] mt-[15px] ml-[15px]">
              Market Movers
            </p>
            <MarketMoversWidget />
          </div>
        </div>
      )
    case 1:
      return (<GameLeaderboard user={user} gameData={gameData} shareId={shareId} />)
    case 2:
      return (<GameAnalysis user={user} gameData={gameData} stockData={stockData} />)
    case 3:
      return (
        <GamePortfolio user={user} gameData={gameData} stockData={stockData} />
      )
    default: return (null)
  }
}