"use client";

import { IconShirt } from "@tabler/icons-react";
import { useState } from "react";
import { useTryOutContext } from "@/context/TryOutContext";
import TryOutProduct from "./TryOutProduct";

export default function TryOutSheet() {
  const [isOpen, setOpen] = useState<boolean>(true);
  const { outfit, setOutfit } = useTryOutContext();

  return (
    <>
      <div
        onClick={() => setOpen(!isOpen)}
        className="absolute top-10 right-10 rounded-full border-2 border-accBlack p-2 z-50 cursor-pointer"
      >
        <IconShirt />
      </div>
      <section
        className={`absolute h-full w-72 ${
          isOpen ? "right-0" : "-right-96"
        } bg-red-100 z-40 transition-all duration-500 ease-in-out border-l-4 border-accBlack rounded-l-xl p-5 overflow-auto py-10`}
      >
        <h1 className="font-mono font-bold text-4xl">TRY OUT</h1>

        <section className="flex flex-col items-center pt-10 space-y-10">
          <div>
            <h1 className="font-mono font-bold text-2xl text-center">TOP</h1>
            <TryOutProduct product={outfit.top} />
          </div>

          <div>
            <h1 className="font-mono font-bold text-2xl text-center">BOTTOM</h1>
            <TryOutProduct product={outfit.bottom} />
          </div>

          <div>
            <h1 className="font-mono font-bold text-2xl text-center">
              FOOTWARE
            </h1>
            <TryOutProduct product={outfit.foot} />
          </div>
        </section>
      </section>
    </>
  );
}
