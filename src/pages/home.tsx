import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { getSession, signOut } from "../utils/supabase";
import HeroSection from "../components/landing-page/Hero";
import AboutSection from "../components/landing-page/About";
import FeaturesSection from "../components/landing-page/Features";
import Footer from "../components/landing-page/Footer";
import StockSlider from "../components/landing-page/StockSlider";
import { LoadingBoundary } from "../components/loading-boundary";
import {
  getNameForPlayer,
  computeWorthForPlayer,
  computeTotalReturn,
  getPostFormattedDate,
  backgroundForGame,
} from "@/src/utils/game-helpers";
import Header from "../components/Header";
import { MultiQueryLoadingBoundary } from "../components/multi-query-loading-boundary";
import Link from 'next/link'
import withAuth from "../utils/with-auth";

export default function Home() {
  const [session, setSession] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const mutation = trpc.userRouter.validateOAuthUser.useMutation();

  const [symbol, setSymbol] = useState("AAPL");

  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  useEffect(() => {
    getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      console.log(session);
      mutation.mutate(session?.user.email || "", {
        onSuccess: (data) => {
          console.log(`ValidateOAuthUserSucces: ${data}`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
      setSession(session || {});
      setUser(session?.user || {});
      setLoading(false);
    });
  }, []);

  // const handleSignOut = async () => {
  //   const { error } = await signOut();

  //   if (error) {
  //     setError(error.message);
  //   } else {
  //     window.location.href = "/dashboard";
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div>
  //       <p>...loading</p>
  //     </div>
  //   );
  // }

  return (
    <MultiQueryLoadingBoundary queries={trpc.useQueries((t) => [
      t.userRouter.getGamesForUser(),
      t.userRouter.getUserFromContext(),
    ])}>
      {([gameData, user]) => (
        <div>
          <Header onSymbolChange={handleSymbolChange} />
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col p-8 space-y-[25px]">
              <div className="font-bold text-[20px] text-[#2D2D2D]">
                My Feed
              </div>
              {gameData
                .reduce((allPosts: any, game: any) => {
                  return [...allPosts, ...game.posts];
                }, [] as any[])
                .sort((a: any, b: any) => {
                  return b.createdAt - a.createdAt;
                })
                .filter((post: any) => {
                  return post.creator.id != user.id
                })
                .map((post: any) => (
                  <div
                    key={post.id}
                    className="flex flex-col items-start bg-white p-2 rounded-[14px] max-w-[400px] pt-[5px] h-fit min-h-[200px] animate-fade"
                  >
                    <div className="flex space-x-[15px] items-center items-start bg-white p-4 w-full mb-4 border-b-[1px] border-[#D9D9D9]">
                      <img
                        src={post.creator?.imageUrl ?? ""}
                        alt="AAPL"
                        className="w-[40px] h-[40px] rounded-full object-cover"
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
                ))}
            </div>
            <div className="w-full flex justify-end p-8 pt-[87px]">
              <div className="flex flex-col items-center bg-[#131313] p-4 rounded-[14px] h-fit min-h-[430px] w-[375px]">
                <p className="text-[20px] font-semibold mb-1 text-[#FBFBFB] w-full p-4">
                  My Games
                </p>
                {
                  gameData.map((game: any) => (
                    <div key={game.id} className="w-full pl-4 pr-4">
                      <GameItem game={game} />
                    </div>
                  ))
                }
                <div className="w-full p-4">
                  <Link href="/create">
                    <button
                      className="w-full h-[56px] bg-indigo-600 text-white p-3 rounded-[14px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
                    >
                      Create Game
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MultiQueryLoadingBoundary>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps = withAuth({
//   redirectTo: "/"
// })


const GameItem = ({ game }: any) => {
  return (
    <Link href={`/games/${game.shareId}`}>
      <div className="flex flex-row items-center mt-2">
        <img
          src={`/${backgroundForGame(game.coverImageId)}`}
          className="w-[40px] h-[40px] rounded-full mb-4 object-cover mix-blend-hard-light"
        />
        <p className="text-[16px] h-[40px] font-semibold text-[#DBDBDB] pl-[15px] flex flex-grow">{game.name}</p>
      </div>
      <div className={`flex h-[2px] mt-4 mb-4 mr-2 ml-2 bg-gray-600`}></div>
    </Link>
  );
}