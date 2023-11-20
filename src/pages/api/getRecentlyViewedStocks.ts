 import fetch from 'node-fetch';

 interface WealthbaseDetails {
   name: string;
   symbol: string;
   logo_url: string;
   change_percent: string;
   current_price: string;
 }
 
 interface TrendingStock {
   stockName: string;
   sharePrice: string;
   movement: string;
   logo: string;
   movementData: number[];
 }
 
 async function getRecentsFromUser(): Promise<string[]> {
    const response = ["AAPL", "TSLA", "AMZN", "INTC", "MSFT"];
   return response;
 }
 
 async function getWealthbaseDetails(symbol: string): Promise<WealthbaseDetails> {
   const response = await fetch(`https://www.wealthbase.com/investments/${symbol}/details`, {
     headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
     }
   });
   return response.json();
 }
 
 async function getRecentlyViewedStocks(): Promise<TrendingStock[]> {
   const symbols = await getRecentsFromUser();
//    console.log(symbols);
   const detailsPromises = symbols.map(symbol => getWealthbaseDetails(symbol));
   const details = await Promise.all(detailsPromises);
 

   const trendingStocks: TrendingStock[] = details.map(detail => ({
     stockName: detail.display_symbol,
     sharePrice: detail.current_price, 
     movement: detail.change_percent,
     logo: detail.logo_url,
     movementData: detail.historical_data, 
   }));
 
   return trendingStocks;
 }
 

 
 export default getRecentlyViewedStocks;
 