import clsx from "clsx";
import { Trans, useTranslation } from "react-i18next";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { NearLogoHorizontal } from "ui/icons/NearLogoHorizontal";
import { Footer } from "ui/footer/Footer";
import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { Button } from "ui/button/Button";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { PropertyCard } from "app/properties-explorer/property-card/PropertyCard";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { TypeformButton } from "ui/button/typeform-button/TypeformButton";
import { MainPanel } from "ui/mainpanel/MainPanel";

import styles from "./Home2.module.scss";
import { HomeProps } from "./Home.types";
import { VersusTable } from "./versus-table/VersusTable";

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
};

export const Home2: React.FC<HomeProps> = ({ className, featuredActiveHoldings, totalValueLocked }) => {
  const { t } = useTranslation(["home", "common"]);
  const routes = useRoutes();
  const wallet = useWalletSelectorContext();

  return (
    <>
      <WalletSelectorNavbar2>
        <div className={styles["home__total-value-locked"]}>
          <Typography.Description>
            {t("navbar.totalValueLocked", { ns: "common" })} · {wallet.network}
          </Typography.Description>
          <Typography.Text className={styles["home__total-value-locked--amount"]}>{totalValueLocked}</Typography.Text>
        </div>
      </WalletSelectorNavbar2>
      <div className={clsx(styles.home, className)}>
        <section id="intro" className={clsx(styles.home__section, styles.home__intro)}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={6}>
                <div className={styles["home__intro--box"]}>
                  <div className={styles["home__powered-by"]}>
                    <div>
                      <Typography.Text flat>{t("poweredBy", { ns: "common" })}</Typography.Text>
                    </div>
                    <Typography.Anchor href="https://near.org" target="_blank">
                      <NearLogoHorizontal />
                    </Typography.Anchor>
                  </div>
                  <Typography.Headline1 className={styles["home__intro--headline"]}>
                    <Trans>{t("intro.h1.top")}</Trans>
                  </Typography.Headline1>
                  <div className={styles["home__intro--text-block"]}>
                    <Typography.TextLead>
                      <Trans>{t("intro.asInvestor.description")}</Trans>
                    </Typography.TextLead>
                  </div>
                  <Grid.Row justify="start">
                    <Grid.Col width="auto">
                      <Button color="primary" as="a" href={routes.properties.explorer()}>
                        {t("intro.cta.exploreAssets")}
                      </Button>
                    </Grid.Col>
                    <Grid.Col width="auto">
                      <Button variant="text" onClick={() => scrollTo("#what-is-fasst")}>
                        {t("intro.cta.learnMore")}
                      </Button>
                    </Grid.Col>
                  </Grid.Row>
                </div>
              </Grid.Col>
              <Grid.Col lg={6}>
                <div className={styles["home__intro--image"]}>
                  <img src="/home/near-holdings-doughnut.png" alt="fractionalized ownership graphic" />
                </div>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </section>
        <section id="vs">
          <MainPanel.Container>
            <VersusTable />
          </MainPanel.Container>
        </section>
        <section id="how-it-works" className={clsx(styles.home__section, styles["home__how-it-works"])}>
          <Grid.Container>
            <Typography.Headline2 className={clsx(styles["home__section--heading"])}>
              {t("how-it-works.title")}
            </Typography.Headline2>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--heading"])}>
                    1. <Trans>{t("how-it-works.1.title")}</Trans>
                  </Typography.Headline3>
                  <Typography.TextLead>{t("how-it-works.1.subtitle")}</Typography.TextLead>
                  <hr />
                  <div className={styles["home__button-box"]}>
                    <Button variant="outlined" onClick={() => scrollTo("#use-cases")}>
                      {t("how-it-works.1.button")}
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12} offset={{ lg: 7 }}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--heading"])}>
                    2. {t("how-it-works.2.title")}
                  </Typography.Headline3>
                  <Typography.TextLead>{t("how-it-works.2.subtitle")}</Typography.TextLead>
                  <hr />
                  <Typography.Text>{t("how-it-works.2.description")}</Typography.Text>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--heading"])}>
                    3. <Trans>{t("how-it-works.3.title")}</Trans>
                  </Typography.Headline3>
                  <Typography.TextLead>{t("how-it-works.3.subtitle")}</Typography.TextLead>
                  <hr />
                  <Typography.Text>{t("how-it-works.3.description")}</Typography.Text>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12} offset={{ lg: 7 }}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--heading"])}>
                    4. {t("how-it-works.4.title")}
                  </Typography.Headline3>
                  <Typography.TextLead>{t("how-it-works.4.subtitle")}</Typography.TextLead>
                  <hr />
                  <Typography.Text>{t("how-it-works.4.description")}</Typography.Text>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--heading"])}>
                    5. <Trans>{t("how-it-works.5.title")}</Trans>
                  </Typography.Headline3>
                  <Typography.TextLead>{t("how-it-works.5.subtitle")}</Typography.TextLead>
                  <hr />
                  <div className={styles["home__button-box"]}>
                    <Button variant="outlined" onClick={() => scrollTo("#use-cases")}>
                      {t("how-it-works.5.button")}
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Container>
        </section>
        {featuredActiveHoldings && (
          <section id="featured-assets" className={clsx(styles.home__section, styles["home__featured-assets"])}>
            <Grid.Container>
              <Typography.Headline2>{t("featured-assets.title")}</Typography.Headline2>
              <Grid.Row justify="between" align="center">
                <Grid.Col width="auto" xs={6}>
                  <Typography.TextLead flat>{t("featured-assets.subtitle")}</Typography.TextLead>
                </Grid.Col>
                <Grid.Col width="auto" xs={6}>
                  <TypeformButton>{t("navbar.apply", { ns: "common" })}</TypeformButton>
                </Grid.Col>
              </Grid.Row>
              <div className={styles["home__featured-assets--cards"]}>
                <Grid.Row className={styles["home__property-card--row"]}>
                  {featuredActiveHoldings.map((property) => (
                    <Grid.Col lg={4} xs={12} key={property.contract!.id}>
                      <div>
                        <PropertyCard
                          minimal
                          property={property}
                          action={
                            <Typography.Link
                              href={routes.property.details(property.contract!.id)}
                              className={styles["home__property-card--cta"]}
                            >
                              {t("button.seeDetails", { ns: "common" })}
                            </Typography.Link>
                          }
                        />
                      </div>
                    </Grid.Col>
                  ))}
                </Grid.Row>
              </div>
            </Grid.Container>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};
