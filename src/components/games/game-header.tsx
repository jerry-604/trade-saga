import { getFormattedDate } from "@/src/utils/game-helpers";
import { backgroundForGame } from "../../utils/game-helpers"
import React, { useState, useEffect } from 'react';
import { trpc } from "@/src/utils/trpc"

type Props = {
  user: any
  gameData: any
  showStockModal: any
  setShowStockModal: any
  onSymbolChange: (symbol: string) => void;
}

export default function GameHeader({
  user,
  gameData,
  showStockModal,
  setShowStockModal,
  onSymbolChange
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const mutation = trpc.gameRouter.readingOccured.useMutation();

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

  const updateReading = () => {
mutation.mutate({gamePlayerId: gameData.playerData.find((item: any) => item.userId == user.id).id})
  }

  return (
    <div className={`bg-[url('/${backgroundForGame(gameData.coverImageId)}')] bg-cover bg-no-repeat bg-left h-[260px] p-5 pl-[30px] border-b-[2px] border-[#CDCDCD]`}>
      <div className="flex justify-between items-center mb-4">
        <div className="">
          <div className="relative">
            <input
              className="bg-[#F5F7F9] p-2 pl-10 rounded-[8px] focus:outline-none w-[360px] text-medium border-[1px] border-[#E2E2E2]"
              type="text"
              placeholder="Search for a stock..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
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
          {showModal && isInputFocused && (
            <div onMouseDown={(e) => e.preventDefault()} className=" top-full mt-2 w-[475px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 relative min-h-[242px] max-h-[242px] overflow-auto">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center p-2 hover:bg-gray-100"
                  onClick={() => {
                    onSymbolChange(result.symbol)
                    setShowModal(false); // Hide the modal after selecting
                    setShowStockModal(true);
                    updateReading();
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
        <header className={`flex flex-grow items-center justify-end ${showModal && isInputFocused ? 'pb-[260px]' : 'pb-[10px]'}`}>
          <img
            src={user.imageUrl}
            alt="User"
            className="rounded-full w-10 h-10 mr-3 object-cover"
          />
          <span className="font-semibold">
            {user.Fname} {user.Lname}
          </span>
        </header>
      </div>
      <div className={`mb-4 mt-14 ${showModal && isInputFocused ? 'mb-[500px] opacity-0' : null}`}>
        <h1 className="text-[28px] font-semibold">
          {gameData?.name ?? ""}
        </h1>
        <p className="text-gray-600 text-[20px]">
          Hosted by {gameData?.creator?.Fname ?? ""} {gameData?.creator.Lname ?? ""} |{" "}
          {getFormattedDate(gameData?.dateStart ?? new Date())} -{" "}
          {getFormattedDate(gameData?.dateEnd ?? new Date())}
        </p>
      </div>
    </div>
  );
}