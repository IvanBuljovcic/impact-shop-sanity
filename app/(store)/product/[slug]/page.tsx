import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import React from "react";
import { PortableText } from "next-sanity";
import ProductImage from "@/components/Product/product-image";
import ProductAddToCart from "@/components/Product/product-add-to-cart";

interface IProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock !== null && product.stock! <= 0;
  
  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          <ProductImage image={product.image} name={product.name} isOutOfStock={isOutOfStock} />

          {isOutOfStock && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <span className="font-bold text-white text-lg">Out of stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="mb-4 font-bold text-3xl">{product.name}</h1>

          <div className="mb-4 font-semibold text-xl">${product.price?.toFixed(2)}</div>

          <div className="mb-6 max-w-none prose">
            {Array.isArray(product.description) && <PortableText value={product.description} />}
          </div>

          <ProductAddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
