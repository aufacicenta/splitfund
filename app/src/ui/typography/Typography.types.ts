import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
  className?: string;
  inline?: boolean;
  flat?: boolean;
};

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
