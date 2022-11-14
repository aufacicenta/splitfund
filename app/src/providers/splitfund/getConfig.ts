import { DEFAULT_NETWORK_ENV } from "providers/near/getConfig";

const TESTNET_CONFIG = {
  stableEscrow: {
    maintainer_account_id: "splitfund.testnet",
    fees_account_id: "splitfund.testnet",
    fees: {
      percentage: 0.02,
    },
    ft_metadata: {
      symbol: "USDT",
      address: "usdt.fakes.testnet",
      decimals: 6,
    },
  },
};

export default (network: string | undefined = "testnet") => {
  switch (network || DEFAULT_NETWORK_ENV) {
    case "mainnet":
      return {
        stableEscrow: {
          // @TODO check for official address, may be the DAO
          maintainer_account_id: "splitfund.near",
          fees_account_id: "splitfund.near",
          fees: {
            percentage: 0.02,
          },
          ft_metadata: {
            // @TODO check for mainnet address
            symbol: "USDT",
            address: "usdt.near",
            decimals: 6,
          },
        },
      };
    case "test":
    case "testnet":
      return {
        ...TESTNET_CONFIG,
      };
    default:
      return {
        ...TESTNET_CONFIG,
      };
  }
};
