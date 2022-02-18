import clsx from "clsx";
import { useState } from "react";

import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Footer } from "ui/footer/Footer";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { Modal } from "ui/modal/Modal";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { PropertyCardContainer } from "app/properties-explorer/property-card/PropertyCardContainer";

import styles from "./PropertyDetails2.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails2.types";
import { InvestmentDetails2 } from "./investment-details/InvestmentDetails2";

export const PropertyDetails2: React.FC<PropertyDetailsProps> = ({
  className,
  contract,
  contractData,
  isContractDataLoading,
  contractAddress,
}) => {
  const [isInvestmentDetailsModalOpen, setIsInvestmentDetailsModalOpen] = useState(false);

  return (
    <>
      <WalletSelectorNavbar />
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
                            <div className={styles["property-details__left--content"]}>
                              <Typography.TextBold>What happens upon buying shares</Typography.TextBold>
                              <Typography.Text>
                                Once you connect your NEAR wallet, you’ll be redirected to https://wallet.near.org page
                                to make a <em>deposit</em> transaction for the amount of NEAR tokens you've input.
                              </Typography.Text>
                              <Typography.Text>
                                If the transaction completes successfully, your funds will securely be kept on-hold in
                                the CONTRACT_NAME_HERE contract. This contract is open-source and auditable.
                              </Typography.Text>
                              <Typography.TextBold>
                                Depositing does not mean you already own the shares
                              </Typography.TextBold>
                              <Typography.Text>
                                Shares of the asset are represented by NEP141 tokens, minted and transfered to your
                                wallet only if the asset price is funded by a 100%.
                              </Typography.Text>
                              <Typography.TextBold>
                                If the asset does not get funded within the expiration date
                              </Typography.TextBold>
                              <Typography.Text>
                                The expiration date has been programmed into the contract and it cannot be changed. If
                                the expiration date comes to an end and the asset price is not totally funded, you will
                                be able to withdraw your funds entirely (minus transaction and gas fees, but these are
                                very low).
                              </Typography.Text>
                            </div>
                          </Card.Content>
                          <div className={styles["property-details__actions--secondary"]}>
                            <Button color="secondary" variant="outlined">
                              Back
                            </Button>
                          </div>
                        </div>
                      </Grid.Col>
                      <Grid.Col lg={6}>
                        <PropertyCardContainer
                          minimal={false}
                          contractAddress={contractAddress}
                          action={
                            <Button
                              color="primary"
                              fullWidth
                              onClick={() => setIsInvestmentDetailsModalOpen(true)}
                              isLoading={isContractDataLoading}
                              disabled={isContractDataLoading}
                            >
                              Investment Details
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
          <InvestmentDetails2
            contractAddress={contractAddress}
            contract={contract}
            contractData={contractData}
            isContractDataLoading={isContractDataLoading}
          />
        </Modal>
      )}
    </>
  );
};
