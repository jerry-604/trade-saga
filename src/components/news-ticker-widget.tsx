import React, { useEffect, useRef } from 'react';

export default function NewsTickerWidget({
}) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
                "symbols": [
                  {
                    "description": "",
                    "proName": "NASDAQ:TSLA"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:AAPL"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:NVDA"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:MSFT"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:AMZN"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:META"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:NFLX"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:GOOGL"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:DIS"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:PYPL"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:V"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:VZ"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:T"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:F"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:GM"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:NKE"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:KO"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:SBUX"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:XOM"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:GS"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:AXP"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:UNH"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:LLY"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:PFE"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:X"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:DOW"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:AMAT"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:CAT"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:UPS"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:AAL"
                  },
                  {
                    "description": "",
                    "proName": "NYSE:PCG"
                  },
                  {
                    "description": "",
                    "proName": "AMEX:SPY"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:QQQ"
                  },
                  {
                    "description": "",
                    "proName": "NASDAQ:ICLN"
                  }
                ],
                "showSymbolLogo": true,
                "colorTheme": "light",
                "isTransparent": false,
                "displayMode": "compact",
                "locale": "en"
              }`;
            if (container.current) {
                container.current.innerHTML = "";
                container.current.appendChild(script);
            }
        },
        []
    );

    return (
        <div className="h-full">
            <div className="tradingview-widget-container" ref={container}>
            </div>
        </div>
    )
};