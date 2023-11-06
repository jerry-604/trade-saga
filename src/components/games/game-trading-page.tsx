import { getNameForPlayer, computeWorthForPlayer, computeTotalReturn, getPostFormattedDate } from "@/src/utils/game-helpers";
import GameTradingHeader from "./game-trading-header";
import React, { ReactElement, useState } from 'react';
import TradingWidget from './trading-widget';
import GameUserInfoTrading from "./game-trading-user-info";

type Props = {
    user: any
    gameData: any
}

export default function GameTradingPage({
    user,
    gameData
}: Props) {
    const [symbol, setSymbol] = useState('AAPL');

    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol);
    };
    return (
        <div>
            <GameTradingHeader user={user} gameData={gameData} onSymbolChange={handleSymbolChange} />
            <div className="flex justify-between p-8 h-[510px] space-x-[40px]">
            <TradingWidget symbol={symbol} />
            <GameUserInfoTrading user={user} gameData={gameData}/>
            </div>
        </div>
    );
}