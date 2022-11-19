import * as nearAPI from "near-api-js";

import getConfig from "./getConfig";

const getAccount = async (accountId: string) => {
  const config = getConfig();

  const near = await nearAPI.connect({
    keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    ...config,
  });

  const account = await near.account(accountId);

  return account;
};

export default getAccount;
