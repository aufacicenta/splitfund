import { useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { EscrowFactoryMethods } from "providers/near/contract/escrow-factory.types";
import { getConditionalEscrowContractsList, VIEW_METHODS } from "providers/near/contract/escrow-factory";
import near from "providers/near";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { GenericLoader } from "ui/generic-loader/GenericLoader";
import { Typography } from "ui/typography/Typography";

import { PropertiesExplorer } from "./PropertiesExplorer";

export const PropertiesExplorerContainer = () => {
  const [contractAddresses, setContractAddresses] = useState<string[]>();
  const [isContractDataLoading, setIsContractDataLoading] = useState(true);

  const wallet = useWalletSelectorContext();
  const toast = useToastContext();

  const contractAddress = near.getConfig(wallet.network).escrowFactoryContractName;

  const contract = useNearContract<EscrowFactoryMethods>(wallet, contractAddress, {
    viewMethods: VIEW_METHODS,
    changeMethods: [],
  });

  useEffect(() => {
    if (!contract) {
      return;
    }

    (async () => {
      try {
        const values = await getConditionalEscrowContractsList(contract);

        setContractAddresses(values.reverse());
        setIsContractDataLoading(false);
      } catch {
        setIsContractDataLoading(false);

        toast.trigger({
          variant: "error",
          title: "Failed to load contract data",
          withTimeout: true,
          children: <Typography.Text>An error occurred while loading the contract data.</Typography.Text>,
        });
      }
    })();
  }, [contract, toast, wallet]);

  if (isContractDataLoading || !contractAddresses) {
    return <GenericLoader />;
  }

  return <PropertiesExplorer contractAddresses={contractAddresses} />;
};
