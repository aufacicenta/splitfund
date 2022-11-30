import { AccountState, WalletSelector } from "@near-wallet-selector/core";
import { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { ReactNode } from "react";

export type NearWalletSelectorContextControllerProps = {
  children: ReactNode;
};

export type NearWalletSelectorContextType = {
  initModal: (contractId: string) => void;
  selector?: WalletSelector;
  modal?: WalletSelectorModal;
  accountId: string | null;
  accounts: Array<AccountState>;
};

export type NEARSignInOptions = {
  contractId?: string;
  methodNames?: string[];
  successUrl?: string;
  failureUrl?: string;
};
