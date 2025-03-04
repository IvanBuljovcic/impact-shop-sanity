import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";
import StockIndicator from "./StockIndicator";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isOutOfStock = product.stock !== null && product.stock! <= 0;

  const imageClassName = cn(
    "object-contain group-hover:scale-105 transition-all duration-300 group-hover:grayscale-0",
    {
      grayscale: isOutOfStock,
    }
  );

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className="group flex flex-col bg-white shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-lg h-full overflow-hidden transition-all duration-200"
      key={product._id}
    >
      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="mb-4">
          {product.image && (
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                className={imageClassName}
                src={imageUrl(product.image).url()}
                alt={product.name || "Product image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <StockIndicator stock={product.stock ?? 0} />
          <h1 className="text-2xl">{product.name}</h1>
        </header>

        <div className="mt-auto">
          {product.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {product.description.map((block) =>
                block._type === "block" ? block.children?.map((child) => child.text).join("") : ""
              )}
            </p>
          )}

          <p className="mt-2 font-bold text-gray-900 text-lg">RSD {product.price?.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
