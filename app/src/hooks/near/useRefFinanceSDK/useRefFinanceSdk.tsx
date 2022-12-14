import { TokenMetadata } from "@ref-finance/ref-sdk";
import { useState } from "react";

export const useRefFinanceSdk = () => {
  const [ftMetadata, setFtMetadata] = useState<TokenMetadata>();

  const getTokenMetadata = async (accountId: string) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/near/fungible-token/get-token-metadata?${new URLSearchParams({ accountId })}`,
      );

      const metadata = await response.json();

      return setFtMetadata(metadata);
    } catch (error) {
      // @TODO useToast
      console.log(error);
    }

    return null;
  };

  return {
    ftMetadata,
    getTokenMetadata,
  };
};
