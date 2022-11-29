export type Styles = {
  market: string;
  market__container: string;
  market__details: string;
  "market__details--about": string;
  "market__details--long-description": string;
  "market__navbar--logo": string;
  market__orders: string;
  market__row: string;
  market__table: string;
  "market__table--body": string;
  "market__table--head": string;
  "market__table--wrapper": string;
  "z-depth-0": string;
  "z-depth-1": string;
  "z-depth-1-half": string;
  "z-depth-2": string;
  "z-depth-3": string;
  "z-depth-4": string;
  "z-depth-5": string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
