import { compareAsc, format } from "date-fns";

export const getFormattedDate = (input: Date) => {
    return format(input, "MMMM dd");
  };
  //we should acutally use user object in the future, but any is ok for now.
export const getNameForPlayer = (input: any) => {
    return input.Fname + " " + input.Lname;
  };

export function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

export const getPostFormattedDate = (input: Date) => {
    return format(input, `MMM d, h:mm a`);
  };

export const computeTotalReturn = (playerData: any, stockData: any) => {
    const cash = playerData.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < playerData.stocksHeld.length; i++) {
      securitiesTotal += playerData.stocksHeld[i].numShares * (stockData.find((item:any) => item.symbol == playerData.stocksHeld[i].symbol)?.price ?? 1);
    }
    const percent_return = (securitiesTotal + cash - 100000)/100000
    const rounded = Math.round(percent_return * 100) / 100
    return rounded > 0 ? `+${rounded}` : `${rounded}`
  };

 export const computeWorthForPlayer = (playerData: any, stockData: any) => {
    console.log(playerData);
    const cash = playerData.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < playerData.stocksHeld.length; i++) {
      securitiesTotal += playerData.stocksHeld[i].numShares * (stockData.find((item:any) => item.symbol == playerData.stocksHeld[i].symbol)?.price ?? 1);
    }
    return "$" + `${numberWithCommas(Math.round((securitiesTotal + cash)*100)/100)}`;
  };

  export const computeStockBalance = (playerData: any, stockData: any) => {
    let securitiesTotal = 0;
    for (let i = 0; i < playerData.stocksHeld.length; i++) {
      securitiesTotal += playerData.stocksHeld[i].numShares * (stockData.find((item:any) => item.symbol == playerData.stocksHeld[i].symbol)?.price ?? 1);
    }
    return Math.round(securitiesTotal*100)/100;
  };

  export const backgroundForGame = (input_background: string) => {
switch(input_background) {
  case "create-background":
    return "game-background-1.png"
  case "background-2":
    return "background-2.png"
    case "background-3":
      return "background-3.png"
      case "background-4":
        return "background-4.png"
}
  }

  export async function getPriceForStock(input: string) {
    const result = await fetch(`/api/lookup?query=${input}`)
    .then(response => {
        return response.json();
    }).then(data =>{
      return data.current_price
    }
      )
    .catch(error => {
        console.error(error);
    });
    return await result as number;
  }