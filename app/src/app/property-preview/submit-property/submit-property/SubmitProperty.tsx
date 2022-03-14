import clsx from "clsx";
import { Widget } from "@typeform/embed-react";
import { useRouter } from "next/router";

import { WalletSelectorNavbar2 } from "ui/wallet-selector-navbar/WalletSelectorNavbar2";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import getEmbedFormConfig from "providers/typeform/getEmbedFormConfig";
import { Locale } from "types/Locale";
import { Grid } from "ui/grid/Grid";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { Footer } from "ui/footer/Footer";

import styles from "./SubmitProperty.module.scss";
import { SubmitPropertyProps } from "./SubmitProperty.types";

export const SubmitProperty: React.FC<SubmitPropertyProps> = ({ className }) => {
  const router = useRouter();
  const routes = useRoutes();

  const embedFormConfig = getEmbedFormConfig(router.locale as Locale);

  const onSubmitEmbedForm = (data: { responseId: string }) => {
    setTimeout(() => {
      router.push(routes.property.preview(data.responseId));
    }, 2500);
  };

  return (
    <>
      <WalletSelectorNavbar2 />
      <div className={clsx(styles["submit-property"], className)}>
        <MainPanel className={clsx(styles["submit-property__main"], className)}>
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={8} offset={{ lg: 2 }}>
                <Widget
                  id={embedFormConfig.formID}
                  style={{ width: "100%", height: "80vh" }}
                  className="my-form"
                  onSubmit={onSubmitEmbedForm}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </MainPanel>
      </div>
      <Footer />
    </>
  );
};
