import clsx from "clsx";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";
import { Button } from "ui/button/Button";
import { Footer } from "ui/footer/Footer";
import { TypeformButton } from "ui/button/typeform-button/TypeformButton";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";

import { PropertyPreviewErrorProps } from "./PropertyPreviewError.types";
import styles from "./PropertyPreviewError.module.scss";

export const PropertyPreviewError: React.FC<PropertyPreviewErrorProps> = ({ className }) => {
  const routes = useRoutes();

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles["property-preview-error"], className)}>
        <Grid.Container>
          <Typography.Headline3 flat>An error occurred while creating the contract.</Typography.Headline3>
          <Typography.TextLead>Your funds are safe and were returned to your wallet.</Typography.TextLead>
          <Grid.Row align="center" justify="center" nowrap>
            <Grid.Col width="auto">
              <TypeformButton>Submit Again</TypeformButton>
            </Grid.Col>
            <Grid.Col width="auto">
              <Button color="secondary" variant="outlined" as="a" href={routes.home}>
                Back to Home
              </Button>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </div>
      <Footer />
    </>
  );
};
