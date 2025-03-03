import ProductsView from "@/components/ProductsView";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";
import React from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const products = await getProductByCategory(slug);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen align-top">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-4xl">
        <h1 className="mb-6 font-bold text-3xl text-center">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>

        <ProductsView products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
