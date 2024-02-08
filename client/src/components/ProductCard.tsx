import Image from "next/image";
import { IconChevronsRight, IconStarFilled } from "@tabler/icons-react";
import { TProduct } from "@/utils/types";
import { useTryOut } from "@/store";

interface prop {
  product: TProduct;
}

export default function ProductCard({ product }: prop) {
  const addOutfit = useTryOut((state) => state.addOutfit);

  const handleAddToTryOut = () => {
    addOutfit(product);
  };

  return (
    <section className="shadow-[5px_5px_0px_0px_rgba(0,0,0)] max-w-64 min-w-64 bg-satYellow rounded-xl border-accBlack border-4 relative flex flex-col items-right justify-between h-80 p-3">
      <Image
        alt="product-image"
        src={product.img_url}
        width={200}
        height={288}
        className="w-full h-52 object-cover border border-accBlack rounded-md"
      />
      <div>
        <h1 className="text-ellipsis overflow-hidden text-nowrap font-mono text-lg font-bold">
          {product.name}
        </h1>

        <div className="flex justify-between">
          <h2 className="text-2xl font-black font-mono">
            <span className="text-xs font-mono block">{product.brand}</span>
            $ {product.price}
          </h2>
          <button
            onClick={handleAddToTryOut}
            className="w-14 h-10 inline-flex justify-center border border-accBlack rounded-md items-center bg-satRed text-lightBeige hover:bg-satRed-hover hover:text-white"
          >
            <IconChevronsRight />
          </button>
        </div>
      </div>

      <div className="inline-flex space-x-1 items-center text-satYellow absolute top-5 right-5 ">
        <IconStarFilled />
        <span className="font-mono font-bold text-accBlack text-xl">
          {product.rating}
        </span>
      </div>
    </section>
  );
}
