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
  totalFunds: string;
  fundingAmountLimit: string;
  unpaidFundingAmount: string;
  totalFundedPercentage: number;
  currentCoinPrice: number;
  priceEquivalence: number;
  expirationDate: number;
  recipientAccountId: string;
  isDepositAllowed: boolean;
  isWithdrawalAllowed: boolean;
  deposits: string[][];
  depositsOf: string;
  depositsOfPercentage: number;
};

export type ConditionalEscrowMethods = {
  get_total_funds: () => Promise<number>;
  get_funding_amount_limit: () => Promise<number>;
  get_unpaid_funding_amount: () => Promise<number>;
  get_deposits: () => Promise<string[][]>;
  get_expiration_date: () => Promise<number>;
  get_recipient_account_id: () => Promise<string>;
  is_deposit_allowed: () => Promise<boolean>;
  is_withdrawal_allowed: () => Promise<boolean>;
  deposits_of: ({ payee }: { payee: string }) => Promise<number>;
  deposit: (args: Record<string, string>, gas?: number, amount?: string | null) => Promise<void>;
  withdraw: () => Promise<void>;
};
