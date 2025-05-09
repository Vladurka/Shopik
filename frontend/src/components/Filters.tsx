import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    setSelectedFilters,
    fetchFilters,
    fetchProducts,
    selectedFilters,
    resetSelectedFilters,
    filters,
  } = useProductStore();

  useEffect(() => {
    const paramsObj = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
        return acc;
      },
      {} as Record<string, string[]>
    );

    const selectedFilters = {
      genders: paramsObj.gender || [],
      sizes: paramsObj.size || [],
      colors: paramsObj.color || [],
      brands: paramsObj.brand || [],
      categories: paramsObj.category || [],
    };

    setSelectedFilters(selectedFilters);
    fetchProducts(paramsObj);
    fetchFilters(paramsObj);
  }, [fetchFilters, fetchProducts, setSelectedFilters, searchParams]);

  const handleFilterChange = (
    type: keyof typeof selectedFilters,
    value: string
  ) => {
    const alreadySelected = selectedFilters[type].includes(value);
    const updatedValues = alreadySelected
      ? selectedFilters[type].filter((v) => v !== value)
      : [...selectedFilters[type], value];

    const newFilters = { ...selectedFilters, [type]: updatedValues };

    const queryParams: Record<string, string[]> = {};

    if (newFilters.genders.length) queryParams.gender = newFilters.genders;
    if (newFilters.sizes.length) queryParams.size = newFilters.sizes;
    if (newFilters.colors.length) queryParams.color = newFilters.colors;
    if (newFilters.brands.length) queryParams.brand = newFilters.brands;
    if (newFilters.categories.length)
      queryParams.category = newFilters.categories;

    setSelectedFilters({ ...selectedFilters, [type]: updatedValues });
    fetchProducts(queryParams);
    fetchFilters(queryParams);

    const newSearchParams = new URLSearchParams(searchParams);

    ["gender", "size", "color", "brand", "category"].forEach((key) => {
      newSearchParams.delete(key);
    });

    Object.entries(queryParams).forEach(([key, values]) => {
      values.forEach((value) => {
        newSearchParams.append(key, value);
      });
    });

    setSearchParams(newSearchParams);
  };

  const handleResetFilters = () => {
    resetSelectedFilters();
    fetchProducts();
    setSearchParams({});
  };

  return (
    <motion.div
      className="p-4 border-r border-zinc-700 h-full overflow-y-auto scrollbar-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Filters</h2>

      <button
        onClick={handleResetFilters}
        className="mb-4 px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition font-bold"
      >
        Reset Filters
      </button>

      <hr className="mb-4" />

      {["genders", "sizes", "colors", "brands", "categories"].map(
        (filterType) => (
          <div key={filterType} className="mb-6">
            <h3 className="text-lg font-semibold mb-2 capitalize">
              {filterType}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(filters as any)[filterType]?.map((item: string) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={item}
                    checked={(selectedFilters as any)[filterType]?.includes(
                      item
                    )}
                    onChange={() =>
                      handleFilterChange(
                        filterType as keyof typeof selectedFilters,
                        item
                      )
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
            <hr className="mt-4" />
          </div>
        )
      )}
    </motion.div>
  );
};
