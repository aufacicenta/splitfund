import clsx from "clsx";
import { useEffect, useState } from "react";
import { Property } from "api/codegen";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Grid } from "ui/grid/Grid";
import { Footer } from "ui/footer/Footer";
import { Typography } from "ui/typography/Typography";
import { PropertyCard } from "app/properties-explorer/property-card/PropertyCard";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

import styles from "./MyProperties.module.scss";
import { MyPropertiesProps } from "./MyProperties.types";

export const MyProperties: React.FC<MyPropertiesProps> = ({ className }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  const routes = useRoutes();
  const ls = useLocalStorage();

  useEffect(() => {
    if (properties.length) {
      return;
    }

    const myProperties = ls.get<Record<string, Property>>("my-properties");
    setProperties(Object.keys(myProperties).map((responseId) => myProperties[responseId]));
  }, [ls, properties.length]);

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles["my-properties"], styles["my-properties__main"], className)}>
        <MainPanel className={styles["my-properties__main"]}>
          <Grid.Container>
            <Typography.Headline1 className={styles["my-properties__page-title"]}>Your Properties</Typography.Headline1>
            <Grid.Row>
              {properties.map((property) => (
                <Grid.Col lg={4} xs={12} key={property.id}>
                  <div className={styles["my-properties__property-card"]}>
                    <PropertyCard
                      minimal
                      property={property}
                      action={
                        <Typography.Link
                          href={routes.property.preview(property.id)}
                          className={styles["my-properties__property-card--cta"]}
                        >
                          Preview
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
