import ProductsView from "@/components/Product/products-view";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="flex flex-col justify-top items-center bg-gray-100 p-4 min-h-screen">
      <ProductsView products={products} />
    </div>
  );
}
