import clsx from "clsx";

import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { SplitfundLogoRE } from "ui/icons/SplitfundLogoRE";
import { Icon } from "ui/icon/Icon";

import styles from "./VersusTable.module.scss";
import { VersusTableProps } from "./VersusTable.types";

export const VersusTable: React.FC<VersusTableProps> = ({ className }) => (
  <div className={clsx(styles["versus-table"], className)}>
    <div className={styles["versus-table__headline"]}>
      <Typography.Headline2 flat className={styles["versus-table__headline--regular"]}>
        Real Estate is a
      </Typography.Headline2>
      <Typography.Headline2>stable investment choice</Typography.Headline2>
      <Typography.Headline3 className={styles["versus-table__headline--regular"]}>
        But it hasn't been accessible to everyone. Until now.
      </Typography.Headline3>
    </div>
    <div className={styles["versus-table__container"]}>
      <Grid.Container>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <SplitfundLogoRE className={styles["versus-table__logo"]} />
          </Grid.Col>
          <Grid.Col>
            <Typography.Text flat>vs.</Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Typography.TextLead flat>Stocks</Typography.TextLead>
          </Grid.Col>
          <Grid.Col>
            <Typography.Text flat>vs.</Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Typography.TextLead flat>Starting a Company</Typography.TextLead>
          </Grid.Col>
          <Grid.Col>
            <Typography.Text flat>vs.</Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Typography.TextLead flat>Crypto</Typography.TextLead>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Low Fluctuation</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Low entrance barriers</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Value increase certainty</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Short-term passive income</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Low opt-out barriers</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Trade anytime</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row className={styles["versus-table__grid--row-header"]}>
          <Grid.Col>
            <Typography.Text flat>
              <strong>Value storage</strong>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-cross" />
          </Grid.Col>
          <Grid.Col>&nbsp;</Grid.Col>
          <Grid.Col>
            <Icon name="icon-check" />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  </div>
);
