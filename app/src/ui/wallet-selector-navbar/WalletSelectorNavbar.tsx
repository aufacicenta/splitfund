import { Hidden } from "react-grid-system";

import { Typography } from "../typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { Grid } from "ui/grid/Grid";
import { SplitfundLogo } from "ui/icons/SplitfundLogo";

import styles from "./WalletSelectorNavbar.module.scss";
import { WalletSelectorNavbarProps } from "./WalletSelectorNavbar.types";

export const WalletSelectorNavbar: React.FC<WalletSelectorNavbarProps> = () => {
  const routes = useRoutes();

  return (
    <div className={styles["wallet-selector-navbar"]}>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__logo-mobile"]}>
              <Typography.Link href={routes.home}>
                <SplitfundLogo />
              </Typography.Link>
            </div>
            <div className={styles["wallet-selector-navbar__logo-desktop"]}>
              <Typography.Link href={routes.home}>
                <SplitfundLogo />
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
                <Typography.Text>Sell with us</Typography.Text>
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
