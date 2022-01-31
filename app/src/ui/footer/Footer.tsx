import clsx from "clsx";
import { Trans, useTranslation } from "next-i18next";

import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { Icon } from "ui/icon/Icon";
import { useRoutes } from "hooks/useRoutes/useRoutes";

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
              <Typography.Headline4 className={styles["footer__cta-banner--welcome"]}>
                <Trans>{t("intro.bottomBanner.welcome")}</Trans>
              </Typography.Headline4>
              <Typography.Text className={styles["footer__cta-banner--description"]}>
                <Trans>{t("intro.bottomBanner.description")}</Trans>
              </Typography.Text>
            </Grid.Col>
            <Grid.Col lg={5} xs={12} sm={6}>
              <Typography.Link className={styles["footer__cta-banner--cta"]} href={routes.invest.grid}>
                {t("intro.bottomBanner.cta")} <Icon name="icon-chevron-right-circle" />
              </Typography.Link>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
      <section id="copyright" className={clsx(styles.footer__copyright)}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={7} xs={6} sm={6}>
              <Typography.Text flat>© NEAR Holdings 2022</Typography.Text>
            </Grid.Col>
            <Grid.Col lg={5} xs={6} sm={6}>
              <div className={styles["footer__copyright--social"]}>
                <Typography.Anchor flat href="https://github.com/aufacicenta/near.holdings-web" target="_blank">
                  <Icon name="icon-github" className={styles["footer__copyright--social-icon"]} />
                </Typography.Anchor>
              </div>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </footer>
  );
};
