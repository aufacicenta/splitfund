import clsx from "clsx";

import { Footer } from "ui/footer/Footer";
import { Grid } from "ui/grid/Grid";
import { MediaCarousel } from "ui/media-carousel/MediaCarousel";
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
              <MediaCarousel
                media={[
                  {
                    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
                  },
                  {
                    url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
                  },
                ]}
              />
            </Grid.Col>
            <Grid.Col lg={5} xs={12}>
              <InvestNowWidget property={property} />
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
      <section className={styles["property-details__campaign"]}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={7}>
              <Typography.Headline2>About</Typography.Headline2>
              <Typography.Text>{property.longDescription}</Typography.Text>
            </Grid.Col>
            <Grid.Col lg={5}>
              <div className={styles["property-details__campaign--right-col"]}>
                <Typography.Headline4>Location</Typography.Headline4>
                <Typography.Text>
                  {property.location.city} — {property.location.country}
                </Typography.Text>
              </div>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </div>
    <Footer />
  </>
);
