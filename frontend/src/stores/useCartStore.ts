import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Cart } from "@/types";
export interface CartStore {
  cart: Cart | null;
  error: string | null;
  isAdded: boolean;
  getCart: (id: string) => Promise<void>;
  checkItem: (id: string, productId: string) => Promise<void>;
  addItem: (id: string, productId: string) => Promise<void>;
  deleteItem: (id: string, productId: string) => Promise<void>;
  clearCart: (id: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  error: null,
  isAdded: false,

  getCart: async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/cart/${id}`);
      set({ cart: data.cart, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  checkItem: async (id: string, productId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/cart/isAdded/${id}/${productId}`
      );
      set({ isAdded: data.isAdded, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  addItem: async (id: string, productId: string) => {
    try {
      await axiosInstance.post("/cart", {
        id: id,
        productId: productId,
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteItem: async (id: string, productId: string) => {
    try {
      const { data } = await axiosInstance.patch("/cart", {
        id: id,
        productId: productId,
      });
      set({ cart: data.cart, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearCart: async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/${id}`);
      set({ cart: data.cart, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
