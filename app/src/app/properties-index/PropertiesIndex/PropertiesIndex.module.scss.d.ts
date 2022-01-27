export type Styles = {
  "properties-index": string;
  "properties-index__heading": string;
  "properties-index__property-card": string;
  "properties-index__property-card--background-image": string;
  "properties-index__section--grid": string;
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
