import clsx from "clsx";
import { useEffect, useState } from "react";
import { BN } from "bn.js";
import { useGetPropertyCardByResponseIdQuery } from "api/codegen";
import { useRouter } from "next/router";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { Footer } from "ui/footer/Footer";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { PropertyCard } from "app/properties-index/property-card/PropertyCard";
import { Button } from "ui/button/Button";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { Modal } from "ui/modal/Modal";
import near from "providers/near";
import date from "providers/date";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { GenericLoader } from "ui/generic-loader/GenericLoader";
import { PropertyCardProps } from "app/properties-index/property-card/PropertyCard.types";

import { PropertyPreviewProps } from "./PropertyPreview.types";
import styles from "./PropertyPreview.module.scss";

export const PropertyPreview: React.FC<PropertyPreviewProps> = ({ className, responseId }) => {
  const [isAuthorizeWalletModalOpen, setIsAuthorizeWalletModalOpen] = useState(false);
  const [property, setProperty] = useState<PropertyCardProps["property"]>({
    title: "Loading",
    price: 0,
    shortDescription: "Loading",
    longDescription: "Loading",
    category: "Loading",
    expirationDate: "MM/DD/YYYY",
    media: { featuredImageUrl: "/property-details/near-holdings-icon-loading-template.jpg", ipfsURL: "ipfs://" },
  });

  const wallet = useWalletSelectorContext();
  const toast = useToastContext();
  const routes = useRoutes();
  const router = useRouter();

  const {
    data: getPropertyCardByResponseIdQueryData,
    error: getPropertyCardByResponseIdQueryError,
    loading: isGetPropertyCardByResponseIdQueryLoading,
  } = useGetPropertyCardByResponseIdQuery({
    variables: { input: { responseId } },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!getPropertyCardByResponseIdQueryData?.getPropertyCardByResponseId) {
      return;
    }

    setProperty(getPropertyCardByResponseIdQueryData.getPropertyCardByResponseId);
  }, [getPropertyCardByResponseIdQueryData]);

  if (isGetPropertyCardByResponseIdQueryLoading) {
    return <GenericLoader />;
  }

  if (
    getPropertyCardByResponseIdQueryError ||
    (!isGetPropertyCardByResponseIdQueryLoading && !getPropertyCardByResponseIdQueryData?.getPropertyCardByResponseId)
  ) {
    router.push(routes.notFound);

    return null;
  }

  const onClickSubmitAsset = async () => {
    if (!wallet.isConnected) {
      setIsAuthorizeWalletModalOpen(true);

      return null;
    }

    try {
      const conditionalEscrowContractName = `ce_${responseId}`.slice(0, 25);

      const conditionalEscrowArgs = Buffer.from(
        JSON.stringify({
          expires_at: date.toUtcOffsetNanoseconds(property.expirationDate),
          funding_amount_limit: near.parseNearAmount(property.price.toString()),
          dao_factory_account_id: near.getConfig(wallet.network).daoFactoryContractName,
          ft_factory_account_id: near.getConfig(wallet.network).ftFactoryContractName,
          metadata_url: property.media.ipfsURL,
        }),
      ).toString("base64");

      const args = {
        name: conditionalEscrowContractName,
        args: conditionalEscrowArgs,
      };

      await wallet.context.connection?.account().functionCall({
        methodName: "create_conditional_escrow",
        walletCallbackUrl: `${window.origin}${routes.property.index(
          `${conditionalEscrowContractName}.${near.getConfig(wallet.network).escrowFactoryContractName}`,
        )}`,
        contractId: near.getConfig(wallet.network).escrowFactoryContractName,
        args,
        gas: new BN("300000000000000"),
        attachedDeposit: new BN(near.parseNearAmount("2")!),
      });

      toast.trigger({
        variant: "confirmation",
        title: "Success",
        withTimeout: true,
        children: (
          <Typography.Text>
            Your asset was submitted successfully, NEAR Holdings council will review it shortly.
          </Typography.Text>
        ),
      });
    } catch {
      toast.trigger({
        variant: "error",
        title: "Error",
        withTimeout: true,
        children: (
          <Typography.Text>
            An error occurred while creating the contract for your asset. Try again later.
          </Typography.Text>
        ),
      });
    }

    return null;
  };

  const onClickAuthorizeWallet = () => {
    wallet.onClickConnect({
      contractId: near.getConfig(wallet.network).escrowFactoryContractName,
      methodNames: ["create_conditional_escrow"],
      successUrl: `${window.origin}/p/preview?responseId=${responseId}`,
    });
  };

  return (
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
                                blockchain in a new Conditional Escrow contract. It is open-source and auditable. You
                                can{" "}
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
                              Submit
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

      {isAuthorizeWalletModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Withdrawal Conditions Modal Window">
          <Modal.Header>
            <Typography.Headline3 flat>Authorize NEAR Wallet</Typography.Headline3>
          </Modal.Header>
          <Modal.Content>
            <Typography.Text>
              Submit an asset to the NEAR blockchain by connecting to your NEAR wallet and authorize the transaction.
            </Typography.Text>
          </Modal.Content>
          <Modal.Actions>
            <div>
              <Button color="secondary" variant="outlined" onClick={() => setIsAuthorizeWalletModalOpen(false)}>
                Nevermind
              </Button>
            </div>
            <div>
              <Button onClick={onClickAuthorizeWallet}>Authorize Wallet</Button>
            </div>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};
