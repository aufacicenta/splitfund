import clsx from "clsx";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { MapView } from "ui/map/map-view/MapView";
import { MapMarker } from "ui/map/map-marker/MapMarker";

import { PropertyHeaderProps } from "./PropertyHeader.types";
import styles from "./PropertyHeader.module.scss";

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ className, property }) => {
  const mapOptions = {
    center: {
      lat: Number(property.content.latitude),
      lng: Number(property.content.longitude),
    },
    zoom: 15,
  };

  return (
    <section className={clsx(styles["property-header"], className)}>
      <Grid.Row>
        <Grid.Col lg={8}>
          <Typography.Headline1 className={styles["property-header__title"]}>
            {property.content.title}
          </Typography.Headline1>
          <Typography.Subtitle className={styles["property-header__subtitle"]}>
            Calle del Agua, No. 78. Santa Ana. Antigua Guatemala, Guatemala.
          </Typography.Subtitle>
        </Grid.Col>
        <Grid.Col>
          <Card shadow className={styles["property-header__map"]}>
            <MapView mapOptions={mapOptions}>
              <MapMarker
                markerOptions={{
                  // @TODO set a real icon
                  icon: "some icon",
                }}
              />
            </MapView>
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col lg={3}>
          <Card shadow>
            <Card.Content>
              <Typography.TextBold flat>Area</Typography.TextBold>
              <Typography.Text>789 v2</Typography.Text>
            </Card.Content>
          </Card>
        </Grid.Col>
        <Grid.Col lg={3}>
          <Card shadow>
            <Card.Content>
              <Typography.TextBold flat>Category</Typography.TextBold>
              <Typography.Text>Land for Sale</Typography.Text>
            </Card.Content>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </section>
  );
};
