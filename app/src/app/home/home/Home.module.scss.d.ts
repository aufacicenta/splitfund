export type Styles = {
  button_primary: string;
  button_primary__icon: string;
  button_primary__icon_left: string;
  button_primary__icon_right: string;
  button_primary_invert: string;
  button_primary_large: string;
  button_primary_medium: string;
  home: string;
  "home__intro--cta": string;
  "home__intro--headline": string;
  "home__intro--image": string;
  "home__intro--text-block": string;
  "home__powered-by": string;
  home__section: string;
  "home__section--como-funciona": string;
  "home__section--como-funciona--box": string;
  "home__section--cta-banner": string;
  "home__section--cta-banner--cta": string;
  "home__section--cta-banner--welcome": string;
  "home__section--intro": string;
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
