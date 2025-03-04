import React from "react";

import ProductGrid from "./product-grid";
import { Product } from "@/sanity.types";

interface ProductsViewProps {
  products: Product[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
