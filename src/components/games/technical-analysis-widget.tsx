import React, { useEffect, useRef } from 'react';


type Props = {
    symbol: string
}

export default function TechnicalAnalysisWidget({
    symbol
}: Props) {
    const container = useRef();
    useEffect(
        () => {
          const script = document.createElement("script");
          script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
          script.type = "text/javascript";
          script.async = true;
          script.innerHTML = `
            {
                "interval": "1m",
                "width": "100%",
                "isTransparent": true,
                "height": "100%",
                "symbol": "${symbol}",
                "showIntervalTabs": true,
                "displayMode": "single",
                "locale": "en",
                "colorTheme": "dark"
            }`;
            container.current.innerHTML = "";
          container.current.appendChild(script);
        },
        [symbol]
      );

return (
    <div className="h-[375px]">
<div className="tradingview-widget-container" ref={container}>
</div>
</div>
)
};