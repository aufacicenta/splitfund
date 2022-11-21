import { StableEscrowProps } from "../stable-escrow/stable-escrow.types";

export type OnCreateEscrowArgs = {
  name: string;
} & StableEscrowProps;
