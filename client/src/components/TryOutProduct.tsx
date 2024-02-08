import { useTryOut } from "@/store";
import { TProduct } from "@/utils/types";
import { IconTrash } from "@tabler/icons-react";

interface prop {
  product: TProduct | null;
}

export default function TryOutProduct({ product }: prop) {
  const { removeOutfit } = useTryOut((state) => state);

  const handleRemove = () => {
    if (!product) return;
    removeOutfit(product);
  };

  return (
    <section className="relative shadow-[5px_5px_0px_0px_rgba(0,0,0)] bg-[#9CCAB8] w-48 h-56 border-2 border-black p-3 rounded-md">
      <img
        className="w-48 h-40 border-2 border-black rounded-sm object-cover"
        src={product
          ? product.img_url
          : "https://img.freepik.com/premium-vector/tshirt-design-template-back-view-male-apparel_53562-17705.jpg"}
      />
      <h1 className="text-ellipsis overflow-hidden text-nowrap font-mono text-lg font-bold ">
        {product ? product.name : "SELECT ITEM"}
      </h1>
      <div
        onClick={handleRemove}
        className="absolute top-4 right-4 text-red-500 hover:text-red-400 cursor-pointer"
      >
        <IconTrash />
      </div>
    </section>
  );
}
