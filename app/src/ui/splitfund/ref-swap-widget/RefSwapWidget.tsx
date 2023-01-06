import clsx from "clsx";
import * as React from "react";
import {
  SwapWidget,
  WalletSelectorTransactions,
  NotLoginError,
  Transaction,
  TokenMetadata,
} from "@ref-finance/ref-sdk";

import { useNearWalletSelectorContext } from "hooks/useNearWalletSelectorContext/useNearWalletSelectorContext";
import { useRefFinanceSdk } from "hooks/near/useRefFinanceSDK/useRefFinanceSdk";

import styles from "./RefSwapWidget.module.scss";
import { RefSwapWidgetProps } from "./RefSwapWidget.types";

export const RefSwapWidget: React.FC<RefSwapWidgetProps> = ({ className, property }) => {
  const { modal, selector, accountId, initModal } = useNearWalletSelectorContext();
  const { getTokenMetadata } = useRefFinanceSdk();

  const [swapState, setSwapState] = React.useState<"success" | "fail" | null>(null);
  const [tx, setTx] = React.useState<string | undefined>(undefined);
  const [defaultTokenInMetadata, setDefaultTokenInMetadata] = React.useState<TokenMetadata>();
  const [defaultTokenOutMetadata, setDefaultTokenOutMetadata] = React.useState<TokenMetadata>();

  React.useEffect(() => {
    (async () => {
      const defaultTokenIn = await getTokenMetadata(property.token.address);
      const defaultTokenOut = await getTokenMetadata(property.contract.id);

      if (!defaultTokenIn || !defaultTokenOut) {
        return;
      }

      setDefaultTokenInMetadata(defaultTokenIn);
      setDefaultTokenOutMetadata(defaultTokenOut);
    })();
  }, [selector]);

  React.useEffect(() => {
    if (!selector) {
      return;
    }

    initModal(property.token.address);
  }, [selector]);

  React.useEffect(() => {
    const errorCode = new URLSearchParams(window.location.search).get("errorCode");

    const transactions = new URLSearchParams(window.location.search).get("transactionHashes");

    const lastTX = transactions?.split(",").pop();

    setTx(lastTX);

    // eslint-disable-next-line no-nested-ternary
    setSwapState(errorCode ? "fail" : lastTX ? "success" : null);

    window.history.replaceState({}, "", window.location.origin + window.location.pathname);
  }, []);

  const onSwap = async (transactionsRef: Transaction[]) => {
    const wallet = await selector?.wallet();

    if (!accountId) {
      throw NotLoginError;
    }

    wallet?.signAndSendTransactions(WalletSelectorTransactions(transactionsRef, accountId));
  };

  const onConnect = () => {
    modal?.show();
  };

  const onDisConnect = async () => {
    const wallet = await selector?.wallet();

    await wallet?.signOut();
  };

  if (!defaultTokenInMetadata || !defaultTokenOutMetadata) {
    return (
      <div
        role="status"
        className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5" />
        <div className="mb-10 w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-72 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
          <div className="w-full h-80 bg-gray-200 rounded-t-lg dark:bg-gray-700" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <SwapWidget
      darkMode
      defaultTokenList={[defaultTokenInMetadata, defaultTokenOutMetadata]}
      className={clsx(styles["ref-swap-widget"], className)}
      onSwap={onSwap}
      onDisConnect={onDisConnect}
      width="100%"
      connection={{
        AccountId: accountId || "",
        isSignedIn: !!accountId,
      }}
      transactionState={{
        state: swapState,
        setState: setSwapState,
        tx,
        detail: "(success details show here)",
      }}
      enableSmartRouting
      onConnect={onConnect}
      defaultTokenIn={property.token.address}
      defaultTokenOut={property.contract.id}
    />
  );
};
