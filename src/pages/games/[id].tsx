import { trpc } from "../utils/trpc";
import { User } from "@prisma/client";
import PropTypes from "prop-types";
import React from "react";
import Layout from "../../components/layout";
import type { ReactElement } from "react";
import { useRouter } from 'next/router';
import { useState } from "react";

export default function GamePage() {
  const { query } = useRouter();
  const id = query.id as string;
  const [postText, setPostText] = useState('');
  return (
    <div className="flex flex-col space-y-0">
      <div className="bg-[url('/game-background-1.png')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px]">
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
        <span className="font-semibold">TradeSaga Player</span>
      </header>
        </div>
        <div className="mb-4 mt-14">
          <h1 className="text-[28px] font-semibold">Zane's Awesome Game</h1>
          <p className="text-gray-600 text-[20px]">Hosted by Zane K | October 5 - October 19</p>
        </div>
      </div>

      <div className="flex space-x-[30px] mb-4 bg-white p-5 pl-[30px] border-t-[2px] border-[#CDCDCD]">
        <ActionButton onClick={() => console.log()} action={"Activity"} selected={true} />
        <ActionButton onClick={() => console.log()} action={"Leaderboard"} selected={false}/>
        <ActionButton onClick={() => console.log()} action={"Performance"} selected={false} />
        <ActionButton onClick={() => console.log()} action={"Portfolio"} selected={false}/>
        <TradeButton onClick={() => console.log()} />
      </div>
    </div>
  );
}

function ActionButton({ onClick, action, selected }) {
  return (
    <button
      onClick={onClick}
      className={selected ? "w-[140px] h-[34px] bg-[#242424] text-white rounded-[14px] focus:outline-none hover:bg-gray-800 transition duration-200 text-align-center" :
      "w-[140px] h-[34px] bg-[#EEEEEE] text-[#242424] rounded-[14px] focus:outline-none hover:bg-gray-100 transition duration-200 text-align-center border-[#ABABAB] border-[1px]"
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
      className="w-[140px] h-[34px] bg-indigo-600 text-white rounded-[14px] focus:outline-none hover:bg-indigo-500 transition duration-200 text-align-center absolute right-[30px]"
    >
      Trade
    </button>
  );
}



GamePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
