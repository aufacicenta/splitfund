import { ReactNode } from "react";

export type SolanaWalletContextControllerProps = {
  children: ReactNode;
};

export enum WalletSelectorChain {
  solana = "solana",
}

export type SolanaWalletContextType = {
  // isConnected: boolean;
};
