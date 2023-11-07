import React, { useEffect, useRef } from 'react';


type Props = {
    user: any
    gameData: any
    symbol: string
}

export default function GameStockNews({
    user,
    gameData,
    symbol
}: Props) {
    const container = useRef();
    useEffect(
        () => {
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = `
            {
                "feedMode": "symbol",
                "symbol": "${symbol}",
                "colorTheme": "dark",
                "isTransparent": true,
                "displayMode": "regular",
                "width": "100%",
                "height": "100%",
                "locale": "en"
            }`;
            container.current.innerHTML = "";
          container.current.appendChild(script);
        },
        [symbol]
      );

return (
<div className="tradingview-widget-container" ref={container}>
</div>
)
};