import { ReactNode } from "react";

export type MediaCarouselProps = {
  media: Array<Media>;
  children?: ReactNode;
  className?: string;
};

type Media = {
  url: string;
  legend?: string;
};
