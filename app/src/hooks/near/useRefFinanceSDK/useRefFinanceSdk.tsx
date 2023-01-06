import { ftGetTokenMetadata, init_env } from "@ref-finance/ref-sdk";
import { useEffect } from "react";

import near from "providers/near";

const getTokenMetadata = async (accountId: string) => {
  try {
    const ftMetadata = await ftGetTokenMetadata(accountId);

    console.log(ftMetadata);

    return ftMetadata;
  } catch (error) {
    // @TODO useToast
    console.log(error);
  }

  return null;
};

export const useRefFinanceSdk = () => {
  useEffect(() => {
    init_env(near.getConfig().networkId);
  }, []);

  return {
    getTokenMetadata,
  };
};
