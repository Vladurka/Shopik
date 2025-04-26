import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";

export const Filters = () => {
  const filters = useProductStore((state) => state.filters);
  const isLoading = useProductStore((state) => state.isLoading);
  const fetchFilters = useProductStore((state) => state.fetchFilters);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [selectedFilters, setSelectedFilters] = useState<{
    genders: string[];
    sizes: string[];
    colors: string[];
    brands: string[];
    categories: string[];
  }>({
    genders: [],
    sizes: [],
    colors: [],
    brands: [],
    categories: [],
  });

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleFilterChange = (
    type: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const alreadySelected = prev[type].includes(value);
      const updatedValues = alreadySelected
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];

      const newFilters = { ...prev, [type]: updatedValues };

      const queryParams: Record<string, string[]> = {};
      if (newFilters.genders.length) queryParams.gender = newFilters.genders;
      if (newFilters.sizes.length) queryParams.size = newFilters.sizes;
      if (newFilters.colors.length) queryParams.color = newFilters.colors;
      if (newFilters.brands.length) queryParams.brand = newFilters.brands;
      if (newFilters.categories.length)
        queryParams.category = newFilters.categories;

      fetchProducts(queryParams);

      return newFilters;
    });
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <hr />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Genders</h3>
        <div className="flex flex-wrap gap-2">
          {filters.genders.map((gender) => (
            <label key={gender} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={gender}
                checked={selectedFilters.genders.includes(gender)}
                onChange={() => handleFilterChange("genders", gender)}
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      <hr />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {filters.sizes.map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={size}
                checked={selectedFilters.sizes.includes(size)}
                onChange={() => handleFilterChange("sizes", size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <hr />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {filters.colors.map((color) => (
            <label key={color} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={color}
                checked={selectedFilters.colors.includes(color)}
                onChange={() => handleFilterChange("colors", color)}
              />
              {color}
            </label>
          ))}
        </div>
      </div>

      <hr />

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Brands</h3>
        <div className="flex flex-col gap-2">
          {filters.brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={brand}
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => handleFilterChange("brands", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <div className="flex flex-col gap-2">
          {filters.categories.map((category) => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={category}
                checked={selectedFilters.categories.includes(category)}
                onChange={() => handleFilterChange("categories", category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
