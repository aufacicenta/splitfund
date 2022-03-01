import clsx from "clsx";
import ClipboardJS from "clipboard";

import { Button } from "../Button";
import { Typography } from "ui/typography/Typography";
import { useToastContext } from "hooks/useToastContext/useToastContext";

import { ClipboardButtonProps } from "./ClipboardButton.types";
import styles from "./ClipboardButton.module.scss";

const clipboard = new ClipboardJS("#copy-to-clipboard-button");

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({ children, className, onCopyTextValue, ...props }) => {
  const toast = useToastContext();

  const onClick = () => {
    clipboard.on("success", () => {
      toast.trigger({
        variant: "confirmation",
        title: "Value copied succesfully",
        withTimeout: true,
        children: <Typography.Text>You can paste it now.</Typography.Text>,
      });
    });
  };

  return (
    <Button
      color="secondary"
      variant="outlined"
      onClick={onClick}
      id="copy-to-clipboard-button"
      className={clsx(styles["clipboard-button"], className)}
      data-clipboard-text={onCopyTextValue}
      {...props}
    >
      {children}
    </Button>
  );
};
