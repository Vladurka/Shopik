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
    const paramsObj: Record<string, string[]> = {};

    for (const [key, value] of searchParams.entries()) {
      if (!paramsObj[key]) paramsObj[key] = [];
      paramsObj[key].push(value);
    }

    const selected = {
      genders: paramsObj.gender || [],
      sizes: paramsObj.size || [],
      colors: paramsObj.color || [],
      brands: paramsObj.brand || [],
      categories: paramsObj.category || [],
    };

    setSelectedFilters(selected);
    fetchProducts(paramsObj);
    fetchFilters(paramsObj);
  }, [searchParams, setSelectedFilters, fetchProducts, fetchFilters]);

  const handleFilterChange = (
    type: keyof typeof selectedFilters,
    value: string
  ) => {
    const isSelected = selectedFilters[type].includes(value);
    const updated = isSelected
      ? selectedFilters[type].filter((v) => v !== value)
      : [...selectedFilters[type], value];

    const updatedFilters = { ...selectedFilters, [type]: updated };
    setSelectedFilters(updatedFilters);

    const queryParams: Record<string, string[]> = {
      ...(updatedFilters.genders.length && { gender: updatedFilters.genders }),
      ...(updatedFilters.sizes.length && { size: updatedFilters.sizes }),
      ...(updatedFilters.colors.length && { color: updatedFilters.colors }),
      ...(updatedFilters.brands.length && { brand: updatedFilters.brands }),
      ...(updatedFilters.categories.length && {
        category: updatedFilters.categories,
      }),
    };

    fetchProducts(queryParams);
    fetchFilters(queryParams);

    const newSearchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, values]) =>
      values.forEach((val) => newSearchParams.append(key, val))
    );
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

      {Object.entries({
        genders: "Gender",
        sizes: "Size",
        colors: "Color",
        brands: "Brand",
        categories: "Category",
      }).map(([key, label]) => (
        <div key={key} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <div className="flex flex-wrap gap-2">
            {(filters as any)[key]?.map((item: string) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={item}
                  checked={(selectedFilters as any)[key]?.includes(item)}
                  onChange={() =>
                    handleFilterChange(
                      key as keyof typeof selectedFilters,
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
      ))}
    </motion.div>
  );
};
