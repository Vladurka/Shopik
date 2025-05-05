import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Cart } from "@/types";
export interface CartStore {
  cart: Cart | null;
  error: string | null;
  isAdded: boolean;
  isLoading: boolean;
  id: string;
  setId: (id: string) => void;
  getCart: () => Promise<void>;
  checkItem: (productId: string) => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  deleteItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  error: null,
  isAdded: false,
  isLoading: false,
  id: "",

  setId: (id: string) => set({ id }),

  getCart: async () => {
    set({ isLoading: true, error: null });
    const id = get().id;
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

  checkItem: async (productId: string) => {
    const id = get().id;
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

  addItem: async (productId: string) => {
    const id = get().id;
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/cart", {
        id: id,
        productId: productId,
      });
      set({ isAdded: true });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (productId: string) => {
    const id = get().id;
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

  clearCart: async () => {
    const id = get().id;
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
