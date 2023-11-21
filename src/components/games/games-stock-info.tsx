import React, { useEffect, useRef } from 'react';


type Props = {
    user: any
    gameData: any
    symbol: string
}

export default function GameStockInfo({
    user,
    gameData,
    symbol
}: Props) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
                "symbol": "${symbol}",
                "colorTheme": "dark",
                "isTransparent": true,
                "width": "100%",
                "height": "100%",
                "locale": "en"
            }`;
            if (container.current) {
                container.current.innerHTML = "";
                container.current.appendChild(script);
            }
        },
        [symbol]
    );

    return (
        <div className="tradingview-widget-container" ref={container}>
        </div>
    )
};