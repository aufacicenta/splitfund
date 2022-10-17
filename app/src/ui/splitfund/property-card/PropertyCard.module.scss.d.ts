export type Styles = {
  "property-card": string;
  "property-card__progress-bar": string;
  "property-card__progress-bar--funded": string;
  "property-card__progress-bar--total": string;
  "property-card__stat": string;
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
