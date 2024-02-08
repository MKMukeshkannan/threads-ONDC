"use client";

import { ReactNode, useState } from "react";
import { Outfit, TryOutContext } from "./TryOutContext";

interface prop {
  children: ReactNode;
}

export default function TryOutContextProvider({ children }: prop) {
  const [outfit, setOutfit] = useState<Outfit>({
    top: null,
    bottom: null,
    foot: null,
  });

  return (
    <TryOutContext.Provider value={{ outfit, setOutfit }}>
      {children}
    </TryOutContext.Provider>
  );
}
