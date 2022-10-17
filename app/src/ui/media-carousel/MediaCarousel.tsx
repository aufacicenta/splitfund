import clsx from "clsx";
import { Carousel } from "react-responsive-carousel";

import { MediaCarouselProps } from "./MediaCarousel.types";
import styles from "./MediaCarousel.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ className, media }) => (
  <Carousel className={clsx(styles["media-carousel"], className)} swipeable showThumbs={false} showStatus={false}>
    {media.map((m) => (
      <div key={m.url}>
        <img src={m.url} alt={m.legend} className={styles["media-carousel__img"]} />
        {m.legend && <p className={styles["media-carousel__legend"]}>{m.legend}</p>}
      </div>
    ))}
  </Carousel>
);
