import { ReactNode } from "react";

import { FormProps } from "ui/form/Form.types";

export type ContractDepositFormProps = {
  children?: ReactNode;
  className?: string;
  autoFocus?: boolean;
  onSubmit: FormProps["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
};
