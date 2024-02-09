"use client";

import { TProduct } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";

interface prop {
  products: TProduct[];
}

export default function ProductPage({ products }: prop) {
  return (
    <div className="w-full flex justify-center">
      <section className="flex space-x-5 m-5 gap-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </div>
  );
}
