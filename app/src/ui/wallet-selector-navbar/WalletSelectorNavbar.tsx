import { Col, Container, Hidden, Row } from "react-grid-system";

import { Typography } from "../typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { NearHoldingsIcon } from "ui/icons/NearHoldingsIcon";

import styles from "./WalletSelectorNavbar.module.scss";
import { WalletSelectorNavbarProps } from "./WalletSelectorNavbar.types";

export const WalletSelectorNavbar: React.FC<WalletSelectorNavbarProps> = ({ children }) => {
  const routes = useRoutes();

  return (
    <div className={styles["wallet-selector-navbar"]}>
      <Container>
        <Row>
          <Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__logo"]}>
              <Typography.Link href={routes.home}>
                <NearHoldingsIcon />
              </Typography.Link>
            </div>
          </Col>
          <Hidden xs>
            <Col lg={6} sm={6} xs={6}>
              <div className={styles["wallet-selector-navbar__center"]} />
            </Col>
          </Hidden>
          <Col lg={3} sm={3} xs={6}>
            <div className={styles["wallet-selector-navbar__right"]}>
              <div className={styles["wallet-selector-navbar__right--item"]}>{children}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
