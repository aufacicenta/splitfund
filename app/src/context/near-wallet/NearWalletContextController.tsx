import * as nearAPI from "near-api-js";
import React, { useEffect, useState } from "react";

import { WalletSelectorContextController } from "../wallet-selector/WalletSelectorContextController";
import { WalletSelectorChain, WalletSelectorContextType } from "../wallet-selector/WalletSelectorContext.types";
import { useWalletState } from "hooks/useWalletState/useWalletState";
import nearUtils from "providers/near";

import { NearWalletContextControllerProps } from "./NearWalletContext.types";

export const NearWalletContextController = ({ children }: NearWalletContextControllerProps) => {
  const walletState = useWalletState();

  const [network, setNetwork] = walletState.network;
  const [chain, setChain] = walletState.chain;
  const [address, setAddress] = walletState.address;
  const [balance, setBalance] = walletState.balance;
  const [isConnected, setIsConnected] = walletState.isConnected;

  const [walletConnection, setWalletConnection] = useState<
    | {
        near: nearAPI.Near;
        wallet: nearAPI.WalletConnection;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    setNetwork("testnet");
    setChain(WalletSelectorChain.near);

    (async () => {
      const connection = await nearUtils.initWalletConnection(network);
      setWalletConnection(connection);

      const { near, wallet } = connection;

      if (wallet.isSignedIn()) {
        setIsConnected(true);

        const accountId = wallet.getAccountId();
        setAddress(accountId);

        const accountBalance = await nearUtils.getAccountBalance(near, accountId);
        setBalance(nearUtils.formatAccountBalance(accountBalance.available));
      }
    })();
  }, [network, setAddress, setBalance, setChain, setIsConnected, setNetwork]);

  const onSetChain = (c: WalletSelectorChain) => {
    setChain(c);
  };

  const onClickConnect = () => {
    const wallet = walletConnection?.wallet!;

    if (wallet.isSignedIn()) {
      wallet.signOut();
      setIsConnected(false);
      setBalance("0");
      setAddress(undefined);
    } else {
      wallet.requestSignIn();
    }
  };

  const props: WalletSelectorContextType = {
    onClickConnect,
    isConnected,
    network,
    chain,
    address,
    balance,
    onSetChain,
    context: { connection: walletConnection?.wallet },
  };

  return <WalletSelectorContextController {...props}>{children}</WalletSelectorContextController>;
};
