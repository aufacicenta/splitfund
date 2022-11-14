import { Contract } from "near-api-js";
import { BN } from "bn.js";

import { EscrowFactoryMethods, EscrowFactoryValues } from "../contract/escrow-factory.types";
import nearUtils from "providers/near";
import logger from "providers/logger";
import { StableEscrowProps } from "../stable-escrow/stable-escrow.types";

export class EscrowFactory {
  values: EscrowFactoryValues | undefined;

  contract: Contract & EscrowFactoryMethods;

  contractAddress: string;

  constructor(contract: Contract & EscrowFactoryMethods) {
    this.contract = contract;
    this.contractAddress = contract.contractId;
  }

  static async createEscrow(name: string, props: StableEscrowProps) {
    logger.info(`creating Escrow contract from ${nearUtils.getConfig().signerWalletId}`);

    const connection = await nearUtils.getPrivateKeyConnection();
    const account = await connection.account(nearUtils.getConfig().signerWalletId);

    const base64args = Buffer.from(JSON.stringify(props)).toString("base64");
    const contractId = nearUtils.getConfig().factoryWalletId;
    const methodName = "create_escrow";

    const args = {
      name,
      args: base64args,
    };

    const response = await account.functionCall({
      contractId,
      methodName,
      args,
      gas: new BN("300000000000000"),
      attachedDeposit: new BN("4000000000000000000000000"),
    });

    logger.info(response);
  }
}
