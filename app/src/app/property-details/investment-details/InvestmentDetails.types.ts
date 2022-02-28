import { ReactNode } from "react";

import { ConditionalEscrow } from "providers/near/conditional-escrow";

export type InvestmentDetailsProps = {
  isContractDataLoading: boolean;
  contract?: ConditionalEscrow;
  children?: ReactNode;
  className?: string;
};

export type OnSubmitDeposit = {
  amount: string;
};
