import { Hidden } from "react-grid-system";

import { Typography } from "../typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { NearHoldingsIcon } from "ui/icons/NearHoldingsIcon";
import { Grid } from "ui/grid/Grid";
import { NearHoldingsLogo } from "ui/icons/NearHoldingsLogo";

import styles from "./WalletSelectorNavbar.module.scss";
import { WalletSelectorNavbarProps } from "./WalletSelectorNavbar.types";

export const WalletSelectorNavbar: React.FC<WalletSelectorNavbarProps> = ({ children }) => {
  const routes = useRoutes();

  return (
    <div className={styles["wallet-selector-navbar"]}>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__logo-mobile"]}>
              <Typography.Link href={routes.home}>
                <NearHoldingsIcon theme="dark" />
              </Typography.Link>
            </div>
            <div className={styles["wallet-selector-navbar__logo-desktop"]}>
              <Typography.Link href={routes.home}>
                <NearHoldingsLogo theme="dark" />
              </Typography.Link>
            </div>
          </Grid.Col>
          <Hidden xs>
            <Grid.Col lg={6} sm={6} xs={6}>
              <div className={styles["wallet-selector-navbar__center"]} />
            </Grid.Col>
          </Hidden>
          <Grid.Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__right"]}>
              <div className={styles["wallet-selector-navbar__right--item"]}>{children}</div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
