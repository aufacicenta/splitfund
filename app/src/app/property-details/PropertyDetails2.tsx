import clsx from "clsx";
import { useState } from "react";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Footer } from "ui/footer/Footer";
import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { PropertyCard } from "app/properties-index/property-card/PropertyCard";
import { Modal } from "ui/modal/Modal";

import styles from "./PropertyDetails2.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails2.types";
import { InvestmentDetails2 } from "./investment-details/InvestmentDetails2";

export const PropertyDetails2: React.FC<PropertyDetailsProps> = ({ className }) => {
  const [isInvestmentDetailsModalOpen, setIsInvestmentDetailsModalOpen] = useState(false);

  return (
    <>
      <WalletSelectorNavbar2 />
      <div className={clsx(styles["property-details"], className)}>
        <main className={styles["property-details__main"]}>
          <MainPanel className={styles["property-details__main"]}>
            <Grid.Container>
              <Grid.Row>
                <Grid.Col lg={10} offset={{ lg: 1 }}>
                  <Card shadow className={styles["property-details__card"]}>
                    <Grid.Row nogutter className={styles["property-details__row-reverse"]}>
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
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col lg={6}>
                        <PropertyCard
                          action={
                            <Button color="primary" fullWidth onClick={() => setIsInvestmentDetailsModalOpen(true)}>
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

      {isInvestmentDetailsModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Withdrawal Conditions Modal Window">
          <Modal.Header onClose={() => setIsInvestmentDetailsModalOpen(false)}>
            <Typography.Headline3 flat>Investment Details</Typography.Headline3>
          </Modal.Header>
          <InvestmentDetails2 contractAddress="ce_98-2_gt.escrowfactory.nearholdings.testnet" />
        </Modal>
      )}
    </>
  );
};
