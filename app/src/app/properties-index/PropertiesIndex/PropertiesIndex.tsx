import clsx from "clsx";

import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";

import { PropertiesIndexProps } from "./PropertiesIndex.types";
import styles from "./PropertiesIndex.module.scss";

export const PropertiesIndex: React.FC<PropertiesIndexProps> = ({ className }) => (
  <>
    <WalletSelectorNavbar>
      <WalletSelector />
    </WalletSelectorNavbar>
    <div className={clsx(styles["properties-index"], className)}>
      <section className={styles["properties-index__heading"]}>
        <Grid.Container>
          <Typography.Headline1>Join the Real Estate revolution</Typography.Headline1>
          <Typography.TextLead>Purchase properties' ownership for as low as 1 NEAR</Typography.TextLead>
        </Grid.Container>
      </section>
      <section className={styles["properties-index__section--grid"]}>
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={6}>
              <Card shadow className={styles["properties-index__property-card"]}>
                <div
                  className={styles["properties-index__property-card--background-image"]}
                  style={{
                    backgroundImage: `url(https://bafybeiddfibjc5kxfgihrpkfb4e24e7iuveh5b6rxbnfotlabjuzpfkwxe.ipfs.infura-ipfs.io/ronnie-george-9gGvNWBeOq4-unsplash.jpeg)`,
                  }}
                />
                <Card.Content>Conent</Card.Content>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Card shadow className={styles["properties-index__property-card"]}>
                <div
                  className={styles["properties-index__property-card--background-image"]}
                  style={{
                    backgroundImage: `url(https://bafybeiddfibjc5kxfgihrpkfb4e24e7iuveh5b6rxbnfotlabjuzpfkwxe.ipfs.infura-ipfs.io/ronnie-george-9gGvNWBeOq4-unsplash.jpeg)`,
                  }}
                />
                <Card.Content>Conent</Card.Content>
              </Card>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col lg={6}>
              <Card shadow className={styles["properties-index__property-card"]}>
                <div
                  className={styles["properties-index__property-card--background-image"]}
                  style={{
                    backgroundImage: `url(https://bafybeiddfibjc5kxfgihrpkfb4e24e7iuveh5b6rxbnfotlabjuzpfkwxe.ipfs.infura-ipfs.io/ronnie-george-9gGvNWBeOq4-unsplash.jpeg)`,
                  }}
                />
                <Card.Content>Conent</Card.Content>
              </Card>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Card shadow className={styles["properties-index__property-card"]}>
                <div
                  className={styles["properties-index__property-card--background-image"]}
                  style={{
                    backgroundImage: `url(https://bafybeiddfibjc5kxfgihrpkfb4e24e7iuveh5b6rxbnfotlabjuzpfkwxe.ipfs.infura-ipfs.io/ronnie-george-9gGvNWBeOq4-unsplash.jpeg)`,
                  }}
                />
                <Card.Content>Conent</Card.Content>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </div>
  </>
);
