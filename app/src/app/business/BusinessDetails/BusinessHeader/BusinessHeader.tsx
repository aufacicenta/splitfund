import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { MapMarker } from "ui/map/map-marker/MapMarker";
import { MapView } from "ui/map/map-view/MapView";
import { Icon } from "ui/icon/Icon";

import { BusinessHeaderProps } from "./BusinessHeader.types";
import styles from "./BusinessHeader.module.scss";

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({ className, content }) => {
  const { t } = useTranslation("campaign");

  const mapOptions = {
    center: {
      lat: Number(content.latitude),
      lng: Number(content.longitude),
    },
    zoom: 15,
  };

  return (
    <section className={clsx(styles["business-header"], className)}>
      <div
        className={styles["business-header__cover-image"]}
        style={{ backgroundImage: `url(${content.media.featuredImageUrl})` }}
      />
      <div className={styles["business-header__info"]}>
        <Grid.Row>
          <Grid.Col lg={4}>
            <div className={styles["business-header__map"]}>
              <MapView mapOptions={mapOptions}>
                <MapMarker
                  markerOptions={{
                    // @TODO set a real icon
                    icon: "some icon",
                  }}
                />
              </MapView>
            </div>
          </Grid.Col>
          <Grid.Col lg={8}>
            <Typography.Headline1>{content.title}</Typography.Headline1>
            <Typography.Text className={styles["business-header__description"]}>{content.description}</Typography.Text>
            <Grid.Row justify="between">
              <Grid.Col>
                <Typography.Text>
                  {content.country} · {content.category}
                </Typography.Text>
              </Grid.Col>
              <Grid.Col>
                <Typography.Anchor
                  className={styles["business-header__link--website"]}
                  href={content.website}
                  target="_blank"
                >
                  {content.website}
                </Typography.Anchor>
                <hr />
                <Typography.Description>{t("businessHeader.social.title")}</Typography.Description>
                <Typography.Anchor
                  className={styles["business-header__link--social"]}
                  href={`https://instagram.com/${content.instagram}`}
                  target="_blank"
                >
                  <Icon name="icon-instagram" />
                </Typography.Anchor>
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </div>
    </section>
  );
};
