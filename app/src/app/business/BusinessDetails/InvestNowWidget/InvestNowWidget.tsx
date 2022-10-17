import clsx from "clsx";
import { Container } from "react-grid-system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Card } from "ui/card/Card";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Button } from "ui/button/Button";
import { Icon } from "ui/icon/Icon";
import { Tooltip } from "ui/tooltip/Tooltip";
import { useAuthContext } from "hooks/useAuthContext/useAuthContext";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { useCheckoutContext } from "hooks/useCheckoutContext/useCheckoutContext";
import getDefaultDateFormat from "providers/date/getDefaultDateFormat";
import convert from "providers/currency/convert";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";

import styles from "./InvestNowWidget.module.scss";
import { InvestNowWidgetProps } from "./InvestNowWidget.types";

export const InvestNowWidget: React.FC<InvestNowWidgetProps> = ({ className, campaign }) => {
  const auth = useAuthContext();
  const router = useRouter();
  const routes = useRoutes();
  const { t } = useTranslation("campaign");
  const { getCheckoutURL, checkoutState, isLoading: isCheckoutLoading, error: checkoutError } = useCheckoutContext();
  const [totalFiatFunded, setTotalFiatFunded] = useState(0);

  useEffect(() => {
    (async () => {
      const btcFunded = convert.satoshi_btc(campaign.totalSatsInvested);
      const conversion = await convert.btc_usd(btcFunded);

      setTotalFiatFunded(conversion);
    })();
  }, [campaign.totalSatsInvested]);

  useEffect(() => {
    if (!checkoutState?.url) {
      return;
    }

    router.push(checkoutState.url);
  }, [checkoutState, router]);

  const handleOnInvestNowClick = () => {
    if (auth.hasActiveSession) {
      getCheckoutURL({
        checkout: { redirectURL: `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}` },
        campaign,
      });
    } else {
      router.push(
        `${routes.auth.signIn}?redirectTo=${process.env.NEXT_PUBLIC_BASE_URL}/${router.locale}${router.asPath}`,
      );
    }
  };

  const { content } = campaign;

  return (
    <div className={clsx(styles["invest-now-widget"], className)}>
      <Container>
        <Grid.Row>
          <Grid.Col lg={4} offset={{ lg: 8 }} className={styles["invest-now-widget__fixed-col"]}>
            <Card shadow>
              <Card.Content>
                <div className={styles["invest-now-widget__risk-level"]}>
                  <Tooltip.Wrapper>
                    <Typography.Description>{t("investNowWidget.riskLevel.title")}: Medio</Typography.Description>
                    {/* @TODO translate risk level date and description */}
                    <Tooltip
                      title={`${t("investNowWidget.riskLevel.title")}: Medio`}
                      description={t("investNowWidget.riskLevel.description", {
                        replace: {
                          name: content.title,
                          establishedSince: "hace 2 años",
                          description:
                            "Tiene libros contables en orden y tiene un score 8.5 de 10 en el Protocolo de Inversión.",
                        },
                      })}
                    />
                  </Tooltip.Wrapper>
                </div>
                <hr />
                <Typography.Headline3 className={styles["invest-now-widget__cta-text"]}>
                  {t("investNowWidget.investIn.title")} {content.title}
                </Typography.Headline3>
                <div className={styles["invest-now-widget__cta-button"]}>
                  <Button fullWidth onClick={handleOnInvestNowClick} isLoading={isCheckoutLoading}>
                    {auth.hasActiveSession
                      ? t("investNowWidget.cta.depositNow")
                      : t("investNowWidget.cta.signInAndDepositNow")}
                    <Icon name="icon-power" className={styles["invest-now-widget__cta-button--icon"]} />
                  </Button>
                  {checkoutError && (
                    <Typography.Description className={styles["invest-now-widget__cta-button--error"]}>
                      {t("investNowWidget.cta.error")}
                    </Typography.Description>
                  )}
                </div>
                <div className={styles["invest-now-widget__goal"]}>
                  <div>
                    <Tooltip.Wrapper>
                      <Typography.Headline4 className={styles["invest-now-widget__goal--heading"]}>
                        <Icon name="icon-rotation-lock" /> {campaign.investmentMultiple}x
                      </Typography.Headline4>
                      <Tooltip
                        title="ROI"
                        description={t("investNowWidget.warnings.maturityDate.description", {
                          replace: {
                            name: content.title,
                            investmentMultiple: 10 * campaign.investmentMultiple,
                            maturityDate: getDefaultDateFormat(campaign.maturityDate),
                          },
                        })}
                      />
                    </Tooltip.Wrapper>
                    <Typography.Description className={styles["invest-now-widget__goal--text"]}>
                      {t("investNowWidget.terms.investmentMultiple.description")}
                    </Typography.Description>
                  </div>
                  <div>
                    <Typography.Headline4 className={styles["invest-now-widget__goal--heading"]}>
                      <Icon name="icon-bag-dollar" /> {campaign.totalSatsInvested} SAT
                    </Typography.Headline4>
                    <Typography.Description className={styles["invest-now-widget__goal--text"]}>
                      {t("investNowWidget.terms.totalFiatFunded.description")}: {formatFiatCurrency(totalFiatFunded)}{" "}
                      USD
                    </Typography.Description>
                  </div>
                  <div>
                    <Typography.Headline4 className={styles["invest-now-widget__goal--heading"]}>
                      <Icon name="icon-users" /> {campaign.totalInvestors}
                    </Typography.Headline4>
                    <Typography.Description className={styles["invest-now-widget__goal--text"]}>
                      <Trans count={campaign.totalInvestors}>{t("investNowWidget.terms.investors.description")}</Trans>
                    </Typography.Description>
                  </div>
                  <div>
                    <Typography.Headline4 className={styles["invest-now-widget__goal--heading"]}>
                      <Icon name="icon-timer" /> {campaign.daysLeft} {t("investNowWidget.terms.daysLeft.title")}
                    </Typography.Headline4>
                    <Typography.Description className={styles["invest-now-widget__goal--text"]}>
                      {t("investNowWidget.terms.daysLeft.description")}
                    </Typography.Description>
                  </div>
                </div>
                <div className={styles["invest-now-widget__warnings"]}>
                  <div>
                    <Typography.Description className={styles["invest-now-widget__warnings--text"]}>
                      <strong>{t("investNowWidget.warnings.volatility.title")}</strong>
                    </Typography.Description>
                    <Typography.Description className={styles["invest-now-widget__warnings--text"]}>
                      <Trans>{t("investNowWidget.warnings.volatility.description")}</Trans>
                    </Typography.Description>
                  </div>
                  <div>
                    <Typography.Description className={styles["invest-now-widget__warnings--text"]}>
                      <strong>{t("investNowWidget.warnings.maturityDate.title")}</strong>
                    </Typography.Description>
                    <Typography.Description className={styles["invest-now-widget__warnings--text"]}>
                      <Trans>
                        {t("investNowWidget.warnings.maturityDate.description", {
                          replace: {
                            name: content.title,
                            investmentMultiple: 10 * campaign.investmentMultiple,
                            maturityDate: getDefaultDateFormat(campaign.maturityDate),
                          },
                        })}
                      </Trans>
                    </Typography.Description>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Container>
    </div>
  );
};
