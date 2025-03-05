"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/sanity.types";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { cn } from "@/lib/utils";

// Tiny base64 placeholder for blur effect
const PLACEHOLDER_BASE64 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAMYAAAAAAIAAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFhaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcUDQwNFxsUEBAWIxsdFxkZGxsdHxsdHR0fHx8mIh4eIx8dHSMjJCUlLDQvLzw0NUBEREpNNf/bAEMBFxcXHhoeNBweNUEmITVRRU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTf/AABEIAAYACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k=";

type ProductImageProps = {
  image?: Product["image"];
  name?: Product["name"];
  isOutOfStock: boolean;
};

const ProductImage = ({ image, name, isOutOfStock }: ProductImageProps) => {
  const [errorImage, setErrorImage] = useState(false);
  const errorImageUrl = "/no-image-placeholder.svg";

  const imageClassName = cn(
    "object-contain group-hover:scale-105 transition-all duration-300 group-hover:grayscale-0",
    {
      grayscale: isOutOfStock,
    }
  );

  const imgUrl = () => {
    if (errorImage) {
      return errorImageUrl;
    }

    if (!image) {
      return errorImageUrl;
    }

    return imageUrl(image).url();
  };

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      <Image
        className={imageClassName}
        src={imgUrl()}
        alt={name || "Product image"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={PLACEHOLDER_BASE64}
        onError={() => setErrorImage(true)}
      />
    </div>
  );
};

export default ProductImage;
