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
   const response = [
       'AAPL',
       'MSFT',
       'AMZN',
       'GOOGL',
       'FB',
       'V',
       'JPM',
       'JNJ',
       'WMT',
       'PG',
       'TSLA',
       'MA',
       'DIS',
       'NVDA',
       'HD',
       'PYPL',
       'BAC',
       'VZ',
       'KO',
       'CMCSA',
       'PFE',
       'ADBE',
       'CSCO',
       'NFLX',
       'PEP',
       'INTC',
       'XOM',
       'COST',
       'CVX',
       'TWTR',
       'DUOL',
       'DIS',
       'LYFT',
       'UBER',
       'VUG',
       'ABNB',

     ];
     
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

async function getStocks(): Promise<TrendingStock[]> {
  const symbols = await getRecentsFromUser();
//    console.log(symbols);
  const detailsPromises = symbols.map(symbol => getWealthbaseDetails(symbol));
  const details = await Promise.all(detailsPromises);


  const trendingStocks: TrendingStock[] = details.map(detail => ({
    stockName: detail.name,
    symbol: detail.symbol,
    logo: detail.logo_url,
  }));

  return trendingStocks;
}



export default getStocks;
