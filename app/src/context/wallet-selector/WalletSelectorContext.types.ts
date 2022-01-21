import { ReactNode } from "react";

export type WalletSelectorContextControllerProps = {
  children: ReactNode;
} & WalletSelectorContextType;

export enum WalletSelectorChain {
  near = "near",
}

export type WalletSelectorContextType = {
  address?: string | null;
  network?: string;
  balance: string;
  chain?: WalletSelectorChain;
  isConnected: boolean;
  onSetChain: (chain: WalletSelectorChain) => void;
  onClickConnect: () => void;
};
