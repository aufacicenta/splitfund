export type FtTransferCallArgs = {
  receiver_id: string;
  amount: string;
  msg: string;
};

export type FtBalanceOfArgs = {
  account_id: string;
};

export type FungibleTokenMethods = {
  ft_balance_of: (args: FtBalanceOfArgs, gas?: string) => Promise<string>;

  // Change methods
  ft_transfer_call: (args: FtTransferCallArgs, gas?: string, deposit?: string | null) => Promise<void>;
};
