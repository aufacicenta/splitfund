import React, { useEffect, useState } from "react";
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
import getCoinCurrentPrice from "providers/currency/getCoinCurrentPrice";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";
import date from "providers/date";
import { useToastContext } from "hooks/useToastContext/useToastContext";

import styles from "./InvestmentDetails.module.scss";
import {
  ConditionalEscrowMethods,
  ConditionalEscrowValues,
  InvestmentDetailsProps,
  OnSubmitDeposit,
} from "./InvestmentDetails.types";

const VIEW_METHODS = [
  "deposits_of",
  "get_deposits",
  "get_total_funds",
  "get_expiration_date",
  "get_funding_amount_limit",
  "get_unpaid_funding_amount",
  "get_recipient_account_id",
  "is_deposit_allowed",
  "is_withdrawal_allowed",
];

const CHANGE_METHODS = ["deposit", "withdraw", "delegate_funds"];

const ContractDepositForm = dynamic<ContractDepositFormProps>(
  () => import("../contract-deposit-form/ContractDepositForm").then((mod) => mod.ContractDepositForm),
  { ssr: false },
);

const getDefaultContractValues = (): ConditionalEscrowValues => ({
  totalFunds: near.formatAccountBalance("0"),
  fundingAmountLimit: near.formatAccountBalance("0"),
  unpaidFundingAmount: near.formatAccountBalance("0"),
  depositsOf: "0",
  depositsOfPercentage: 0,
  currentCoinPrice: 0,
  priceEquivalence: 0,
  totalFundedPercentage: 0,
  expirationDate: date.toNanoseconds(date.now().toDate().getTime()),
  recipientAccountId: "",
  isDepositAllowed: false,
  isWithdrawalAllowed: false,
  deposits: [],
});

export const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ contractAddress }) => {
  const [isBuyOwnershipInfoModalOpen, setIsBuyOwnershipInfoModalOpen] = useState(false);
  const [isCurrentInvestorsModalOpen, setIsCurrentInvestorsModalOpen] = useState(false);
  const [isWithdrawalConditionsModalOpen, setIsWithdrawalConditionsModalOpen] = useState(false);
  const [isWithdrawalLoading, setIsWithdrawalLoading] = useState(false);
  const [values, setValues] = useState<ConditionalEscrowValues>(getDefaultContractValues());

  const toast = useToastContext();

  const wallet = useWalletSelectorContext();

  const contract = useNearContract<ConditionalEscrowMethods>(wallet, contractAddress, {
    viewMethods: VIEW_METHODS,
    changeMethods: CHANGE_METHODS,
  });

  useEffect(() => {
    if (!contract) {
      setValues(getDefaultContractValues());

      return;
    }

    const getConstantValues = async () => {
      const getTotalFundsResponse = await contract!.get_total_funds();
      const getFundingAmountLimitResponse = await contract!.get_funding_amount_limit();
      const getUnpaidFundingAmountResponse = await contract!.get_unpaid_funding_amount();
      const totalFundedPercentage =
        (BigInt(getTotalFundsResponse) * BigInt(100)) / BigInt(getFundingAmountLimitResponse);

      const isDepositAllowed = await contract!.is_deposit_allowed();
      const isWithdrawalAllowed = await contract!.is_withdrawal_allowed();

      const deposits = await contract!.get_deposits();
      const expirationDate = await contract!.get_expiration_date();
      const depositsOfResponse = await contract!.deposits_of({ payee: wallet.address ?? wallet.context.guest.address });
      const depositsOfPercentage = (BigInt(depositsOfResponse) * BigInt(100)) / BigInt(getFundingAmountLimitResponse);

      const currentCoinPrice = await getCoinCurrentPrice("near", "usd");
      const priceEquivalence =
        currentCoinPrice *
        Number(near.formatAccountBalanceFlat(BigInt(getFundingAmountLimitResponse).toString()).replace(",", ""));

      const recipientAccountId = await contract!.get_recipient_account_id();

      setValues({
        totalFunds: near.formatAccountBalance(BigInt(getTotalFundsResponse).toString()),
        fundingAmountLimit: near.formatAccountBalance(BigInt(getFundingAmountLimitResponse).toString()),
        unpaidFundingAmount: near.formatAccountBalance(BigInt(getUnpaidFundingAmountResponse).toString()),
        depositsOf: BigInt(depositsOfResponse).toString(),
        totalFundedPercentage: Number(totalFundedPercentage),
        depositsOfPercentage: Number(depositsOfPercentage),
        currentCoinPrice,
        priceEquivalence,
        deposits,
        expirationDate,
        isDepositAllowed,
        isWithdrawalAllowed,
        recipientAccountId,
      });
    };

    getConstantValues();
  }, [contract, wallet.address, wallet.context?.guest?.address]);

  const onClickAuthorizeWallet = () => {
    wallet.onClickConnect({
      contractId: contractAddress,
      methodNames: [...VIEW_METHODS, ...CHANGE_METHODS],
    });
  };

  const onClickInvestNow = async () => {
    setIsBuyOwnershipInfoModalOpen(true);
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
        <>
          <Button color="info" onClick={onClickAuthorizeWallet}>
            Authorize Wallet
          </Button>
          <Typography.Description>to load the contract details.</Typography.Description>
        </>
      );
    }

    if (values.isDepositAllowed && !values.isWithdrawalAllowed) {
      return (
        <>
          <Button color="info" onClick={onClickInvestNow}>
            Invest Now
          </Button>
          <Typography.Description>
            Offer expires
            <br />
            {date.timeFromNow.calendar(date.fromNanoseconds(values.expirationDate!)).toLowerCase()}
          </Typography.Description>
        </>
      );
    }

    return (
      <>
        <Button
          color="info"
          onClick={onClickWithdraw}
          isLoading={isWithdrawalLoading}
          disabled={values.depositsOf === "0"}
        >
          Withdraw
        </Button>
        <Typography.Description>
          Offer expired
          <br />
          {date.timeFromNow.calendar(date.fromNanoseconds(values.expirationDate!)).toLowerCase()}
        </Typography.Description>
      </>
    );
  };

  return (
    <>
      <Card shadow>
        <Card.Content>
          <Typography.Headline2 className={styles["investment-details__heading2"]}>
            Investment Details
          </Typography.Headline2>
          <div className={styles["investment-details__sold"]}>
            <div className={styles["investment-details__circular-progress"]}>
              <CircularProgress size={70} strokeWidth={5} percentage={values.totalFundedPercentage} />
            </div>
            <div className={styles["investment-details__sold-description"]}>
              <Typography.Description>Funded</Typography.Description>
              <Typography.Text flat>{values.totalFunds}</Typography.Text>
              <Typography.MiniDescription>
                {`${values.totalFundedPercentage}% of property price`} ·{" "}
                {`${date.timeFromNow.asDefault(date.fromNanoseconds(values.expirationDate!)).toLowerCase()}`}
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
              <Typography.TextBold flat>{values.fundingAmountLimit}</Typography.TextBold>
              <Typography.MiniDescription>
                {formatFiatCurrency(values.priceEquivalence!)} USD ·{" "}
                <Typography.Anchor href="#">1 Ⓝ = {values.currentCoinPrice} USD</Typography.Anchor>
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
              <Typography.Text>{values.deposits?.length}</Typography.Text>
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
              <Typography.Text flat>{near.formatAccountBalance(values.depositsOf)}</Typography.Text>
              <Typography.MiniDescription>{`${values.depositsOfPercentage}% of property price`}</Typography.MiniDescription>
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
              onCancel={() => setIsBuyOwnershipInfoModalOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      )}

      {isCurrentInvestorsModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Current Investors Modal Window">
          <Modal.Header>
            <Typography.Headline3 flat className={styles["investment-details__register-interest-modal--header"]}>
              Current Investors
            </Typography.Headline3>
          </Modal.Header>
          <Modal.Content>
            {values.deposits?.length &&
              values.deposits?.map((deposit) => (
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
          <Modal.Actions>
            <Button onClick={() => setIsCurrentInvestorsModalOpen(false)}>Close</Button>
          </Modal.Actions>
        </Modal>
      )}

      {isWithdrawalConditionsModalOpen && (
        <Modal isOpened onClose={() => null} aria-labelledby="Withdrawal Conditions Modal Window">
          <Modal.Header>
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
                .calendar(date.fromNanoseconds(values.expirationDate!))
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
          <Modal.Actions>
            <Button onClick={() => setIsWithdrawalConditionsModalOpen(false)}>Close</Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
};
