import { HTMLAttributes } from "react";

import { ButtonProps } from "../Button.types";

export type ClipboardButtonProps = {
  onCopyTextValue: string;
} & HTMLAttributes<HTMLButtonElement> &
  ButtonProps;
