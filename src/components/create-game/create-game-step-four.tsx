import Link from 'next/link'
import React, { useState, Component } from 'react';
import { start } from 'repl';
import { RxLink2 } from "react-icons/rx"

type Props = {
    gameTitle: string;
    startDate: string | null;
    endDate: string | null;
    shareID: string;
    setStep: any;
    createGame: any;
}

export const CreateGameStepFour = ({
    gameTitle,
    startDate,
    endDate,
    shareID,
    setStep,
    createGame
}: Props) => {
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
                <span>
                    Game Page
                </span>
                <div className="my-4 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span >Duration</span>
                <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span>Invitations</span>
                <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span className="font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-2">Review</span>
            </nav>
            <section className="py-[40px]">
                <h2 className="font-semibold text-xl mb-6">Last step, let’s review</h2>
                <p className="mb-6 text-[#7C7C7C]">
                    Check to make sure all your information is correct<br />before we create your game.
                </p>
                <div className="mb-6">
                    <div>
                        <h2 className="font-semibold text-xl mb-3 text-[#949494]">Game Title:</h2>
                        <h2 className="font-semibold text-xl mb-6">{gameTitle}</h2>
                    </div>
                    <div className="flex flex-row space-x-[200px]">
                        <div>
                            <h2 className="font-semibold text-xl mb-3 text-[#949494]">Starts:</h2>
                            <h2 className="font-semibold text-xl mb-6">{startDate}</h2>
                        </div>
                        <div>
                            <h2 className="font-semibold text-xl mb-3 text-[#949494]">Ends:</h2>
                            <h2 className="font-semibold text-xl mb-6">{endDate}</h2>
                        </div>
                    </div>
                    <div className="flex flex-row w-[575px] p-3 border-2 border-[#E2E2E2] rounded-[8px] focus:outline-none 2 focus:border-indigo-600 bg-[#F9F9F9] drop-shadow-sm h-[85px] content-center">
                        <RxLink2 size="30px" color="indigo-600" class="mt-3 text-indigo-600" />
                        <p className="ml-3 content-center h-[85px] pt-4 font-bold text-indigo-600">https://trade-saga.vercel.app/games/{shareID}</p>
                    </div>
                </div>
                <div className="mb-6">
                </div>
                <button className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[8px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
                    onClick={() => createGame()}>
                    Create Game
                </button>
            </section>
            <button onClick={() => setStep(2)} className="absolute bottom-10 mt-6 text-indigo-600 hover:underline cursor-pointer transition">
                ← Back
            </button>
        </div>
    );
}