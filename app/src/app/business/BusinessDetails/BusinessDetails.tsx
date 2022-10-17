import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Tab } from "ui/tab/Tab";

import { BusinessDetailsProps } from "./BusinessDetails.types";
import styles from "./BusinessDetails.module.scss";
import { BusinessContent } from "./BusinessContent/BusinessContent";
import { BusinessHeader } from "./BusinessHeader/BusinessHeader";
import { InvestNowWidget } from "./InvestNowWidget/InvestNowWidget";
import { CampaignFinancials } from "./CampaignFinancials/CampaignFinancials";

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({ campaign }) => {
  const { t } = useTranslation("campaign");

  return (
    <div className={clsx(styles["business-details"])}>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col lg={8}>
            <Card className={styles["business-details__box"]} shadow>
              <BusinessHeader content={campaign.content} />
              <Tab defaultPaneId="business-content-tab">
                <Tab.Navigation>
                  <Tab.Item paneId="business-content-tab">{t("businessDetails.tab.investmentOpportunity")}</Tab.Item>
                  <Tab.Item paneId="business-financials-tab">{t("businessDetails.tab.dataRoom")}</Tab.Item>
                </Tab.Navigation>
                <Tab.Pane id="business-content-tab">
                  <BusinessContent content={campaign.content} />
                </Tab.Pane>
                <Tab.Pane id="business-financials-tab">
                  <CampaignFinancials campaign={campaign} />
                </Tab.Pane>
              </Tab>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
      <InvestNowWidget campaign={campaign} />
    </div>
  );
};
