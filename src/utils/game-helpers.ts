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

export const computeTotalReturn = (input: any) => {
    const cash = input.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < input.stocksHeld.length; i++) {
      securitiesTotal += input.stocksHeld[i].numShares * 123;
    }
    const percent_return = (securitiesTotal + cash - 100000)/100000
    const rounded = Math.round(percent_return * 100) / 100
    return rounded > 0 ? `+${rounded}` : `${rounded}`
  };

 export const computeWorthForPlayer = (input: any) => {
    console.log(input);
    const cash = input.cashBalance;
    let securitiesTotal = 0;
    for (let i = 0; i < input.stocksHeld.length; i++) {
      securitiesTotal += input.stocksHeld[i].numShares * 123;
    }
    return "$" + `${numberWithCommas(securitiesTotal + cash)}`;
  };

  export const computeStockBalance = (input: any) => {
    let securitiesTotal = 0;
    for (let i = 0; i < input.stocksHeld.length; i++) {
      securitiesTotal += input.stocksHeld[i].numShares * 123;
    }
    return securitiesTotal;
  };