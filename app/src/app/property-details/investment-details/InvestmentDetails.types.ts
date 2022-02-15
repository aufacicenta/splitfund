import { Contract } from "near-api-js";
import { ReactNode } from "react";

import { ConditionalEscrowMethods, ConditionalEscrowValues } from "providers/near/contract/conditional-escrow.types";

export type InvestmentDetailsProps = {
  contractAddress: string;
  contractData: ConditionalEscrowValues;
  contract: (Contract & ConditionalEscrowMethods) | undefined;
  isContractDataLoading: boolean;
  children?: ReactNode;
  className?: string;
};

export type OnSubmitDeposit = {
  amount: string;
};
