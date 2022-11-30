export const DEFAULT_NETWORK_ENV = process.env.NEXT_PUBLIC_NEAR_WALLET_ENV;

const CONTRACT_NAME = process.env.CONTRACT_NAME || "testnet";

const TESTNET_GUEST_WALLET_ID = "splitfund.testnet";
const MAINNET_GUEST_WALLET_ID = "splitfund.near";

const TESTNET_SIGNER_WALLET_ID = "factory.splitfund.testnet";
const MAINNET_SIGNER_WALLET_ID = "factory.splitfund.near";

const TESTNET_FACTORY_WALLET_ID = "factory.splitfund.testnet";
const MAINNET_FACTORY_WALLET_ID = "factory.splitfund.near";

const TESTNET_CONFIG = {
  guestWalletId: TESTNET_GUEST_WALLET_ID,
  signerWalletId: TESTNET_SIGNER_WALLET_ID,
  factoryWalletId: TESTNET_FACTORY_WALLET_ID,
};

export default (network: string | undefined = "testnet") => {
  switch (network || DEFAULT_NETWORK_ENV) {
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        guestWalletId: MAINNET_GUEST_WALLET_ID,
        contractName: CONTRACT_NAME,
        signerWalletId: MAINNET_SIGNER_WALLET_ID,
        factoryWalletId: MAINNET_FACTORY_WALLET_ID,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.near.org",
      };
    case "test":
    case "testnet":
      return {
        ...TESTNET_CONFIG,
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    case "betanet":
      return {
        ...TESTNET_CONFIG,
        networkId: "betanet",
        nodeUrl: "https://rpc.betanet.near.org",
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    case "local":
      return {
        ...TESTNET_CONFIG,
        networkId: "local",
        nodeUrl: "http://localhost:3030",
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: "http://localhost:4000/wallet",
      };
    case "ci":
      return {
        ...TESTNET_CONFIG,
        networkId: "shared-test",
        nodeUrl: "https://rpc.ci-testnet.near.org",
        masterAccount: "test.near",
      };
    case "ci-betanet":
      return {
        ...TESTNET_CONFIG,
        networkId: "shared-test-staging",
        nodeUrl: "https://rpc.ci-betanet.near.org",
        masterAccount: "test.near",
      };
    default:
      return {
        ...TESTNET_CONFIG,
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
  }
};
