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
    <>
      <Swiper
        effect={"coverflow"}
        slidesPerView="auto"
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        modules={[EffectCoverflow]}
        className="md:hidden"
      >
        {products.map((product, index) => (
          <SwiperSlide
            className="m-5 max-w-64"
            key={index}
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="hidden md:flex space-x-5 min-w-full m-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
    </>
  );
}
