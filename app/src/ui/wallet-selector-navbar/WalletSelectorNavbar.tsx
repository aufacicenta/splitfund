import { Hidden } from "react-grid-system";
import { PopupButton } from "@typeform/embed-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Locale } from "types/Locale";
import { Typography } from "../typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { NearHoldingsIcon } from "ui/icons/NearHoldingsIcon";
import { Grid } from "ui/grid/Grid";
import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import getEmbedFormConfig from "providers/typeform/getEmbedFormConfig";

import styles from "./WalletSelectorNavbar.module.scss";
import { WalletSelectorNavbarProps } from "./WalletSelectorNavbar.types";

export const WalletSelectorNavbar: React.FC<WalletSelectorNavbarProps> = () => {
  const routes = useRoutes();
  const { locale } = useRouter();
  const { t } = useTranslation(["home", "common"]);

  const embedFormConfig = getEmbedFormConfig(locale as Locale);

  return (
    <div className={styles["wallet-selector-navbar"]}>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__logo-mobile"]}>
              <Typography.Link href={routes.home}>
                <NearHoldingsIcon />
              </Typography.Link>
            </div>
            <div className={styles["wallet-selector-navbar__logo-desktop"]}>
              <Typography.Link href={routes.home}>
                <NearHoldingsIcon />
              </Typography.Link>
            </div>
          </Grid.Col>
          <Hidden xs>
            <Grid.Col lg={4} sm={4} xs={4}>
              <div className={styles["wallet-selector-navbar__center"]} />
            </Grid.Col>
          </Hidden>
          <Grid.Col lg={5} sm={5} xs={6}>
            <div className={styles["wallet-selector-navbar__right"]}>
              <div className={styles["wallet-selector-navbar__right--item"]}>
                <div>
                  <PopupButton
                    id={embedFormConfig.formID}
                    size={60}
                    className={styles["wallet-selector-navbar__right--cta"]}
                  >
                    {t("navbar.apply", { ns: "common" })}
                  </PopupButton>
                </div>
              </div>
              <div className={styles["wallet-selector-navbar__right--item"]}>
                <WalletSelector />
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
