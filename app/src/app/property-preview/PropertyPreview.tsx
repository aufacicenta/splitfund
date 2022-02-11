import clsx from "clsx";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { Footer } from "ui/footer/Footer";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { PropertyCard } from "app/properties-index/property-card/PropertyCard";
import { Button } from "ui/button/Button";

import styles from "./PropertyPreview.module.scss";
import { PropertyPreviewProps } from "./PropertyPreview.types";

const onClickSubmitAsset = () =>
  // @TODO call the NEAR Holdings Sputnik2 DAO contract to create a function_call proposal to the Conditional Escrow factory
  null;

export const PropertyPreview: React.FC<PropertyPreviewProps> = ({ className, property }) => (
  <>
    <WalletSelectorNavbar />
    <div className={clsx(styles["property-preview"], className)}>
      <main className={styles["property-preview__main"]}>
        <MainPanel className={styles["property-preview__main"]}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={10} offset={{ lg: 1 }}>
                <Card shadow className={styles["property-preview__card"]}>
                  <Grid.Row nogutter className={styles["property-preview__row-reverse"]}>
                    <Grid.Col lg={6}>
                      <div className={styles["property-preview__left"]}>
                        <Card.Content>
                          <Typography.Headline2>Asset Preview</Typography.Headline2>
                          <Typography.TextLead>
                            This is how your asset will look once it gets published.
                          </Typography.TextLead>
                          <Typography.TextLead>
                            Publishing an asset does not guarantee that it will be listed in our site.
                          </Typography.TextLead>
                          <Typography.TextLead>This is what happens after you submit:</Typography.TextLead>
                          <div className={styles["property-preview__left--content"]}>
                            <Typography.TextBold>1. The asset information is uploaded to IPFS</Typography.TextBold>
                            <Typography.Text>
                              IPFS is a decentralized storage technology. The information gets encoded using advanced
                              cryptography and it is retrievable by a URL, in fact{" "}
                              <Typography.Anchor href={property.media.ipfsURL} target="_blank">
                                here's your asset metadata
                              </Typography.Anchor>
                              .
                            </Typography.Text>
                            <Typography.Text>
                              The information stored in IPFS cannot be removed, censored or changed.
                            </Typography.Text>
                            <Typography.TextBold>2. A NEAR contract will be created</Typography.TextBold>
                            <Typography.Text>
                              The IPFS URL that holds the information of this asset will be stored in the NEAR
                              blockchain in a new Conditional Escrow contract. It is open-source and auditable. You can{" "}
                              <Typography.Anchor
                                href="https://github.com/aufacicenta/near.holdings/blob/master/rust-escrow/conditional-escrow/src/lib.rs"
                                target="_blank"
                              >
                                look at the code here.
                              </Typography.Anchor>
                            </Typography.Text>
                            <Typography.Text>
                              This contract gets deployed by{" "}
                              <Typography.Anchor
                                href="https://github.com/aufacicenta/near.holdings/blob/master/rust-escrow/src/lib.rs"
                                target="_blank"
                              >
                                another contract
                              </Typography.Anchor>
                              , which acts a factory and keeps a record of all the Conditional Escrow contracts ever
                              deployed by our dApp. The factory is what will be actually executed after you hit
                              "Confirm".
                            </Typography.Text>
                            <Typography.TextBold>
                              The asset information is reviewed by the NEAR Holdings DAO
                            </Typography.TextBold>
                            <Typography.Text>...</Typography.Text>
                          </div>
                        </Card.Content>
                        <div className={styles["property-preview__actions--secondary"]}>
                          <Button color="secondary" variant="outlined">
                            Back
                          </Button>
                        </div>
                      </div>
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <PropertyCard
                        property={property}
                        action={
                          <Button color="primary" fullWidth onClick={onClickSubmitAsset}>
                            Submit for Review
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
