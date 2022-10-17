export type Styles = {
  navbar: string;
  "navbar__account-widget": string;
  navbar__center: string;
  "navbar__center--item": string;
  "navbar__center--item-dropdown": string;
  navbar__dropdown: string;
  "navbar__dropdown--item": string;
  "navbar__dropdown--item-icon": string;
  "navbar__dropdown--item-text": string;
  "navbar__language-selector": string;
  navbar__logo: string;
  navbar__right: string;
  "navbar__right--item": string;
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
