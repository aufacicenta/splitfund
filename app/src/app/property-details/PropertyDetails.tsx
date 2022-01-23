import clsx from "clsx";
import { useState } from "react";

import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { CircularProgress } from "ui/circular-progress/CircularProgress";
import { Modal } from "ui/modal/Modal";

import styles from "./PropertyDetails.module.scss";
import { PropertyDetailsProps } from "./PropertyDetails.types";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ className }) => {
  const [isRegisterInterestModalOpen, setIsRegisterInterestModalOpen] = useState(false);
  const [isBuyOwnershipInfoModalOpen, setIsBuyOwnershipInfoModalOpen] = useState(false);

  return (
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
                    <Card shadow>
                      <Card.Content>
                        <Typography.Headline2 className={styles["property-details__sidebar--heading2"]}>
                          Investment Details
                        </Typography.Headline2>
                        <div className={styles["property-details__sidebar--sold"]}>
                          <div className={styles["property-details__sidebar--circular-progress"]}>
                            <CircularProgress size={70} strokeWidth={5} percentage={80} />
                          </div>
                          <div className={styles["property-details__sidebar--sold-description"]}>
                            <Typography.Description>Funded</Typography.Description>
                            <Typography.Text flat>345.02 Ⓝ</Typography.Text>
                            <Typography.MiniDescription>
                              80% of property price · <Typography.Anchor href="#">1 Ⓝ = 11.99 USD</Typography.Anchor>
                            </Typography.MiniDescription>
                          </div>
                        </div>
                        <Grid.Row>
                          <Grid.Col lg={6}>
                            <Typography.TextBold flat>Price</Typography.TextBold>
                          </Grid.Col>
                          <Grid.Col>
                            <Typography.Text flat>30,456.00 Ⓝ</Typography.Text>
                            <Typography.MiniDescription>150,000.00 USD</Typography.MiniDescription>
                          </Grid.Col>
                        </Grid.Row>
                        <hr />
                        <Grid.Row>
                          <Grid.Col lg={6}>
                            <Typography.TextBold flat># of NEAR wallets</Typography.TextBold>
                            <Typography.MiniDescription>See current investors</Typography.MiniDescription>
                          </Grid.Col>
                          <Grid.Col>
                            <Typography.Text>123</Typography.Text>
                          </Grid.Col>
                        </Grid.Row>
                        <Grid.Row nowrap>
                          <Grid.Col lg={6}>
                            <Typography.TextBold flat>Escrow Contract</Typography.TextBold>
                            <Typography.MiniDescription>
                              Your money is secured by the NEAR Protocol
                            </Typography.MiniDescription>
                          </Grid.Col>
                          <Grid.Col>
                            <Typography.Text>
                              <Typography.Anchor href="#">ce_gt_123.escrow...</Typography.Anchor>
                            </Typography.Text>
                          </Grid.Col>
                        </Grid.Row>
                      </Card.Content>
                      <Card.Actions>
                        <Button>Invest Now</Button>
                        <Typography.Description>
                          Offer expires in 15 days:
                          <br />
                          Sun, Feb 26, 2022 00:00:00 GMT-0
                        </Typography.Description>
                      </Card.Actions>
                    </Card>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </MainPanel>
        </main>

        {isBuyOwnershipInfoModalOpen && (
          <Modal isOpened onClose={() => null} aria-labelledby="Register Interest Modal Window">
            <Modal.Header>
              <Typography.Headline3 className={styles["property-details__register-interest-modal--header"]}>
                Buy Property Ownership
              </Typography.Headline3>
            </Modal.Header>
            <Modal.Content>
              <Typography.Text>
                {`Buying Solana Real Estate NFT properties' ownership is anonymous and as simple as transfering any amount
                of SOL (lower than the total, of course) to the Property Sale Program.`}
              </Typography.Text>
              <Typography.Headline5>Owner Entitlement Details</Typography.Headline5>
              <Typography.Description>365 days of the year = 100% of the property value</Typography.Description>
              <Typography.Text>
                As an owner of property{" "}
                <Typography.Anchor>metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s</Typography.Anchor> you are entitled to:
              </Typography.Text>
              <Typography.Text>
                a) Access the property by N% of days of the 365 days relative to the percentage of your ownership.
              </Typography.Text>
              <Typography.Text>b) ...</Typography.Text>
              <Typography.Headline5>Owner Obligations Details</Typography.Headline5>
            </Modal.Content>
            <Modal.Actions>
              <Grid.Row>
                <Grid.Col>
                  <Button color="secondary" variant="outlined" onClick={() => setIsBuyOwnershipInfoModalOpen(false)}>
                    Nevermind
                  </Button>
                </Grid.Col>
                <Grid.Col>
                  <Button>Buy Ownership</Button>
                </Grid.Col>
              </Grid.Row>
            </Modal.Actions>
          </Modal>
        )}

        {isRegisterInterestModalOpen && (
          <Modal isOpened onClose={() => null} aria-labelledby="Register Interest Modal Window">
            <Modal.Header>
              <Typography.Headline3 className={styles["property-details__register-interest-modal--header"]}>
                Register Interest
              </Typography.Headline3>
            </Modal.Header>
            <Modal.Content>
              <Typography.Text>
                {`Solana Real Estate NFT properties are sold worldwide. To access senstitive information such as exact
                location & attachments, THE PLATFORM requests a payment of 2 SOL valid for 1 month of access to
                all properties' information`}
              </Typography.Text>
              <Typography.Headline5>OK, but how does it work?</Typography.Headline5>
              <Typography.Text>
                {`When a user creates an NFT through THE PLATFORM, attachment properties of the asset are encrypted in our
                servers so that the metadata is not stored in plain text. Then it is stored in the blockchain. By
                submitting your 2 SOL payment, the server whitelists your wallet public key and you'll be able to see
                the private content of any of the properties listed.`}
              </Typography.Text>
              <Typography.Headline5>OK, and where does the money go?</Typography.Headline5>
              <Typography.Text>
                THE PLATFORM is an open-source project, and the money is distributed across its maintainers to pay for
                hosting expenses and further development.
              </Typography.Text>
            </Modal.Content>
            <Modal.Actions>
              <Grid.Row>
                <Grid.Col>
                  <Button color="secondary" variant="outlined" onClick={() => setIsRegisterInterestModalOpen(false)}>
                    Nevermind
                  </Button>
                </Grid.Col>
                <Grid.Col>
                  <Button>Pay 2 SOL</Button>
                </Grid.Col>
              </Grid.Row>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    </>
  );
};
