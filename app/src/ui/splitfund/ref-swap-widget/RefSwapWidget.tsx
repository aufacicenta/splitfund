import clsx from "clsx";
import * as React from "react";
import { SwapWidget, WalletSelectorTransactions, NotLoginError, Transaction } from "@ref-finance/ref-sdk";

import { useNearWalletSelectorContext } from "hooks/useNearWalletSelectorContext/useNearWalletSelectorContext";

import styles from "./RefSwapWidget.module.scss";
import { RefSwapWidgetProps } from "./RefSwapWidget.types";

export const RefSwapWidget: React.FC<RefSwapWidgetProps> = ({ className, property }) => {
  const { modal, selector, accountId, initModal } = useNearWalletSelectorContext();

  const [swapState, setSwapState] = React.useState<"success" | "fail" | null>(null);
  const [tx, setTx] = React.useState<string | undefined>(undefined);

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

  return (
    <SwapWidget
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
      defaultTokenIn={property.contract.id}
      defaultTokenOut={property.token.address}
    />
  );
};
