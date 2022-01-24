import { ReactNode } from "react";

export type NearWalletContextControllerProps = {
  children: ReactNode;
};

export type NEARSignInOptions = {
  contractId?: string;
  methodNames?: string[];
  successUrl?: string;
  failureUrl?: string;
};
