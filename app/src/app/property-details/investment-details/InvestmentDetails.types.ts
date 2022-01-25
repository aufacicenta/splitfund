import { ReactNode } from "react";

export type InvestmentDetailsProps = {
  children?: ReactNode;
  className?: string;
  contractAddress: string;
};

export type OnSubmitDeposit = {
  amount: string;
};

export type ConditionalEscrowValues = {
  totalFunds?: string;
  minFundingAmount?: string;
  totalFundedPercentage?: number;
  currentCoinPrice?: number;
  priceEquivalence?: number;
  expirationDate?: number;
  recipientAccountId?: string;
  isDepositAllowed?: boolean;
  isWithdrawalAllowed?: boolean;
  deposits?: string[][];
  depositsOf?: string;
};
