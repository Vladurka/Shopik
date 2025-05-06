import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import { Filters } from "@/components/Filters";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/useAdminStore";

export const ProductsPage = () => {
  const { products, fetchProducts, deleteProduct } = useProductStore();
  const [searchParams] = useSearchParams();
  const { checkAdmin, isAdmin } = useAdminStore();

  useEffect(() => {
    const queryParams: Record<string, string[]> = {};

    searchParams.forEach((value, key) => {
      if (queryParams[key]) {
        queryParams[key].push(value);
      } else {
        queryParams[key] = [value];
      }
    });

    checkAdmin();
    fetchProducts(queryParams);
  }, [fetchProducts, searchParams, checkAdmin]);

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4 pt-28">
        <div className="lg:col-span-1">
          <Filters />
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <motion.div
              key={product._id}
              className="bg-gradient-to-b from-zinc-700 to-black border border-zinc-700 rounded-lg shadow-lg p-4 w-full flex flex-col items-center text-center hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
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

                <Link
                  to={`/product/${product._id}`}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition cursor-pointer"
                >
                  View Details
                </Link>

                {isAdmin && (
                  <button
                    className="inline-block bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition cursor-pointer mt-2"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
