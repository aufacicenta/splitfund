import { PopupButton } from "@typeform/embed-react";
import clsx from "clsx";
import { useRouter } from "next/router";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import getEmbedFormConfig from "providers/typeform/getEmbedFormConfig";
import { Locale } from "types/Locale";

import styles from "./TypeformButton.module.scss";
import { TypeformButtonProps } from "./TypeformButton.types";

export const TypeformButton: React.FC<TypeformButtonProps> = ({ children, className }) => {
  const router = useRouter();
  const routes = useRoutes();

  const embedFormConfig = getEmbedFormConfig(router.locale as Locale);

  const onSubmitEmbedForm = (data: { responseId: string }) => {
    setTimeout(() => {
      router.push(routes.property.preview(data.responseId));
    }, 2500);
  };

  return (
    <PopupButton
      id={embedFormConfig.formID}
      size={80}
      className={clsx(styles["typeform-button"], className)}
      onSubmit={onSubmitEmbedForm}
    >
      {children}
    </PopupButton>
  );
};
