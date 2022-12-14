import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { LinkProps } from "next/link";

type GeneralProps = {
  inline?: boolean;
  flat?: boolean;
  truncate?: boolean;
};

export type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode;
  className?: string;
} & GeneralProps;

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & GeneralProps;

export type NextLinkProps = TypographyProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;
