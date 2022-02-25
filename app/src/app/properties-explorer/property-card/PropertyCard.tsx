import clsx from "clsx";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { HorizontalLine } from "ui/horizontal-line/HorizontalLine";
import ipfs from "providers/ipfs";
import date from "providers/date";

import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.scss";

export const DEFAULT_PROPERTY_CARD_PROPS = {
  title: "Loading",
  price: 0,
  shortDescription: "Loading",
  longDescription: "Loading",
  category: "Loading",
  expirationDate: date.now().format(),
  media: {
    featuredImageUrl:
      "bafybeictugtlj7ixe5u2ylavxzhm7dvs6nqzgykv7pgrvlfsxccbfai6pm/near-holdings-icon-loading-template.jpg",
    ipfsURL: "ipfs://",
  },
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  className,
  action,
  minimal,
  property,
  priceEquivalence,
  fundedPercentage = "0",
}) => (
  <Card
    shadow
    backgroundImageUrl={ipfs.asHttpsURL(property.media.featuredImageUrl)}
    className={clsx(styles["property-card"], className)}
  >
    <div className={styles["property-card__stats-pill"]}>
      <div className={styles["property-card__stats-pill--expiration-date"]}>
        <Typography.MiniDescription flat>
          {date.timeFromNow.asDefault(property.expirationDate, true)}{" "}
          {date.now().isAfter(property.expirationDate) ? "ago" : "left"}
        </Typography.MiniDescription>
      </div>
      {minimal && (
        <div className={styles["property-card__stats-pill--funded"]}>
          <Typography.MiniDescription flat>{`${fundedPercentage}% funded`}</Typography.MiniDescription>
        </div>
      )}
    </div>
    <Card.Content>
      <div className={styles["property-card__header"]}>
        <Grid.Row>
          <Grid.Col lg={9} xs={9}>
            <Typography.Headline6 className={styles["property-card__title"]}>{property.title}</Typography.Headline6>
            <Typography.Description flat className={styles["property-card__description"]}>
              {property.shortDescription}
            </Typography.Description>
            {property.owner?.name && property.owner?.url && (
              <Typography.Description flat className={styles["property-card__sold-by"]}>
                Listed by{" "}
                <Typography.Anchor href={property.owner.url} target="_blank" rel="nofollow">
                  {property.owner.name}
                </Typography.Anchor>
              </Typography.Description>
            )}
          </Grid.Col>
          <Grid.Col lg={3} xs={3}>
            <Typography.Description flat className={styles["property-card__category"]}>
              {property.category}
            </Typography.Description>
          </Grid.Col>
        </Grid.Row>
      </div>
    </Card.Content>
    {!minimal && (
      <div className={styles["property-card__details"]}>
        {property.longDescription.split("\n").map((description, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Typography.Text key={`id-${i}`}>{description}</Typography.Text>
        ))}
      </div>
    )}
    <HorizontalLine flat />
    <Card.Content>
      <Grid.Row justify="between" align="center">
        <Grid.Col>
          <Typography.MiniDescription flat className={styles["property-card__price"]}>
            Price
          </Typography.MiniDescription>
          <Typography.Text flat className={styles["property-card__price"]}>
            {property.price} Ⓝ
          </Typography.Text>
          <Typography.MiniDescription flat className={styles["property-card__exchange-rate"]}>
            {priceEquivalence}
          </Typography.MiniDescription>
        </Grid.Col>
        <Grid.Col>{action}</Grid.Col>
      </Grid.Row>
    </Card.Content>
  </Card>
);
