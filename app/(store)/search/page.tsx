import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

type SearchProps = {
  searchParams: {
    query: string;
  };
};

const Search = async ({ searchParams }: SearchProps) => {
  const { query } = await searchParams;

  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center bg-gray-100 min-h-screen align-top p4">
        <div className="p-8 rounded-lg w-full">
          <h1 className="mb-6 font-bold text-3xl text-center">No products found for: {query}</h1>

          <p className="text-gray-600 text-center">Try searching with different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen align-top">
      <div className="p-8 rounded-lg w-full">
        <h1 className="mb-6 text-3xl text-center">
          Showing results for: <span className="font-bold">{query}</span>
        </h1>

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Search;
