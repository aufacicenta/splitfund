export type Metadata = {
  expires_at: number;
  funding_amount_limit: number;
  unpaid_amount: number;
  nep_141: string;
  maintainer_account_id: string;
  metadata_url: string;
};

export type Fees = {
  percentage: number;
  amount: number;
  claimed: boolean;
  account_id: string;
};

export type FungibleTokenMetadata = {
  spec: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type StableEscrowProps = {
  metadata: Metadata;
  fees: Fees;
  fungible_token_metadata: FungibleTokenMetadata;
};

export type StableEscrowValues = {
  totalFunds: string;
  fundingAmountLimit: string;
  unpaidFundingAmount: string;
  totalFundedPercentage: number;
  currentCoinPrice: number;
  priceEquivalence: number;
  expirationDate: number;
  daoFactoryAccountId: string;
  ftFactoryAccountId: string;
  daoName: string;
  metadataURL: string;
  isDepositAllowed: boolean;
  isWithdrawalAllowed: boolean;
  deposits: string[][];
  depositsOf: string;
  depositsOfPercentage: number;
};

export type DepositArgs = {
  sender_id: string;
  amount: string;
};

export type StableEscrowMethods = {
  get_total_funds: () => Promise<number>;
  is_deposit_allowed: () => Promise<boolean>;
  is_withdrawal_allowed: () => Promise<boolean>;
  has_contract_expired: () => Promise<boolean>;
  is_funding_reached: () => Promise<boolean>;
  get_deposit_accounts: () => Promise<string[]>;
  get_fees: () => Promise<Fees>;
  get_metadata: () => Promise<Metadata>;
  get_block_timestamp: () => Promise<string>;

  // Change methods
  deposit: ({ sender_id, amount }: DepositArgs, gas?: string, deposit?: string | null) => Promise<void>;
  withdraw: () => Promise<void>;
  delegate_funds: ({ dao_name }: { dao_name: string }, gas: string | number) => Promise<boolean>;
};
