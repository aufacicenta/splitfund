import clsx from "clsx";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Button } from "ui/button/Button";

import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.scss";

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className }) => (
  <Card className={clsx(styles["property-card"], className)} shadow backgroundImageUrl={property.featuredImage.url}>
    <Card.Content>
      <Typography.TextLead>{property.title}</Typography.TextLead>
      <Typography.Text>{property.shortDescription}</Typography.Text>
      <div className={styles["property-card__progress-bar"]}>
        <div className={styles["property-card__progress-bar--funded"]} style={{ width: "70%" }} />
        <div className={styles["property-card__progress-bar--total"]} />
      </div>
      <Grid>
        <Grid.Row>
          <Grid.Col>
            <div className={styles["property-card__stat"]}>
              <Typography.Description>No. of Investors</Typography.Description>
              <Typography.Text>{property.numberOfBackers}</Typography.Text>
            </div>
          </Grid.Col>
          <Grid.Col>
            <div className={styles["property-card__stat"]}>
              <Typography.Description>Funded</Typography.Description>
              <Typography.Text>{property.amountFunded}</Typography.Text>
            </div>
          </Grid.Col>
          <Grid.Col>
            <div className={styles["property-card__stat"]}>
              <Typography.Description>Goal</Typography.Description>
              <Typography.Text>{property.fundingGoal}</Typography.Text>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Card.Content>
    <Card.Actions>
      <Button disabled variant="text">
        Expires in 30 days
      </Button>
      <Button>See Details</Button>
    </Card.Actions>
  </Card>
);
