import clsx from "clsx";

import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";

import styles from "./PropertyDetails.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails.types";
import { InvestmentDetails } from "./investment-details/InvestmentDetails";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ className }) => (
  /**
   * @TODO parse http://localhost:3001/p/example-property-slug_gt?transactionHashes=Hn8MmpofgPfoP1ibDeX3qEPhmoVwjwrT1mwpVmHrxQbc
   * get transactionHashes from URL query and display a modal for transaction info
   * create a TransactionParser component?
   *
   * @TODO parse &errorCode=userRejected&errorMessage=User%2520rejected%2520transaction
   * from when a user rejects the transaction on the NEAR wallet
   */

  <>
    <WalletSelectorNavbar>
      <WalletSelector />
    </WalletSelectorNavbar>
    <div className={clsx(styles["property-details"], className)}>
      <main className={styles["property-details__main"]}>
        <MainPanel>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={8}>
                <div className={styles["property-details__content"]}>
                  <div className={clsx(styles["property-details__media"])}>
                    <Card shadow>
                      <Card.Content>
                        <div
                          className={clsx(styles["property-details__media--featured-image"])}
                          style={{
                            backgroundImage: `url(https://bafybeiabp3jyc6pw5ynlsijphijkr2urbihr4errktlwybvco3xewarkfy.ipfs.infura-ipfs.io/avi-waxman-f9qZuKoZYoY-unsplash.jpeg)`,
                          }}
                        />
                      </Card.Content>
                    </Card>
                  </div>
                  <div className={clsx(styles["property-details__details"])}>
                    <section>
                      <Typography.Headline1>Property Name</Typography.Headline1>
                    </section>
                    <section>
                      <Typography.Headline3>Description</Typography.Headline3>
                      <Typography.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi deserunt quasi ipsa nulla?
                        Enim ad nobis officia ipsa. Exercitationem quos velit deserunt, perferendis perspiciatis
                        doloribus quam. Repellat fugit dignissimos illum!
                      </Typography.Text>
                    </section>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col lg={4}>
                <div className={clsx(styles["property-details__sidebar"])}>
                  <InvestmentDetails contractAddress="ce-example-property-slug_gt.fac3.escrowfactory.testnet" />
                </div>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </MainPanel>
      </main>
    </div>
  </>
);
