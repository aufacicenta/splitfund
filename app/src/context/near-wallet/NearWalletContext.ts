import { createContext } from "react";

import { NearWalletContextType } from "./NearWalletContext.types";

export const WalletSolanaContext = createContext<NearWalletContextType | undefined>(undefined);
