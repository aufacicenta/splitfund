export type FtTransferCallArgs = {
  receiver_id: string;
  amount: string;
  msg: string;
};

export type FtBalanceOfArgs = {
  account_id: string;
};

export type FtMetadata = {
  spec: string;
  name: string;
  symbol: string;
  icon: string;
  reference: string | null;
  reference_hash: string | null;
  decimals: number;
};

export type FungibleTokenMethods = {
  ft_balance_of: (args: FtBalanceOfArgs, gas?: string) => Promise<string>;
  ft_metadata: () => Promise<FtMetadata>;

  // Change methods
  ft_transfer_call: (args: FtTransferCallArgs, gas?: string, deposit?: string | null) => Promise<void>;
};
