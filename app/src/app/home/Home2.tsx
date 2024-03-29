import clsx from "clsx";
import { Trans, useTranslation } from "react-i18next";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { NearLogoHorizontal } from "ui/icons/NearLogoHorizontal";
import { Footer } from "ui/footer/Footer";
import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { Button } from "ui/button/Button";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { SplitfundIcon } from "ui/icons/SplitfundIcon";
import { PropertyCardContainer } from "ui/splitfund/property-card/PropertyCardContainer";
import { Icon } from "ui/icon/Icon";
import { SplitfundLogo } from "ui/icons/SplitfundLogo";

import styles from "./Home2.module.scss";
import { HomeProps } from "./Home.types";
import { VersusTable } from "./versus-table/VersusTable";
import { FAQs } from "./faqs/FAQs";

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
};

export const Home2: React.FC<HomeProps> = ({ className }) => {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <WalletSelectorNavbar2 />

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
                      <Button onClick={() => scrollTo("#how-it-works")}>{t("intro.cta.exploreAssets")}</Button>
                    </Grid.Col>
                    <Grid.Col width="auto">
                      <Button variant="text" onClick={() => scrollTo("#how-it-works")}>
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
        <section id="stats" className={clsx(styles.home__section, styles.home__stats)}>
          <Grid.Container>
            <Typography.Headline2 className={clsx(styles["home__stats--heading"])}>
              <span>
                <SplitfundLogo />
              </span>{" "}
              <Trans>{t("stats.title")}</Trans>
            </Typography.Headline2>
            <Typography.Headline3 className={clsx(styles["home__stats--heading-regular"])}>
              <Trans>{t("stats.subtitle")}</Trans>
            </Typography.Headline3>
            <Grid.Row>
              <Grid.Col lg={4} xs={12}>
                <div className={styles["home__stats--data"]}>
                  <Typography.Headline2>21,357</Typography.Headline2>
                  <Typography.TextLead>
                    <Trans>{t("stats.1.description")}</Trans>
                  </Typography.TextLead>
                </div>
              </Grid.Col>
              <Grid.Col lg={4} xs={12}>
                <div className={styles["home__stats--data"]}>
                  <Typography.Headline2>2.5 M</Typography.Headline2>
                  <Typography.TextLead>
                    <Trans>{t("stats.2.description")}</Trans>
                  </Typography.TextLead>
                </div>
              </Grid.Col>
              <Grid.Col lg={4} xs={12}>
                <div className={styles["home__stats--data"]}>
                  <Typography.Headline2>456.00</Typography.Headline2>
                  <Typography.TextLead>
                    <Trans>{t("stats.3.description")}</Trans>
                  </Typography.TextLead>
                </div>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </section>
        <section id="how-it-works" className={clsx(styles.home__section, styles["home__how-it-works"])}>
          <Grid.Container>
            <div className={clsx(styles["home__how-it-works--icon-heading"])}>
              <SplitfundIcon />
              <Typography.Headline2 className={clsx(styles["home__how-it-works--heading"])}>
                {t("how-it-works.title")}
              </Typography.Headline2>
              <Typography.Headline3 className={clsx(styles["home__how-it-works--heading-regular"])}>
                <Trans>{t("how-it-works.subtitle")}</Trans>
              </Typography.Headline3>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--row-heading"])}>
                    1. <Trans>{t("how-it-works.1.title")}</Trans>
                  </Typography.Headline3>
                  <Typography.TextLead>
                    <Trans>{t("how-it-works.1.subtitle")}</Trans>
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>{t("how-it-works.1.description")}</Typography.Text>
                </Grid.Col>
                <Grid.Col lg={5} xs={12} offset={{ lg: 2 }}>
                  <PropertyCardContainer id="splitfund-3-d7ce.factory.splitfund.testnet" />
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={7} xs={12} offset={{ lg: 5 }}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--row-heading"])}>
                    2. {t("how-it-works.2.title")}
                  </Typography.Headline3>
                  <Typography.TextLead>
                    <Trans>{t("how-it-works.2.subtitle")}</Trans>
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>
                    <Icon name="icon-shield-check" className={styles["home__how-it-works--icon-shield-check"]} />{" "}
                    {t("how-it-works.2.description")}
                  </Typography.Text>
                  <Typography.Description>{t("how-it-works.2.footnote")}</Typography.Description>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={7} xs={12}>
                  <Typography.Headline3 className={clsx(styles["home__how-it-works--row-heading"])}>
                    3. <Trans>{t("how-it-works.3.title")}</Trans>
                  </Typography.Headline3>
                  <Typography.TextLead>
                    <Trans>{t("how-it-works.3.subtitle")}</Trans>
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>{t("how-it-works.3.description")}</Typography.Text>
                  <Typography.Description>{t("how-it-works.3.footnote")}</Typography.Description>
                  <div className={styles["home__button-box"]}>
                    <Button disabled variant="outlined" onClick={() => scrollTo("#use-cases")}>
                      {t("how-it-works.3.button")}
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Container>
        </section>
        <section id="faqs" className={clsx(styles.home__section, styles.home__faqs)}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={8} offset={{ lg: 2 }}>
                <div className={clsx(styles["home__faqs--icon-heading"])}>
                  <SplitfundIcon />
                  <Typography.Headline2 className={clsx(styles["home__faqs--heading"])}>
                    {t("faqs.title")}
                  </Typography.Headline2>
                </div>
                <FAQs />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </section>

        <Footer />
      </div>
    </>
  );
};
