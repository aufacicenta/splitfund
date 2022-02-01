import clsx from "clsx";
import { Hidden } from "react-grid-system";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Footer } from "ui/footer/Footer";

import styles from "./PropertyDetails.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails.types";
import { InvestmentDetails } from "./investment-details/InvestmentDetails";
import { PropertyContent } from "./property-content/PropertyContent";
import { PropertyHeader } from "./property-header/PropertyHeader";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ className, property }) => (
  /**
   * @TODO parse http://localhost:3001/p/example-property-slug_gt?transactionHashes=Hn8MmpofgPfoP1ibDeX3qEPhmoVwjwrT1mwpVmHrxQbc
   * get transactionHashes from URL query and display a modal for transaction info
   * create a TransactionParser component?
   *
   * @TODO parse &errorCode=userRejected&errorMessage=User%2520rejected%2520transaction
   * from when a user rejects the transaction on the NEAR wallet
   */

  <>
    <WalletSelectorNavbar />
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
                            backgroundImage: `url(${property.content.media.featuredImageUrl})`,
                          }}
                        />
                      </Card.Content>
                    </Card>
                  </div>
                  <div className={clsx(styles["property-details__details"])}>
                    <PropertyHeader property={property} />
                    <Hidden lg md xl xxl>
                      <InvestmentDetails
                        contractAddress={property.content.customFields.nearConditionalEscrowContractAddress}
                      />
                    </Hidden>
                    <PropertyContent content={property.content} />
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col lg={4}>
                <div className={clsx(styles["property-details__sidebar"])}>
                  <Hidden xs sm>
                    <InvestmentDetails
                      contractAddress={property.content.customFields.nearConditionalEscrowContractAddress}
                    />
                  </Hidden>
                </div>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </MainPanel>
      </main>
    </div>
    <Footer />
  </>
);
