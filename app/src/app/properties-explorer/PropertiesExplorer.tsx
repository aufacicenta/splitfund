import clsx from "clsx";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { Footer } from "ui/footer/Footer";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";

import { PropertiesExplorerProps } from "./PropertiesExplorer.types";
import styles from "./PropertiesExplorer.module.scss";
import { PropertyCard } from "./property-card/PropertyCard";

export const PropertiesExplorer: React.FC<PropertiesExplorerProps> = ({ className, properties }) => {
  const routes = useRoutes();

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles["properties-explorer"], styles["properties-explorer__main"], className)}>
        <MainPanel className={styles["properties-explorer__main"]}>
          <Grid.Container>
            <Grid.Row>
              {properties.map((property) => (
                <Grid.Col lg={4} xs={12} key={property.contract!.id}>
                  <div className={styles["properties-explorer__property-card"]}>
                    <PropertyCard
                      minimal
                      property={property}
                      action={
                        <Typography.Link
                          href={routes.property.details(property.contract!.id)}
                          className={styles["properties-explorer__property-card--cta"]}
                        >
                          See Details
                        </Typography.Link>
                      }
                    />
                  </div>
                </Grid.Col>
              ))}
            </Grid.Row>
          </Grid.Container>
        </MainPanel>
      </div>
      <Footer />
    </>
  );
};
