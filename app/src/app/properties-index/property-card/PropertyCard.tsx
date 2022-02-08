import clsx from "clsx";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { useRoutes } from "hooks/useRoutes/useRoutes";

import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.scss";

export const PropertyCard: React.FC<PropertyCardProps> = ({ className }) => {
  const routes = useRoutes();

  return (
    <Card
      shadow
      backgroundImageUrl="https://bafybeid2lakmlzuifkf6nlgnyqf4vylzwlaxqlusm64rxtie33gw3x6qpq.ipfs.infura-ipfs.io/simon-lee-hbFKxsIqclc-unsplash.jpeg"
      className={clsx(styles["property-card"], className)}
    >
      <Card.Content>
        <Grid.Row>
          <Grid.Col lg={9} xs={9}>
            <Typography.Headline6 className={styles["property-card__title"]}>Asset Title</Typography.Headline6>
            <Typography.Description flat className={styles["property-card__description"]}>
              Own a share of La Bella Mona, 1948.
            </Typography.Description>
            <Typography.Description flat className={styles["property-card__sold-by"]}>
              Sold by the National Museum of Italy, Milano.
            </Typography.Description>
          </Grid.Col>
          <Grid.Col lg={3} xs={3}>
            <Typography.Description flat className={styles["property-card__category"]}>
              Art: Digital
            </Typography.Description>
          </Grid.Col>
        </Grid.Row>
        <hr />
        <Grid.Row justify="between">
          <Grid.Col>
            <Typography.Text flat className={styles["property-card__price"]}>
              897.8976 Ⓝ
            </Typography.Text>
            <Typography.MiniDescription flat className={styles["property-card__exchange-rate"]}>
              USD 500, 890.00
            </Typography.MiniDescription>
          </Grid.Col>
          <Grid.Col>
            <Typography.Link href={routes.property("123")} className={styles["property-card__cta"]}>
              Buy Shares
            </Typography.Link>
          </Grid.Col>
        </Grid.Row>
      </Card.Content>
    </Card>
  );
};
