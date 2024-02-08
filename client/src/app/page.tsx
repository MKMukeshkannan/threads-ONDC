import ProductCart from "@/components/ProductPage";
import TryOutSheet from "@/components/TryOutSheet";
import { product_data } from "@/utils/data";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-lightBeige p-4 lg:p-24 overflow-x-clip">
      <h1 className="font-mono font-black text-accBlack text-7xl">THREADS</h1>

      <section className="flex items-center w-full space-x-2 overflow-x-auto">
        <ProductCart products={product_data} />
      </section>

      <TryOutSheet />
    </main>
  );
}
