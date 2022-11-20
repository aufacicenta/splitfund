import clsx from "clsx";
import { Form as RFForm } from "react-final-form";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import date from "providers/date";
import currency from "providers/currency";
import splitfund from "providers/splitfund";
import { useEscrowContract } from "hooks/near/useEscrowContract/useEscrowContract";
import { Form } from "ui/form/Form";
import { Grid } from "ui/grid/Grid";
import { useNearWalletSelectorContext } from "hooks/useNearWalletSelectorContext/useNearWalletSelectorContext";

import styles from "./InvestNowWidget.module.scss";
import { InvestNowWidgetProps } from "./InvestNowWidget.types";

export const InvestNowWidget: React.FC<InvestNowWidgetProps> = ({ className, property }) => {
  const nearWalletSelectorContext = useNearWalletSelectorContext();
  const escrow = useEscrowContract(property.contract.id);

  const onClickConnectWallet = () => {
    nearWalletSelectorContext.modal?.show();
  };

  const onSubmit = async ({ amount }: { amount: number }) => {
    await escrow.deposit(amount.toLocaleString("fullwide", { useGrouping: false }));
  };

  return (
    <>
      <Card className={clsx(styles["invest-now-widget"], className)} shadow>
        <Card.Content>
          <div className={styles["invest-now-widget__progress-bar"]}>
            <div className={styles["invest-now-widget__progress-bar--funded"]} style={{ width: "70%" }} />
            <div className={styles["invest-now-widget__progress-bar--total"]} />
          </div>
          <div>
            <Typography.Headline3 flat>{currency.formatFiatCurrency(property.price.fundedAmount)}</Typography.Headline3>
            <Typography.Text>
              invested of {currency.formatFiatCurrency(property.price.value)}{" "}
              <span className={styles["invest-now-widget__funded-amount--currency"]}>
                {splitfund.getConfig().stableEscrow.ft_metadata.symbol}/
                {nearWalletSelectorContext.selector?.options.network.networkId}
              </span>
            </Typography.Text>
          </div>
          <div>
            <Typography.Headline3 flat className={clsx(styles["invest-now-widget__headline-regular"])}>
              {property.investors.amount}
            </Typography.Headline3>
            <Typography.Text>number of investors</Typography.Text>
          </div>
          <div>
            <Typography.Headline3 flat className={clsx(styles["invest-now-widget__headline-regular"])}>
              {date.timeFromNow.daysToGo(property.expirationDate)}
            </Typography.Headline3>
            <Typography.Text>days to go</Typography.Text>
          </div>
          <div>
            <Typography.Headline3 flat className={clsx(styles["invest-now-widget__headline-regular"])}>
              {currency.formatFiatCurrency(23567)}
            </Typography.Headline3>
            <Typography.Text>your investment (35% of total)</Typography.Text>
          </div>
        </Card.Content>
        <Card.Actions>
          {nearWalletSelectorContext.selector?.isSignedIn() ? (
            <RFForm
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles["invest-now-widget__form"]}>
                  <Grid.Row>
                    <Grid.Col lg={7}>
                      <Form.TextInput id="amount" type="number" placeholder="investment amount..." />
                    </Grid.Col>
                    <Grid.Col>
                      <Button type="submit" fullWidth>
                        Deposit USDT
                      </Button>
                    </Grid.Col>
                  </Grid.Row>
                  <Typography.Description className={styles["invest-now-widget__form--balance"]}>
                    USDT balance: 0.00
                  </Typography.Description>
                </form>
              )}
            />
          ) : (
            <Button onClick={onClickConnectWallet}>Connect Wallet to Invest</Button>
          )}
        </Card.Actions>
      </Card>
      <Typography.Text className={styles["invest-now-widget__funding-terms"]}>
        All or nothing. This property will only be funded if it reaches its goal by{" "}
        {date.getDefaultDateFormat(property.expirationDate)}.
      </Typography.Text>
    </>
  );
};
