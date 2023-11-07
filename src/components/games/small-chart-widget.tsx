import React, { useEffect, useRef } from 'react';


type Props = {
    user: any
    gameData: any
    symbol: string
}

export default function GameSmallChart({
    user,
    gameData,
    symbol
}: Props) {
    const container = useRef();
    useEffect(
        () => {
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = `
            {
                "symbol": "${symbol}",
                "width": "100%",
                "height": "100%",
                "locale": "en",
                "dateRange": "12M",
                "colorTheme": "dark",
                "isTransparent": true,
                "autosize": true,
                "largeChartUrl": "",
                "underLineColor": "rgba(14, 15, 16, 0)",
                "underLineBottomColor": "rgba(14, 15, 16, 0)"
            }`;
            container.current.innerHTML = "";
          container.current.appendChild(script);
        },
        [symbol]
      );

return (
    <div className="h-[300px] w-[400px]">
<div className="tradingview-widget-container" ref={container}>
</div>
</div>
)
};