import clsx from "clsx";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Footer } from "ui/footer/Footer";
import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { PropertyCard } from "app/properties-index/property-card/PropertyCard";

import styles from "./PropertyDetails2.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails2.types";

export const PropertyDetails2: React.FC<PropertyDetailsProps> = ({ className }) => (
  <>
    <WalletSelectorNavbar2 />
    <div className={clsx(styles["property-details"], className)}>
      <main className={styles["property-details__main"]}>
        <MainPanel className={styles["property-details__main"]}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={10} offset={{ lg: 1 }}>
                <Card shadow className={styles["property-details__card"]}>
                  <Grid.Row nogutter>
                    <Grid.Col lg={6}>
                      <div className={styles["property-details__left"]}>
                        <Card.Content>
                          <Typography.Headline2>Do your own research</Typography.Headline2>
                          <Typography.TextLead>
                            NEAR Holdings is a decentralized application. The assets posted here were audited by our
                            internal team, but there are still risks involded.
                          </Typography.TextLead>
                          <Typography.TextLead>Read carefully:</Typography.TextLead>
                          <Typography.TextBold>What happens upon buying shares</Typography.TextBold>
                          <Typography.Text>
                            When you click on “Buy Shares”, you’ll be redirected to the NEAR Wallet page to make a
                            transfer transaction.
                          </Typography.Text>
                        </Card.Content>
                        <div className={styles["property-details__actions--secondary"]}>
                          <Button color="secondary" variant="outlined">
                            Back
                          </Button>
                          <Button color="secondary" variant="outlined">
                            More
                          </Button>
                        </div>
                      </div>
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <PropertyCard
                        action={
                          <Button color="primary" fullWidth>
                            Buy Shares
                          </Button>
                        }
                      />
                    </Grid.Col>
                  </Grid.Row>
                </Card>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </MainPanel>
      </main>
    </div>
    <Footer />
  </>
);
