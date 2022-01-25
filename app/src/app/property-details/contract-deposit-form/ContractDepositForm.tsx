import clsx from "clsx";

import { Form } from "ui/form/Form";
import { Button } from "ui/button/Button";

import { ContractDepositFormProps } from "./ContractDepositForm.types";
import styles from "./ContractDepositForm.module.scss";

export const ContractDepositForm: React.FC<ContractDepositFormProps> = ({
  className,
  autoFocus,
  onSubmit,
  onCancel,
  isLoading,
}) => (
  <Form className={clsx(styles["contract-deposit-form"], className)} onSubmit={onSubmit}>
    <div className={styles["contract-deposit-form__inline-wrapper"]}>
      <div className={styles["contract-deposit-form__inline-wrapper--form"]}>
        <Form.TextInput
          autoFocus={autoFocus}
          label="Amount (in NEAR token units)"
          id="amount"
          type="text"
          className={styles["contract-deposit-form__input"]}
        />
      </div>
      <div className={styles["contract-deposit-form__inline-wrapper--button"]}>
        <Button variant="outlined" color="secondary" size="s" onClick={onCancel}>
          Nevermind
        </Button>
        <Button type="submit" isLoading={isLoading} size="s">
          Buy Ownership
        </Button>
      </div>
    </div>
  </Form>
);
