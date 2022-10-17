import clsx from "clsx";

import { Footer } from "ui/footer/Footer";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";

import { InvestNowWidget } from "./invest-now-widget/InvestNowWidget";
import styles from "./PropertyDetails.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails2.types";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ className, property }) => (
  <>
    <WalletSelectorNavbar />
    <div className={clsx(styles["property-details"], styles["property-details__main"], className)}>
      <section className={styles["property-details__heading"]}>
        <Grid.Container>
          <Typography.Headline1>{property.title}</Typography.Headline1>
          <Typography.Text>{property.shortDescription}</Typography.Text>
        </Grid.Container>
      </section>
      <section className={styles["property-details__gallery"]}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={7} xs={12}>
              gallery
            </Grid.Col>
            <Grid.Col lg={5} xs={12}>
              <InvestNowWidget property={property} />
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </div>
    <Footer />
  </>
);
