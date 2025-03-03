import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { PortableText } from "next-sanity";

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
          {product.image && (
            <Image
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <span className="font-bold text-white text-lg">Out of stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 font-bold text-3xl">{product.name}</h1>

            <div className="mb-4 font-semibold text-xl">${product.price?.toFixed(2)}</div>

            <div className="mb-6 max-w-none prose">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
