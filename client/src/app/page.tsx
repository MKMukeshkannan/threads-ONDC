"use client";

import ProductCart from "@/components/ProductPage";
import RecordAudio from "@/components/RecordAudio";
import TryOutSheet from "@/components/TryOutSheet";
import { useProducts } from "@/store";

export default function Home() {
  const product_data = useProducts((state) => state.products);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-lightBeige p-4 lg:p-20 overflow-x-clip">
      <h1 className="absolute  top-16 font-mono font-black text-accBlack text-7xl">
        THREADS
      </h1>

      <RecordAudio />

      <section className="flex items-center w-full space-x-2 overflow-x-auto">
        <ProductCart products={product_data} />
      </section>

      <TryOutSheet />
    </main>
  );
}
