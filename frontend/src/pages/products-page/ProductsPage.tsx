import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import { Filters } from "@/components/Filters";
import { useSearchParams } from "react-router-dom";

export const ProductsPage = () => {
  const { products, fetchProducts } = useProductStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParams: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      if (queryParams[key]) {
        queryParams[key].push(value);
      } else {
        queryParams[key] = [value];
      }
    });

    fetchProducts(queryParams);
  }, [fetchProducts, searchParams]);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 pt-28">
        <div className="lg:col-span-1">
          <Filters />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="border-2 rounded-lg shadow-md p-4 w-full flex flex-col items-center text-center"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-70 h-70 rounded-md"
              />
              <div className="flex flex-col w-full pt-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-white mb-2">{product.description}</p>
                <p className="text-lg font-semibold mb-2">${product.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
