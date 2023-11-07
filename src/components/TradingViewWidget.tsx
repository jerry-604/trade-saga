import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

let tvScriptLoadingPromise: Promise<void> | null = null;

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
  const onLoadScriptRef = useRef<() => void>(() => {});

  useEffect(() => {
    onLoadScriptRef.current = () => createWidget(symbol);

    if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise<void>((resolve) => {
            const script = document.createElement('script');
            script.id = 'tradingview-widget-loading-script';
            script.src = 'https://s3.tradingview.com/tv.js';
            script.type = 'text/javascript';
            script.onload = () => {
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
        onLoadScriptRef.current = () => {};
    };
  }, [symbol]);  // Add symbol as a dependency to the useEffect hook

  function createWidget(symbol: string) {
    if (typeof window !== 'undefined' && 'TradingView' in window && document.getElementById('tradingview_e76e3')) {
        new (window as any).TradingView.widget({
            autosize: true,
            symbol:`${symbol}`,  // Replace with symbol
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_e76e3"
        });
    }
  }

  return (
    <div className='tradingview-widget-container' style={{ height: "100%", width: "100%", }}>
      <div id='tradingview_e76e3' style={{ height: "calc(100% - 2px)", width: "100%" }} />
      {/* <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div> */}
    </div>
  );
}

export default TradingViewWidget;
