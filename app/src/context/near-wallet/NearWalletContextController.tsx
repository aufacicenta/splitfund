import * as nearAPI from "near-api-js";
import React, { useEffect, useState } from "react";

import { WalletSelectorContextController } from "../wallet-selector/WalletSelectorContextController";
import { WalletSelectorChain, WalletSelectorContextType } from "../wallet-selector/WalletSelectorContext.types";
import { useWalletState } from "hooks/useWalletState/useWalletState";
import nearUtils from "providers/near";
import getConfig from "providers/near/getConfig";

import { NEARSignInOptions, NearWalletContextControllerProps } from "./NearWalletContext.types";

const DEFAULT_NETWORK_ENV = "testnet";

export const NearWalletContextController = ({ children }: NearWalletContextControllerProps) => {
  const walletState = useWalletState();

  const [walletConnection, setWalletConnection] = useState<
    | {
        near: nearAPI.Near;
        wallet: nearAPI.WalletConnection;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (walletState.isConnected.get() && !!walletState.address.get() && !!walletState.balance.get()) {
      return;
    }

    walletState.network.set(DEFAULT_NETWORK_ENV);
    walletState.chain.set(WalletSelectorChain.near);
    walletState.explorer.set(getConfig(DEFAULT_NETWORK_ENV).explorerUrl);

    (async () => {
      const connection = await nearUtils.initWalletConnection(walletState.network.get());
      setWalletConnection(connection);

      const { near, wallet } = connection;

      if (wallet.isSignedIn()) {
        walletState.isConnected.set(true);

        const accountId = wallet.getAccountId();
        walletState.address.set(accountId);

        const accountBalance = await nearUtils.getAccountBalance(near, accountId);
        walletState.balance.set(nearUtils.formatAccountBalance(accountBalance.available));
      }
    })();
  }, [
    walletState.address,
    walletState.balance,
    walletState.chain,
    walletState.explorer,
    walletState.isConnected,
    walletState.network,
  ]);

  const onSetChain = (c: WalletSelectorChain) => {
    walletState.chain.set(c);
  };

  const onClickConnect = (signInOptions?: NEARSignInOptions) => {
    const wallet = walletConnection?.wallet!;

    if (wallet.isSignedIn()) {
      wallet.signOut();
      walletState.isConnected.set(false);
      walletState.balance.set("0");
      walletState.address.set(undefined);
    } else {
      wallet.requestSignIn(signInOptions);
    }
  };

  const props: WalletSelectorContextType = {
    onClickConnect,
    isConnected: walletState.isConnected.get(),
    network: walletState.network.get(),
    explorer: walletState.explorer.get(),
    chain: walletState.chain.get(),
    address: walletState.address.get(),
    balance: walletState.balance.get(),
    onSetChain,
    context: { connection: walletConnection?.wallet },
  };

  return <WalletSelectorContextController {...props}>{children}</WalletSelectorContextController>;
};
