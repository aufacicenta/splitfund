import { createContext } from "react";

import { WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";

export const NearWalletContext = createContext<WalletSelectorContextType | undefined>(undefined);
