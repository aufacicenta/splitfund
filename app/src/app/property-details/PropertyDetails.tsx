import clsx from "clsx";

import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
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
                    <section>
                      <Typography.Headline3>Location</Typography.Headline3>
                      <div className={styles["property-details__location"]}>
                        <div className={styles["property-details__attachments--overlay"]}>
                          <div>
                            <Typography.Text className={styles["property-details__attachments--overlay-text"]}>
                              Sensitive information is encrypted for security.
                            </Typography.Text>
                            <Button size="xs" variant="outlined" onClick={() => setIsRegisterInterestModalOpen(true)}>
                              Register Interest
                            </Button>
                          </div>
                        </div>
                        <div
                          className={styles["property-details__location--map"]}
                          style={{
                            backgroundImage: `url(https://bafybeiguy4ekrxh6aohstla5syhk557jzkvvbxib6p6ii4tllqw4llc47y.ipfs.infura-ipfs.io/Screen%20Shot%202021-09-15%20at%2014.13.35.png)`,
                          }}
                        />
                        <Typography.Subtitle>Antigua, Guatemala</Typography.Subtitle>
                        <Typography.Text>Villas de San Francisco, 33-D</Typography.Text>
                      </div>
                    </section>
                    <section>
                      <Typography.Headline3>Attachments</Typography.Headline3>
                      <div className={styles["property-details__attachments"]}>
                        <div className={styles["property-details__attachments--overlay"]}>
                          <div>
                            <Typography.Text className={styles["property-details__attachments--overlay-text"]}>
                              Sensitive information is encrypted for security.
                            </Typography.Text>
                            <Button size="xs" variant="outlined" onClick={() => setIsRegisterInterestModalOpen(true)}>
                              Register Interest
                            </Button>
                          </div>
                        </div>
                        <Grid.Row>
                          <Grid.Col lg={6}>
                            <Card
                              className={styles["property-details__attachments--card"]}
                              backgroundImageUrl="https://img.flaticon.com/icons/png/512/337/337946.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                              onClick={() => null}
                            >
                              <Card.Content className={styles["property-details__attachments--content"]}>
                                <Typography.Text>Real Estate Contract</Typography.Text>
                              </Card.Content>
                            </Card>
                          </Grid.Col>
                          <Grid.Col lg={6}>
                            <Card
                              className={styles["property-details__attachments--card"]}
                              backgroundImageUrl="https://img.flaticon.com/icons/png/512/337/337946.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                              onClick={() => null}
                            >
                              <Card.Content className={styles["property-details__attachments--content"]}>
                                <Typography.Text>Bank Statement</Typography.Text>
                              </Card.Content>
                            </Card>
                          </Grid.Col>
                          <Grid.Col lg={6}>
                            <Card
                              className={styles["property-details__attachments--card"]}
                              backgroundImageUrl="https://img.flaticon.com/icons/png/512/337/337946.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                              onClick={() => null}
                            >
                              <Card.Content className={styles["property-details__attachments--content"]}>
                                <Typography.Text>Energy Bill</Typography.Text>
                              </Card.Content>
                            </Card>
                          </Grid.Col>
                          <Grid.Col lg={6}>
                            <Card
                              className={styles["property-details__attachments--card"]}
                              backgroundImageUrl="https://img.flaticon.com/icons/png/512/337/337946.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
                              onClick={() => null}
                            >
                              <Card.Content className={styles["property-details__attachments--content"]}>
                                <Typography.Text>Rental Contract</Typography.Text>
                              </Card.Content>
                            </Card>
                          </Grid.Col>
                        </Grid.Row>
                      </div>
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
