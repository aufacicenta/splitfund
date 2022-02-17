import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Card } from "ui/card/Card";
import { Modal } from "ui/modal/Modal";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { CircularProgress } from "ui/circular-progress/CircularProgress";
import { Button } from "ui/button/Button";
import { useNearContract } from "hooks/useNearContract/useNearContract";
import near from "providers/near";
import { ContractDepositFormProps } from "../contract-deposit-form/ContractDepositForm.types";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";
import date from "providers/date";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { CHANGE_METHODS, VIEW_METHODS } from "providers/near/contract/conditional-escrow";
import { ConditionalEscrowMethods } from "providers/near/contract/conditional-escrow.types";

import styles from "./InvestmentDetails.module.scss";
import { InvestmentDetailsProps, OnSubmitDeposit } from "./InvestmentDetails.types";

const ContractDepositForm = dynamic<ContractDepositFormProps>(
  () => import("../contract-deposit-form/ContractDepositForm").then((mod) => mod.ContractDepositForm),
  { ssr: false },
);

export const InvestmentDetails2: React.FC<InvestmentDetailsProps> = ({
  contractAddress,
  contractData,
  isContractDataLoading,
}) => {
  const [isBuyOwnershipInfoModalOpen, setIsBuyOwnershipInfoModalOpen] = useState(false);
  const [isCurrentInvestorsModalOpen, setIsCurrentInvestorsModalOpen] = useState(false);
  const [isWithdrawalConditionsModalOpen, setIsWithdrawalConditionsModalOpen] = useState(false);
  const [isWithdrawalLoading, setIsWithdrawalLoading] = useState(false);
  const [isDelegateFundsLoading, setIsDelegateFundsLoading] = useState(false);

  const toast = useToastContext();

  const wallet = useWalletSelectorContext();

  const contract = useNearContract<ConditionalEscrowMethods>(wallet, contractAddress, {
    viewMethods: VIEW_METHODS,
    changeMethods: CHANGE_METHODS,
  });

  const onClickAuthorizeWallet = () => {
    wallet.onClickConnect({
      contractId: contractAddress,
      methodNames: [...VIEW_METHODS, ...CHANGE_METHODS],
    });
  };

  const onClickInvestNow = async () => {
    setIsBuyOwnershipInfoModalOpen(true);
  };

  const onClickDelegateFunds = async () => {
    if (!contract) {
      toast.trigger({
        variant: "error",
        title: "No contract is loaded",
        withTimeout: true,
        children: <Typography.Text>Check your internet connection and try refreshing the page.</Typography.Text>,
      });
    }

    try {
      const daoName = contractAddress.split(".").shift();

      setIsDelegateFundsLoading(true);
      await contract!.delegate_funds({ dao_name: daoName! }, 300000000000000);
      setIsDelegateFundsLoading(false);

      const daoContractName = `${daoName}.${near.getConfig(wallet.network).daoContractName}`;

      // @TODO i18n
      toast.trigger({
        variant: "confirmation",
        title: "Delegate funds successful",
        withTimeout: true,
        children: (
          <Typography.Text>
            Great.{" "}
            <Typography.Anchor href={`${near.getConfig(wallet.network).astroDaoURLOrigin}/${daoContractName}`}>
              {daoContractName}
            </Typography.Anchor>{" "}
            has been created.
          </Typography.Text>
        ),
      });
    } catch {
      setIsDelegateFundsLoading(false);
      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Delegate Funds error",
        withTimeout: false,
        children: <Typography.Text>Your funds are safe, check your internet connection and try again.</Typography.Text>,
      });
    }
  };

  const onClickWithdraw = async () => {
    if (!contract) {
      toast.trigger({
        variant: "error",
        title: "No contract is loaded",
        withTimeout: true,
        children: <Typography.Text>Check your internet connection and try refreshing the page.</Typography.Text>,
      });
    }

    try {
      setIsWithdrawalLoading(true);
      await contract!.withdraw();
      setIsWithdrawalLoading(false);

      // @TODO i18n
      toast.trigger({
        variant: "confirmation",
        title: "Withdrawal successful",
        withTimeout: true,
        children: <Typography.Text>Your funds have been withdrawn to your wallet</Typography.Text>,
      });
    } catch {
      setIsWithdrawalLoading(false);
      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Withdrawal error",
        withTimeout: false,
        children: <Typography.Text>Your funds are safe, check your internet connection and try again.</Typography.Text>,
      });
    }
  };

  const onSubmitDeposit = async ({ amount }: OnSubmitDeposit) => {
    if (!contract) {
      toast.trigger({
        variant: "error",
        title: "No contract is loaded",
        withTimeout: true,
        children: <Typography.Text>Check your internet connection and try refreshing the page.</Typography.Text>,
      });
    }

    try {
      await contract!.deposit({}, undefined, near.parseNearAmount(amount));
    } catch {
      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Deposit error",
        withTimeout: false,
        children: <Typography.Text>Your funds are safe, check your internet connection and try again.</Typography.Text>,
      });
    }
  };

  const getActions = () => {
    if (!wallet.isConnected) {
      return (
        <Button color="primary" onClick={onClickAuthorizeWallet} isLoading={isContractDataLoading}>
          Authorize Wallet
        </Button>
      );
    }

    if (contractData.daoName !== "") {
      return (
        <>
          <Typography.Description flat>TBD</Typography.Description>
          {/* @TODO onClickEnableStaking */}
          <Button color="primary" onClick={() => undefined} isLoading={isContractDataLoading} disabled>
            Enable Staking
          </Button>
        </>
      );
    }

    const isDelegateFundsEnabled = !contractData.isDepositAllowed && !contractData.isWithdrawalAllowed;

    if (isDelegateFundsEnabled) {
      return (
        <>
          <Typography.Description flat>The asset is 100% funded</Typography.Description>
          <Button
            color="primary"
            onClick={onClickDelegateFunds}
            isLoading={isContractDataLoading || isDelegateFundsLoading}
          >
            Delegate Funds
          </Button>
        </>
      );
    }

    if (contractData.isDepositAllowed && !contractData.isWithdrawalAllowed) {
      return (
        <>
          <Typography.Description flat>
            {`Offer expires ${date.timeFromNow
              .calendar(date.fromNanoseconds(contractData.expirationDate!))
              .toLowerCase()}`}
          </Typography.Description>
          <Button color="primary" onClick={onClickInvestNow} isLoading={isContractDataLoading}>
            Invest Now
          </Button>
        </>
      );
    }

    return (
      <>
        <Typography.Description flat>
          {`Offer expired ${date.timeFromNow
            .calendar(date.fromNanoseconds(contractData.expirationDate!))
            .toLowerCase()}`}
        </Typography.Description>
        <Button
          color="primary"
          onClick={onClickWithdraw}
          isLoading={isWithdrawalLoading || isContractDataLoading}
          disabled={contractData.depositsOf === "0"}
        >
          Withdraw
        </Button>
      </>
    );
  };

  return (
    <>
      <Card>
        <Card.Content>
          <div className={styles["investment-details__sold"]}>
            <div className={styles["investment-details__circular-progress"]}>
              <CircularProgress size={70} strokeWidth={5} percentage={contractData.totalFundedPercentage} />
            </div>
            <div className={styles["investment-details__sold-description"]}>
              <Typography.Description>Funded</Typography.Description>
              <Typography.Text flat>{near.formatAccountBalance(contractData.totalFunds, 8)}</Typography.Text>
              <Typography.MiniDescription>
                {`${contractData.totalFundedPercentage}% of property price`} ·{" "}
                {`${date.timeFromNow.asDefault(date.fromNanoseconds(contractData.expirationDate!)).toLowerCase()}`}
              </Typography.MiniDescription>
            </div>
          </div>
          <div className={styles["investment-details__price"]}>
            <div className={styles["investment-details__price-heading"]}>
              <Typography.TextBold className={styles["investment-details__price-heading-text"]} flat>
                Price
              </Typography.TextBold>
            </div>
            <div className={styles["investment-details__price-description"]}>
              <Typography.TextBold flat>{contractData.fundingAmountLimit}</Typography.TextBold>
              <Typography.MiniDescription>
                {formatFiatCurrency(contractData.priceEquivalence!)} USD ·{" "}
                <Typography.Anchor href="#">1 Ⓝ = {contractData.currentCoinPrice} USD</Typography.Anchor>
              </Typography.MiniDescription>
            </div>
          </div>
          <hr />
          <Grid.Row>
            <Grid.Col lg={6} xs={6}>
              <Typography.TextBold flat># of NEAR wallets</Typography.TextBold>
              <Typography.MiniDescription
                onClick={() => setIsCurrentInvestorsModalOpen(true)}
                className={styles["investment-details__clickable"]}
              >
                See current investors
              </Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col>
              <Typography.Text>{contractData.deposits?.length}</Typography.Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col lg={6} xs={6}>
              <Typography.TextBold flat>Your current deposit</Typography.TextBold>
              <Typography.MiniDescription
                onClick={() => setIsWithdrawalConditionsModalOpen(true)}
                className={styles["investment-details__clickable"]}
              >
                See withdrawal conditions
              </Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col>
              <Typography.Text flat>{near.formatAccountBalance(contractData.depositsOf)}</Typography.Text>
              <Typography.MiniDescription>{`${contractData.depositsOfPercentage}% of property price`}</Typography.MiniDescription>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col lg={6} xs={6}>
              <Typography.TextBold flat>Available balance</Typography.TextBold>
              <Typography.MiniDescription>On wallet: {wallet.address}</Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col>
              <Typography.Text>{wallet.balance}</Typography.Text>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row nowrap>
            <Grid.Col lg={6} xs={6}>
              <Typography.TextBold flat>Escrow Contract</Typography.TextBold>
              <Typography.MiniDescription>Your money is secured by the NEAR Protocol</Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col>
              <Typography.Text>
                <Typography.Anchor href={`${wallet.explorer}/accounts/${contractAddress}`} truncate target="_blank">
                  {contractAddress}
                </Typography.Anchor>
              </Typography.Text>
            </Grid.Col>
          </Grid.Row>
        </Card.Content>
        <Card.Actions>{getActions()}</Card.Actions>
      </Card>

      {isBuyOwnershipInfoModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Buy Ownership Modal Window">
          <Modal.Header>
            <Typography.Headline3 flat className={styles["investment-details__register-interest-modal--header"]}>
              Buy Property Ownership
            </Typography.Headline3>
          </Modal.Header>
          <Modal.Content>
            <Typography.Text>
              {`Buying NEAR Real Estate NFT properties' ownership is anonymous and as simple as transfering any amount
                of NEAR to the Property Escrow Contract.`}
            </Typography.Text>
            <Typography.Text>
              Your funds stay securely on-hold and can be withdrawn only if the expiration date is reached and the price
              has not been totally funded.
            </Typography.Text>
            <hr />
            <Typography.Headline4>FAQs</Typography.Headline4>
            <Typography.Headline5>What happens if the property is totally funded?</Typography.Headline5>
            <Typography.Text>
              The funds will be transfered to a DAO where you will be a member. Your voting power in the DAO will be
              proportional to your investment.
            </Typography.Text>
            <Typography.Headline5>How does voting power is calculated?</Typography.Headline5>
            <Typography.Text>
              If the property is totally funded before the expiration date, an equivalent amount of NEP-141 tokens will
              be minted and you will be transfered the amount proportional to your investment. These tokens represent
              your voting power in the DAO and you can trade them whenever you like. Their value represents the property
              value.
            </Typography.Text>
            <Typography.Headline5>Who is the real world owner of the property?</Typography.Headline5>
            <Typography.Text>This is up to each DAO council to decide.</Typography.Text>
            <Typography.Headline5>
              If the funds are in NEAR Tokens, how is the property purchased with Fiat currency?
            </Typography.Headline5>
            <Typography.Text>
              Each DAO council can decide how to exchange the NEAT token mutual funds to a currency that the property
              seller expects.
            </Typography.Text>
            <Typography.Headline5>Is there a minimum deposit amount that I can invest?</Typography.Headline5>
            <Typography.Text>
              No, but keep in mind that the voting power you will have in the DAO council will be proportional to the
              investment relative to the property price.
            </Typography.Text>
            <hr />
            <Typography.Headline4>Owner Entitlement Details</Typography.Headline4>
            <hr />
            <Typography.Headline4>Owner Obligations Details</Typography.Headline4>
            <hr />
            <Typography.Headline4>Risks</Typography.Headline4>
          </Modal.Content>
          <Modal.Actions>
            <ContractDepositForm
              isLoading={false}
              onSubmit={(val) => onSubmitDeposit(val as OnSubmitDeposit)}
              autoFocus
              label={`Amount (${contractData.unpaidFundingAmount} remaining)`}
              onCancel={() => setIsBuyOwnershipInfoModalOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      )}

      {isCurrentInvestorsModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Current Investors Modal Window">
          <Modal.Header onClose={() => setIsCurrentInvestorsModalOpen(false)}>
            <Typography.Headline3 flat className={styles["investment-details__register-interest-modal--header"]}>
              Current Investors
            </Typography.Headline3>
          </Modal.Header>
          <Modal.Content>
            {contractData.deposits?.length &&
              contractData.deposits?.map((deposit) => (
                <Grid.Row key={deposit[0]}>
                  <Grid.Col>
                    <Typography.Text>{deposit[0]}</Typography.Text>
                  </Grid.Col>
                  <Grid.Col>
                    <Typography.Text>{near.formatAccountBalance(BigInt(deposit[1]).toString())}</Typography.Text>
                  </Grid.Col>
                </Grid.Row>
              ))}
          </Modal.Content>
        </Modal>
      )}

      {isWithdrawalConditionsModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Withdrawal Conditions Modal Window">
          <Modal.Header onClose={() => setIsWithdrawalConditionsModalOpen(false)}>
            <Typography.Headline3 flat className={styles["investment-details__register-interest-modal--header"]}>
              Withdrawal Conditions
            </Typography.Headline3>
          </Modal.Header>
          <Modal.Content>
            <Typography.Text>
              The ability to withdraw your funds is coded into the NEAR Smart Contract that holds the funds temporarily.
              This contract has been audited to ensure the security of your funds.
            </Typography.Text>
            <Typography.Text>
              {`For this contract, you'll be able to withdraw your funds ${date.timeFromNow
                .calendar(date.fromNanoseconds(contractData.expirationDate!))
                .toLowerCase()} AND if the property price has not been totally funded.`}
            </Typography.Text>
            <Typography.Anchor href="#" target="_blank">
              See contract code
            </Typography.Anchor>
            <br />
            <Typography.Anchor href="#" target="_blank">
              See in explorer
            </Typography.Anchor>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};
