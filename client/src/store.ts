import { create } from "zustand";
import { TProduct } from "@/utils/types";
import { persist } from "zustand/middleware";

export interface Outfit {
  top: TProduct | null;
  bottom: TProduct | null;
  foot: TProduct | null;
}

export interface TTryOn {
  name: string;
  brand: string;
  texture: string;
  skin: string;
}

interface TryOutState {
  outfit: Outfit;
  tryOn: TTryOn;
  setTryOn: (product: TProduct) => void;
  addOutfit: (product: TProduct) => void;
  removeOutfit: (product: TProduct) => void;
}

export const useTryOut = create<TryOutState>()(
  persist(
    (set) => ({
      outfit: {
        top: null,
        bottom: null,
        foot: null,
      },

      tryOn: {
        name: "",
        brand: "",
        texture: "",
        skin: "",
      },

      setTryOn: ((product) => {
        set((state) => {
          let newTryOn = state.tryOn;
          console.log("before: ", newTryOn);
          newTryOn = {
            name: product.name,
            texture: product.texture,
            skin: "",
            brand: product.brand,
          };

          console.log("After: ", newTryOn);
          return { tryOn: newTryOn };
        });
      }),

      addOutfit: (product) => {
        set((state) => {
          const newOutfit = state.outfit;
          newOutfit[product.category] = product;

          return ({
            outfit: newOutfit,
          });
        });
      },

      removeOutfit: (product) => {
        set((state) => {
          const newOutfit = state.outfit;
          newOutfit[product?.category] = null;

          return ({ outfit: newOutfit });
        });
      },
    }),
    { name: "shop" },
  ),
);

interface ProductState {
  products: TProduct[];
  replaceProducts: (products: TProduct[]) => void;
}

export const useProducts = create<ProductState>((set) => ({
  products: [],
  replaceProducts: ((products) => {
    set((state) => ({
      ...state,
      products,
    }));
  }),
}));
