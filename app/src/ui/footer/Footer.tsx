import clsx from "clsx";
import { Trans, useTranslation } from "next-i18next";

import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { Icon } from "ui/icon/Icon";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { NearHoldingsIcon } from "ui/icons/NearHoldingsIcon";
import { NearLogoHorizontal } from "ui/icons/NearLogoHorizontal";
import { AufacicentaIcon } from "ui/icons/AufacicentaIcon";

import styles from "./Footer.module.scss";
import { FooterProps } from "./Footer.types";

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation(["common"]);
  const routes = useRoutes();

  return (
    <footer className={clsx(styles.footer, className)}>
      <section id="cta-banner" className={clsx(styles["footer__cta-banner"])}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={7} xs={12} sm={6}>
              <Typography.Link href={routes.home} className={styles["footer__cta-banner--icon"]}>
                <NearHoldingsIcon theme="dark" />
              </Typography.Link>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={5} xs={12} sm={6}>
              <Typography.TextLead className={styles["footer__cta-banner--description"]}>
                <Trans>{t("intro.bottomBanner.description")}</Trans>
              </Typography.TextLead>
            </Grid.Col>
            <Grid.Col lg={7} xs={12} sm={6}>
              <Typography.Link className={styles["footer__cta-banner--link"]} href={routes.invest.grid}>
                FAQs
              </Typography.Link>
              <Typography.Link className={styles["footer__cta-banner--link"]} href={routes.invest.grid}>
                Asset Explorer
              </Typography.Link>
              <Typography.Link className={styles["footer__cta-banner--link"]} href={routes.invest.grid}>
                About Us
              </Typography.Link>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
      <section id="copyright" className={clsx(styles.footer__copyright)}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={7} xs={6} sm={6}>
              <div className={styles["footer__powered-by"]}>
                <div>
                  <Typography.Text flat>{t("poweredBy", { ns: "common" })}</Typography.Text>
                </div>
                <div>
                  <NearLogoHorizontal />
                </div>
              </div>
            </Grid.Col>
            <Grid.Col lg={5} xs={6} sm={6}>
              <div className={styles["footer__copyright--social"]}>
                <Grid.Row>
                  <Grid.Col width="auto">
                    <Typography.Text flat className={styles["footer__copyright--social-text"]}>
                      © NEAR Holdings 2022
                    </Typography.Text>
                  </Grid.Col>
                  <Grid.Col width="auto">
                    <Typography.Anchor flat href="https://github.com/aufacicenta/near.holdings-web" target="_blank">
                      <AufacicentaIcon className={styles["footer__copyright--social-aufacicenta-icon"]} />
                    </Typography.Anchor>
                  </Grid.Col>
                  <Grid.Col width="auto">
                    <Typography.Anchor flat href="https://github.com/aufacicenta/near.holdings-web" target="_blank">
                      <Icon name="icon-github" className={styles["footer__copyright--social-icon"]} />
                    </Typography.Anchor>
                  </Grid.Col>
                </Grid.Row>
              </div>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </footer>
  );
};
