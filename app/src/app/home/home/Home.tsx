import clsx from "clsx";
import { Container } from "react-grid-system";
import { Trans, useTranslation } from "react-i18next";
import { PopupButton } from "@typeform/embed-react";
import { useRouter } from "next/router";

import { Locale } from "types/Locale";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Icon } from "ui/icon/Icon";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import getEmbedFormConfig from "providers/typeform/getEmbedFormConfig";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { NearLogoHorizontal } from "ui/icons/NearLogoHorizontal";
import { Footer } from "ui/footer/Footer";

import styles from "./Home.module.scss";
import { HomeProps } from "./Home.types";

export const Home: React.FC<HomeProps> = ({ className }) => {
  const routes = useRoutes();
  const { locale } = useRouter();
  const { t } = useTranslation(["home", "common"]);

  const embedFormConfig = getEmbedFormConfig(locale as Locale);

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles.home, className)}>
        <section id="intro" className={clsx(styles.home__section, styles["home__section--intro"])}>
          <Container>
            <Grid.Row>
              <Grid.Col lg={7}>
                <div className={styles["home__intro--box"]}>
                  <Typography.Headline1 className={styles["home__intro--headline"]}>
                    <Trans>{t("intro.h1.top")}</Trans>
                  </Typography.Headline1>
                  <div className={styles["home__powered-by"]}>
                    <div>
                      <Typography.Text flat>{t("poweredBy", { ns: "common" })}</Typography.Text>
                    </div>
                    <div>
                      <NearLogoHorizontal />
                    </div>
                  </div>
                  <div className={styles["home__intro--text-block"]}>
                    <Typography.Headline6>{t("intro.asInvestor.title")}</Typography.Headline6>
                    <Typography.TextLead>
                      <Trans>{t("intro.asInvestor.description")}</Trans>{" "}
                      <Typography.Link className={styles["home__intro--cta"]} href={routes.invest.grid}>
                        {t("intro.bottomBanner.cta")} <Icon name="icon-chevron-right-circle" />
                      </Typography.Link>
                    </Typography.TextLead>
                  </div>
                  <div className={styles["home__intro--text-block"]}>
                    <Typography.Headline6>{t("intro.asBusinessOwner.title")}</Typography.Headline6>
                    <Typography.TextLead>
                      <Trans>{t("intro.asBusinessOwner.description")}</Trans>{" "}
                      <PopupButton id={embedFormConfig.formID} size={60} className={styles["home__intro--cta"]}>
                        {t("navbar.apply", { ns: "common" })} <Icon name="icon-chevron-right-circle" />
                      </PopupButton>
                    </Typography.TextLead>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col>
                <div className={styles["home__intro--image"]}>
                  <img src="/home/fractionalised-ownership-graphic@2x.png" alt="fractionalised ownership graphic" />
                </div>
              </Grid.Col>
            </Grid.Row>
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
};
