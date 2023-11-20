import React, { useEffect, useRef } from 'react';

export default function NewsHeatmapWidget({
}) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `{
                "exchanges": [],
                "dataSource": "SPX500",
                "grouping": "no_group",
                "blockSize": "market_cap_basic",
                "blockColor": "change",
                "locale": "en",
                "symbolUrl": "",
                "colorTheme": "light",
                "hasTopBar": false,
                "isDataSetEnabled": false,
                "isZoomEnabled": true,
                "hasSymbolTooltip": true,
                "width": "100%",
                "height": "100%",
                "isTransparent": true,
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