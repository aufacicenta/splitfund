import { ReactNode } from "react";

export type InvestmentDetailsProps = {
  children?: ReactNode;
  className?: string;
  contractAddress: string;
};

export type OnSubmitDeposit = {
  amount: string;
};
