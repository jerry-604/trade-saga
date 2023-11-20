import React, { useEffect, useRef } from 'react';

export default function TimelineWidget({
}) {
    const container = useRef<HTMLDivElement>(null);
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
      {
        "feedMode": "all_symbols",
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
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