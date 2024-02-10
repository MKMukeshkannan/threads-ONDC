import { create } from "zustand";
import { TProduct } from "@/utils/types";

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

export const useTryOut = create<TryOutState>((set) => ({
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
      return ({
        tryOn: {
          name: product.name,
          texture: product.texture,
          skin: "",
          brand: product.brand,
        },
      });
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
}));

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
