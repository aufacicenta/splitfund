import * as nearAPI from "near-api-js";

import getConfig from "./getConfig";

const getGuestAccount = async () => {
  const config = getConfig();

  const near = await nearAPI.connect({
    keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    headers: {},
    ...config,
  });

  const account = await near.account(config.guestWalletId);

  return account;
};

export default getGuestAccount;
