import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import near from "providers/near";

import { Home2 } from "./Home2";

export const HomeContainer = () => {
  const wallet = useWalletSelectorContext();

  const { featuredActiveHoldings } = near.getConfig(wallet.network);

  return <Home2 featuredActiveHoldings={featuredActiveHoldings} />;
};
