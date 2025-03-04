"use client";

import React from "react";
import { Product } from "@/sanity.types";
import ProductCard from "./product-card";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      {products?.map((product) => (<ProductCard key={product._id} product={product} />))}
    </div>
  );
};

export default ProductGrid;
