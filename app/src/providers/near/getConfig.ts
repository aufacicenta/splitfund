const CONTRACT_NAME = process.env.CONTRACT_NAME || "testnet";

const TESTNET_DAO_CONTRACT_NAME = "sputnikv2.testnet";
const MAINNET_DAO_CONTRACT_NAME = "sputnik-dao.near";

const TESTNET_ESCROWFACTORY_CONTRACT_NAME = "escrowfactory12.nearholdings.testnet";
const MAINNET_ESCROWFACTORY_CONTRACT_NAME = "escrowfactory.communitycapital.near";

const TESTNET_DAOFACTORY_CONTRACT_NAME = "daofactory2.nearholdings.testnet";
const MAINNET_DAOFACTORY_CONTRACT_NAME = "daofactory.communitycapital.near";

const TESTNET_FTFACTORY_CONTRACT_NAME = "ftfactory2.nearholdings.testnet";
const MAINNET_FTFACTORY_CONTRACT_NAME = "ftfactory.communitycapital.near";

const TESTNET_SKFACTORY_CONTRACT_NAME = "stakingfactory.nearholdings.testnet";
const MAINNET_SKFACTORY_CONTRACT_NAME = "stakingfactory.communitycapital.near";

const TESTNET_ASTRODAO_URL_ORIGIN = "https://dev.app.astrodao.com";
const MAINNET_ASTRODAO_URL_ORIGIN = "https://app.astrodao.com";

export default (network: string | undefined) => {
  switch (network) {
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: MAINNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: MAINNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: MAINNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: MAINNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: MAINNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: MAINNET_ASTRODAO_URL_ORIGIN,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.near.org",
      };
    case "test":
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    case "betanet":
      return {
        networkId: "betanet",
        nodeUrl: "https://rpc.betanet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    case "local":
      return {
        networkId: "local",
        nodeUrl: "http://localhost:3030",
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: "http://localhost:4000/wallet",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
      };
    case "ci":
      return {
        networkId: "shared-test",
        nodeUrl: "https://rpc.ci-testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
        masterAccount: "test.near",
      };
    case "ci-betanet":
      return {
        networkId: "shared-test-staging",
        nodeUrl: "https://rpc.ci-betanet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
        masterAccount: "test.near",
      };
    default:
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        daoContractName: TESTNET_DAO_CONTRACT_NAME,
        escrowFactoryContractName: TESTNET_ESCROWFACTORY_CONTRACT_NAME,
        daoFactoryContractName: TESTNET_DAOFACTORY_CONTRACT_NAME,
        ftFactoryContractName: TESTNET_FTFACTORY_CONTRACT_NAME,
        skFactoryContractName: TESTNET_SKFACTORY_CONTRACT_NAME,
        astroDaoURLOrigin: TESTNET_ASTRODAO_URL_ORIGIN,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
  }
};
