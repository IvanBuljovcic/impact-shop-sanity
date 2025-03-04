import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";
import StockIndicator from "./stock-indicator";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Tiny base64 placeholder for blur effect
const PLACEHOLDER_BASE64 = 
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAMYAAAAAAIAAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFhaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcUDQwNFxsUEBAWIxsdFxkZGxsdHxsdHR0fHx8mIh4eIx8dHSMjJCUlLDQvLzw0NUBEREpNNf/bAEMBFxcXHhoeNBweNUEmITVRRU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTf/AABEIAAYACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k=";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [errorImage, setErrorImage] = useState(false);
  const errorImageUrl = '/no-image-placeholder.svg';
  
  const isOutOfStock = () => {
    if (product.stock === null) {
      return true;
    }

    if (product.stock === undefined) {
      return true;
    }

    if (product.stock <= 0) {
      return true;
    }

    return false;
  }

  const imageClassName = cn(
    "object-contain group-hover:scale-105 transition-all duration-300 group-hover:grayscale-0",
    {
      grayscale: isOutOfStock(),
    }
  );

  const renderImage = () => {
    const imgUrl = () => {
      if (errorImage) {
        return errorImageUrl;
      }

      if (!product.image) {
        return errorImageUrl;
      }

      return imageUrl(product.image).url()
    }

    return (
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          className={imageClassName}
          src={imgUrl()}
          alt={product.name || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BASE64}
          onError={() => setErrorImage(true)}
        />
      </div>
    )
  }

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className="group flex flex-col bg-white shadow-sm hover:shadow-md p-4 border border-gray-200 rounded-lg h-full overflow-hidden transition-all duration-200"
      key={product._id}
    >
      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="mb-4">
          {renderImage()}

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