import { ReactNode } from "react";

import { FormProps } from "ui/form/Form.types";

export type ContractDepositFormProps = {
  onSubmit: FormProps["onSubmit"];
  onCancel: () => void;
  isLoading: boolean;
  label: string;
  children?: ReactNode;
  className?: string;
  autoFocus?: boolean;
};
