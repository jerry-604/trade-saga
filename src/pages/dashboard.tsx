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
} from "@/src/utils/game-helpers";
import Header from "../components/Header";

export default function Dashboard() {
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
    <LoadingBoundary query={trpc.userRouter.getGamesForUser.useQuery()}>
      {(gameData) => (
        <div>
          <Header onSymbolChange={handleSymbolChange} />
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col p-8 space-y-[25px]">
              <div className="font-bold text-[20px] text-[#2D2D2D]">
                My Feed
              </div>
              {gameData
                .reduce((allPosts, game) => {
                  return [...allPosts, ...game.posts];
                }, [])
                .sort((a: any, b: any) => {
                  return b.createdAt - a.createdAt;
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
              <div className="flex flex-col items-center bg-[#131313] p-4 rounded-[14px] h-fit min-h-[430px] w-[345px]"></div>
            </div>
          </div>
        </div>
      )}
    </LoadingBoundary>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
