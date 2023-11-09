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

  const openModal = () => setIsModalOpen(true);

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

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  const [symbol, setSymbol] = useState("AAPL");


  return (
    <MultiQueryLoadingBoundary
      queries={trpc.useQueries((t) => [
        t.gameRouter.fetchGameWithId({ shareId: id }),
        t.gameRouter.getStockDataForPlayer({ shareId: id }),
        t.userRouter.getUserFromContext(),
      ])}
    >
      {([gameData, stockData, user]) => (
         <div>
           <GameSearchModal symbol={symbol} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} gameData={gameData} user={user}/>
        <div className="flex flex-col space-y-0">
          {
            !isTrading ? (
              <>
              <GameHeader user={user} gameData={gameData} showStockModal={isModalOpen} setShowStockModal={setIsModalOpen} onSymbolChange={handleSymbolChange}/>
              <GameNavBar isSticky={isSticky} isTrading={isTrading} setIsTrading={setIsTrading}/>
    
              <div className="flex justify-between p-8">
                <GameUserInfo user={user} gameData={gameData} stockData={stockData}/>
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
                  {/* <div className="flex justify-between items-center bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
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
                  </div> */}
                </div>
              </div>
              </>
            ) : (
              <GameTradingPage user={user} gameData={gameData} stockData={stockData} setIsTrading={setIsTrading}/>
            )
          }
        </div>
        </div>
      )}
    </MultiQueryLoadingBoundary>
  );
}


GamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
