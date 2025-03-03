"use client";

import React from "react";
import { Product } from "@/sanity.types";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      {products?.map((product) => (
        <div
          key={product._id}
          className="group flex flex-col bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
        >
          <div className="relative w-full h-full aspect-square overflow-hidden">
            {product.image && (
              <Image
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                src={imageUrl(product.image).url()}
                alt={product.name || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}

            <h1>{product.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
