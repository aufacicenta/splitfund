import clsx from "clsx";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import { Card } from "ui/card/Card";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";
import { AuthEmailFormProps } from "ui/form/auth-email-form/AuthEmailForm.types";
import { useAuthContext } from "hooks/useAuthContext/useAuthContext";
import { AuthContextLoginValues } from "context/auth/AuthContext.types";
import { Button } from "ui/button/Button";

import { SignUpProps } from "./SignUp.types";
import styles from "./SignUp.module.scss";

const AuthEmailForm = dynamic<AuthEmailFormProps>(
  () => import("ui/form/auth-email-form/AuthEmailForm").then((mod) => mod.AuthEmailForm),
  { ssr: false },
);

export const SignUp: React.FC<SignUpProps> = ({ className }) => {
  const auth = useAuthContext();
  const { t } = useTranslation(["auth", "common"]);

  return (
    <div className={clsx(styles["sign-up"], className)}>
      <Grid.Container>
        <Grid.Row align="center" justify="center" nowrap>
          <Grid.Col lg={6}>
            <Card shadow>
              {auth.hasActiveSession ? (
                <>
                  <Card.Content>
                    <div className={styles["sign-up__instructions"]}>
                      <Typography.Headline3>{t("signUp.activeSession.title")}</Typography.Headline3>
                      <Typography.Text>{t("signUp.activeSession.description")}</Typography.Text>
                    </div>
                  </Card.Content>
                  <Card.Actions>
                    <Button>{t("signUp.activeSession.dashboard-cta")}</Button>
                    <Button variant="outlined" onClick={auth.handleLogout} isLoading={auth.isLoading}>
                      {t("signUp.activeSession.signout-cta")}
                    </Button>
                  </Card.Actions>
                </>
              ) : (
                <Card.Content>
                  <div className={styles["sign-up__instructions"]}>
                    <Typography.Headline3>{t("signUp.form.title")}</Typography.Headline3>
                    <Typography.Text>{t("signUp.form.description")}</Typography.Text>
                  </div>
                  <AuthEmailForm
                    autoFocus
                    onSubmit={(values) => auth.handleLogin(values as AuthContextLoginValues)}
                    isLoading={auth.isLoading}
                  />
                </Card.Content>
              )}
            </Card>
            <div className={styles["sign-up__footer"]}>
              <Typography.Text>{t("signUp.footer.slogan")}</Typography.Text>
              <Typography.Description>
                {t("privacyNotice", { ns: "common" })} ∞ {t("termsAndConditions", { ns: "common" })}
              </Typography.Description>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
