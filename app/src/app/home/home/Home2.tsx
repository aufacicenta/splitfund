import clsx from "clsx";
import { Trans, useTranslation } from "react-i18next";
import { PopupButton } from "@typeform/embed-react";
import { useRouter } from "next/router";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { NearLogoHorizontal } from "ui/icons/NearLogoHorizontal";
import { Footer } from "ui/footer/Footer";
import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { Button } from "ui/button/Button";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import getEmbedFormConfig from "providers/typeform/getEmbedFormConfig";
import { Locale } from "types/Locale";
import { PropertyCardContainer } from "app/properties-explorer/property-card/PropertyCardContainer";

import styles from "./Home2.module.scss";
import { HomeProps } from "./Home.types";

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
};

export const Home2: React.FC<HomeProps> = ({ className, featuredActiveHoldings }) => {
  const { t } = useTranslation(["home", "common"]);
  const routes = useRoutes();
  const router = useRouter();
  const { locale } = useRouter();

  const embedFormConfig = getEmbedFormConfig(locale as Locale);

  const onSubmitEmbedForm = (data: { responseId: string }) => {
    setTimeout(() => {
      router.push(routes.property.preview(data.responseId));
    }, 2500);
  };

  return (
    <>
      <WalletSelectorNavbar2 />
      <div className={clsx(styles.home, className)}>
        <section id="intro" className={clsx(styles.home__section, styles.home__intro)}>
          <div className={styles["home__intro--linear-gradient"]} />
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={6}>
                <div className={styles["home__intro--box"]}>
                  <Typography.Headline1 className={styles["home__intro--headline"]}>
                    <Trans>{t("intro.h1.top")}</Trans>
                  </Typography.Headline1>
                  <div className={styles["home__powered-by"]}>
                    <div>
                      <Typography.Text flat>{t("poweredBy", { ns: "common" })}</Typography.Text>
                    </div>
                    <Typography.Anchor href="https://near.org" target="_blank">
                      <NearLogoHorizontal />
                    </Typography.Anchor>
                  </div>
                  <div className={styles["home__intro--text-block"]}>
                    <Typography.TextLead>
                      <Trans>{t("intro.asInvestor.description")}</Trans>
                    </Typography.TextLead>
                  </div>
                  <Grid.Row justify="start">
                    <Grid.Col width="auto">
                      <Button color="primary" as="a" href={routes.properties.explorer()}>
                        Explore Assets
                      </Button>
                    </Grid.Col>
                    <Grid.Col width="auto">
                      <Button variant="outlined" onClick={() => scrollTo("#what-is-fasst")}>
                        Learn More
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
        <section id="featured-assets" className={clsx(styles.home__section, styles["home__featured-assets"])}>
          <Grid.Container>
            <Typography.Headline2>Featured Active Holdings</Typography.Headline2>
            <Grid.Row justify="between" align="center">
              <Grid.Col width="auto" xs={6}>
                <Typography.TextLead flat>Submitting an asset is open &amp; decentralized.</Typography.TextLead>
              </Grid.Col>
              <Grid.Col width="auto" xs={6}>
                <PopupButton
                  id={embedFormConfig.formID}
                  size={80}
                  className={styles["home__intro--cta"]}
                  onSubmit={onSubmitEmbedForm}
                >
                  {t("navbar.apply", { ns: "common" })}
                </PopupButton>
              </Grid.Col>
            </Grid.Row>
            <div className={styles["home__featured-assets--cards"]}>
              <Grid.Row className={styles["home__property-card--row"]}>
                {featuredActiveHoldings.map((contractAddress) => (
                  <Grid.Col lg={4} xs={12} key={contractAddress}>
                    <div>
                      <PropertyCardContainer contractAddress={contractAddress} />
                    </div>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </div>
          </Grid.Container>
        </section>
        <section id="what-is-fasst" className={clsx(styles.home__section, styles["home__what-is"])}>
          <Grid.Container>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline2>
                    What is Fractionalized
                    <br />
                    Asset Trading?
                  </Typography.Headline2>
                  <Typography.TextLead>
                    Similar to traditional investment trusts, FASSTs use the power of group buying to bet over
                    real-world &amp; digital assets.
                  </Typography.TextLead>
                  <div className={styles["home__what-is--image"]}>
                    <img src="/home/near-holdings-doughnut.png" alt="fractionalized ownership graphic" />
                  </div>
                  <hr />
                  <Typography.Text>
                    Using blockchain technology, you can now purchase part of any asset, eg. a Real Estate property, and
                    earning passive income from rent.
                  </Typography.Text>
                  <div className={styles["home__button-box"]}>
                    <Button variant="outlined" onClick={() => scrollTo("#use-cases")}>
                      Use Cases
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12} offset={{ lg: 7 }}>
                  <Typography.Headline2>What happens to the money?</Typography.Headline2>
                  <Typography.TextLead>
                    Your NEAR tokens stay on-hold until the price of the asset is 100% funded.
                  </Typography.TextLead>
                  <Typography.TextLead>
                    Withdraw your funds entirely if the price is not reached under a given timeframe.
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>This is completely handled by orchestrated NEAR smart-contracts.</Typography.Text>
                  <Typography.Text>No middlemen involded, seriously.</Typography.Text>
                  <div className={styles["home__button-box"]}>
                    <Button
                      as="a"
                      variant="outlined"
                      href="https://github.com/aufacicenta/near.holdings/blob/master/rust-escrow/conditional-escrow/src/lib.rs"
                      target="_blank"
                    >
                      Audit Contracts
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} xs={12}>
                  <Typography.Headline2>And if the asset gets funded?</Typography.Headline2>
                  <Typography.TextLead>This is where the magic happens.</Typography.TextLead>
                  <Typography.TextLead>The funds are transfered to a new NEAR Sputnik2 DAO.</Typography.TextLead>
                  <Typography.TextLead>
                    As an investor, you have proportional voting power over the future of the asset.
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>
                    With the funds in the DAO, it is up to the council to decide what to do with the asset.
                  </Typography.Text>
                  <Typography.Text>
                    Put the asset to work, or use it as collateral. Earn passive income from rent or interests. The
                    possibilities are endless.
                  </Typography.Text>
                  <Typography.Text>Aim high!</Typography.Text>
                  <div className={styles["home__button-box"]}>
                    <PopupButton
                      id={embedFormConfig.formID}
                      size={80}
                      className={styles["home__intro--cta"]}
                      onSubmit={onSubmitEmbedForm}
                    >
                      {t("navbar.apply", { ns: "common" })}
                    </PopupButton>
                  </div>
                </Grid.Col>
              </Grid.Row>
            </div>
            <div className={styles["home__what-is--row"]}>
              <Grid.Row>
                <Grid.Col lg={5} offset={{ lg: 7 }} xs={12}>
                  <Typography.Headline2>What about the trading part?</Typography.Headline2>
                  <Typography.TextLead>
                    Upon a successful asset funding campaign, you’ll be accounted new NEP-141 tokens, 1:1 to your
                    deposit.
                  </Typography.TextLead>
                  <hr />
                  <Typography.Text>
                    The initial value of the tokens being the value of the property at the time of funding.
                  </Typography.Text>
                  <Typography.Text>They can cost more in the future 🤷.</Typography.Text>
                </Grid.Col>
              </Grid.Row>
            </div>
          </Grid.Container>
        </section>
        <section id="use-cases" className={styles["home__use-cases"]}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={4}>
                <div className={styles["home__use-cases--col"]}>
                  <Typography.Headline2>FASST Use Cases</Typography.Headline2>
                  <Typography.TextLead>Go ahead and submit your craziest idea.</Typography.TextLead>
                  <Typography.Text>
                    Perhaps there's a community out there thinking about making a similar endeavor a reality!
                  </Typography.Text>
                  <div className={styles["home__button-box"]}>
                    <PopupButton
                      id={embedFormConfig.formID}
                      size={80}
                      className={styles["home__intro--cta"]}
                      onSubmit={onSubmitEmbedForm}
                    >
                      {t("navbar.apply", { ns: "common" })}
                    </PopupButton>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col lg={8}>
                <Grid.Row>
                  <Grid.Col lg={4}>
                    <div className={styles["home__use-cases--col"]}>
                      <Typography.Headline3>Art</Typography.Headline3>
                      <Typography.TextLead>
                        Invest in an art piece, even in one that doesn't exist yet.
                      </Typography.TextLead>
                      <Typography.Text>
                        Build a new museum or buy part of an entire collection. Make a new movie, or revolutionize the
                        film industry.
                      </Typography.Text>
                    </div>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <div className={styles["home__use-cases--col"]}>
                      <Typography.Headline3>Real Estate</Typography.Headline3>
                      <Typography.TextLead>Buy and manage land, together.</Typography.TextLead>
                      <Typography.Text>
                        Have a stake at the next residential building revolution, earn from the next harvest.
                      </Typography.Text>
                    </div>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <div className={styles["home__use-cases--col"]}>
                      <Typography.Headline3>Events</Typography.Headline3>
                      <Typography.TextLead>
                        Pre-purchase tickets and bring your favorite artist to town.
                      </Typography.TextLead>
                      <Typography.Text>
                        Test if an event is feasable, put the money into action if it turns out it is!
                      </Typography.Text>
                    </div>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <div className={styles["home__use-cases--col"]}>
                      <Typography.Headline3>Commodity (Stock)</Typography.Headline3>
                      <Typography.TextLead>Put something on sale, and sell it faster.</Typography.TextLead>
                      <Typography.Text>
                        Buy a lot of coffee beans, 10 tons of corn, 1,000,000 worth of, socks? Decide on how profit from
                        it.
                      </Typography.Text>
                    </div>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <div className={styles["home__use-cases--col"]}>
                      <Typography.Headline3>Business</Typography.Headline3>
                      <Typography.TextLead>Fund a startup, let the community decide on its future.</Typography.TextLead>
                      <Typography.Text>
                        Have this crazy business idea? Test out how interested the community is and make it a reality!
                      </Typography.Text>
                    </div>
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </section>
        <Footer />
      </div>
    </>
  );
};
