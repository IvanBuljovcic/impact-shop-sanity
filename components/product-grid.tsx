"use client";

import React from "react";
import { Product } from "@/sanity.types";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./product-card";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div layout initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProductCard product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
