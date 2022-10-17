import clsx from "clsx";

import { BusinessCampaignCard } from "ui/business-campaing-card/BusinessCampaignCard";
import { Grid } from "ui/grid/Grid";

import styles from "./CampaignsGroup.module.scss";
import { CampaignsGroupProps } from "./CampaignsGroup.types";

export const CampaignsGroup: React.FC<CampaignsGroupProps> = ({
  campaigns,
  singleLine = true,
  onCampaignClick,
  className,
}) => {
  const variant = singleLine ? "line" : "collection";

  return (
    <div
      className={clsx(styles["campaigns-group"], className, {
        [styles["campaigns-group__collection"]]: variant === "collection",
        [styles["campaigns-group__line"]]: variant === "line",
      })}
    >
      <Grid.Container>
        <Grid.Row nowrap={singleLine}>
          {campaigns.length &&
            campaigns.map((campaign) => (
              <Grid.Col sm={5} lg={4} xl={3} key={campaign!.id}>
                <BusinessCampaignCard campaign={campaign!} onClick={() => onCampaignClick(campaign!)} />
              </Grid.Col>
            ))}
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
