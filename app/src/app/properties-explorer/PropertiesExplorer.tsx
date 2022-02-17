import clsx from "clsx";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { Footer } from "ui/footer/Footer";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";

import { PropertiesExplorerProps } from "./PropertiesExplorer.types";
import styles from "./PropertiesExplorer.module.scss";
import { PropertyCardContainer } from "./property-card/PropertyCardContainer";

export const PropertiesExplorer: React.FC<PropertiesExplorerProps> = ({ className, contractAddresses }) => (
  <>
    <WalletSelectorNavbar />
    <div className={clsx(styles["properties-explorer"], styles["properties-explorer__main"], className)}>
      <MainPanel className={styles["properties-explorer__main"]}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={12}>
              <Grid.Row>
                {contractAddresses.map((contractAddress) => (
                  <Grid.Col lg={4} xs={1} key={contractAddress}>
                    <div className={styles["properties-explorer__property-card"]}>
                      <PropertyCardContainer contractAddress={contractAddress} />
                    </div>
                  </Grid.Col>
                ))}
              </Grid.Row>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </MainPanel>
    </div>
    <Footer />
  </>
);
