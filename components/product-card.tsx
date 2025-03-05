import Link from "next/link";
import { Product } from "@/sanity.types";
import StockIndicator from "./stock-indicator";
import ProductImage from "./Product/product-image";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
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
  };

  return (
    <Link
      key={product._id}
      href={`/product/${product.slug?.current}`}
      className="group flex flex-col bg-card shadow-sm hover:shadow-md p-4 border border-card-border rounded-lg h-full overflow-hidden text-card-foreground transition-all duration-200"
    >
      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="mb-4">
          <ProductImage image={product.image} name={product.name} isOutOfStock={isOutOfStock()} />

          <StockIndicator stock={product.stock ?? 0} />
          <h1 className="text-current text-2xl">{product.name}</h1>
        </header>

        <div className="mt-auto">
          {product.description && (
            <p className="mt-2 text-current text-sm line-clamp-2">
              {product.description.map((block) =>
                block._type === "block" ? block.children?.map((child) => child.text).join("") : ""
              )}
            </p>
          )}

          <p className="mt-2 font-bold text-current text-lg">RSD {product.price?.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
