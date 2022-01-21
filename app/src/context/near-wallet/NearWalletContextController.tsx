import React, { useEffect } from "react";

import { WalletSelectorContextController } from "../wallet-selector/WalletSelectorContextController";
import { WalletSelectorChain } from "../wallet-selector/WalletSelectorContext.types";
import { useWalletState } from "../../hooks/useWalletState/useWalletState";

import { SolanaWalletContextControllerProps } from "./NearWalletContext.types";

const onClickConnect = () => null;

export const NearWalletContextController = ({ children }: SolanaWalletContextControllerProps) => {
  const walletState = useWalletState();

  const [network, setNetwork] = walletState.network;
  const [chain, setChain] = walletState.chain;
  const [address] = walletState.address;
  const [balance] = walletState.balance;
  const [isConnected] = walletState.isConnected;

  useEffect(() => {
    setNetwork("testnet");
    setChain(WalletSelectorChain.near);
  }, [setChain, setNetwork]);

  const onSetChain = (c: WalletSelectorChain) => {
    setChain(c);
  };

  const props = { onClickConnect, isConnected, network, chain, address, balance, onSetChain };

  return <WalletSelectorContextController {...props}>{children}</WalletSelectorContextController>;
};
