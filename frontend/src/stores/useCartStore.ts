import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Cart } from "@/types";
export interface CartStore {
  cart: Cart | null;
  error: string | null;
  isAdded: boolean;
  isLoading: boolean;
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
  isLoading: false,

  getCart: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/cart/${id}`);
      set({
        cart: {
          id,
          items: data.cart,
        },
        error: null,
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  checkItem: async (id: string, productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get(
        `/cart/isAdded/${id}/${productId}`
      );
      set({ isAdded: data.isAdded, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (id: string, productId: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/cart", {
        id: id,
        productId: productId,
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (id: string, productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.patch("/cart", {
        id: id,
        productId: productId,
      });
      set({ cart: data.cart, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.delete(`/cart/${id}`);
      set({ cart: data.cart, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
