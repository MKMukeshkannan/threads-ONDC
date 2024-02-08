import { TProduct } from "@/utils/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface Outfit {
  top: TProduct | null;
  bottom: TProduct | null;
  foot: TProduct | null;
}

interface TryOutState {
  outfit: Outfit;
  setOutfit: Dispatch<SetStateAction<Outfit>>;
}

export const TryOutContext = createContext<TryOutState | undefined>(undefined);

export const useTryOutContext = () => {
  const state = useContext(TryOutContext);

  if (state === undefined) throw new Error("TryOutContext Got undefined");

  return { outfit: state.outfit, setOutfit: state.setOutfit };
};
