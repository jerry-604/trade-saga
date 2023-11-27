import React, { useEffect, useRef } from 'react';


type Props = {
    symbols: string[]
}

export default function TickerTapeWidget({
    symbols
}: Props) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
                "symbols": ${JSON.stringify(symbols.filter((item, index) => symbols.indexOf(item) === index).map((symbol) => {
                 
                    return {"description": symbol, "proName": symbol }
                }))},
                "showSymbolLogo": true,
                "colorTheme": "light",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "en"
              }`;
              console.log(script.innerHTML);
            if (container.current) {
                container.current.innerHTML = "";
                container.current.appendChild(script);
            }
        },
        [symbols]
    );

    return (
        <div className="">
            <div className="tradingview-widget-container" ref={container}>
            </div>
        </div>
    )
};