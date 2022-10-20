import clsx from "clsx";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";

import styles from "./InvestNowWidget.module.scss";
import { InvestNowWidgetProps } from "./InvestNowWidget.types";

export const InvestNowWidget: React.FC<InvestNowWidgetProps> = ({ className, property }) => (
  <>
    <Card className={clsx(styles["invest-now-widget"], className)} shadow>
      <Card.Content>
        <div className={styles["invest-now-widget__progress-bar"]}>
          <div className={styles["invest-now-widget__progress-bar--funded"]} style={{ width: "70%" }} />
          <div className={styles["invest-now-widget__progress-bar--total"]} />
        </div>
        <div>
          <Typography.Headline3 flat>{property.price.fundedAmount}</Typography.Headline3>
          <Typography.Text>invested of {property.price.value}</Typography.Text>
        </div>
        <div>
          <Typography.Headline3 flat>{property.investors.amount}</Typography.Headline3>
          <Typography.Text>number of investors</Typography.Text>
        </div>
        <div>
          <Typography.Headline3 flat>{property.expirationDate}</Typography.Headline3>
          <Typography.Text>days to go</Typography.Text>
        </div>
        <div>
          <Typography.Headline3 flat>23567</Typography.Headline3>
          <Typography.Text>your investment</Typography.Text>
        </div>
      </Card.Content>
      <Card.Actions>
        <Button>Connect Wallet to Invest</Button>
      </Card.Actions>
    </Card>
    <Typography.Text className={styles["invest-now-widget__funding-terms"]}>
      All or nothing. This property will only be funded if it reaches its goal by {property.expirationDate}.
    </Typography.Text>
  </>
);
