import { Product, Filters } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export type FilterParams = Record<string, string | string[]>;

export interface ProductStore {
  products: Product[];
  filters: Filters;
  selectedFilters: Filters;
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: (filtersParams?: FilterParams) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchFilters: (filtersParams?: FilterParams) => Promise<void>;
  setSelectedFilters: (filters: Partial<Filters>) => void;
  resetSelectedFilters: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  filters: { genders: [], sizes: [], colors: [], brands: [], categories: [] },
  selectedFilters: {
    genders: [],
    sizes: [],
    colors: [],
    brands: [],
    categories: [],
  },
  currentProduct: null,
  isLoading: false,
  error: null,

  fetchProducts: async (filtersParams) => {
    set({ isLoading: true, error: null });
    try {
      const query = filtersParams
        ? `?${new URLSearchParams(
            Object.entries(filtersParams).flatMap(([key, value]) =>
              Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
            )
          ).toString()}`
        : "";

      const { data } = await axiosInstance.get(`/products${query}`);
      set({ products: data.products });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      set({ currentProduct: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/products/${id}`);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFilters: async (filtersParams) => {
    try {
      const query = filtersParams
        ? `?${new URLSearchParams(
            Object.entries(filtersParams).flatMap(([key, value]) =>
              Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
            )
          ).toString()}`
        : "";

      const { data } = await axiosInstance.get(`/products/filters${query}`);
      set({ filters: data.filters });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setSelectedFilters: (filters) =>
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        ...filters,
      },
    })),

  resetSelectedFilters: () =>
    set({
      selectedFilters: {
        genders: [],
        sizes: [],
        colors: [],
        brands: [],
        categories: [],
      },
    }),
}));
