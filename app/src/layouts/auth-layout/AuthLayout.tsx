import clsx from "clsx";

import { AuthContextController } from "context/auth/AuthContextController";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { AuthNavBar } from "ui/auth-navbar/AuthNavBar";

import styles from "./AuthLayout.module.scss";
import { AuthLayoutProps } from "./AuthLayout.types";

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <AuthContextController>
    <div className={clsx(styles["auth-layout"])}>
      <AuthNavBar />
      <MainPanel className={styles["auth-layout__main-panel"]}>{children}</MainPanel>
    </div>
  </AuthContextController>
);
