import { createContext } from "react";

import { SolanaWalletContextType } from "./NearWalletContext.types";

export const WalletSolanaContext = createContext<SolanaWalletContextType | undefined>(undefined);
