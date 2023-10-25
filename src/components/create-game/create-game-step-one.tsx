import Link from 'next/link'
import React, { useState, Component } from 'react';

type Props = {
  gameTitle: string;
  setGameTitle: any;
  backgroundImage: string;
  setBackgroundImage: any;
  setStep: any;
}

export const CreateGameStepOne = ({
  gameTitle,
  setGameTitle,
  backgroundImage,
  setBackgroundImage,
  setStep,
}: Props) => {
  function validateInputs() {
    if (gameTitle != "" && gameTitle != null && backgroundImage != null) {
      setStep(1);
    }
  }
  return (
    <div className="px-[40px]">
      <header className="flex items-center mb-8">
        <img
          src="/create-background.png"
          alt="User"
          className="rounded-full w-10 h-10 mr-4"
        />
        <span className="font-semibold">TradeSaga Player</span>
      </header>
      <nav className="flex space-x-4">
        <span className="font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-2">
          Game Page
        </span>
        <div className="my-4 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
        <span>Duration</span>
        <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
        <span>Invitations</span>
        <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
        <span>Review</span>
      </nav>
      <section className="py-[40px]">
        <h2 className="font-semibold text-xl mb-6">Create a new game</h2>
        <p className="mb-6 text-[#7C7C7C]">
          Let&apos;s get you up and running with a new game. It should only<br />take
          a few moments.
        </p>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Game Title..."
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-3/5 p-3 border-2 border-[#E2E2E2] rounded-[8px] focus:outline-none 2 focus:border-indigo-600 bg-[#F5F7F9] drop-shadow-sm"
          />
        </div>
        <h3 className="font-medium mb-4">Cover Image</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button className="h-[80px] object-fill w-fill bg-cover bg-no-repeat bg-left bg-[url('/create-background.png')] rounded flex items-center justify-center"
            onClick={() => setBackgroundImage("create-background")}>
            {
              backgroundImage == 'create-background' ? <span className="text-white font-bold text-[22px]">✓</span> : null
            }
          </button>
          <button className="h-[80px] object-fill w-fill bg-cover bg-no-repeat bg-left bg-[url('/background-2.png')] rounded flex items-center justify-center"
            onClick={() => setBackgroundImage("background-2")}>
            {
              backgroundImage == 'background-2' ? <span className="text-white font-bold text-[22px]">✓</span> : null
            }
          </button>
          <button className=" h-[80px] object-fill w-fill bg-cover bg-no-repeat bg-left bg-[url('/background-3.png')] rounded flex items-center justify-center"
            onClick={() => setBackgroundImage("background-3")}>
            {
              backgroundImage == 'background-3' ? <span className="text-white font-bold text-[22px]">✓</span> : null
            }
          </button>
          <button className="h-[80px] object-fill w-fill bg-cover bg-no-repeat bg-left bg-[url('/background-4.png')] rounded flex items-center justify-center"
            onClick={() => setBackgroundImage("background-4")}>
            {
              backgroundImage == 'background-4' ? <span className="text-white font-bold text-[22px]">✓</span> : null
            }
          </button>
        </div>
        <button className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[8px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
          onClick={() => validateInputs()}>
          Continue
        </button>
      </section>
      <Link href='/ ' className="absolute bottom-10 mt-6 text-indigo-600 hover:underline cursor-pointer transition">
        ← Back
      </Link>
    </div>
  );
}