import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

let tvScriptLoadingPromise: Promise<void> | null = null;

const TradingWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
    const container = useRef();

    useEffect(
      () => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = false;
        script.innerHTML = `
          {
            "symbols": [
              [
                "${symbol}|3M"
              ]
            ],
            "chartOnly": false,
            "width":"100%",
            "height": "100%",
            "locale": "en",
            "colorTheme": "light",
            "autosize": false,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": false,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "maLineColor": "#2962FF",
            "maLineWidth": 1,
            "maLength": 9,
            "lineWidth": 2,
            "lineType": 0,
            "backgroundColor": "rgba(0, 0, 0, 0)",
            "dateRanges": [
              "1d|1",
              "1m|30",
              "3m|60",
              "12m|1D",
              "60m|1W",
              "all|1M"
            ]
          }`;
          container.current.innerHTML = "";
        container.current.appendChild(script);
      },
      [symbol]
    );
  
    return (
        <div className="bg-[#FFFFFF] rounded-[14px] w-[100%]">
      <div className="tradingview-widget-container" ref={container}>
      </div>
      </div>
    );
}

export default TradingWidget;
