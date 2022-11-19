/* eslint-disable @typescript-eslint/naming-convention */
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import currency from "providers/currency";
import { StableEscrow } from "providers/near/stable-escrow";

const withdraw = () => "{}";

const delegateFunds = () => "{}";

export const useEscrowContract = (contractAddress: string) => {
  const wallet = useWalletSelectorContext();

  const deposit = async (amount: string) => {
    try {
      if (!wallet.isConnected) {
        throw new Error("wallet is not connected");
      }

      const sender_id = wallet.address!;

      const contract = await StableEscrow.getFromConnection(contractAddress, sender_id);
      const escrow = new StableEscrow(contract);

      // @TODO deposit is private, we need to call ft_on_transfer_call instead
      const response = await escrow.deposit({ sender_id, amount: currency.convert.toUIntAmount(amount).toString() });

      console.log(response);
    } catch (error) {
      console.log(error);
      // @TODO useToast
    }
  };

  return {
    deposit,
    withdraw,
    delegateFunds,
  };
};
