import Link from 'next/link'
import React, { useState, Component } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { start } from 'repl';

type Props = {
    startDate: string | null;
    setStartDate: any;
    endDate: string | null;
    setEndDate: any;
    setStep: any;
}


export const CreateGameStepTwo = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setStep,
}: Props) => {
    const handleStartValueChange = (newValue: any) => {
        console.log("newValue:", newValue.startDate);
        setStartDate(newValue.startDate);
    }
    const handleEndValueChange = (newValue: any) => {
        console.log("newValue:", newValue.startDate);
        setEndDate(newValue.startDate);
    }
    function validateInputs() {
        if (startDate != null && endDate != null && startDate < endDate) {
            setStep(2);
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
                <span>
                    Game Page
                </span>
                <div className="my-4 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span className="font-semibold text-indigo-600 border-b-2 border-indigo-600 pb-2">Duration</span>
                <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span>Invitations</span>
                <div className="my-3 bg-[#D9D9D9] h-[2px] w-[50px]"></div>
                <span>Review</span>
            </nav>
            <section className="py-[40px]">
                <h2 className="font-semibold text-xl mb-6">Set your game’s duration</h2>
                <p className="mb-6 text-[#7C7C7C]">
                    Your game must be at least one day. After that, you’re free to choose<br />how long.
                </p>
                <div className="mb-6">
                    <Datepicker minDate={new Date()} placeholder={"Start Date"} displayFormat={"MM/DD/YYYY"} toggleClassName="absolute left-1 p-[15px] text-[#949494]" inputClassName="w-3/5 p-3 border-2 border-[#E2E2E2] rounded-[8px] focus:outline-none 2 focus:border-indigo-600 bg-[#F5F7F9] drop-shadow-sm font-medium px-[50px]" asSingle={true} useRange={false} value={{ "startDate": startDate, "endDate": startDate }} onChange={handleStartValueChange} />
                </div>
                <div className="mb-6">
                    <Datepicker minDate={startDate == null ? new Date() : new Date(startDate)} placeholder={"End Date"} displayFormat={"MM/DD/YYYY"} toggleClassName="absolute left-1 p-[15px] text-[#949494]" inputClassName="w-3/5 p-3 border-2 border-[#E2E2E2] rounded-[8px] focus:outline-none 2 focus:border-indigo-600 bg-[#F5F7F9] drop-shadow-sm font-medium px-[50px]" asSingle={true} useRange={false} value={{ "startDate": endDate, "endDate": endDate }} onChange={handleEndValueChange} />
                </div>
                <button className="w-[345px] h-[56px] bg-indigo-600 text-white p-3 rounded-[8px] hover:bg-indigo-500 transition font-bold drop-shadow-sm"
                    onClick={() => validateInputs()}>
                    Continue
                </button>
            </section>
            <button onClick={() => setStep(0)} className="absolute bottom-10 mt-6 text-indigo-600 hover:underline cursor-pointer transition">
                ← Back
            </button>
        </div>
    );
}