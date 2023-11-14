import { getFormattedDate } from "@/src/utils/game-helpers";
import React, { useState, useEffect } from 'react';
import { IconButton, InputBase, Badge, Avatar } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';
import { backgroundForGame } from '../../utils/game-helpers'
type Props = {
    user: any
    gameData: any
    onSymbolChange: (symbol: string) => void;
    setIsTrading: any
}

export default function GameTradingHeader({
    user,
    gameData,
    onSymbolChange,
    setIsTrading
}: Props) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (searchValue.length > 0) {
            fetch(`/api/search?query=${searchValue}`)
                .then(response => {
                    console.log(response);
                    return response.json();  // Convert the response to JSON
                })
                .then(data => {
                    setSearchResults(data[0].results);  // Assuming the assets are always in the first array element
                    setShowModal(true);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            setShowModal(false);
        }
    }, [searchValue]);

    return (
        <div className={`bg-[url('/${backgroundForGame(gameData.coverImageId)}')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px] border-b-[2px] border-[#CDCDCD]`}>
            <div className="flex justify-between items-center mb-4">
            <button onClick={() => setIsTrading(false)} className="h-[38px] w-[114px] rounded-[8px] bg-[#F9F9F9] border-[#E2E2E2] border-[2px] font-semibold text-[#767676] text-[14px]">← Back</button>
                <header className="flex flex-grow items-center justify-end">
                  
                    <img
                        src={user.imageUrl}
                        alt="User"
                        className="rounded-full w-10 h-10 mr-3"
                    />
                    <span className="font-semibold">
                        {user.Fname} {user.Lname}
                    </span>
                </header>
            </div>
            <div className="flex flex-grow flex-col justify-bottom">
                <p className="font-bold text-[#1D1D1D] text-[28px] mb-4 mt-6">Stock Search</p>
                <div className="relative">
                    <input
                        className="bg-[#F5F7F9] p-2 pl-10 rounded-[8px] focus:outline-none w-[475px] h-[54px] text-medium border-[1px] border-[#E2E2E2]"
                        type="text"
                        placeholder="Search for a stock..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    <svg
                        className="absolute left-3 top-[18px] w-5 h-5 text-gray-500"
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
                {showModal && isInputFocused && (
                <div onMouseDown={(e) => e.preventDefault()} className=" top-full mt-2 w-[475px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {searchResults.map((result) => (
                        <div
                            key={result.id}
                            className="flex items-center p-2 hover:bg-gray-100"
                            onClick={() => {
                                onSymbolChange(result.symbol)
                                setShowModal(false); // Hide the modal after selecting
                            }
                            }
                        >
                            <img src={result.logo_url} alt={`${result.name} logo`} className="w-8 h-8 mr-2" />
                            <div className="flex-grow">
                                <div className="font-semibold">{result.name} ({result.symbol})</div>
                            </div>
                            <div
                                className={`rounded-full px-2 ${result.change_direction === 'up' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                                    }`}
                            >
                                {result.change_percent}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}