import React, { useEffect, useRef } from 'react';


export default function MarketMoversWidget({
}) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
          {
            "colorTheme": "light",
            "dateRange": "12M",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": false,
            "showFloatingTooltip": false,
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(106, 109, 120, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
          }`;
            if (container.current) {
                container.current.innerHTML = "";
                container.current.appendChild(script);
            }
        },
        []
    );

    return (
        <div className='flex flex-grow h-[525px] pb-[20px]'>
            <div className="tradingview-widget-container" ref={container}>
            </div>
        </div>
    )
};