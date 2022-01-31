export type Styles = {
  footer: string;
  footer__copyright: string;
  "footer__copyright--social": string;
  "footer__copyright--social-icon": string;
  "footer__cta-banner": string;
  "footer__cta-banner--cta": string;
  "footer__cta-banner--description": string;
  "footer__cta-banner--welcome": string;
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
